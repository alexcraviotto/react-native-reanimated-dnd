# Visual Feedback

Enhance user experience with clear visual indicators and responsive feedback.

## Overview

Visual feedback provides users with immediate responses to their drag and drop actions. This example demonstrates:

- Active state indicators
- Drag state visualization
- Drop zone highlighting
- Success/error feedback

## Key Features

- **Real-time Feedback**: Immediate visual responses to user actions
- **State Indicators**: Clear visual states for different interaction phases
- **Smooth Transitions**: Fluid animations between states
- **Accessibility**: High contrast and clear visual cues
- **Customizable**: Flexible styling options

## Basic Implementation

```tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  DropProvider,
  Draggable,
  Droppable,
} from "react-native-reanimated-dnd";

export function VisualFeedbackExample() {
  const [dragState, setDragState] = useState<
    "idle" | "dragging" | "success" | "error"
  >("idle");
  const [activeZone, setActiveZone] = useState<string | null>(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Visual Feedback</Text>

          {/* Status Indicator */}
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, styles[`${dragState}Dot`]]} />
            <Text style={styles.statusText}>
              {dragState === "idle" && "Ready to drag"}
              {dragState === "dragging" && "Dragging..."}
              {dragState === "success" && "Drop successful!"}
              {dragState === "error" && "Drop failed"}
            </Text>
          </View>

          {/* Draggable with Feedback */}
          <FeedbackDraggable
            data={{ id: "feedback-item", label: "Drag Me" }}
            onDragStart={() => setDragState("dragging")}
            onDragEnd={() => setDragState("idle")}
          />

          {/* Drop Zones with Feedback */}
          <View style={styles.dropZonesContainer}>
            <FeedbackDropZone
              id="success-zone"
              title="✅ Success Zone"
              isActive={activeZone === "success-zone"}
              onDragEnter={() => setActiveZone("success-zone")}
              onDragLeave={() => setActiveZone(null)}
              onDrop={() => {
                setDragState("success");
                setTimeout(() => setDragState("idle"), 2000);
              }}
            />

            <FeedbackDropZone
              id="error-zone"
              title="❌ Error Zone"
              isActive={activeZone === "error-zone"}
              onDragEnter={() => setActiveZone("error-zone")}
              onDragLeave={() => setActiveZone(null)}
              onDrop={() => {
                setDragState("error");
                setTimeout(() => setDragState("idle"), 2000);
              }}
            />
          </View>
        </View>
      </DropProvider>
    </GestureHandlerRootView>
  );
}

function FeedbackDraggable({ data, onDragStart, onDragEnd }) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  const handleDragStart = () => {
    scale.value = withSpring(1.1);
    rotation.value = withSpring(5);
    opacity.value = withTiming(0.9);
    onDragStart?.();
  };

  const handleDragEnd = () => {
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
    opacity.value = withTiming(1);
    onDragEnd?.();
  };

  return (
    <Draggable
      data={data}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={styles.draggableContainer}
    >
      <Animated.View style={[styles.draggable, animatedStyle]}>
        <Text style={styles.draggableText}>{data.label}</Text>
        <Text style={styles.dragHint}>Drag for feedback</Text>
      </Animated.View>
    </Draggable>
  );
}

function FeedbackDropZone({
  id,
  title,
  isActive,
  onDragEnter,
  onDragLeave,
  onDrop,
}) {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(2);
  const backgroundColor = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderWidth: borderWidth.value,
    backgroundColor: `rgba(88, 166, 255, ${backgroundColor.value})`,
  }));

  React.useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1.02);
      borderWidth.value = withTiming(4);
      backgroundColor.value = withTiming(0.1);
    } else {
      scale.value = withSpring(1);
      borderWidth.value = withTiming(2);
      backgroundColor.value = withTiming(0);
    }
  }, [isActive]);

  return (
    <Droppable
      droppableId={id}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <Animated.View style={[styles.dropZone, animatedStyle]}>
        <Text style={styles.zoneTitle}>{title}</Text>
        <Text style={styles.zoneSubtitle}>
          {isActive ? "Release to drop" : "Drag items here"}
        </Text>
      </Animated.View>
    </Droppable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    padding: 16,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  idleDot: {
    backgroundColor: "#8E8E93",
  },
  draggingDot: {
    backgroundColor: "#58a6ff",
  },
  successDot: {
    backgroundColor: "#32d74b",
  },
  errorDot: {
    backgroundColor: "#ff453a",
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  draggableContainer: {
    alignSelf: "center",
    marginBottom: 40,
  },
  draggable: {
    width: 120,
    height: 120,
    backgroundColor: "#a2d2ff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  draggableText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  dragHint: {
    color: "#333333",
    fontSize: 12,
  },
  dropZonesContainer: {
    flex: 1,
    gap: 20,
  },
  dropZone: {
    height: 120,
    borderRadius: 16,
    borderColor: "#58a6ff",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  zoneTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  zoneSubtitle: {
    color: "#8E8E93",
    fontSize: 14,
    textAlign: "center",
  },
});
```

## Feedback Types

### Drag State Feedback

```tsx
function DragStateFeedback({ isDragging }) {
  return (
    <View
      style={[styles.dragIndicator, isDragging && styles.activeDragIndicator]}
    >
      <Text style={styles.indicatorText}>
        {isDragging ? "Dragging..." : "Ready"}
      </Text>
    </View>
  );
}
```

### Drop Zone Highlighting

```tsx
function HighlightDropZone({ isActive, canDrop }) {
  const borderColor = canDrop ? "#32d74b" : "#ff453a";

  return (
    <View
      style={[styles.dropZone, isActive && { borderColor, borderWidth: 3 }]}
    >
      {/* Zone content */}
    </View>
  );
}
```

### Success/Error Animations

```tsx
function FeedbackAnimation({ type }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    if (type === "success") {
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withSpring(1)
      );
    } else if (type === "error") {
      scale.value = withSequence(
        withTiming(0.9, { duration: 100 }),
        withTiming(1.1, { duration: 100 }),
        withSpring(1)
      );
    }
  }, [type]);

  return (
    <Animated.View style={[styles.feedback, animatedStyle]}>
      <Text style={styles.feedbackText}>
        {type === "success" ? "✅" : "❌"}
      </Text>
    </Animated.View>
  );
}
```

## Advanced Feedback Patterns

### Proximity Feedback

```tsx
function ProximityFeedback({ distance, threshold = 50 }) {
  const intensity = Math.max(0, 1 - distance / threshold);

  return (
    <View
      style={[
        styles.proximityIndicator,
        { opacity: intensity, transform: [{ scale: 0.8 + intensity * 0.2 }] },
      ]}
    >
      <Text style={styles.proximityText}>Drop Zone Near</Text>
    </View>
  );
}
```

### Directional Indicators

```tsx
function DirectionalIndicator({ direction }) {
  const arrows = {
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
  };

  return (
    <View style={styles.directionIndicator}>
      <Text style={styles.directionArrow}>{arrows[direction]}</Text>
    </View>
  );
}
```

### Progress Feedback

```tsx
function ProgressFeedback({ progress }) {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
}
```

## Accessibility Features

### Screen Reader Support

```tsx
<Draggable
  data={itemData}
  accessibilityLabel="Draggable item"
  accessibilityHint="Double tap and hold to drag"
  accessibilityRole="button"
>
  {/* Content */}
</Draggable>
```

### High Contrast Mode

```tsx
function AccessibleDropZone({ isHighContrast }) {
  return (
    <View style={[styles.dropZone, isHighContrast && styles.highContrastZone]}>
      {/* Zone content */}
    </View>
  );
}
```

### Haptic Feedback

```tsx
import { HapticFeedback } from "react-native";

function HapticDraggable({ data }) {
  const handleDragStart = () => {
    HapticFeedback.trigger("impactLight");
  };

  const handleDrop = () => {
    HapticFeedback.trigger("notificationSuccess");
  };

  return (
    <Draggable data={data} onDragStart={handleDragStart} onDrop={handleDrop}>
      {/* Content */}
    </Draggable>
  );
}
```

## Performance Considerations

### Optimized Animations

```tsx
// Use worklets for better performance
const animatedStyle = useAnimatedStyle(() => {
  "worklet";
  return {
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  };
}, []);
```

### Debounced Feedback

```tsx
const debouncedFeedback = useMemo(
  () => debounce((state) => setFeedbackState(state), 100),
  []
);
```

## Common Use Cases

- **File Uploads**: Progress indicators and success/error states
- **Form Builders**: Field placement feedback
- **Games**: Interactive element responses
- **Data Visualization**: Chart manipulation feedback
- **E-commerce**: Shopping cart interactions

## Best Practices

1. **Immediate Response**: Provide instant visual feedback
2. **Clear States**: Use distinct visual states for different actions
3. **Smooth Transitions**: Avoid jarring state changes
4. **Accessibility**: Support screen readers and high contrast
5. **Performance**: Optimize animations for 60fps

## Next Steps

- Explore [Custom Animations](./custom-animations) for advanced effects
- Learn about [Collision Detection](./collision-detection) for precise feedback
- Check out [Drop Zones](./drop-zones) for zone-specific feedback
