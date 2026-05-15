import { ExternalScrollConfig } from "../types/sortable";
import { DropProviderRef } from "../types/context";
export interface UseSortableListOptions<TData> {
    data: TData[];
    itemHeight?: number | number[] | ((item: TData, index: number) => number);
    enableDynamicHeights?: boolean;
    estimatedItemHeight?: number;
    onHeightsMeasured?: (heights: {
        [id: string]: number;
    }) => void;
    itemKeyExtractor?: (item: TData, index: number) => string;
    externalScroll?: ExternalScrollConfig;
}
export interface UseSortableListReturn<TData> {
    positions: any;
    scrollY: any;
    autoScroll: any;
    scrollViewRef: any;
    dropProviderRef: React.RefObject<DropProviderRef | null>;
    handleScroll: any;
    handleScrollEnd: () => void;
    contentHeight: number;
    isDynamicHeight: boolean;
    itemHeights: any;
    scheduleHeightUpdate?: (id: string, height: number) => void;
    isExternalScroll: boolean;
    contentOffsetY: any;
    getItemProps: (item: TData, index: number) => {
        id: string;
        positions: any;
        lowerBound: any;
        autoScrollDirection: any;
        itemsCount: number;
        itemHeight?: number;
        isDynamicHeight: boolean;
        estimatedItemHeight: number;
        itemHeights?: any;
        scheduleHeightUpdate?: (id: string, height: number) => void;
        containerHeight?: number;
    };
}
export declare function useSortableList<TData extends {
    id: string;
}>(options: UseSortableListOptions<TData>): UseSortableListReturn<TData>;
