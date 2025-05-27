# Custom Animations

Create smooth and engaging animations using React Native Reanimated 3 with the drag and drop library.

## Overview

The library integrates seamlessly with React Native Reanimated 3 to provide smooth, performant animations. You can customize how items animate during drag operations, when dropped, and during state transitions.

## Key Features

- **Reanimated 3 Integration**: Built-in support for worklets and shared values
- **Custom Animation Functions**: Define your own animation behaviors
- **Performance Optimized**: Runs on the UI thread for 60fps animations
- **Flexible Timing**: Control duration, easing, and animation curves
- **State-Based Animations**: Different animations for different drag states

## Basic Implementation

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { DropProvider, Draggable, Droppable } from 'react-native-reanimated-dnd';

interface AnimatedItemData {
  id: string;
  label: string;
  color: string;
}

export function CustomAnimationsExample() {
  const [droppedItems, setDroppedItems] = useState<AnimatedItemData[]>([]);

  const items: AnimatedItemData[] = [
    { id: '1', label: 'Spring', color: '#ff6b6b' },
    { id: '2', label: 'Timing', color: '#4ecdc4' },
    { id: '3', label: 'Sequence', color: '#45b7d1' },
  ];

  const handleDrop = (data: AnimatedItemData) => {
    setDroppedItems(prev => [...prev, data]);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <DropProvider>
        <View style={styles.content}>
          <Text style={styles.title}>Custom Animations</Text>
          <Text style={styles.subtitle}>
            Different animation styles for drag and drop interactions
          </Text>

          {/* Drop Zone */}
          <View style={styles.dropZoneArea}>
            <Droppable<AnimatedItemData>
              droppableId="animation-zone"
              onDrop={handleDrop}
              style={styles.dropZone}
              activeStyle={styles.activeDropZone}
            >
              <Text style={styles.dropZoneText}>Drop Zone</Text>
              <Text style={styles.dropZoneSubtext}>
                {droppedItems.length} items dropped
              </Text>
            </Droppable>
          </View>

          {/* Animated Draggable Items */}
          <View style={styles.draggableItemsArea}>
            {/* Spring Animation */}
            <Draggable<AnimatedItemData>
              data={items[0]}
              animationFunction={(toValue) => {
                'worklet';
                return withSpring(toValue, {
                  damping: 15,
                  stiffness: 150,
                  mass: 1,
                });
              }}
              style={[styles.draggable, { backgroundColor: items[0].color }]}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>{items[0].label}</Text>
                <Text style={styles.itemHint}>Bouncy spring</Text>
              </View>
            </Draggable>

            {/* Timing Animation */}
            <Draggable<AnimatedItemData>
              data={items[1]}
              animationFunction={(toValue) => {
                'worklet';
                return withTiming(toValue, {
                  duration: 500,
                  easing: Easing.out(Easing.cubic),
                });
              }}
              style={[styles.draggable, { backgroundColor: items[1].color }]}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>{items[1].label}</Text>
                <Text style={styles.itemHint}>Smooth timing</Text>
              </View>
            </Draggable>

            {/* Sequence Animation */}
            <Draggable<AnimatedItemData>
              data={items[2]}
              animationFunction={(toValue) => {
                'worklet';
                return withSequence(
                  withTiming(toValue * 1.1, { duration: 150 }),
                  withSpring(toValue, { damping: 12 })
                );
              }}
              style={[styles.draggable, { backgroundColor: items[2].color }]}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>{items[2].label}</Text>
                <Text style={styles.itemHint}>Overshoot + spring</Text>
              </View>
            </Draggable>
          </View>

          {/* Animation Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Animation Types:</Text>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#ff6b6b' }]} />
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Spring:</Text> Natural bouncy motion with physics
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#4ecdc4' }]} />
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Timing:</Text> Controlled duration with easing curves
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIndicator, { backgroundColor: '#45b7d1' }]} />
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Sequence:</Text> Multiple animations chained together
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
    height: 80,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignSelf: 'center',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemHint: {
    fontSize: 12,
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

## Animation Types

### Spring Animations

Natural, physics-based animations with bounce:

```tsx
<Draggable
  data={itemData}
  animationFunction={(toValue) => {
    'worklet';
    return withSpring(toValue, {
      damping: 15,        // Controls bounce (lower = more bounce)
      stiffness: 150,     // Controls speed (higher = faster)
      mass: 1,            // Controls weight (higher = slower)
    });
  }}
>
  {/* Content */}
</Draggable>
```

### Timing Animations

Controlled duration with easing curves:

```tsx
<Draggable
  data={itemData}
  animationFunction={(toValue) => {
    'worklet';
    return withTiming(toValue, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }}
>
  {/* Content */}
</Draggable>
```

### Sequence Animations

Chain multiple animations together:

```tsx
<Draggable
  data={itemData}
  animationFunction={(toValue) => {
    'worklet';
    return withSequence(
      withTiming(toValue * 1.2, { duration: 100 }), // Overshoot
      withSpring(toValue, { damping: 12 })           // Settle
    );
  }}
>
  {/* Content */}
</Draggable>
```

## Advanced Animation Patterns

### State-Based Animations

Different animations based on drag state:

```tsx
function StatefulAnimatedDraggable({ data }) {
  const [dragState, setDragState] = useState('idle');

  const getAnimationFunction = () => {
    switch (dragState) {
      case 'dragging':
        return (toValue) => {
          'worklet';
          return withTiming(toValue, { duration: 100 }); // Fast response
        };
      case 'dropped':
        return (toValue) => {
          'worklet';
          return withSpring(toValue, { damping: 20 }); // Bouncy settle
        };
      default:
        return (toValue) => {
          'worklet';
          return withSpring(toValue); // Default spring
        };
    }
  };

  return (
    <Draggable
      data={data}
      animationFunction={getAnimationFunction()}
      onDragStart={() => setDragState('dragging')}
      onDragEnd={() => setDragState('idle')}
      onStateChange={(state) => {
        if (state === 'DROPPED') setDragState('dropped');
      }}
    >
      {/* Content */}
    </Draggable>
  );
}
```

### Gesture-Driven Animations

Animations that respond to gesture velocity:

```tsx
function VelocityDraggable({ data }) {
  const velocity = useSharedValue(0);

  const dynamicAnimation = (toValue) => {
    'worklet';
    const speed = Math.abs(velocity.value);
    
    if (speed > 1000) {
      // Fast gesture - quick animation
      return withTiming(toValue, { duration: 150 });
    } else if (speed > 500) {
      // Medium gesture - spring animation
      return withSpring(toValue, { damping: 15 });
    } else {
      // Slow gesture - gentle spring
      return withSpring(toValue, { damping: 25 });
    }
  };

  return (
    <Draggable
      data={data}
      animationFunction={dynamicAnimation}
      onDragging={({ tx, ty }) => {
        // Calculate velocity (simplified)
        velocity.value = Math.sqrt(tx * tx + ty * ty);
      }}
    >
      {/* Content */}
    </Draggable>
  );
}
```

### Custom Easing Functions

Create unique animation curves:

```tsx
const customEasing = {
  // Elastic easing
  elastic: (t) => {
    'worklet';
    return Math.sin(13 * Math.PI / 2 * t) * Math.pow(2, 10 * (t - 1));
  },
  
  // Bounce easing
  bounce: (t) => {
    'worklet';
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
};

<Draggable
  data={itemData}
  animationFunction={(toValue) => {
    'worklet';
    return withTiming(toValue, {
      duration: 600,
      easing: customEasing.bounce,
    });
  }}
>
  {/* Content */}
</Draggable>
```

## Visual Effects

### Scale and Rotation

Add scale and rotation during drag:

```tsx
function ScaleRotateDraggable({ data }) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Draggable
      data={data}
      onDragStart={() => {
        scale.value = withSpring(1.1);
        rotation.value = withSpring(5);
      }}
      onDragEnd={() => {
        scale.value = withSpring(1);
        rotation.value = withSpring(0);
      }}
    >
      <Animated.View style={[styles.draggable, animatedStyle]}>
        {/* Content */}
      </Animated.View>
    </Draggable>
  );
}
```

### Opacity and Shadow Effects

Dynamic opacity and shadow during interactions:

```tsx
function ShadowDraggable({ data }) {
  const opacity = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    shadowOpacity: shadowOpacity.value,
  }));

  return (
    <Draggable
      data={data}
      onDragStart={() => {
        opacity.value = withTiming(0.8);
        shadowOpacity.value = withTiming(0.6);
      }}
      onDragEnd={() => {
        opacity.value = withTiming(1);
        shadowOpacity.value = withTiming(0.3);
      }}
    >
      <Animated.View style={[styles.draggable, animatedStyle]}>
        {/* Content */}
      </Animated.View>
    </Draggable>
  );
}
```

## Performance Optimization

### Worklet Functions

Always use worklets for animation functions:

```tsx
// ✅ Good - runs on UI thread
const optimizedAnimation = (toValue) => {
  'worklet';
  return withSpring(toValue);
};

// ❌ Bad - runs on JS thread
const slowAnimation = (toValue) => {
  return withSpring(toValue);
};
```

### Minimize Re-renders

Use shared values to avoid component re-renders:

```tsx
function OptimizedDraggable({ data }) {
  // Use shared values for animations
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Combine animations in single style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Draggable data={data}>
      <Animated.View style={[styles.draggable, animatedStyle]}>
        {/* Content */}
      </Animated.View>
    </Draggable>
  );
}
```

### Conditional Animations

Only animate when necessary:

```tsx
function ConditionalAnimationDraggable({ data, enableAnimations }) {
  const getAnimationFunction = () => {
    if (!enableAnimations) {
      return (toValue) => {
        'worklet';
        return toValue; // No animation
      };
    }
    
    return (toValue) => {
      'worklet';
      return withSpring(toValue);
    };
  };

  return (
    <Draggable
      data={data}
      animationFunction={getAnimationFunction()}
    >
      {/* Content */}
    </Draggable>
  );
}
```

## Common Animation Patterns

### Card Flip Animation

```tsx
const flipAnimation = (toValue) => {
  'worklet';
  return withSequence(
    withTiming(toValue * 0.5, { duration: 150 }),
    withTiming(toValue, { duration: 150 })
  );
};
```

### Elastic Bounce

```tsx
const elasticBounce = (toValue) => {
  'worklet';
  return withSpring(toValue, {
    damping: 8,
    stiffness: 100,
    mass: 0.8,
  });
};
```

### Smooth Slide

```tsx
const smoothSlide = (toValue) => {
  'worklet';
  return withTiming(toValue, {
    duration: 250,
    easing: Easing.out(Easing.quad),
  });
};
```

## Best Practices

1. **Use Worklets**: Always mark animation functions with 'worklet'
2. **Optimize Performance**: Minimize re-renders and complex calculations
3. **Match Context**: Choose animations that fit your app's design language
4. **Test on Device**: Animations may behave differently on real devices
5. **Provide Feedback**: Use animations to communicate state changes

## Troubleshooting

### Common Issues

**Animations not working:**
- Ensure 'worklet' directive is present
- Check that Reanimated is properly installed
- Verify animation function returns a value

**Poor performance:**
- Use shared values instead of state
- Avoid complex calculations in worklets
- Test on lower-end devices

**Inconsistent behavior:**
- Check for conflicting animations
- Ensure proper cleanup in useEffect
- Verify timing and duration values

## Next Steps

- Learn about [Visual Feedback](./visual-feedback) for enhanced user experience
- Explore [Collision Detection](./collision-detection) for animation triggers
- Check out [Sortable Lists](./sortable-lists) for list-specific animations
