# Platform Detection

Detect Meta Quest devices to conditionally run platform-specific code.

## Using expo-horizon-core

The `expo-horizon-core` package provides device detection:

```tsx
import ExpoHorizon from 'expo-horizon-core';

if (ExpoHorizon.isHorizonDevice) {
  // Quest-specific code
}
```

## React Hook Example

Create a custom hook for platform detection:

```tsx
import { Platform } from 'react-native';
import ExpoHorizon from 'expo-horizon-core';

export function usePlatform() {
  if (ExpoHorizon.isHorizonDevice) {
    return 'horizon';
  }
  return Platform.OS;
}
```

## Conditional Rendering

Use platform detection to conditionally render components:

```tsx
import ExpoHorizon from 'expo-horizon-core';

function MyComponent() {
  return (
    <View>
      {ExpoHorizon.isHorizonDevice ? (
        <QuestSpecificComponent />
      ) : (
        <MobileComponent />
      )}
    </View>
  );
}
```

## Conditional Styling

Adjust styles for Quest:

```tsx
import { StyleSheet } from 'react-native';
import ExpoHorizon from 'expo-horizon-core';

const styles = StyleSheet.create({
  button: {
    padding: ExpoHorizon.isHorizonDevice ? 16 : 12,
    minHeight: ExpoHorizon.isHorizonDevice ? 48 : 44,
  },
});
```

## Feature Availability Checks

Some libraries provide feature checks:

### SMS

```tsx
import * as SMS from 'expo-sms';

const isAvailable = await SMS.isAvailableAsync();
if (isAvailable) {
  // SMS is available (not on Quest)
}
```

### Sensors

```tsx
import { Accelerometer } from 'expo-sensors';

const isAvailable = Accelerometer.isAvailableAsync();
if (isAvailable) {
  // Accelerometer is available
}
```

## Platform Utilities

Create utility functions for common platform checks:

```tsx
import { Platform } from 'react-native';
import ExpoHorizon from 'expo-horizon-core';

export function isHorizon() {
  return ExpoHorizon.isHorizonDevice;
}

export function isMobile() {
  return Platform.OS === 'ios' || Platform.OS === 'android';
}

export function getPlatformName() {
  if (ExpoHorizon.isHorizonDevice) {
    return 'horizon';
  }
  return Platform.OS;
}
```

## Best Practices

- **Check at runtime**: Don't assume platform at build time
- **Graceful degradation**: Provide fallbacks for unsupported features
- **Clear error messages**: Inform users when features aren't available
- **Test on device**: Always test platform detection on actual Quest hardware
