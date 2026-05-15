import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { scrollTo, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useSharedValue, } from "react-native-reanimated";
import { listToObject, resolveItemHeight, } from "../components/sortableUtils";
import { ScrollDirection } from "../types/sortable";
export function useSortableList(options) {
    const { data, itemHeight, enableDynamicHeights = false, estimatedItemHeight = 60, onHeightsMeasured, itemKeyExtractor = (item) => item.id, externalScroll, } = options;
    const isExternalScroll = externalScroll !== undefined;
    const isDynamicHeight = useMemo(() => {
        if (enableDynamicHeights)
            return true;
        if (typeof itemHeight === "number")
            return false;
        if (itemHeight === undefined)
            return false;
        return true;
    }, [enableDynamicHeights, itemHeight]);
    const needsMeasurement = enableDynamicHeights;
    if (__DEV__) {
        data.forEach((item, index) => {
            const id = itemKeyExtractor(item, index);
            if (typeof id !== "string" || !id) {
                console.error(`[react-native-reanimated-dnd] Item at index ${index} has invalid id: ${id}. ` +
                    `Each item must have a unique string id property.`);
            }
        });
        if (!isDynamicHeight && itemHeight === undefined) {
            console.error("[react-native-reanimated-dnd] itemHeight is required when not using dynamic heights. " +
                "Either provide itemHeight or set enableDynamicHeights to true.");
        }
    }
    const positions = useSharedValue(listToObject(data));
    const localScrollY = useSharedValue(0);
    const scrollY = externalScroll ? externalScroll.scrollY : localScrollY;
    const lowerBoundSV = useSharedValue(0);
    const autoScroll = useSharedValue(ScrollDirection.None);
    const internalScrollViewRef = useAnimatedRef();
    const scrollViewRef = externalScroll
        ? externalScroll.scrollableRef
        : internalScrollViewRef;
    const contentOffsetY = useSharedValue(0);
    const dropProviderRef = useRef(null);
    const initialHeights = useMemo(() => {
        if (!isDynamicHeight)
            return {};
        const heights = {};
        data.forEach((item, index) => {
            const id = itemKeyExtractor(item, index);
            heights[id] = resolveItemHeight(itemHeight, item, index, estimatedItemHeight);
        });
        return heights;
    }, []);
    const itemHeightsSV = useSharedValue(initialHeights);
    const fixedContentHeight = typeof itemHeight === "number" ? data.length * itemHeight : null;
    const [dynamicContentHeight, setDynamicContentHeight] = useState(() => {
        if (!isDynamicHeight && fixedContentHeight !== null)
            return fixedContentHeight;
        let total = 0;
        data.forEach((item, index) => {
            total += resolveItemHeight(itemHeight, item, index, estimatedItemHeight);
        });
        return total;
    });
    useEffect(() => {
        if (!isDynamicHeight)
            return;
        const newHeights = {};
        data.forEach((item, index) => {
            const id = itemKeyExtractor(item, index);
            if (!needsMeasurement) {
                newHeights[id] = resolveItemHeight(itemHeight, item, index, estimatedItemHeight);
            }
            else {
                const existing = itemHeightsSV.value[id];
                newHeights[id] = existing !== null && existing !== void 0 ? existing : estimatedItemHeight;
            }
        });
        itemHeightsSV.value = newHeights;
        let total = 0;
        data.forEach((item, index) => {
            var _a;
            const id = itemKeyExtractor(item, index);
            total += (_a = newHeights[id]) !== null && _a !== void 0 ? _a : estimatedItemHeight;
        });
        setDynamicContentHeight(total);
    }, [data, isDynamicHeight, needsMeasurement, itemHeight, estimatedItemHeight, itemKeyExtractor]);
    const scheduleHeightUpdate = useCallback((id, height) => {
        const rounded = Math.round(height);
        const prev = itemHeightsSV.value[id];
        if (prev !== undefined && Math.abs(prev - rounded) < 1)
            return;
        const newHeights = { ...itemHeightsSV.value, [id]: rounded };
        itemHeightsSV.value = newHeights;
        let total = 0;
        data.forEach((item, index) => {
            var _a;
            const itemId = itemKeyExtractor(item, index);
            total += (_a = newHeights[itemId]) !== null && _a !== void 0 ? _a : estimatedItemHeight;
        });
        setDynamicContentHeight(total);
        if (onHeightsMeasured) {
            onHeightsMeasured(newHeights);
        }
    }, [data, itemKeyExtractor, estimatedItemHeight, onHeightsMeasured]);
    useAnimatedReaction(() => isExternalScroll
        ? scrollY.value - contentOffsetY.value
        : null, (next, prev) => {
        if (next !== null && next !== prev) {
            lowerBoundSV.value = next;
        }
    });
    useAnimatedReaction(() => {
        if (autoScroll.value === ScrollDirection.None)
            return null;
        return lowerBoundSV.value;
    }, (lb) => {
        if (lb === null)
            return;
        if (isExternalScroll) {
            scrollTo(scrollViewRef, 0, lb + contentOffsetY.value, false);
        }
        else {
            scrollTo(scrollViewRef, 0, lb, false);
        }
    });
    const handleScroll = useAnimatedScrollHandler((event) => {
        if (!isExternalScroll) {
            lowerBoundSV.value = event.contentOffset.y;
            localScrollY.value = event.contentOffset.y;
        }
    });
    const handleScrollEnd = useCallback(() => {
        let localScrollTimeout = null;
        if (localScrollTimeout) {
            clearTimeout(localScrollTimeout);
        }
        localScrollTimeout = setTimeout(() => {
            var _a;
            (_a = dropProviderRef.current) === null || _a === void 0 ? void 0 : _a.requestPositionUpdate();
        }, 50);
    }, []);
    const contentHeight = !isDynamicHeight && fixedContentHeight !== null
        ? fixedContentHeight
        : dynamicContentHeight;
    const containerHeight = externalScroll === null || externalScroll === void 0 ? void 0 : externalScroll.viewportHeight;
    const getItemProps = useCallback((item, index) => {
        const id = itemKeyExtractor(item, index);
        return {
            id,
            positions,
            lowerBound: lowerBoundSV,
            autoScrollDirection: autoScroll,
            itemsCount: data.length,
            itemHeight: typeof itemHeight === "number" ? itemHeight : undefined,
            isDynamicHeight,
            estimatedItemHeight,
            itemHeights: isDynamicHeight ? itemHeightsSV : undefined,
            scheduleHeightUpdate: needsMeasurement ? scheduleHeightUpdate : undefined,
            containerHeight,
        };
    }, [
        data.length,
        itemHeight,
        isDynamicHeight,
        estimatedItemHeight,
        needsMeasurement,
        itemKeyExtractor,
        positions,
        lowerBoundSV,
        autoScroll,
        itemHeightsSV,
        scheduleHeightUpdate,
        containerHeight,
    ]);
    return {
        positions,
        scrollY,
        autoScroll,
        scrollViewRef,
        dropProviderRef,
        handleScroll,
        handleScrollEnd,
        contentHeight,
        isDynamicHeight,
        itemHeights: itemHeightsSV,
        scheduleHeightUpdate: needsMeasurement ? scheduleHeightUpdate : undefined,
        isExternalScroll,
        contentOffsetY,
        getItemProps,
    };
}
