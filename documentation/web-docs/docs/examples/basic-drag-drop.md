---
sidebar_position: 1
---

# Basic Drag & Drop

Simple drag and drop functionality with multiple drop zones.

## Overview

This example demonstrates the fundamental drag and drop interactions using the library's core components. You'll learn how to:

- Create draggable items with data payloads
- Set up drop zones that respond to draggable items
- Handle drop events and access dropped data
- Apply basic styling and visual feedback

## Key Features

- **Simple Setup**: Minimal configuration required
- **Data Transfer**: Pass data from draggable to drop handler
- **Visual Feedback**: Built-in hover states and animations
- **Event Handling**: Callbacks for drag start, end, and drop events
- **Flexible Styling**: Customizable appearance for all components

## Basic Implementation

```tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DropProvider, Draggable, Droppable } from 'react-native-reanimated-dnd';

interface DraggableItemData {
  id: string;
  label: string;
  backgroundColor: string;
}

export function BasicDragDropExample() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Basic Drag & Drop</Text>
          <Text style={styles.subtitle}>
            Drag the items to different zones to see basic interactions
          </Text>

          {/* Drop Zones */}
          <View style={styles.dropZoneArea}>
            <Droppable<DraggableItemData>
              droppableId="zone-alpha"
              onDrop={(data) =>
                Alert.alert('Drop!', `"${data.label}" dropped on Zone Alpha`)
              }
              style={styles.dropZone}
              activeStyle={styles.activeDropZone}
            >
              <Text style={styles.dropZoneText}>Zone Alpha</Text>
              <Text style={styles.dropZoneSubtext}>Basic Drop Zone</Text>
            </Droppable>

            <Droppable<DraggableItemData>
              droppableId="zone-beta"
              onDrop={(data) =>
                Alert.alert('Drop!', `"${data.label}" dropped on Zone Beta`)
              }
              style={[styles.dropZone, styles.dropZoneBeta]}
              activeStyle={styles.activeDropZone}
            >
              <Text style={styles.dropZoneText}>Zone Beta</Text>
              <Text style={styles.dropZoneSubtext}>Another Drop Zone</Text>
            </Droppable>
          </View>

          {/* Draggable Items */}
          <View style={styles.draggableItemsArea}>
            <Draggable<DraggableItemData>
              data={{
                id: 'basic-item-1',
                label: 'Draggable Item 1',
                backgroundColor: '#a2d2ff',
              }}
              style={[styles.draggable, { backgroundColor: '#a2d2ff' }]}
              onDragStart={(data) => console.log('Started dragging:', data.label)}
              onDragEnd={(data) => console.log('Finished dragging:', data.label)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Item 1</Text>
                <Text style={styles.cardHint}>Drag me!</Text>
              </View>
            </Draggable>

            <Draggable<DraggableItemData>
              data={{
                id: 'basic-item-2',
                label: 'Draggable Item 2',
                backgroundColor: '#bde0fe',
              }}
              style={[styles.draggable, { backgroundColor: '#bde0fe' }]}
              onDragStart={(data) => console.log('Started dragging:', data.label)}
              onDragEnd={(data) => console.log('Finished dragging:', data.label)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Item 2</Text>
                <Text style={styles.cardHint}>Drag me too!</Text>
              </View>
            </Draggable>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#a2d2ff' }]} />
              <Text style={styles.infoText}>
                Basic draggable with default spring animation
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#bde0fe' }]} />
              <Text style={styles.infoText}>
                Standard drag and drop behavior with visual feedback
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
  dropZoneArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    gap: 16,
  },
  dropZone: {
    flex: 1,
    height: 120,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#58a6ff',
    backgroundColor: 'rgba(88, 166, 255, 0.08)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dropZoneBeta: {
    borderColor: '#3fb950',
    backgroundColor: 'rgba(63, 185, 80, 0.08)',
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
  draggableItemsArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    gap: 16,
  },
  draggable: {
    width: 140,
    height: 100,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  cardHint: {
    fontSize: 12,
    color: '#333333',
  },
  infoContainer: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  },
});
```

## Core Concepts

### DropProvider

The `DropProvider` component creates the context for drag and drop interactions:

```tsx
<DropProvider>
  {/* All draggable and droppable components go here */}
</DropProvider>
```

### Draggable Component

Create draggable items with data payloads:

```tsx
<Draggable
  data={{ id: '1', name: 'My Item', type: 'task' }}
  onDragStart={(data) => console.log('Drag started:', data)}
  onDragEnd={(data) => console.log('Drag ended:', data)}
>
  <View style={styles.item}>
    <Text>Drag me!</Text>
  </View>
</Draggable>
```

### Droppable Component

Create drop zones that respond to draggable items:

```tsx
<Droppable
  droppableId="my-drop-zone"
  onDrop={(data) => console.log('Item dropped:', data)}
  activeStyle={{ backgroundColor: 'rgba(0, 255, 0, 0.2)' }}
>
  <View style={styles.dropZone}>
    <Text>Drop items here</Text>
  </View>
</Droppable>
```

## Event Handling

### Drag Events

```tsx
<Draggable
  data={itemData}
  onDragStart={(data) => {
    console.log('Started dragging:', data.name);
    // Show visual feedback, haptic feedback, etc.
  }}
  onDragEnd={(data) => {
    console.log('Finished dragging:', data.name);
    // Clean up any temporary states
  }}
  onDragging={({ x, y, tx, ty, itemData }) => {
    console.log(`${itemData.name} is at position (${x + tx}, ${y + ty})`);
  }}
>
  {/* Content */}
</Draggable>
```

### Drop Events

```tsx
<Droppable
  onDrop={(data) => {
    console.log('Received item:', data);
    // Process the dropped item
    addItemToList(data);
  }}
  onActiveChange={(isActive) => {
    console.log('Drop zone active:', isActive);
    // Update UI based on hover state
  }}
>
  {/* Drop zone content */}
</Droppable>
```

## Styling and Visual Feedback

### Active States

```tsx
<Droppable
  activeStyle={{
    backgroundColor: 'rgba(88, 166, 255, 0.2)',
    borderColor: '#58a6ff',
    borderWidth: 2,
    transform: [{ scale: 1.05 }],
  }}
>
  {/* Content */}
</Droppable>
```

### Custom Animations

```tsx
<Draggable
  data={itemData}
  animationFunction={(toValue) => {
    'worklet';
    return withTiming(toValue, { duration: 300 });
  }}
>
  {/* Content */}
</Draggable>
```

## Common Use Cases

- **File Management**: Drag files to folders
- **Task Management**: Move tasks between columns
- **Image Galleries**: Organize photos
- **Form Builders**: Arrange form elements
- **Shopping**: Add items to cart

## Best Practices

1. **Wrap with GestureHandlerRootView**: Always wrap your app with `GestureHandlerRootView`
2. **Use DropProvider**: Ensure all drag/drop components are within a `DropProvider`
3. **Provide Visual Feedback**: Use `activeStyle` for clear drop zone indication
4. **Handle Events**: Use callbacks to update your app state appropriately
5. **Type Safety**: Use TypeScript generics for type-safe data transfer

## Next Steps

- Learn about [Drag Handles](./drag-handles) for more precise control
- Explore [Collision Detection](./collision-detection) for advanced targeting
- Check out [Custom Animations](./custom-animations) for enhanced visual effects
