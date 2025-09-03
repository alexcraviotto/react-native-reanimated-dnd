# Drop Zones

Create interactive drop zones with visual feedback and smart collision detection.

## Overview

Drop zones are designated areas where draggable items can be dropped. This example demonstrates:

- Multiple drop zones with different behaviors
- Visual feedback during drag operations
- Conditional drop acceptance
- Dynamic zone activation

## Key Features

- **Visual Feedback**: Clear indicators when items can be dropped
- **Smart Detection**: Intelligent collision algorithms
- **Conditional Drops**: Accept or reject items based on rules
- **Multiple Zones**: Support for complex layouts
- **Animated Responses**: Smooth transitions and feedback

## Basic Implementation

```tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DropProvider,
  Draggable,
  Droppable,
} from "react-native-reanimated-dnd";

interface DropItem {
  id: string;
  label: string;
  type: "image" | "text" | "video";
  color: string;
}

export function DropZonesExample() {
  const [droppedItems, setDroppedItems] = useState<{
    [key: string]: DropItem[];
  }>({
    images: [],
    text: [],
    trash: [],
  });

  const items: DropItem[] = [
    { id: "1", label: "Photo", type: "image", color: "#ff6b6b" },
    { id: "2", label: "Document", type: "text", color: "#4ecdc4" },
    { id: "3", label: "Video", type: "video", color: "#45b7d1" },
  ];

  const handleDrop =
    (zoneId: string, acceptedTypes?: string[]) => (item: DropItem) => {
      if (acceptedTypes && !acceptedTypes.includes(item.type)) {
        console.log(`${item.type} not accepted in ${zoneId}`);
        return;
      }

      setDroppedItems((prev) => ({
        ...prev,
        [zoneId]: [...prev[zoneId], item],
      }));
    };

  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Drop Zones</Text>

          {/* Draggable Items */}
          <View style={styles.itemsContainer}>
            {items.map((item) => (
              <Draggable key={item.id} data={item} style={styles.draggable}>
                <View
                  style={[
                    styles.draggableContent,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Text style={styles.draggableText}>{item.label}</Text>
                  <Text style={styles.typeText}>{item.type}</Text>
                </View>
              </Draggable>
            ))}
          </View>

          {/* Drop Zones */}
          <View style={styles.dropZonesContainer}>
            {/* Images Only Zone */}
            <Droppable
              droppableId="images"
              onDrop={handleDrop("images", ["image"])}
              style={styles.dropZone}
            >
              <View style={[styles.zoneContent, styles.imageZone]}>
                <Text style={styles.zoneTitle}>📷 Images Only</Text>
                <Text style={styles.zoneSubtitle}>
                  {droppedItems.images.length} items
                </Text>
              </View>
            </Droppable>

            {/* Text Only Zone */}
            <Droppable
              droppableId="text"
              onDrop={handleDrop("text", ["text"])}
              style={styles.dropZone}
            >
              <View style={[styles.zoneContent, styles.textZone]}>
                <Text style={styles.zoneTitle}>📄 Text Only</Text>
                <Text style={styles.zoneSubtitle}>
                  {droppedItems.text.length} items
                </Text>
              </View>
            </Droppable>

            {/* Trash Zone (accepts all) */}
            <Droppable
              droppableId="trash"
              onDrop={handleDrop("trash")}
              style={styles.dropZone}
            >
              <View style={[styles.zoneContent, styles.trashZone]}>
                <Text style={styles.zoneTitle}>🗑️ Trash</Text>
                <Text style={styles.zoneSubtitle}>
                  {droppedItems.trash.length} items
                </Text>
              </View>
            </Droppable>
          </View>
        </View>
      </DropProvider>
    </GestureHandlerRootView>
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
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    gap: 16,
  },
  draggable: {
    // Draggable positioning handled by library
  },
  draggableContent: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  draggableText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  typeText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    marginTop: 2,
  },
  dropZonesContainer: {
    flex: 1,
    gap: 16,
  },
  dropZone: {
    flex: 1,
    minHeight: 100,
  },
  zoneContent: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageZone: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderColor: "#ff6b6b",
  },
  textZone: {
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    borderColor: "#4ecdc4",
  },
  trashZone: {
    backgroundColor: "rgba(136, 136, 136, 0.1)",
    borderColor: "#888888",
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
  },
});
```

## Advanced Drop Zone Features

### Conditional Drop Acceptance

```tsx
function ConditionalDropZone({ maxSize }) {
  const [rejectionMessage, setRejectionMessage] = useState("");

  return (
    <View>
      <Droppable
        droppableId="conditional-zone"
        onDrop={(item) => {
          if (item.size > maxSize) {
            setRejectionMessage("File too large");
            setTimeout(() => setRejectionMessage(""), 3000);
            return; // Don't process the item
          }

          // Process the valid drop
          processDroppedItem(item);
          setRejectionMessage("");
        }}
      >
        <View style={styles.dropZone}>
          <Text>Drop files here</Text>
          <Text>Max size: {formatFileSize(maxSize)}</Text>
        </View>
      </Droppable>

      {rejectionMessage && (
        <Text style={styles.errorMessage}>{rejectionMessage}</Text>
      )}
    </View>
  );
}
```

### Animated Drop Feedback

```tsx
function AnimatedDropZone({ children, onDrop }) {
  const [isActive, setIsActive] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.05 : 1);
  }, [isActive]);

  return (
    <Droppable
      onDrop={onDrop}
      onActiveChange={(active) => setIsActive(active)}
      activeStyle={{
        backgroundColor: "rgba(88, 166, 255, 0.1)",
        borderColor: "#58a6ff",
        borderWidth: 2,
      }}
    >
      <Animated.View style={[styles.dropZone, animatedStyle]}>
        {children}
      </Animated.View>
    </Droppable>
  );
}
```

### Capacity-Limited Zones

```tsx
function CapacityDropZone({ maxItems = 3, items = [] }) {
  const isFull = items.length >= maxItems;

  return (
    <Droppable
      droppableId="capacity-zone"
      disabled={isFull}
      onDrop={isFull ? undefined : handleDrop}
      style={[styles.dropZone, isFull && styles.fullZone]}
    >
      <Text style={styles.capacityText}>
        {items.length}/{maxItems} items
      </Text>
      {isFull && <Text style={styles.fullText}>Zone Full</Text>}
    </Droppable>
  );
}
```

## Zone Types

### File Upload Zone

```tsx
function FileUploadZone() {
  return (
    <Droppable
      droppableId="upload"
      acceptedTypes={["image", "document"]}
      onDrop={(file) => uploadFile(file)}
    >
      <View style={styles.uploadZone}>
        <Text style={styles.uploadIcon}>📁</Text>
        <Text style={styles.uploadText}>Drop files to upload</Text>
      </View>
    </Droppable>
  );
}
```

### Shopping Cart Zone

```tsx
function ShoppingCartZone({ items, onAddItem }) {
  return (
    <Droppable droppableId="cart" onDrop={onAddItem}>
      <View style={styles.cartZone}>
        <Text style={styles.cartIcon}>🛒</Text>
        <Text style={styles.cartText}>Cart ({items.length} items)</Text>
      </View>
    </Droppable>
  );
}
```

### Category Zones

```tsx
function CategoryZones({ categories }) {
  return (
    <View style={styles.categoriesContainer}>
      {categories.map((category) => (
        <Droppable
          key={category.id}
          droppableId={category.id}
          onDrop={(item) => categorizeItem(item, category)}
        >
          <View style={[styles.categoryZone, { borderColor: category.color }]}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <Text style={styles.categoryCount}>
              {category.items.length} items
            </Text>
          </View>
        </Droppable>
      ))}
    </View>
  );
}
```

## Visual States

### Hover Effects

```tsx
const [isHovered, setIsHovered] = useState(false);

<Droppable
  onDragEnter={() => setIsHovered(true)}
  onDragLeave={() => setIsHovered(false)}
  style={[styles.dropZone, isHovered && styles.hoveredZone]}
>
  {/* Zone content */}
</Droppable>;
```

### Loading States

```tsx
function LoadingDropZone({ isProcessing }) {
  return (
    <Droppable disabled={isProcessing}>
      <View style={[styles.dropZone, isProcessing && styles.processingZone]}>
        {isProcessing ? (
          <ActivityIndicator color="#58a6ff" />
        ) : (
          <Text>Drop items here</Text>
        )}
      </View>
    </Droppable>
  );
}
```

## Common Use Cases

- **File Management**: Organize files into folders
- **Task Management**: Move tasks between status columns
- **E-commerce**: Add items to cart or wishlist
- **Content Creation**: Arrange elements in layouts
- **Data Visualization**: Group data points by categories

## Best Practices

1. **Clear Visual Feedback**: Show when zones are active
2. **Appropriate Sizing**: Make zones large enough for easy targeting
3. **Logical Grouping**: Group related zones together
4. **Error Handling**: Provide feedback for invalid drops
5. **Performance**: Optimize for smooth animations

## Next Steps

- Learn about [Collision Detection](./collision-detection) for precise targeting
- Explore [Custom Animations](./custom-animations) for enhanced feedback
- Check out [Visual Feedback](./visual-feedback) for better user experience
