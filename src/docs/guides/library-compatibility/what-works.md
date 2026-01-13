# What Works

Most React Native libraries work seamlessly on Meta Horizon OS if they're self-contained and don't depend on restricted services.

## Core Expo Libraries

These Expo libraries work out of the box:

- `expo-file-system` - File system operations
- `expo-asset` - Asset management
- `expo-sqlite` - Local database
- `expo-camera` - Camera access
- `expo-audio` - Audio playback
- `expo-av` - Media playback
- `expo-image` - Image handling

## React Native Libraries

Most React Native libraries work without modification:

- **State management**: Redux, Zustand, Jotai, etc.
- **Networking**: Fetch API, axios, etc.
- **Animations**: `react-native-reanimated`, `react-native-gesture-handler`
- **UI libraries**: Most component libraries work (may need VR-specific styling)
- **Navigation**: React Navigation works with VR considerations

## Rule of Thumb

**If a library is self-contained and doesn't depend on external services or restricted hardware, it should work on Meta Horizon OS.**

## Examples

### State Management

```tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Works perfectly
function MyComponent() {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
  // ...
}
```

### Animations

```tsx
import Animated from 'react-native-reanimated';

// Works out of the box
<Animated.View
  entering={FadeIn}
  exiting={FadeOut}
>
  <Text>Animated content</Text>
</Animated.View>
```

### File System

```tsx
import * as FileSystem from 'expo-file-system';

// Works without modification
const fileUri = FileSystem.documentDirectory + 'file.txt';
await FileSystem.writeAsStringAsync(fileUri, 'content');
```