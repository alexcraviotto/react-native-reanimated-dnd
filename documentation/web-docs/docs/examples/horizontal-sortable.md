---
title: Horizontal Sortable Lists
description: Create reorderable lists that scroll horizontally with drag-and-drop functionality
---

# Horizontal Sortable Lists

The Sortable component supports horizontal layouts for creating reorderable lists that scroll horizontally. This is perfect for tag selectors, category carousels, toolbars, or any interface where horizontal space is preferred.

## Key Features

- **Horizontal Layout**: Items are arranged horizontally with automatic width calculations
- **Auto-scrolling**: Automatic horizontal scrolling when dragging near container edges
- **Gap Support**: Built-in spacing between items with the `gap` prop
- **Padding Support**: Horizontal padding with `paddingHorizontal` prop
- **FlatList Virtualization**: Performance optimization for large horizontal lists

## Basic Implementation

```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sortable, SortableItem, SortableDirection } from 'react-native-reanimated-dnd';

interface Tag {
  id: string;
  label: string;
  color: string;
}

function HorizontalTagList() {
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', label: 'React', color: '#61dafb' },
    { id: '2', label: 'TypeScript', color: '#3178c6' },
    { id: '3', label: 'React Native', color: '#0fa5e9' },
    { id: '4', label: 'JavaScript', color: '#f7df1e' },
    { id: '5', label: 'Node.js', color: '#339933' },
  ]);

  const renderTag = ({ item, id, positions, leftBound, autoScrollDirection, itemsCount, itemWidth, gap, paddingHorizontal }) => (
    <SortableItem
      key={id}
      id={id}
      data={item}
      positions={positions}
      leftBound={leftBound}
      autoScrollDirection={autoScrollDirection}
      itemsCount={itemsCount}
      direction={SortableDirection.Horizontal}
      itemWidth={itemWidth}
      gap={gap}
      paddingHorizontal={paddingHorizontal}
    >
      <View style={[styles.tagItem, { backgroundColor: item.color }]}>
        <Text style={styles.tagText}>{item.label}</Text>
      </View>
    </SortableItem>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drag to reorder tags</Text>
      <Sortable
        data={tags}
        renderItem={renderTag}
        direction={SortableDirection.Horizontal}
        itemWidth={120}
        gap={12}
        paddingHorizontal={16}
        style={styles.sortableList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sortableList: {
    height: 60,
  },
  tagItem: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: 'white',
    fontWeight: '600',
  },
});
```

## Advanced Example with Drag Handles

```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sortable, SortableItem, SortableDirection } from 'react-native-reanimated-dnd';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

function HorizontalCategoryList() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Work', icon: 'work', count: 12 },
    { id: '2', name: 'Personal', icon: 'person', count: 8 },
    { id: '3', name: 'Shopping', icon: 'shopping-cart', count: 5 },
    { id: '4', name: 'Health', icon: 'favorite', count: 3 },
    { id: '5', name: 'Travel', icon: 'flight', count: 7 },
  ]);

  const handleReorder = (id: string, from: number, to: number) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const [movedCategory] = newCategories.splice(from, 1);
      newCategories.splice(to, 0, movedCategory);
      return newCategories;
    });
  };

  const renderCategory = ({ item, id, positions, leftBound, autoScrollDirection, itemsCount, itemWidth, gap, paddingHorizontal }) => (
    <SortableItem
      key={id}
      id={id}
      data={item}
      positions={positions}
      leftBound={leftBound}
      autoScrollDirection={autoScrollDirection}
      itemsCount={itemsCount}
      direction={SortableDirection.Horizontal}
      itemWidth={itemWidth}
      gap={gap}
      paddingHorizontal={paddingHorizontal}
      onMove={handleReorder}
    >
      <View style={styles.categoryCard}>
        <View style={styles.categoryContent}>
          <Icon name={item.icon} size={24} color="#666" />
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.count}</Text>
        </View>

        <SortableItem.Handle style={styles.dragHandle}>
          <Icon name="drag-handle" size={16} color="#999" />
        </SortableItem.Handle>
      </View>
    </SortableItem>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reorder Categories</Text>
      <Text style={styles.subtitle}>Use the drag handle to reorder</Text>

      <Sortable
        data={categories}
        renderItem={renderCategory}
        direction={SortableDirection.Horizontal}
        itemWidth={140}
        gap={16}
        paddingHorizontal={20}
        style={styles.sortableList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  sortableList: {
    height: 100,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    color: '#333',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  dragHandle: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
  },
});
```

## Core Concepts

### Direction Prop

Set `direction="horizontal"` to enable horizontal layout:

```typescript
<Sortable
  data={items}
  renderItem={renderItem}
  direction="horizontal"  // Enables horizontal mode
  itemWidth={120}         // Required for horizontal
/>
```

### Required Props for Horizontal Mode

- `itemWidth`: Width of each item in pixels (all items must have the same width)
- `direction`: Must be set to `"horizontal"`

### Optional Layout Props

- `gap`: Space between items in pixels (default: 0)
- `paddingHorizontal`: Horizontal padding of the container (default: 0)

## Performance Considerations

### FlatList vs ScrollView

By default, horizontal sortable lists use FlatList for better performance:

```typescript
// FlatList (default) - better for large lists
<Sortable
  data={largeDataset}
  direction="horizontal"
  itemWidth={120}
  useFlatList={true}  // Default
/>

// ScrollView - renders all items at once
<Sortable
  data={smallDataset}
  direction="horizontal"
  itemWidth={120}
  useFlatList={false}
/>
```

### Auto-scrolling Behavior

Horizontal sortable lists automatically scroll when dragging near the edges:

- **Left edge**: Scrolls left when dragging within 60px of the left edge
- **Right edge**: Scrolls right when dragging within 60px of the right edge
- **Smooth scrolling**: Uses animated scrolling for better user experience

## Use Cases

### Tag Selectors

Perfect for reorderable tags or categories:

```typescript
<Sortable
  data={tags}
  direction="horizontal"
  itemWidth={100}
  gap={8}
  paddingHorizontal={16}
/>
```

### Navigation Tabs

Customizable tab order:

```typescript
<Sortable
  data={tabs}
  direction="horizontal"
  itemWidth={120}
  gap={0}
  style={{ backgroundColor: '#f0f0f0' }}
/>
```

### Media Carousels

Reorderable image or video thumbnails:

```typescript
<Sortable
  data={mediaItems}
  direction="horizontal"
  itemWidth={80}
  gap={12}
  paddingHorizontal={20}
/>
```

### Toolbar Items

Customizable toolbar button order:

```typescript
<Sortable
  data={toolbarItems}
  direction="horizontal"
  itemWidth={60}
  gap={4}
  paddingHorizontal={12}
/>
```

## Best Practices

1. **Fixed Width**: Always provide a fixed `itemWidth` for consistent layout
2. **Reasonable Gaps**: Use moderate gap values (8-16px) for better visual separation
3. **Container Height**: Set an appropriate height on the container to prevent layout issues
4. **Handle Placement**: For drag handles, position them clearly visible but not intrusive
5. **Visual Feedback**: Use opacity or scale changes during dragging for better UX

## Troubleshooting

### Common Issues

**Items not positioning correctly:**

- Ensure `itemWidth` is set correctly
- Check that all items have the same width
- Verify `gap` and `paddingHorizontal` values

**Auto-scroll not working:**

- Make sure the container has enough content to scroll
- Check that the scroll view is properly configured
- Ensure drag gestures are not being blocked

**Performance issues:**

- Use `useFlatList={true}` for large datasets
- Consider reducing the number of items rendered simultaneously
- Optimize your `renderItem` function with `React.memo`
