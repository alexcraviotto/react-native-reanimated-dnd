# Sortable Lists

Create reorderable lists with smooth animations and intuitive interactions.

## Overview

Sortable lists allow users to reorder items by dragging them to new positions. This example demonstrates:

- Basic list reordering with the Sortable component
- Smooth insertion animations
- Auto-scrolling for long lists
- Custom drag handles

## Key Features

- **Smooth Reordering**: Fluid animations during item movement
- **Auto-scroll**: Automatically scroll when dragging near edges
- **Visual Feedback**: Clear indicators for drop positions
- **Flexible Data**: Works with any data structure that has an `id` field
- **Performance Optimized**: Efficient rendering for large lists

## Basic Implementation

```tsx
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Sortable, SortableItem, SortableRenderItemProps } from 'react-native-reanimated-dnd';

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  color: string;
}

export function SortableListsExample() {
  const [items] = useState<ListItem[]>([
    { id: '1', title: 'First Item', subtitle: 'Drag to reorder', color: '#ff6b6b' },
    { id: '2', title: 'Second Item', subtitle: 'Move me around', color: '#4ecdc4' },
    { id: '3', title: 'Third Item', subtitle: 'I can be sorted', color: '#45b7d1' },
    { id: '4', title: 'Fourth Item', subtitle: 'Reorder the list', color: '#96ceb4' },
    { id: '5', title: 'Fifth Item', subtitle: 'Drag and drop', color: '#feca57' },
  ]);

  const renderItem = useCallback((props: SortableRenderItemProps<ListItem>) => {
    const { item, id, positions, lowerBound, autoScrollDirection, itemsCount, itemHeight } = props;

    return (
      <SortableItem
        key={id}
        id={id}
        data={item}
        positions={positions}
        lowerBound={lowerBound}
        autoScrollDirection={autoScrollDirection}
        itemsCount={itemsCount}
        itemHeight={itemHeight}
        containerHeight={600} // Adjust based on your container
        style={styles.sortableItem}
        onMove={(currentId, from, to) => {
          console.log(`Item ${currentId} moved from ${from} to ${to}`);
        }}
        onDragStart={(currentId, position) => {
          console.log(`Item ${currentId} started dragging from position ${position}`);
        }}
        onDrop={(currentId, position) => {
          console.log(`Item ${currentId} dropped at position ${position}`);
        }}
      >
        <View style={[styles.itemContent, { borderLeftColor: item.color }]}>
          <View style={styles.dragHandle}>
            <Text style={styles.dragIcon}>⋮⋮</Text>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          </View>
          <View style={styles.itemIndex}>
            <Text style={styles.indexText}>{parseInt(id)}</Text>
          </View>
        </View>
      </SortableItem>
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Sortable Lists</Text>
          <Text style={styles.subtitle}>Drag items to reorder</Text>
          
          <View style={styles.listContainer}>
            <Sortable
              data={items}
              renderItem={renderItem}
              itemHeight={80} // Height of each item
              style={styles.sortableContainer}
            />
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Items: {items.length} • Drag the handle (⋮⋮) to reorder
            </Text>
          </View>
        </View>
      </SafeAreaView>
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
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sortableContainer: {
    flex: 1,
  },
  sortableItem: {
    marginBottom: 12,
  },
  itemContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dragHandle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dragIcon: {
    color: '#58a6ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    color: '#8E8E93',
    fontSize: 14,
  },
  itemIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
});
```

## Core Components

### Sortable Component

The main container for sortable lists:

```tsx
<Sortable
  data={items}              // Array of items with id field
  renderItem={renderItem}   // Function to render each item
  itemHeight={80}          // Fixed height for each item
  style={styles.list}      // Optional styling
/>
```

### SortableItem Component

Individual items within the sortable list:

```tsx
<SortableItem
  key={id}
  id={id}
  data={item}
  positions={positions}
  lowerBound={lowerBound}
  autoScrollDirection={autoScrollDirection}
  itemsCount={itemsCount}
  itemHeight={itemHeight}
  containerHeight={600}
  onMove={(currentId, from, to) => {
    // Handle item movement
  }}
>
  {/* Item content */}
</SortableItem>
```

## Advanced Features

### Drag Handles

Use `SortableItem.Handle` for specific drag areas:

```tsx
const renderItem = useCallback((props: SortableRenderItemProps<Item>) => {
  const { item, id, ...sortableProps } = props;

  return (
    <SortableItem key={id} id={id} data={item} {...sortableProps}>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>

        {/* Only this handle area can initiate dragging */}
        <SortableItem.Handle style={styles.dragHandle}>
          <View style={styles.handleIcon}>
            <Text>⋮⋮</Text>
          </View>
        </SortableItem.Handle>
      </View>
    </SortableItem>
  );
}, []);
```

### Event Callbacks

Track sorting events with callbacks:

```tsx
<SortableItem
  id={id}
  data={item}
  {...sortableProps}
  onMove={(currentId, from, to) => {
    console.log(`Item ${currentId} moved from position ${from} to ${to}`);
    // Update your data state here
  }}
  onDragStart={(currentId, position) => {
    console.log(`Started dragging item ${currentId} from position ${position}`);
    // Show visual feedback
  }}
  onDrop={(currentId, position) => {
    console.log(`Dropped item ${currentId} at position ${position}`);
    // Clean up visual feedback
  }}
  onDragging={(currentId, overItemId, yPosition) => {
    console.log(`Item ${currentId} is over item ${overItemId} at y: ${yPosition}`);
    // Real-time feedback during drag
  }}
>
  {/* Item content */}
</SortableItem>
```

### Custom Item Heights

**Important**: The `itemHeight` prop must be a consistent value for all items in the list. The library uses this value for position calculations and animations.

```tsx
// ✅ Correct: Fixed height for all items
<Sortable
  data={items}
  renderItem={renderItem}
  itemHeight={80} // All items will occupy 80px of layout space
  style={styles.list}
/>

// ❌ Incorrect: Don't use dynamic heights
const getItemHeight = (item: Item) => {
  const baseHeight = 60;
  const extraHeight = item.description ? 40 : 0;
  return baseHeight + extraHeight; // This won't work with the library
};
```

**Note**: While your item content can vary visually within the allocated space, each item must occupy the same layout height for proper positioning and animations. If you need truly dynamic heights, consider using a regular ScrollView with individual Draggable components instead of the Sortable component.

## List Types

### Todo List

```tsx
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

function TodoSortableList() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Learn React Native', completed: false, priority: 'high' },
    { id: '2', text: 'Build awesome app', completed: false, priority: 'medium' },
    { id: '3', text: 'Deploy to stores', completed: false, priority: 'low' },
  ]);

  const renderTodoItem = useCallback((props: SortableRenderItemProps<TodoItem>) => {
    const { item, id, ...sortableProps } = props;

    return (
      <SortableItem key={id} id={id} data={item} {...sortableProps}>
        <View style={styles.todoItem}>
          <View style={[styles.priorityIndicator, styles[`priority${item.priority}`]]} />
          <Text style={[styles.todoText, item.completed && styles.completedText]}>
            {item.text}
          </Text>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </SortableItem>
    );
  }, []);

  return (
    <Sortable
      data={todos}
      renderItem={renderTodoItem}
      itemHeight={60}
    />
  );
}
```

### Media Playlist

```tsx
interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
}

function PlaylistSortableList() {
  const [tracks, setTracks] = useState<Track[]>([
    { id: '1', title: 'Song 1', artist: 'Artist 1', duration: '3:45', coverUrl: '...' },
    { id: '2', title: 'Song 2', artist: 'Artist 2', duration: '4:12', coverUrl: '...' },
  ]);

  const renderTrackItem = useCallback((props: SortableRenderItemProps<Track>) => {
    const { item, id, ...sortableProps } = props;

    return (
      <SortableItem key={id} id={id} data={item} {...sortableProps}>
        <View style={styles.trackItem}>
          <Image source={{ uri: item.coverUrl }} style={styles.coverImage} />
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.trackArtist}>{item.artist}</Text>
          </View>
          <Text style={styles.trackDuration}>{item.duration}</Text>
          
          <SortableItem.Handle style={styles.dragHandle}>
            <Text style={styles.dragIcon}>⋮⋮</Text>
          </SortableItem.Handle>
        </View>
      </SortableItem>
    );
  }, []);

  return (
    <Sortable
      data={tracks}
      renderItem={renderTrackItem}
      itemHeight={80}
    />
  );
}
```

## Performance Optimization

### Large Lists

For large lists, consider using fixed item heights and optimized rendering:

```tsx
function LargeSortableList({ items }: { items: Item[] }) {
  const renderItem = useCallback((props: SortableRenderItemProps<Item>) => {
    // Memoized item rendering
    return <MemoizedSortableItem {...props} />;
  }, []);

  return (
    <Sortable
      data={items}
      renderItem={renderItem}
      itemHeight={FIXED_ITEM_HEIGHT}
      style={styles.list}
    />
  );
}

const MemoizedSortableItem = React.memo<SortableRenderItemProps<Item>>(
  ({ item, id, ...sortableProps }) => (
    <SortableItem key={id} id={id} data={item} {...sortableProps}>
      <ItemContent item={item} />
    </SortableItem>
  )
);
```

### Memoized Callbacks

Use memoized callbacks to prevent unnecessary re-renders:

```tsx
function OptimizedSortableList() {
  const handleMove = useCallback((currentId: string, from: number, to: number) => {
    // Handle move logic
  }, []);

  const handleDragStart = useCallback((currentId: string, position: number) => {
    // Handle drag start
  }, []);

  const renderItem = useCallback((props: SortableRenderItemProps<Item>) => {
    return (
      <SortableItem
        {...props}
        onMove={handleMove}
        onDragStart={handleDragStart}
      >
        {/* Content */}
      </SortableItem>
    );
  }, [handleMove, handleDragStart]);

  return (
    <Sortable
      data={items}
      renderItem={renderItem}
      itemHeight={80}
    />
  );
}
```

## Common Use Cases

- **Todo Lists**: Reorder tasks by priority
- **Playlists**: Arrange music or video order
- **Navigation**: Customize menu item order
- **Galleries**: Organize photo collections
- **Forms**: Reorder form fields

## Best Practices

1. **Fixed Item Heights**: Use consistent heights for better performance
2. **Memoization**: Memoize render functions and callbacks
3. **Visual Feedback**: Provide clear drag handles and feedback
4. **Accessibility**: Support alternative reordering methods
5. **Data Management**: Update your data state in move callbacks

## Limitations

- **Web Platform**: Sortable lists may not work properly on web due to React Native Reanimated limitations
- **Item Heights**: Works best with fixed item heights
- **Data Structure**: Items must have an `id` field

## Next Steps

- Learn about [Drag Handles](./drag-handles) for better control
- Explore [Custom Animations](./custom-animations) for enhanced feedback
- Check out [Visual Feedback](./visual-feedback) for better user experience
