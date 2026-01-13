# Alternatives

Some features require Quest-specific packages that provide the same APIs as their mobile counterparts.

## In-App Purchases

### expo-iap

The `expo-iap` library supports Meta Horizon OS billing:

```bash
npm install expo-iap
```

Follow the [expo-iap Horizon OS setup guide](https://hyochan.github.io/expo-iap/getting-started/setup-horizon).

### Use Cases

- Premium content unlocks
- Subscriptions
- Customization items
- In-app currencies
- One-time purchases

## Notifications

### expo-horizon-notifications

Use `expo-horizon-notifications` as a drop-in replacement for `expo-notifications`:

```bash
npm install expo-horizon-notifications
```

### Migration

Simply change your import:

```tsx
// Before
import * as Notifications from 'expo-notifications';

// After
import * as Notifications from 'expo-horizon-notifications';
```

The API is identical, so no code changes needed.

### Example

```tsx
import * as Notifications from 'expo-horizon-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: 'Notification!',
    body: 'It works on Meta Horizon OS!',
  },
  trigger: null,
});
```

**Note**: Expo Push Service is not supported on Meta Quest.

## Location Services

### expo-horizon-location

Use `expo-horizon-location` for location services:

```bash
npm install expo-horizon-location
```

### Important Limitation

Meta Quest devices don't have GPS hardware. Location is determined through:

- WiFi networks
- IP geolocation

This provides **city or region-level accuracy** at best.

### Use Cases

- Timezone detection
- Regional content defaults
- Analytics
- Light social features

### Example

```tsx
import * as Location from 'expo-horizon-location';

async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync();
  return location;
}
```

## Platform-Specific Logic

When writing cross-platform code, use platform detection:

```tsx
import { Platform } from 'react-native';
import ExpoHorizon from 'expo-horizon-core';

function getPlatform() {
  if (ExpoHorizon.isHorizonDevice) {
    return 'horizon';
  }
  return Platform.OS;
}
```

Some libraries provide feature checks:

- `expo-sms` - Check SMS availability
- `expo-sensors` - Check sensor availability
