import { StyleProp, ViewStyle } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
export declare enum ScrollDirection {
    None = "none",
    Up = "up",
    Down = "down"
}
export declare function clamp(value: number, lowerBound: number, upperBound: number): number;
export declare function objectMove(object: {
    [id: string]: number;
}, from: number, to: number): {
    [id: string]: number;
};
export declare function listToObject<T extends {
    id: string;
}>(list: T[]): {
    [id: string]: number;
};
export declare function setPosition(positionY: number, itemsCount: number, positions: SharedValue<{
    [id: string]: number;
}>, id: string, itemHeight: number): void;
export declare function setAutoScroll(positionY: number, lowerBound: number, upperBound: number, scrollThreshold: number, autoScroll: SharedValue<ScrollDirection>): void;
export interface UseSortableOptions<T> {
    id: string;
    positions: SharedValue<{
        [id: string]: number;
    }>;
    lowerBound: SharedValue<number>;
    autoScrollDirection: SharedValue<ScrollDirection>;
    itemsCount: number;
    itemHeight: number;
    containerHeight?: number;
    onMove?: (id: string, from: number, to: number) => void;
    onDragStart?: (id: string, position: number) => void;
    onDrop?: (id: string, position: number, allPositions?: {
        [id: string]: number;
    }) => void;
    onDragging?: (id: string, overItemId: string | null, yPosition: number) => void;
    children?: React.ReactNode;
    handleComponent?: React.ComponentType<any>;
}
export interface UseSortableReturn {
    animatedStyle: StyleProp<ViewStyle>;
    panGestureHandler: any;
    isMoving: boolean;
    hasHandle: boolean;
}
export declare function useSortable<T>(options: UseSortableOptions<T>): UseSortableReturn;
