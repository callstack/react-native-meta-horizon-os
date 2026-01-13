# What Doesn't Work

Some features and libraries are not supported on Meta Horizon OS.

## Mobile-Specific Hardware

These hardware features don't exist on Quest:

- **SMS**: No cellular connectivity
- **Telephony**: No phone calling capabilities
- **GPS hardware**: No GPS chip (WiFi/IP location only)

## Google Mobile Services

Meta Horizon OS doesn't include Google Mobile Services (GMS). Libraries that depend on GMS won't work:

### Google Services

- **Google Authentication**: Use Meta authentication or alternatives
- **Google Maps**: Not available
- **Google Play Billing**: Use Meta Horizon Billing SDK instead
- **Google Cloud Messaging**: Not supported

### Firebase

Firebase modules tied to Google Play Services won't work:

- Firebase Cloud Messaging (FCM)
- Firebase App Check (when using Play Integrity)
- Some Firebase Analytics features

See [Firebase documentation](https://firebase.google.com/docs/android/android-play-services) for details.

## Restricted Permissions

Some Android permissions are prohibited on Meta Horizon OS:

- **Dangerous permissions**: `INSTALL_PACKAGES`, etc.
- **Irrelevant permissions**: `CALL_PHONE`, etc.

See [Meta's prohibited permissions list](https://developers.meta.com/horizon/resources/permissions-prohibited/).

The `expo-horizon-core` plugin automatically disables these permissions.

## Unsupported Dependencies

Check [Meta's unsupported dependencies list](https://developers.meta.com/horizon/documentation/android-apps/unsupported-dependencies) for libraries that won't work.

## Alternatives

For features that don't work, consider:

- **Billing**: Use `expo-iap` with Meta Horizon support
- **Notifications**: Use `expo-horizon-notifications`
- **Location**: Use `expo-horizon-location` (limited accuracy)
- **Maps**: Use web-based map solutions or custom implementations
- **Authentication**: Use Meta authentication or OAuth providers

## Checking Compatibility

Before adding a library:

1. Check if it depends on Google Play Services
2. Verify it doesn't require prohibited permissions
3. Test on a Quest device
4. Look for Quest-specific alternatives
