# Bounded Dragging

Constrain draggable items within specific boundaries for controlled movement.

## Overview

Bounded dragging restricts the movement of draggable items to specific areas or boundaries. This example demonstrates how to implement boundaries using the library's existing features and custom logic.

## Key Features

- **Boundary Constraints**: Keep items within defined areas
- **Visual Boundaries**: Clear indication of allowed movement areas
- **Flexible Boundaries**: Rectangular, circular, or custom shapes
- **Real-time Feedback**: Visual cues when approaching boundaries
- **Smooth Interactions**: Natural feel within constraints

## Basic Implementation

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DropProvider, Draggable, Droppable } from 'react-native-reanimated-dnd';

interface BoundedItemData {
  id: string;
  label: string;
  color: string;
}

export function BoundedDraggingExample() {
  const [items] = useState<BoundedItemData[]>([
    { id: '1', label: 'Bounded Item 1', color: '#ff6b6b' },
    { id: '2', label: 'Bounded Item 2', color: '#4ecdc4' },
  ]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Bounded Dragging</Text>
          <Text style={styles.subtitle}>
            Items are constrained within the boundary areas
          </Text>

          {/* Boundary Area */}
          <View style={styles.boundaryContainer}>
            <Text style={styles.boundaryTitle}>Drag Boundary</Text>
            <View style={styles.boundary}>
              {/* Draggable items within boundary */}
              <Draggable<BoundedItemData>
                data={items[0]}
                style={[styles.draggable, { backgroundColor: items[0].color }]}
                onDragging={({ x, y, tx, ty }) => {
                  // Custom boundary logic can be implemented here
                  console.log(`Item at position: ${x + tx}, ${y + ty}`);
                }}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemLabel}>{items[0].label}</Text>
                  <Text style={styles.itemHint}>Drag within bounds</Text>
                </View>
              </Draggable>

              <Draggable<BoundedItemData>
                data={items[1]}
                style={[styles.draggable, { backgroundColor: items[1].color }]}
                onDragging={({ x, y, tx, ty }) => {
                  console.log(`Item at position: ${x + tx}, ${y + ty}`);
                }}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemLabel}>{items[1].label}</Text>
                  <Text style={styles.itemHint}>Stay in boundary</Text>
                </View>
              </Draggable>
            </View>
          </View>

          {/* Drop Zone Outside Boundary */}
          <View style={styles.dropZoneArea}>
            <Droppable<BoundedItemData>
              droppableId="outside-boundary"
              onDrop={(data) => console.log(`${data.label} dropped outside boundary`)}
              style={styles.dropZone}
              activeStyle={styles.activeDropZone}
            >
              <Text style={styles.dropZoneText}>Drop Zone</Text>
              <Text style={styles.dropZoneSubtext}>Outside boundary</Text>
            </Droppable>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Boundary Implementation:</Text>
            <Text style={styles.infoText}>
              • Use container views to define visual boundaries{'\n'}
              • Implement custom logic in onDragging callbacks{'\n'}
              • Combine with drop zones for controlled interactions{'\n'}
              • Style boundaries to provide clear visual feedback
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  boundaryContainer: {
    marginBottom: 40,
  },
  boundaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  boundary: {
    height: 300,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#58a6ff',
    borderStyle: 'dashed',
    padding: 20,
    position: 'relative',
  },
  draggable: {
    width: 120,
    height: 80,
    borderRadius: 12,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  itemHint: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  dropZoneArea: {
    alignItems: 'center',
    marginBottom: 30,
  },
  dropZone: {
    width: '60%',
    height: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#3fb950',
    backgroundColor: 'rgba(63, 185, 80, 0.08)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  activeDropZone: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ scale: 1.02 }],
  },
  dropZoneText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  dropZoneSubtext: {
    fontSize: 12,
    color: '#8E8E93',
  },
  infoContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#58a6ff',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
});
```

## Implementation Approaches

### Container-Based Boundaries

Use container views to define visual and logical boundaries:

```tsx
function ContainerBoundary() {
  return (
    <View style={styles.boundaryContainer}>
      <View style={styles.boundary}>
        <Draggable data={itemData}>
          <View style={styles.draggableItem}>
            <Text>Bounded Item</Text>
          </View>
        </Draggable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boundaryContainer: {
    padding: 20,
  },
  boundary: {
    width: 300,
    height: 200,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    position: 'relative',
  },
});
```

### Custom Boundary Logic

Implement boundary checking in drag callbacks:

```tsx
function CustomBoundaryDraggable({ data, boundaryRect }) {
  const handleDragging = ({ x, y, tx, ty }) => {
    const newX = x + tx;
    const newY = y + ty;
    
    // Check if within bounds
    const withinBounds = (
      newX >= boundaryRect.left &&
      newX <= boundaryRect.right &&
      newY >= boundaryRect.top &&
      newY <= boundaryRect.bottom
    );
    
    if (!withinBounds) {
      console.log('Item approaching boundary');
      // Could implement haptic feedback or visual warnings
    }
  };

  return (
    <Draggable
      data={data}
      onDragging={handleDragging}
    >
      <View style={styles.item}>
        <Text>Bounded Item</Text>
      </View>
    </Draggable>
  );
}
```

### Drop Zone Boundaries

Use drop zones to define allowed areas:

```tsx
function DropZoneBoundary() {
  return (
    <View style={styles.container}>
      {/* Allowed area */}
      <Droppable
        droppableId="allowed-area"
        onDrop={(data) => console.log('Dropped in allowed area')}
        style={styles.allowedZone}
      >
        <Text>Allowed Drop Area</Text>
        
        <Draggable data={itemData}>
          <View style={styles.draggableItem}>
            <Text>Drag me within this zone</Text>
          </View>
        </Draggable>
      </Droppable>
      
      {/* Restricted area */}
      <View style={styles.restrictedZone}>
        <Text>Restricted Area</Text>
      </View>
    </View>
  );
}
```

## Boundary Types

### Rectangular Boundaries

```tsx
const rectangularBoundary = {
  left: 50,
  top: 100,
  right: 350,
  bottom: 400,
};

function RectangularBoundary() {
  return (
    <View style={[styles.boundary, {
      left: rectangularBoundary.left,
      top: rectangularBoundary.top,
      width: rectangularBoundary.right - rectangularBoundary.left,
      height: rectangularBoundary.bottom - rectangularBoundary.top,
    }]}>
      <Draggable data={itemData}>
        <View style={styles.item}>
          <Text>Rectangular Boundary</Text>
        </View>
      </Draggable>
    </View>
  );
}
```

### Circular Boundaries

```tsx
function CircularBoundary() {
  const centerX = 200;
  const centerY = 200;
  const radius = 100;

  const handleDragging = ({ x, y, tx, ty }) => {
    const newX = x + tx;
    const newY = y + ty;
    
    // Calculate distance from center
    const distance = Math.sqrt(
      Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
    );
    
    if (distance > radius) {
      console.log('Item outside circular boundary');
    }
  };

  return (
    <View style={styles.circularContainer}>
      <View style={[styles.circularBoundary, {
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        left: centerX - radius,
        top: centerY - radius,
      }]}>
        <Draggable
          data={itemData}
          onDragging={handleDragging}
        >
          <View style={styles.item}>
            <Text>Circular Boundary</Text>
          </View>
        </Draggable>
      </View>
    </View>
  );
}
```

### Multiple Boundaries

```tsx
function MultipleBoundaries() {
  const boundaries = [
    { id: 'zone1', x: 50, y: 50, width: 150, height: 100, color: '#ff6b6b' },
    { id: 'zone2', x: 220, y: 50, width: 150, height: 100, color: '#4ecdc4' },
    { id: 'zone3', x: 135, y: 170, width: 150, height: 100, color: '#45b7d1' },
  ];

  return (
    <View style={styles.multiContainer}>
      {boundaries.map((boundary) => (
        <View
          key={boundary.id}
          style={[
            styles.boundary,
            {
              left: boundary.x,
              top: boundary.y,
              width: boundary.width,
              height: boundary.height,
              borderColor: boundary.color,
            },
          ]}
        >
          <Draggable data={{ id: boundary.id, zone: boundary.id }}>
            <View style={[styles.item, { backgroundColor: boundary.color }]}>
              <Text style={styles.itemText}>{boundary.id}</Text>
            </View>
          </Draggable>
        </View>
      ))}
    </View>
  );
}
```

## Visual Feedback

### Boundary Indicators

```tsx
function BoundaryWithIndicators() {
  const [isNearBoundary, setIsNearBoundary] = useState(false);

  const handleDragging = ({ x, y, tx, ty }) => {
    const newX = x + tx;
    const newY = y + ty;
    
    // Check proximity to boundary
    const threshold = 20;
    const nearBoundary = (
      newX < threshold || 
      newY < threshold || 
      newX > (300 - threshold) || 
      newY > (200 - threshold)
    );
    
    setIsNearBoundary(nearBoundary);
  };

  return (
    <View style={[
      styles.boundary,
      isNearBoundary && styles.boundaryWarning
    ]}>
      <Draggable
        data={itemData}
        onDragging={handleDragging}
        onDragEnd={() => setIsNearBoundary(false)}
      >
        <View style={[
          styles.item,
          isNearBoundary && styles.itemWarning
        ]}>
          <Text>Boundary Aware Item</Text>
        </View>
      </Draggable>
    </View>
  );
}

const styles = StyleSheet.create({
  boundaryWarning: {
    borderColor: '#ff4444',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  itemWarning: {
    backgroundColor: '#ff4444',
  },
});
```

### Gradient Boundaries

```tsx
function GradientBoundary() {
  return (
    <LinearGradient
      colors={['rgba(0,122,255,0.1)', 'rgba(0,122,255,0.3)']}
      style={styles.gradientBoundary}
    >
      <Draggable data={itemData}>
        <View style={styles.item}>
          <Text>Gradient Boundary</Text>
        </View>
      </Draggable>
    </LinearGradient>
  );
}
```

## Common Use Cases

### Game Boards

```tsx
function GameBoard() {
  const boardSize = 8;
  const cellSize = 40;

  return (
    <View style={styles.gameBoard}>
      {Array.from({ length: boardSize * boardSize }).map((_, index) => {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        
        return (
          <View
            key={index}
            style={[
              styles.gameCell,
              {
                left: col * cellSize,
                top: row * cellSize,
                width: cellSize,
                height: cellSize,
              },
            ]}
          >
            {/* Game pieces can be dragged within board */}
          </View>
        );
      })}
    </View>
  );
}
```

### Drawing Canvas

```tsx
function DrawingCanvas() {
  return (
    <View style={styles.canvas}>
      <Draggable data={{ type: 'drawing-tool' }}>
        <View style={styles.drawingTool}>
          <Text>Drawing Tool</Text>
        </View>
      </Draggable>
    </View>
  );
}
```

## Best Practices

1. **Clear Visual Boundaries**: Make boundaries obvious to users
2. **Smooth Interactions**: Ensure dragging feels natural within bounds
3. **Feedback**: Provide immediate feedback when approaching limits
4. **Performance**: Optimize boundary calculations for smooth performance
5. **Accessibility**: Ensure boundary constraints are communicated to screen readers

## Limitations

- **Library Constraints**: The library doesn't have built-in boundary props
- **Custom Implementation**: Requires custom logic for boundary enforcement
- **Performance**: Complex boundary calculations may impact performance
- **Platform Differences**: Boundary behavior may vary across platforms

## Next Steps

- Learn about [Axis Constraints](./axis-constraints) for directional limitations
- Explore [Drop Zones](./drop-zones) for area-based interactions
- Check out [Visual Feedback](./visual-feedback) for enhanced boundary indicators
