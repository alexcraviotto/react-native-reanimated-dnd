# Axis Constraints

Restrict dragging to specific axes for controlled directional movement.

## Overview

Axis constraints limit draggable items to move only along specific directions (horizontal or vertical). This example demonstrates:

- Horizontal-only dragging
- Vertical-only dragging  
- Free movement (both axes)
- Dynamic axis switching

## Key Features

- **Directional Control**: Lock movement to X or Y axis
- **Dynamic Switching**: Change constraints during interaction
- **Visual Guides**: Show allowed movement directions
- **Smooth Interactions**: Natural feel within constraints

## Basic Implementation

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DropProvider, Draggable } from 'react-native-reanimated-dnd';

export function AxisConstraintsExample() {
  const [constraint, setConstraint] = useState<'x' | 'y' | 'both'>('x');

  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Axis Constraints</Text>
          
          {/* Constraint Controls */}
          <View style={styles.controlsContainer}>
            {['x', 'y', 'both'].map((axis) => (
              <TouchableOpacity
                key={axis}
                style={[
                  styles.controlButton,
                  constraint === axis && styles.activeButton
                ]}
                onPress={() => setConstraint(axis as any)}
              >
                <Text style={[
                  styles.controlText,
                  constraint === axis && styles.activeText
                ]}>
                  {axis === 'x' ? 'Horizontal' : axis === 'y' ? 'Vertical' : 'Free'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Drag Area */}
          <View style={styles.dragArea}>
            <Text style={styles.areaLabel}>Drag Area</Text>
            
            {/* Constraint Guides */}
            {constraint === 'x' && <View style={styles.horizontalGuide} />}
            {constraint === 'y' && <View style={styles.verticalGuide} />}
            
            {/* Constrained Draggable */}
            <Draggable
              data={{ id: 'constrained-item', constraint }}
              dragAxis={constraint}
              style={styles.draggable}
            >
              <View style={styles.draggableContent}>
                <Text style={styles.draggableText}>Drag Me</Text>
                <Text style={styles.constraintText}>
                  {constraint === 'x' ? '← →' : constraint === 'y' ? '↑ ↓' : '↗'}
                </Text>
              </View>
            </Draggable>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Current constraint: {constraint === 'x' ? 'Horizontal only' : 
                                 constraint === 'y' ? 'Vertical only' : 'No constraints'}
            </Text>
          </View>
        </View>
      </DropProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 12,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeButton: {
    backgroundColor: '#58a6ff',
    borderColor: '#58a6ff',
  },
  controlText: {
    color: '#8E8E93',
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: '#FFFFFF',
  },
  dragArea: {
    height: 300,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#333333',
    marginBottom: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaLabel: {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: '#000000',
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  horizontalGuide: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: '#58a6ff',
    opacity: 0.5,
  },
  verticalGuide: {
    position: 'absolute',
    left: '50%',
    top: 20,
    bottom: 20,
    width: 2,
    backgroundColor: '#58a6ff',
    opacity: 0.5,
  },
  draggable: {
    position: 'absolute',
  },
  draggableContent: {
    width: 80,
    height: 80,
    backgroundColor: '#a2d2ff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  draggableText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  constraintText: {
    color: '#333333',
    fontSize: 16,
    marginTop: 4,
  },
  infoContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#58a6ff',
  },
  infoText: {
    color: '#8E8E93',
    fontSize: 14,
    lineHeight: 20,
  },
});
```

## Constraint Types

### Horizontal Constraint

```tsx
<Draggable
  data={itemData}
  dragAxis="x"
>
  {/* Can only move left and right */}
</Draggable>
```

### Vertical Constraint

```tsx
<Draggable
  data={itemData}
  dragAxis="y"
>
  {/* Can only move up and down */}
</Draggable>
```

### Free Movement

```tsx
<Draggable
  data={itemData}
  dragAxis="both"
>
  {/* Can move in any direction (default) */}
</Draggable>
```

## Advanced Examples

### Dynamic Constraint Switching

```tsx
function DynamicConstraintDraggable() {
  const [constraint, setConstraint] = useState<'x' | 'y' | 'both'>('x');

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        {['x', 'y', 'both'].map((axis) => (
          <TouchableOpacity
            key={axis}
            onPress={() => setConstraint(axis as any)}
            style={[
              styles.controlButton,
              constraint === axis && styles.activeButton
            ]}
          >
            <Text>{axis}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Draggable
        data={itemData}
        dragAxis={constraint}
      >
        <View style={styles.draggableItem}>
          <Text>Constraint: {constraint}</Text>
        </View>
      </Draggable>
    </View>
  );
}
```

### Conditional Constraints

```tsx
function ConditionalConstraintDraggable({ isLocked }) {
  return (
    <Draggable
      data={itemData}
      dragAxis={isLocked ? 'x' : 'both'}
    >
      <View style={styles.draggableItem}>
        <Text>{isLocked ? 'Horizontal Only' : 'Free Movement'}</Text>
      </View>
    </Draggable>
  );
}
```

### Slider Components

```tsx
function HorizontalSlider({ value, onValueChange }) {
  return (
    <View style={styles.sliderContainer}>
      <Draggable
        data={{ value }}
        dragAxis="x"
        onDragging={({ x, tx }) => {
          // Calculate new value based on position
          const newValue = calculateValueFromPosition(x + tx);
          onValueChange(newValue);
        }}
      >
        <View style={styles.sliderThumb}>
          <Text>{value}</Text>
        </View>
      </Draggable>
    </View>
  );
}

function VerticalSlider({ value, onValueChange }) {
  return (
    <View style={styles.sliderContainer}>
      <Draggable
        data={{ value }}
        dragAxis="y"
        onDragging={({ y, ty }) => {
          // Calculate new value based on position
          const newValue = calculateValueFromPosition(y + ty);
          onValueChange(newValue);
        }}
      >
        <View style={styles.sliderThumb}>
          <Text>{value}</Text>
        </View>
      </Draggable>
    </View>
  );
}
```

## Common Use Cases

- **Sliders**: Horizontal or vertical value controls
- **Resizing**: Constrain resize handles to specific directions
- **Scrolling**: Lock scroll direction in custom scroll views
- **Games**: Restrict character movement to specific paths
- **Form Controls**: Directional input components

## Best Practices

1. **Visual Feedback**: Show constraint guides clearly to indicate allowed movement
2. **Consistent Behavior**: Use the same constraint patterns throughout your app
3. **User Control**: Allow users to change constraints when appropriate
4. **Accessibility**: Provide clear labels for constraint states
5. **Performance**: Axis constraints can improve performance by reducing calculations

## Limitations

- **Library Constraints**: Only supports 'x', 'y', and 'both' axis constraints
- **No Custom Angles**: The library doesn't support diagonal or custom angle constraints
- **No Snap-to-Axis**: Automatic snapping functionality is not built-in

## Next Steps

- Explore [Bounded Dragging](./bounded-dragging) for area constraints
- Learn about [Custom Animations](./custom-animations) for constraint feedback
- Check out [Sortable Lists](./sortable-lists) for ordered arrangements
