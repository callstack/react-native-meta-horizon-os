# UI/UX for VR

Designing for VR requires different considerations than mobile. This guide covers the key differences and how to adapt your React Native UI for Meta Quest.

## Key Differences

- **Resizable windows**: Apps can be moved and resized by users
- **Controller input**: Touch is replaced by pointer/hover interactions
- **Spatial context**: Content floats in 3D space
- **Comfort**: Readability and ergonomics are critical
- **No system UI**: No back button, different navigation patterns

## Windowing & Layout

On Meta Quest, apps run in resizable windows that users can move and resize. Your layout must adapt to these changes.

![Window frame with resize handles](https://cdn.prod.website-files.com/67e6c26f2d676c1963e098b9/69368220bed6d7d373964e94_Window%20frame%20with%20resize%20handles.webp)

### Window Behavior

- **Default size**: ~1000 × 625 pixels
- **Resizable**: Users can resize windows dynamically
- **Movable**: Windows can be repositioned in 3D space
- **Responsive**: Layout must adapt to size changes

### Responsive Design

Use Flexbox as your base layout system:

```tsx
import { View, StyleSheet } from 'react-native';

function MyComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
});
```

### Tracking Window Size

Use `useWindowDimensions` to track size changes:

```tsx
import { useWindowDimensions } from 'react-native';

function ResponsiveComponent() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 960;

  return (
    <View style={isWide ? styles.twoPane : styles.singlePane}>
      {/* Content */}
    </View>
  );
}
```

If using React Navigation, `useFrameSize` provides window size:

```tsx
import { useFrameSize } from '@react-navigation/elements';

function MyScreen() {
  const { width, height } = useFrameSize();
  // Use dimensions for layout
}
```

### Breakpoints

Implement breakpoints for different window sizes:

```tsx
const TWO_PANE_MIN_WIDTH = 960;

const { width } = useWindowDimensions();
const [twoPane, setTwoPane] = useState(width >= TWO_PANE_MIN_WIDTH);

useEffect(() => {
  setTwoPane(width >= TWO_PANE_MIN_WIDTH);
}, [width]);
```

For complex responsive layouts, consider [Unistyles V3](https://www.unistyl.es/v3/references/media-queries) which supports media queries and breakpoints.

## Styling

Styling in VR affects comfort and readability. Follow these guidelines for typography, icons, colors, and spacing.

### Typography

![Recommended font sizes](https://cdn.prod.website-files.com/67e6c26f2d676c1963e098b9/69368285be2bbab486aa8003_Recommended%20font%20sizes.webp)

**Font sizes:**
- **Minimum**: 14px for legibility
- **Recommended**: 18px+ for comfortable reading
- **Body text**: 18-20px
- **Headings**: Scale appropriately (24px+)

**Font selection:**
- Use **sans-serif** fonts with high x-height
- **Inter** (used in Meta Horizon OS UI) is a good default
- Avoid very thin weights
- Use Regular, Medium, and Bold weights

```tsx
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
});
```

### Icons

![Recommended icon sizes](https://cdn.prod.website-files.com/67e6c26f2d676c1963e098b9/693682be0c3f9c681f65a19e_Recommended%20icon%20sizes.webp)

**Sizes:**
- **Default action icons**: 24dp
- **Compact indicators**: 12-16dp
- **Status icons**: 16dp

**Best practices:**
- Use **filled variants** for better visibility
- Keep icons visually simple
- Avoid very thin strokes
- Ensure tap targets are larger than icons (48dp minimum)

```tsx
import Icon from 'react-native-vector-icons/MaterialIcons';

<Pressable
  style={styles.iconButton}
  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
>
  <Icon name="home" size={24} />
</Pressable>
```

### Colors & Contrast

Use [WCAG 2.1 ratios](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) as baseline:

- **AA minimum**: 4.5:1 for normal text
- **AA large**: 3:1 for large text
- **AAA**: Higher contrast for better accessibility

Your app window can appear over dark rooms, bright passthrough, or 3D environments. Ensure sufficient contrast in all scenarios.

```tsx
const colors = {
  text: '#FFFFFF',
  background: '#1A1A1A',
  // Contrast ratio: 13.9:1 (AAA)
};
```

### Spacing

![Space between components](https://cdn.prod.website-files.com/67e6c26f2d676c1963e098b9/6936bc1de1e2d767a209d84c_space_between_components.webp)

- **Minimum**: 8-12dp between interactive elements
- **Groups**: Extra padding between groups
- **Window edges**: Leave margin around edges

Use spacing to create visual hierarchy:

```tsx
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
```

## Interactivity

VR interactions rely on hover states, clear feedback, and appropriate hit targets.

### Hover States

Hover states are essential in VR. Users point at elements before clicking.

```tsx
import { Pressable, useState } from 'react-native';

function InteractiveButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPress={() => console.log('Clicked!')}
      style={[
        styles.button,
        hovered && styles.buttonHovered,
      ]}
    >
      <Text>Click me</Text>
    </Pressable>
  );
}
```

Provide clear visual feedback:
- **Scale**: Slight scale increase on hover
- **Color**: Background or border color change
- **Glow**: Subtle glow effect
- **Opacity**: Opacity change

### Hit Targets

![Inputs and hit targets](https://cdn.prod.website-files.com/67e6c26f2d676c1963e098b9/6936833a65856828004f1ea7_Inputs%20and%20hit%20targets.webp)

- **Minimum**: 48dp × 48dp
- **Recommended**: Larger for important actions
- **Spacing**: Adequate space between targets

If an element is visually smaller, add invisible hit slop:

```tsx
<Pressable
  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
  style={styles.smallButton}
>
  <Icon name="close" size={16} />
</Pressable>
```

### Animations

Use animations to provide feedback and guide users. Recommended libraries:
- **react-native-reanimated**: High-performance animations
- **react-native-gesture-handler**: Gesture handling

```tsx
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useState } from 'react';

function AnimatedButton() {
  const [pressed, setPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressed ? 0.95 : 1 }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <Text>Press me</Text>
      </Pressable>
    </Animated.View>
  );
}
```

Consider using libraries that handle VR interactions: [pressto](https://github.com/nicholasio/pressto) for VR-focused interactions or [react-native-aria](https://github.com/nandorojo/react-native-aria) for accessibility-focused components.

## Accessibility & Comfort

These guidelines help create apps that are comfortable for extended use.

### Controller Support

- **Minimize button presses**: Simplify interactions
- **Clear navigation paths**: Logical control schemes
- **Support control remapping**: Allow users to customize
- **Save preferences**: Remember user settings

### Feedback

**Visual feedback:**
- Clear hover states
- Obvious press feedback
- Focus indicators

**Audio feedback:**
- Sound effects for actions
- Spatial audio when appropriate

**Haptic feedback:**
- Controller vibration for interactions
- Tactile response to actions

### Head Movement

- **Avoid excessive head movement**: Keep important content centered
- **Comfortable viewing angles**: Don't require extreme head positions
- **Stable UI**: Avoid head-locked UI elements

### Session Length

VR sessions are typically shorter than mobile:

- **Shorten time to fun**: Get users to core functionality quickly
- **Clear value**: Show benefits immediately
- **Progressive disclosure**: Don't overwhelm with information

### Testing Checklist

- [ ] Text is readable (18px+)
- [ ] Contrast meets WCAG AA (4.5:1)
- [ ] Hit targets are 48dp minimum
- [ ] Spacing is generous (8-12dp)
- [ ] Focus states are clear
- [ ] Controls are simple
- [ ] Head movement is minimized

Use Meta Quest [accessibility settings](https://www.meta.com/en-gb/help/quest/674999931400954/) and React Native DevTools for testing.

## Navigation

Meta Quest doesn't have a universal system back button. Your app must provide in-app navigation controls.

### In-App Back Controls

Unlike mobile platforms, you must:
- Include in-app back controls
- Provide clear navigation paths
- Support both controllers and hand tracking

```tsx
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from 'react-native';

function ScreenHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} />
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}
```

Keep back controls in a consistent location:
- **Top-left**: Common pattern
- **Header**: Always visible
- **Clear label**: "Back" or arrow icon

### Dismiss Patterns

For modals and overlays:

```tsx
function Modal({ onClose }) {
  return (
    <View style={styles.modal}>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Icon name="close" size={24} />
      </Pressable>
      {/* Modal content */}
    </View>
  );
}
```

### Platform Detection

Use platform detection for VR-specific navigation:

```tsx
import ExpoHorizon from 'expo-horizon-core';

function NavigationButton() {
  if (ExpoHorizon.isHorizonDevice) {
    // Show explicit back button
    return <BackButton />;
  }
  // Mobile: can rely on system back
  return null;
}
```

## Resources

- [Meta Horizon Design Guidelines](https://developers.meta.com/horizon/design/mr-design-guideline/)
- [Design Requirements](https://developers.meta.com/horizon/documentation/android-apps/design-requirements)
- [Meta Comfort Guidelines](https://developers.meta.com/horizon/design/comfort)
- [Meta Accessibility Documentation](https://developers.meta.com/horizon/design/accessibility)
- [Meta Navigation Requirements](https://developers.meta.com/horizon/documentation/android-apps/design-requirements#navigation)
- [React Navigation Documentation](https://reactnavigation.org/)
