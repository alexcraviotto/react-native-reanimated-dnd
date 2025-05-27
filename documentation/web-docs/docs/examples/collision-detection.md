# Collision Detection

Configure how draggable items detect collisions with drop zones using different algorithms.

## Overview

Collision detection determines when a draggable item is considered to be "over" a drop zone. The library provides three built-in algorithms to suit different use cases:

- **intersect**: Any overlap between draggable and droppable (default)
- **center**: Center point of draggable must be over droppable
- **contain**: Entire draggable must be within droppable bounds

## Key Features

- **Multiple Algorithms**: Choose the best detection method for your use case
- **Visual Feedback**: Clear indication when collision is detected
- **Performance Optimized**: Efficient calculations for smooth interactions
- **Customizable**: Per-draggable configuration options
- **Real-time Updates**: Immediate feedback during drag operations

## Basic Implementation

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DropProvider, Draggable, Droppable } from 'react-native-reanimated-dnd';

interface DraggableItemData {
  id: string;
  label: string;
  color: string;
}

export function CollisionDetectionExample() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const items: DraggableItemData[] = [
    { id: '1', label: 'Center', color: '#ff6b6b' },
    { id: '2', label: 'Intersect', color: '#4ecdc4' },
    { id: '3', label: 'Contain', color: '#45b7d1' },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Collision Detection</Text>
          <Text style={styles.subtitle}>
            Different algorithms for detecting when items are over drop zones
          </Text>

          {/* Drop Zones */}
          <View style={styles.dropZonesContainer}>
            <Droppable<DraggableItemData>
              droppableId="center-zone"
              onDrop={(data) => console.log(`${data.label} dropped on center zone`)}
              onActiveChange={(isActive) => setActiveZone(isActive ? 'center-zone' : null)}
              style={[
                styles.dropZone,
                styles.centerZone,
                activeZone === 'center-zone' && styles.activeZone
              ]}
            >
              <Text style={styles.zoneTitle}>Center Detection</Text>
              <Text style={styles.zoneDescription}>
                Center point must be over zone
              </Text>
            </Droppable>

            <Droppable<DraggableItemData>
              droppableId="intersect-zone"
              onDrop={(data) => console.log(`${data.label} dropped on intersect zone`)}
              onActiveChange={(isActive) => setActiveZone(isActive ? 'intersect-zone' : null)}
              style={[
                styles.dropZone,
                styles.intersectZone,
                activeZone === 'intersect-zone' && styles.activeZone
              ]}
            >
              <Text style={styles.zoneTitle}>Intersect Detection</Text>
              <Text style={styles.zoneDescription}>
                Any overlap triggers detection
              </Text>
            </Droppable>

            <Droppable<DraggableItemData>
              droppableId="contain-zone"
              onDrop={(data) => console.log(`${data.label} dropped on contain zone`)}
              onActiveChange={(isActive) => setActiveZone(isActive ? 'contain-zone' : null)}
              style={[
                styles.dropZone,
                styles.containZone,
                activeZone === 'contain-zone' && styles.activeZone
              ]}
            >
              <Text style={styles.zoneTitle}>Contain Detection</Text>
              <Text style={styles.zoneDescription}>
                Entire item must be inside zone
              </Text>
            </Droppable>
          </View>

          {/* Draggable Items */}
          <View style={styles.draggableItemsArea}>
            <Draggable<DraggableItemData>
              data={items[0]}
              collisionAlgorithm="center"
              style={[styles.draggable, { backgroundColor: items[0].color }]}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>{items[0].label}</Text>
                <Text style={styles.itemHint}>Center detection</Text>
              </View>
            </Draggable>

            <Draggable<DraggableItemData>
              data={items[1]}
              collisionAlgorithm="intersect"
              style={[styles.draggable, { backgroundColor: items[1].color }]}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>{items[1].label}</Text>
                <Text style={styles.itemHint}>Intersect detection</Text>
              </View>
            </Draggable>

            <Draggable<DraggableItemData>
              data={items[2]}
              collisionAlgorithm="contain"
              style={[styles.draggable, { backgroundColor: items[2].color }]}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>{items[2].label}</Text>
                <Text style={styles.itemHint}>Contain detection</Text>
              </View>
            </Draggable>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>How it works:</Text>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#ff6b6b' }]} />
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Center:</Text> Precise targeting, center point must be over zone
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#4ecdc4' }]} />
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Intersect:</Text> Easy dropping, any overlap triggers detection
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#45b7d1' }]} />
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Contain:</Text> Strict placement, entire item must fit inside
              </Text>
            </View>
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
  dropZonesContainer: {
    gap: 16,
    marginBottom: 40,
  },
  dropZone: {
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  centerZone: {
    borderColor: '#ff6b6b',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  intersectZone: {
    borderColor: '#4ecdc4',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  containZone: {
    borderColor: '#45b7d1',
    backgroundColor: 'rgba(69, 183, 209, 0.1)',
  },
  activeZone: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ scale: 1.02 }],
  },
  zoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  zoneDescription: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  draggableItemsArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    gap: 12,
  },
  draggable: {
    width: 100,
    height: 80,
    borderRadius: 12,
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
    marginBottom: 2,
  },
  itemHint: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
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
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  infoIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
```

## Collision Algorithms

### Center Detection

The center point of the draggable must be over the droppable:

```tsx
<Draggable
  data={itemData}
  collisionAlgorithm="center"
>
  {/* Content */}
</Draggable>
```

**Use cases:**
- Precise targeting required
- Small drop zones
- Grid-based layouts
- Slot-based interfaces

### Intersect Detection (Default)

Any overlap between draggable and droppable triggers detection:

```tsx
<Draggable
  data={itemData}
  collisionAlgorithm="intersect"
>
  {/* Content */}
</Draggable>
```

**Use cases:**
- General drag and drop
- Large drop zones
- User-friendly interactions
- File management

### Contain Detection

The entire draggable must be within the droppable bounds:

```tsx
<Draggable
  data={itemData}
  collisionAlgorithm="contain"
>
  {/* Content */}
</Draggable>
```

**Use cases:**
- Strict placement requirements
- Container-based layouts
- Puzzle games
- Form validation

## Advanced Examples

### Mixed Algorithm Interface

```tsx
function MixedAlgorithmExample() {
  return (
    <DropProvider>
      <View style={styles.container}>
        {/* Precise targeting zone */}
        <Droppable droppableId="precise-zone">
          <Text>Precise Zone (use center algorithm)</Text>
        </Droppable>

        {/* Easy drop zone */}
        <Droppable droppableId="easy-zone">
          <Text>Easy Zone (use intersect algorithm)</Text>
        </Droppable>

        {/* Strict placement zone */}
        <Droppable droppableId="strict-zone">
          <Text>Strict Zone (use contain algorithm)</Text>
        </Droppable>

        {/* Items with different algorithms */}
        <Draggable data={{ id: '1' }} collisionAlgorithm="center">
          <Text>Precise Item</Text>
        </Draggable>

        <Draggable data={{ id: '2' }} collisionAlgorithm="intersect">
          <Text>Easy Item</Text>
        </Draggable>

        <Draggable data={{ id: '3' }} collisionAlgorithm="contain">
          <Text>Strict Item</Text>
        </Draggable>
      </View>
    </DropProvider>
  );
}
```

### Dynamic Algorithm Switching

```tsx
function DynamicAlgorithmExample() {
  const [algorithm, setAlgorithm] = useState<'center' | 'intersect' | 'contain'>('intersect');
  const [precision, setPrecision] = useState('normal');

  const getAlgorithm = () => {
    switch (precision) {
      case 'high': return 'center';
      case 'low': return 'intersect';
      case 'strict': return 'contain';
      default: return 'intersect';
    }
  };

  return (
    <DropProvider>
      <View style={styles.container}>
        <View style={styles.controls}>
          <Text>Precision:</Text>
          {['high', 'normal', 'low', 'strict'].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setPrecision(level)}
              style={[
                styles.button,
                precision === level && styles.activeButton
              ]}
            >
              <Text>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Draggable
          data={{ id: 'dynamic' }}
          collisionAlgorithm={getAlgorithm()}
        >
          <Text>Dynamic Algorithm Item</Text>
        </Draggable>
      </View>
    </DropProvider>
  );
}
```

## Visual Feedback Patterns

### Algorithm-Specific Feedback

```tsx
function AlgorithmFeedback({ algorithm, isActive }) {
  const getFeedbackStyle = () => {
    const baseStyle = styles.dropZone;
    
    if (!isActive) return baseStyle;
    
    switch (algorithm) {
      case 'center':
        return [baseStyle, styles.centerActive];
      case 'intersect':
        return [baseStyle, styles.intersectActive];
      case 'contain':
        return [baseStyle, styles.containActive];
      default:
        return baseStyle;
    }
  };

  return (
    <View style={getFeedbackStyle()}>
      <Text>{algorithm} detection</Text>
      {isActive && <Text>✓ Collision detected</Text>}
    </View>
  );
}
```

### Real-time Collision Indicator

```tsx
function CollisionIndicator({ draggableId, droppableId, algorithm }) {
  const [isColliding, setIsColliding] = useState(false);

  return (
    <View style={styles.indicator}>
      <Text>Algorithm: {algorithm}</Text>
      <View style={[
        styles.status,
        isColliding ? styles.colliding : styles.notColliding
      ]}>
        <Text>{isColliding ? 'Colliding' : 'Not Colliding'}</Text>
      </View>
    </View>
  );
}
```

## Performance Considerations

### Optimizing Collision Detection

```tsx
// Use appropriate algorithm for your use case
const getOptimalAlgorithm = (useCase: string) => {
  switch (useCase) {
    case 'file-manager':
      return 'intersect'; // Easy dropping
    case 'grid-layout':
      return 'center'; // Precise placement
    case 'container-puzzle':
      return 'contain'; // Strict fitting
    default:
      return 'intersect';
  }
};

// Minimize collision checks for better performance
<Draggable
  data={itemData}
  collisionAlgorithm={getOptimalAlgorithm('file-manager')}
  // Other optimizations handled by library
>
  {/* Content */}
</Draggable>
```

## Common Use Cases

### File Management

```tsx
// Easy file dropping with intersect
<Draggable collisionAlgorithm="intersect">
  <FileIcon />
</Draggable>
```

### Grid Layouts

```tsx
// Precise grid placement with center
<Draggable collisionAlgorithm="center">
  <GridItem />
</Draggable>
```

### Container Interfaces

```tsx
// Strict container fitting with contain
<Draggable collisionAlgorithm="contain">
  <ContainerItem />
</Draggable>
```

## Best Practices

1. **Choose Appropriate Algorithm**: Match algorithm to use case requirements
2. **Provide Visual Feedback**: Show users when collision is detected
3. **Consider User Experience**: Balance precision with ease of use
4. **Test Different Scenarios**: Verify behavior with various item sizes
5. **Performance Optimization**: Use the most efficient algorithm for your needs

## Troubleshooting

### Common Issues

**Collision not detected:**
- Check if algorithm matches your expectations
- Verify drop zone size is appropriate
- Ensure proper positioning

**Too sensitive/not sensitive enough:**
- Switch between algorithms
- Adjust drop zone sizes
- Consider user feedback

**Performance issues:**
- Use simpler algorithms when possible
- Optimize component re-renders
- Check for unnecessary calculations

## Next Steps

- Learn about [Drop Zones](./drop-zones) for advanced zone configurations
- Explore [Visual Feedback](./visual-feedback) for better user experience
- Check out [Custom Animations](./custom-animations) for collision feedback
