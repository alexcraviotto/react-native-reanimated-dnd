# Capacity Limits

Control the number of items that can be dropped in specific zones.

## Overview

Capacity limits restrict how many items can be placed in drop zones, providing control over layout and functionality. This example demonstrates:

- Maximum item limits per zone
- Visual capacity indicators
- Overflow handling
- Dynamic capacity updates

## Key Features

- **Flexible Limits**: Set different capacities for different zones
- **Visual Indicators**: Show current capacity status
- **Overflow Prevention**: Reject drops when zones are full
- **Dynamic Updates**: Change capacity limits at runtime
- **Smart Feedback**: Clear visual cues for capacity states

## Basic Implementation

```tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DropProvider,
  Draggable,
  Droppable,
} from "react-native-reanimated-dnd";

interface CapacityItem {
  id: string;
  label: string;
  color: string;
}

export function CapacityLimitsExample() {
  const [items, setItems] = useState<CapacityItem[]>([
    { id: "1", label: "Item 1", color: "#ff6b6b" },
    { id: "2", label: "Item 2", color: "#4ecdc4" },
    { id: "3", label: "Item 3", color: "#45b7d1" },
    { id: "4", label: "Item 4", color: "#96ceb4" },
    { id: "5", label: "Item 5", color: "#feca57" },
  ]);

  const [zones, setZones] = useState({
    small: { items: [], capacity: 2 },
    medium: { items: [], capacity: 3 },
    large: { items: [], capacity: 5 },
  });

  const handleDrop = (zoneId: keyof typeof zones) => (item: CapacityItem) => {
    const zone = zones[zoneId];

    if (zone.items.length >= zone.capacity) {
      console.log(`Zone ${zoneId} is full!`);
      // Show error message instead of returning false
      showErrorMessage(`Zone ${zoneId} is full!`);
      return;
    }

    setZones((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        items: [...prev[zoneId].items, item],
      },
    }));

    // Remove from available items
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const removeFromZone = (zoneId: keyof typeof zones, itemId: string) => {
    const zone = zones[zoneId];
    const item = zone.items.find((i) => i.id === itemId);

    if (item) {
      setZones((prev) => ({
        ...prev,
        [zoneId]: {
          ...prev[zoneId],
          items: prev[zoneId].items.filter((i) => i.id !== itemId),
        },
      }));

      setItems((prev) => [...prev, item]);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Capacity Limits</Text>

          {/* Available Items */}
          <View style={styles.itemsContainer}>
            <Text style={styles.sectionTitle}>Available Items</Text>
            <View style={styles.itemsRow}>
              {items.map((item) => (
                <Draggable key={item.id} data={item} style={styles.draggable}>
                  <View style={[styles.item, { backgroundColor: item.color }]}>
                    <Text style={styles.itemText}>{item.label}</Text>
                  </View>
                </Draggable>
              ))}
            </View>
          </View>

          {/* Capacity Zones */}
          <View style={styles.zonesContainer}>
            {Object.entries(zones).map(([zoneId, zone]) => (
              <CapacityZone
                key={zoneId}
                id={zoneId}
                zone={zone}
                onDrop={handleDrop(zoneId as keyof typeof zones)}
                onRemoveItem={(itemId) =>
                  removeFromZone(zoneId as keyof typeof zones, itemId)
                }
              />
            ))}
          </View>
        </View>
      </DropProvider>
    </GestureHandlerRootView>
  );
}

function CapacityZone({ id, zone, onDrop, onRemoveItem }) {
  const isFull = zone.items.length >= zone.capacity;
  const fillPercentage = (zone.items.length / zone.capacity) * 100;

  return (
    <View style={styles.zoneContainer}>
      <View style={styles.zoneHeader}>
        <Text style={styles.zoneTitle}>
          {id.charAt(0).toUpperCase() + id.slice(1)} Zone
        </Text>
        <Text style={[styles.capacityText, isFull && styles.fullCapacityText]}>
          {zone.items.length}/{zone.capacity}
        </Text>
      </View>

      {/* Capacity Bar */}
      <View style={styles.capacityBar}>
        <View
          style={[
            styles.capacityFill,
            {
              width: `${fillPercentage}%`,
              backgroundColor: isFull ? "#ff453a" : "#58a6ff",
            },
          ]}
        />
      </View>

      <Droppable
        droppableId={id}
        onDrop={onDrop}
        disabled={isFull}
        style={[styles.dropZone, isFull && styles.fullDropZone]}
      >
        <View style={styles.zoneContent}>
          {zone.items.length === 0 ? (
            <Text style={styles.emptyText}>
              {isFull ? "Zone Full" : "Drop items here"}
            </Text>
          ) : (
            <View style={styles.zoneItems}>
              {zone.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.zoneItem, { backgroundColor: item.color }]}
                  onPress={() => onRemoveItem(item.id)}
                >
                  <Text style={styles.zoneItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </Droppable>
    </View>
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
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  itemsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  draggable: {
    // Positioning handled by library
  },
  item: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  zonesContainer: {
    flex: 1,
    gap: 20,
  },
  zoneContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#333333",
  },
  zoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  zoneTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  capacityText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#58a6ff",
  },
  fullCapacityText: {
    color: "#ff453a",
  },
  capacityBar: {
    height: 4,
    backgroundColor: "#333333",
    borderRadius: 2,
    marginBottom: 16,
    overflow: "hidden",
  },
  capacityFill: {
    height: "100%",
    borderRadius: 2,
  },
  dropZone: {
    minHeight: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#58a6ff",
  },
  fullDropZone: {
    borderColor: "#ff453a",
    backgroundColor: "rgba(255, 69, 58, 0.1)",
  },
  zoneContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#8E8E93",
    fontSize: 14,
    textAlign: "center",
  },
  zoneItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  zoneItem: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  zoneItemText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
```

## Advanced Features

### Dynamic Capacity Changes

```tsx
function DynamicCapacityZone({ initialCapacity = 3 }) {
  const [capacity, setCapacity] = useState(initialCapacity);
  const [items, setItems] = useState([]);

  const increaseCapacity = () => setCapacity((prev) => prev + 1);
  const decreaseCapacity = () => {
    if (capacity > items.length) {
      setCapacity((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.dynamicZone}>
      <View style={styles.capacityControls}>
        <TouchableOpacity onPress={decreaseCapacity}>
          <Text style={styles.controlButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.capacityDisplay}>{capacity}</Text>
        <TouchableOpacity onPress={increaseCapacity}>
          <Text style={styles.controlButton}>+</Text>
        </TouchableOpacity>
      </View>

      <Droppable
        droppableId="dynamic"
        onDrop={(item) => {
          if (items.length < capacity) {
            setItems((prev) => [...prev, item]);
            return true;
          }
          return false;
        }}
      >
        {/* Zone content */}
      </Droppable>
    </View>
  );
}
```

### Overflow Handling

```tsx
function OverflowZone({ capacity, items, onDrop, onOverflow }) {
  const handleDrop = (item) => {
    if (items.length >= capacity) {
      onOverflow?.(item);
      return false;
    }
    return onDrop(item);
  };

  return (
    <Droppable onDrop={handleDrop}>
      <View
        style={[
          styles.dropZone,
          items.length >= capacity && styles.overflowZone,
        ]}
      >
        {/* Zone content */}
      </View>
    </Droppable>
  );
}
```

### Priority-Based Capacity

```tsx
function PriorityCapacityZone({ capacity, items, onDrop }) {
  const handleDrop = (item) => {
    if (items.length >= capacity) {
      // Remove lowest priority item if new item has higher priority
      const lowestPriority = Math.min(...items.map((i) => i.priority));
      if (item.priority > lowestPriority) {
        const itemToRemove = items.find((i) => i.priority === lowestPriority);
        // Remove and add logic here
        return true;
      }
      return false;
    }
    return onDrop(item);
  };

  return <Droppable onDrop={handleDrop}>{/* Zone content */}</Droppable>;
}
```

## Visual Indicators

### Capacity Progress Ring

```tsx
function CapacityRing({ current, max, size = 60 }) {
  const percentage = (current / max) * 100;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#333333"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={percentage >= 100 ? "#ff453a" : "#58a6ff"}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.ringText}>
        <Text style={styles.ringNumber}>{current}</Text>
        <Text style={styles.ringMax}>/{max}</Text>
      </View>
    </View>
  );
}
```

### Capacity Warnings

```tsx
function CapacityWarning({ current, max, warningThreshold = 0.8 }) {
  const percentage = current / max;

  if (percentage < warningThreshold) return null;

  return (
    <View style={[styles.warning, percentage >= 1 && styles.errorWarning]}>
      <Text style={styles.warningText}>
        {percentage >= 1 ? "Zone Full!" : "Almost Full"}
      </Text>
    </View>
  );
}
```

## Common Use Cases

- **Shopping Carts**: Limit items per cart
- **Inventory Management**: Control stock levels
- **Game Inventories**: Restrict item slots
- **Form Builders**: Limit fields per section
- **Media Galleries**: Control uploads per album

## Best Practices

1. **Clear Indicators**: Show capacity status prominently
2. **Graceful Rejection**: Provide feedback when drops are rejected
3. **Visual Feedback**: Use colors and animations to indicate capacity
4. **Flexible Limits**: Allow capacity changes when appropriate
5. **User Control**: Let users manage items in zones

## Next Steps

- Learn about [Drop Zones](./drop-zones) for zone management
- Explore [Visual Feedback](./visual-feedback) for capacity indicators
- Check out [Sortable Lists](./sortable-lists) for ordered capacity zones
