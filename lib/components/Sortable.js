import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { measure, runOnUI, useAnimatedRef, } from "react-native-reanimated";
import { GestureHandlerRootView, FlatList, ScrollView, } from "react-native-gesture-handler";
import { DropProvider } from "../context/DropContext";
import { SortableDirection, } from "../types/sortable";
import { useSortableList, } from "../hooks/useSortableList";
import { useHorizontalSortableList } from "../hooks/useHorizontalSortableList";
import { dataHash } from "./sortableUtils";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
function SortableComponent({ data, renderItem, direction = SortableDirection.Vertical, itemHeight, itemWidth, gap = 0, paddingHorizontal = 0, enableDynamicHeights = false, estimatedItemHeight = 60, onHeightsMeasured, style, contentContainerStyle, itemKeyExtractor = (item) => item.id, useFlatList = true, disableLayoutAnimation, externalScroll, }) {
    const isDynamicHeightMode = useMemo(() => {
        if (direction === SortableDirection.Horizontal)
            return false;
        if (enableDynamicHeights)
            return true;
        if (typeof itemHeight === "number")
            return false;
        if (itemHeight === undefined)
            return false;
        return true;
    }, [enableDynamicHeights, itemHeight, direction]);
    if (direction === SortableDirection.Vertical &&
        !isDynamicHeightMode &&
        !itemHeight) {
        throw new Error("itemHeight is required when direction is vertical and not using dynamic heights");
    }
    if (direction === SortableDirection.Horizontal && !itemWidth) {
        throw new Error("itemWidth is required when direction is horizontal");
    }
    if (direction === SortableDirection.Horizontal) {
        return (React.createElement(HorizontalSortableContent, { data: data, renderItem: renderItem, direction: direction, itemWidth: itemWidth, gap: gap, paddingHorizontal: paddingHorizontal, style: style, contentContainerStyle: contentContainerStyle, itemKeyExtractor: itemKeyExtractor, useFlatList: useFlatList, disableLayoutAnimation: disableLayoutAnimation }));
    }
    return (React.createElement(VerticalSortableContent, { data: data, renderItem: renderItem, direction: direction, itemHeight: itemHeight, enableDynamicHeights: enableDynamicHeights, estimatedItemHeight: estimatedItemHeight, onHeightsMeasured: onHeightsMeasured, style: style, contentContainerStyle: contentContainerStyle, itemKeyExtractor: itemKeyExtractor, useFlatList: useFlatList, disableLayoutAnimation: disableLayoutAnimation, externalScroll: externalScroll }));
}
function VerticalSortableContent({ data, renderItem, direction, itemHeight, enableDynamicHeights, estimatedItemHeight, onHeightsMeasured, style, contentContainerStyle, itemKeyExtractor, useFlatList, disableLayoutAnimation, externalScroll, }) {
    const { scrollViewRef, dropProviderRef, handleScroll, handleScrollEnd, contentHeight, isExternalScroll, contentOffsetY, getItemProps, } = useSortableList({
        data,
        itemHeight,
        enableDynamicHeights,
        estimatedItemHeight,
        onHeightsMeasured,
        itemKeyExtractor,
        externalScroll,
    });
    const externalWrapperRef = useAnimatedRef();
    const remeasureOffset = useCallback(() => {
        if (!externalScroll)
            return;
        const parentRef = externalScroll.scrollableRef;
        const parentScrollY = externalScroll.scrollY;
        runOnUI(() => {
            "worklet";
            const local = measure(externalWrapperRef);
            const parent = measure(parentRef);
            if (local !== null && parent !== null) {
                contentOffsetY.value =
                    local.pageY - parent.pageY + parentScrollY.value;
            }
        })();
    }, [externalScroll, externalWrapperRef, contentOffsetY]);
    const handleExternalLayout = useCallback((_e) => remeasureOffset(), [remeasureOffset]);
    const memoizedVerticalRenderItem = useCallback(({ item, index }) => {
        const itemProps = getItemProps(item, index);
        const sortableItemProps = {
            item: item,
            index,
            direction: SortableDirection.Vertical,
            disableLayoutAnimation,
            ...itemProps,
        };
        return renderItem(sortableItemProps);
    }, [getItemProps, renderItem]);
    if (isExternalScroll) {
        return (React.createElement(GestureHandlerRootView, { style: styles.flex },
            React.createElement(DropProvider, { ref: dropProviderRef },
                React.createElement(View, { ref: externalWrapperRef, onLayout: handleExternalLayout, style: [
                        { height: contentHeight },
                        style,
                        contentContainerStyle,
                    ] }, data.map((item, index) => {
                    const itemProps = getItemProps(item, index);
                    const sortableItemProps = {
                        item,
                        index,
                        direction: SortableDirection.Vertical,
                        disableLayoutAnimation,
                        ...itemProps,
                    };
                    return renderItem(sortableItemProps);
                })))));
    }
    return (React.createElement(GestureHandlerRootView, { style: styles.flex },
        React.createElement(DropProvider, { ref: dropProviderRef }, useFlatList ? (React.createElement(AnimatedFlatList, { ref: scrollViewRef, data: data, keyExtractor: itemKeyExtractor, renderItem: memoizedVerticalRenderItem, onScroll: handleScroll, scrollEventThrottle: 16, style: [styles.scrollView, style], contentContainerStyle: [
                { height: contentHeight },
                contentContainerStyle,
            ], onScrollEndDrag: handleScrollEnd, onMomentumScrollEnd: handleScrollEnd, simultaneousHandlers: dropProviderRef, showsVerticalScrollIndicator: false })) : (React.createElement(AnimatedScrollView, { ref: scrollViewRef, onScroll: handleScroll, scrollEventThrottle: 16, style: [styles.scrollView, style], contentContainerStyle: [
                { height: contentHeight },
                contentContainerStyle,
            ], onScrollEndDrag: handleScrollEnd, onMomentumScrollEnd: handleScrollEnd, simultaneousHandlers: dropProviderRef }, data.map((item, index) => {
            const itemProps = getItemProps(item, index);
            const sortableItemProps = {
                item,
                index,
                direction: SortableDirection.Vertical,
                disableLayoutAnimation,
                ...itemProps,
            };
            return renderItem(sortableItemProps);
        }))))));
}
function HorizontalSortableContent({ data, renderItem, direction, itemWidth, gap = 0, paddingHorizontal = 0, style, contentContainerStyle, itemKeyExtractor, useFlatList, disableLayoutAnimation, }) {
    const { scrollViewRef, dropProviderRef, handleScroll, handleScrollEnd, contentWidth, getItemProps, } = useHorizontalSortableList({
        data,
        itemWidth: itemWidth,
        gap,
        paddingHorizontal,
        itemKeyExtractor,
    });
    const memoizedHorizontalRenderItem = useCallback(({ item, index }) => {
        const itemProps = getItemProps(item, index);
        const sortableItemProps = {
            item: item,
            index,
            direction: SortableDirection.Horizontal,
            autoScrollHorizontalDirection: itemProps.autoScrollDirection,
            disableLayoutAnimation,
            ...itemProps,
        };
        return renderItem(sortableItemProps);
    }, [getItemProps, renderItem]);
    return (React.createElement(GestureHandlerRootView, { style: styles.flex },
        React.createElement(DropProvider, { ref: dropProviderRef }, useFlatList ? (React.createElement(AnimatedFlatList, { ref: scrollViewRef, data: data, keyExtractor: itemKeyExtractor, horizontal: true, renderItem: memoizedHorizontalRenderItem, onScroll: handleScroll, scrollEventThrottle: 16, style: [styles.scrollView, style], contentContainerStyle: [
                { width: contentWidth },
                contentContainerStyle,
            ], onScrollEndDrag: handleScrollEnd, onMomentumScrollEnd: handleScrollEnd, simultaneousHandlers: dropProviderRef, showsHorizontalScrollIndicator: false })) : (React.createElement(AnimatedScrollView, { ref: scrollViewRef, onScroll: handleScroll, scrollEventThrottle: 16, horizontal: true, style: [styles.scrollView, style], contentContainerStyle: [
                { width: contentWidth },
                contentContainerStyle,
            ], onScrollEndDrag: handleScrollEnd, onMomentumScrollEnd: handleScrollEnd, simultaneousHandlers: dropProviderRef, showsHorizontalScrollIndicator: false }, data.map((item, index) => {
            const itemProps = getItemProps(item, index);
            const sortableItemProps = {
                item,
                index,
                direction: SortableDirection.Horizontal,
                autoScrollHorizontalDirection: itemProps.autoScrollDirection,
                disableLayoutAnimation,
                ...itemProps,
            };
            return renderItem(sortableItemProps);
        }))))));
}
export const Sortable = memo(({ data, renderItem, ...props }) => {
    const dataHashKey = dataHash(data);
    return (React.createElement(SortableComponent, { data: data, renderItem: renderItem, ...props, key: dataHashKey }));
});
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        position: "relative",
        backgroundColor: "white",
    },
});
