# Drag Handles

Use specific areas within draggable items to initiate dragging for more precise control.

## Overview

Drag handles allow you to designate specific areas within a draggable component that can initiate dragging, while other areas remain non-interactive for dragging. This example demonstrates:

- Creating drag handles within draggable items
- Different handle styles and positions
- Full-item vs. partial-item dragging
- Real-world card layouts with handles

## Key Features

- **Precise Control**: Only designated areas can start dragging
- **Flexible Positioning**: Handles can be placed anywhere within the item
- **Visual Distinction**: Clear indication of draggable areas
- **Accessibility**: Better user experience for complex layouts
- **Nested Content**: Non-draggable content areas within draggable items

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

export function DragHandlesExample() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Drag Handles</Text>
          <Text style={styles.subtitle}>
            Only specific areas can initiate dragging
          </Text>

          {/* Drop Zone */}
          <View style={styles.dropZoneArea}>
            <Droppable<DraggableItemData>
              droppableId="handle-drop-zone"
              onDrop={(data) =>
                Alert.alert('Item Dropped', `"${data.label}" dropped in handle demo zone`)
              }
              style={styles.dropZone}
              activeStyle={styles.activeDropZone}
            >
              <Text style={styles.dropZoneText}>Drop Target</Text>
              <Text style={styles.dropZoneSubtext}>For handle examples</Text>
            </Droppable>
          </View>

          {/* Draggable Items with Different Handle Types */}
          <View style={styles.draggableItemsArea}>
            {/* Example 1: Entire item is a drag handle */}
            <Draggable<DraggableItemData>
              draggableId="handle-demo-item-1"
              data={{
                id: 'handle-demo-item-1',
                label: 'Full Handle Item',
                backgroundColor: '#2a9d8f',
              }}
              style={[styles.draggable, { backgroundColor: '#2a9d8f' }]}
            >
              <Draggable.Handle>
                <View style={styles.cardContent}>
                  <Text style={styles.cardLabel}>Fully Draggable</Text>
                  <Text style={styles.cardHint}>Drag from anywhere</Text>
                </View>
              </Draggable.Handle>
            </Draggable>

            {/* Example 2: Drag handle as part of the UI */}
            <Draggable<DraggableItemData>
              draggableId="handle-demo-item-2"
              data={{
                id: 'handle-demo-item-2',
                label: 'Handle-Only Item',
                backgroundColor: '#e9c46a',
              }}
              style={[styles.draggable, styles.handleOnlyDraggable]}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Handle-Only</Text>
                <Text style={styles.cardHint}>Drag from handle below</Text>

                {/* The handle is only part of the draggable */}
                <Draggable.Handle style={styles.dragHandle}>
                  <Text style={styles.handleText}>⬌ DRAG HERE ⬌</Text>
                </Draggable.Handle>
              </View>
            </Draggable>

            {/* Example 3: Real-world Card with Header as Handle */}
            <Draggable<DraggableItemData>
              draggableId="handle-demo-item-3"
              data={{
                id: 'handle-demo-item-3',
                label: 'Card with Header Handle',
                backgroundColor: '#606c38',
              }}
              style={styles.cardDraggable}
            >
              <View style={styles.cardWithHeader}>
                <Draggable.Handle style={styles.cardHeader}>
                  <Text style={styles.cardHeaderText}>Drag Card</Text>
                  <Text style={styles.cardHeaderIcon}>⬌</Text>
                </Draggable.Handle>

                <View style={styles.cardBody}>
                  <Text style={styles.cardBodyTitle}>Card Content</Text>
                  <Text style={styles.cardBodyText}>
                    This area is not draggable. Only the header can be used
                    to drag this card.
                  </Text>
                </View>
              </View>
            </Draggable>
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#2a9d8f' }]} />
              <Text style={styles.infoText}>
                Entire component as drag handle - drag from anywhere
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#e9c46a' }]} />
              <Text style={styles.infoText}>
                Specific handle area - only handle responds to drag
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#606c38' }]} />
              <Text style={styles.infoText}>
                Card with header handle - realistic UI pattern
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
    alignItems: 'center',
    marginBottom: 40,
  },
  dropZone: {
    width: '80%',
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
    gap: 20,
    marginBottom: 40,
  },
  draggable: {
    width: 160,
    height: 100,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignSelf: 'center',
  },
  handleOnlyDraggable: {
    backgroundColor: '#e9c46a',
    padding: 0,
  },
  cardDraggable: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: 'center',
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
    textAlign: 'center',
  },
  dragHandle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  handleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  cardWithHeader: {
    flex: 1,
  },
  cardHeader: {
    backgroundColor: '#606c38',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardHeaderIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  cardBody: {
    padding: 16,
  },
  cardBodyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  cardBodyText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
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

## Handle Types

### Full Item Handle

When you want the entire draggable area to be interactive:

```tsx
<Draggable data={itemData}>
  <Draggable.Handle>
    <View style={styles.fullDraggableItem}>
      <Text>Drag from anywhere on this item</Text>
    </View>
  </Draggable.Handle>
</Draggable>
```

### Partial Handle

When you want only specific areas to initiate dragging:

```tsx
<Draggable data={itemData}>
  <View style={styles.itemContainer}>
    <Text>This text is not draggable</Text>
    
    <Draggable.Handle style={styles.handle}>
      <Text>Only this area can drag</Text>
    </Draggable.Handle>
  </View>
</Draggable>
```

### Multiple Handles

You can have multiple handle areas within a single draggable:

```tsx
<Draggable data={itemData}>
  <View style={styles.complexItem}>
    <Draggable.Handle style={styles.topHandle}>
      <Text>Top Handle</Text>
    </Draggable.Handle>
    
    <View style={styles.content}>
      <Text>Non-draggable content</Text>
    </View>
    
    <Draggable.Handle style={styles.bottomHandle}>
      <Text>Bottom Handle</Text>
    </Draggable.Handle>
  </View>
</Draggable>
```

## Common Handle Patterns

### Icon Handle

```tsx
<Draggable.Handle style={styles.iconHandle}>
  <View style={styles.handleIcon}>
    <Text style={styles.handleDots}>⋮⋮</Text>
  </View>
</Draggable.Handle>
```

### Header Handle

```tsx
<Draggable data={cardData}>
  <View style={styles.card}>
    <Draggable.Handle style={styles.cardHeader}>
      <Text style={styles.headerTitle}>Card Title</Text>
      <Text style={styles.dragIcon}>⬌</Text>
    </Draggable.Handle>
    
    <View style={styles.cardContent}>
      <Text>Card content that's not draggable</Text>
    </View>
  </View>
</Draggable>
```

### Side Handle

```tsx
<Draggable data={itemData}>
  <View style={styles.itemWithSideHandle}>
    <Draggable.Handle style={styles.sideHandle}>
      <View style={styles.handleBar} />
    </Draggable.Handle>
    
    <View style={styles.itemContent}>
      <Text>Item content</Text>
    </View>
  </View>
</Draggable>
```

## Advanced Configurations

### Conditional Handles

```tsx
function ConditionalHandleDraggable({ isEditing, data }) {
  return (
    <Draggable data={data}>
      <View style={styles.item}>
        {isEditing ? (
          <Draggable.Handle style={styles.editHandle}>
            <Text>Drag to reorder</Text>
          </Draggable.Handle>
        ) : (
          <Text>View mode - not draggable</Text>
        )}
        
        <View style={styles.content}>
          <Text>{data.title}</Text>
        </View>
      </View>
    </Draggable>
  );
}
```

### Styled Handles

```tsx
const handleStyles = StyleSheet.create({
  modernHandle: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  minimalistHandle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
  },
  prominentHandle: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
```

## Best Practices

1. **Clear Visual Indication**: Make handles visually distinct from non-draggable areas
2. **Appropriate Size**: Ensure handles are large enough for easy interaction
3. **Consistent Placement**: Use consistent handle positions across similar items
4. **Accessibility**: Provide clear labels and hints for screen readers
5. **Touch Targets**: Follow platform guidelines for minimum touch target sizes

## Common Use Cases

- **List Items**: Reorderable lists with drag handles
- **Cards**: Draggable cards with header handles
- **File Managers**: Files with icon handles
- **Form Builders**: Form elements with side handles
- **Dashboards**: Widget cards with corner handles

## Next Steps

- Learn about [Sortable Lists](./sortable-lists) for reorderable collections
- Explore [Custom Animations](./custom-animations) for handle feedback
- Check out [Collision Detection](./collision-detection) for precise targeting
