# Create Your First App

Get started quickly with Expo Go, which allows you to run React Native apps on Meta Quest without configuring a full development environment.

## Create a new Expo app

Open your terminal and run:

```bash
npx create-expo-app@latest
```

Follow the prompts to name your project and choose a template.

## Start the development server

Navigate to your project directory and start Expo:

```bash
cd your-project-name
npx expo start
```

Expo starts its development server and displays a QR code in your terminal.

## Run on Meta Quest

1. Put on your Meta Quest headset
2. Open Expo Go (installed from Meta Horizon Store)
3. Grant camera permissions when prompted:
   - Approve access to virtual cameras
   - Approve access to headset cameras
4. Use the headset view to scan the QR code displayed in your terminal

Once scanned, Expo Go launches your project in a floating VR window. Any edits you make in your code editor appear in the headset almost immediately.

## Essential Setup

Some libraries require Quest-specific configuration before they work properly. The `expo-horizon-core` plugin is essential for Meta Quest apps.

### expo-horizon-core Plugin

The `expo-horizon-core` plugin handles:

- Removing prohibited Android properties
- Configuring Android product flavors (`questRelease`, `questDebug`)
- Setting Meta Horizon App ID
- Providing Quest-specific JavaScript utilities
- OS runtime detection

### Installation

```bash
npm install expo-horizon-core
```

### Configuration

#### Screen Orientation

If your app renders with black bars after setting `defaultWidth` or `defaultHeight` in the `expo-horizon-core` plugin, ensure the `orientation` value in your `app.json` is set correctly to match the specified dimensions.

Change the orientation setting from:

```json
{
  "expo": {
    "orientation": "portrait"
  }
}
```

to:

```json
{
  "expo": {
    "orientation": "default"
  }
}
```

For more advanced use cases, you can use the [`expo-screen-orientation`](https://docs.expo.dev/versions/latest/sdk/screen-orientation/) library to programmatically control screen orientation at runtime.

#### expo-horizon-core Plugin

Add to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-horizon-core",
        {
          "horizonAppId": "your-horizon-app-id",
          "defaultHeight": "640dp",
          "defaultWidth": "1024dp",
          "supportedDevices": "quest2|quest3|quest3s",
          "disableVrHeadtracking": false,
          "allowBackup": false
        }
      ]
    ]
  }
}
```

See the [expo-horizon-core documentation](https://github.com/software-mansion-labs/expo-horizon/tree/main/expo-horizon-core) for details.

After installing `expo-horizon-core`, your project is configured for Quest builds. You can now:

- Build Quest-specific variants
- Use Quest utilities like `isHorizonDevice()`
- Access Quest-specific features

## Development Builds

Expo Go is great for prototyping, but for production apps you'll need a development build to access native modules and the full React Native ecosystem.

### Why use a development build?

- Access to custom native modules
- Use libraries not available in Expo Go
- Test production-like builds locally
- Debug native code

### Setup

#### 1. Configure Android Development Environment

Follow [Expo's setup instructions](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local) for Android development builds.

#### 2. Enable Developer Mode

1. Install the [Meta Horizon app](https://horizon.meta.com/) on your phone
2. Enable developer mode following [Meta's guide](https://developers.meta.com/horizon/documentation/native/android/mobile-device-setup/)
3. Connect your Quest via USB
4. Approve USB debugging when prompted on the headset

#### 3. Start Development Server

Start your Expo development server:

```bash
npx expo start
```

Ensure you're running in "development build" mode. If not, press `s` in the terminal to switch modes.

#### 4. Connect Your Device

When you connect Meta Quest for the first time, you'll see a prompt:

**"Allow USB debugging?"**

Confirm this to enable debugging and development features.

### Verify Setup

Your terminal should show "development build" mode. You now have access to:

- Full native module support
- Custom configurations
- Platform-level debugging
- ADB logs and profiling tools

## Building for Quest

Use Quest-specific build variants:

```bash
# Development build
npx expo run:android --variant questDebug

# Production build
npx expo run:android --variant questRelease
```

### Platform Detection

Use `expo-horizon-core` to detect Quest devices:

```tsx
import ExpoHorizon from 'expo-horizon-core';

if (ExpoHorizon.isHorizonDevice) {
  // Quest-specific code
}
```