# Building

Create production-ready builds for Meta Horizon Store submission.

## Prerequisites

Ensure `expo-horizon-core` is installed and configured. This plugin:

- Removes prohibited permissions
- Configures Quest-specific build variants
- Sets Meta Horizon App ID
- Ensures store compliance

## Local Build

Build a production APK locally:

```bash
npx expo run:android --variant questRelease
```

The APK will be located at:

```
android/app/build/outputs/apk/quest/release/
```

## Expo EAS Build

Use Expo EAS for cloud builds:

### Configuration

Add a Quest-specific profile to `eas.json`:

```json
{
  "builds": {
    "production-quest": {
      "android": {
        "gradleCommand": ":app:assembleQuestRelease"
      }
    }
  }
}
```

### Build Command

```bash
eas build --profile production-quest --platform android
```

### Download APK

After the build completes:

1. Download the APK from EAS
2. Sign it if needed (EAS signs automatically)
3. Upload to Meta Horizon Store

## Build Variants

`expo-horizon-core` provides two build variants:

- **questDebug**: Development build for Quest
- **questRelease**: Production build for store submission

## Verification

Before submitting, verify:

- ✅ App builds successfully
- ✅ `expo-horizon-core` is configured
- ✅ Prohibited permissions are removed
- ✅ Meta Horizon App ID is set
