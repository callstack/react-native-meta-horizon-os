# Platform Guidelines

Meta Horizon OS has specific requirements and differences from standard Android. Understanding these early helps avoid issues during development.

## Permissions

Meta Horizon OS follows Android's permission model with VR-specific additions:

- **Prohibited permissions**: Some Android permissions are not allowed. See [Meta's prohibited permissions list](https://developers.meta.com/horizon/resources/permissions-prohibited/)
- **Extended permissions**: XR-specific permissions for spatial data. See [Meta's extended permissions](https://developers.meta.com/horizon/documentation/native/native-spatial-data-perm/)
- **Review required**: Some permissions require Meta review and approval. See [Meta's review requirements](https://developers.meta.com/horizon/resources/permissions-review-required/)

## Design Requirements

### Resizable Windows

Apps run in resizable windows that users can move and resize. Your design must:

- Be responsive to layout changes
- Support flexible window sizes
- Use appropriate typography and hit targets

See [UI/UX Guide](/docs/guides/ui-ux) for detailed design guidelines.

### Hit Targets

- Minimum size: 48dp × 48dp
- Adequate spacing between interactive elements
- Clear visual feedback on hover and press

### Typography

- Minimum font size: 14px for legibility
- Recommended: 18px+ for comfortable reading
- Use sans-serif fonts with high x-height

### Navigation

- No system back button - provide in-app navigation
- Include visible back controls when needed
- Support both controllers and hand tracking

## Compatibility

### What Works

- Core Expo libraries (e.g. `expo-file-system`, `expo-asset`, `expo-sqlite`)
- Self-contained libraries without external service dependencies
- Most React Native components and APIs

### What Doesn't Work

- Google Mobile Services (GMS) dependencies
- Firebase modules tied to GMS
- Mobile-specific hardware (SMS, telephony, GPS hardware)
- Libraries requiring Google Play Services

See [Library Compatibility Guide](/docs/guides/library-compatibility) for details.

## Configuration

Use `expo-horizon-core` plugin to automatically:

- Remove prohibited permissions
- Configure Android product flavors
- Set Meta Horizon App ID
- Provide Quest-specific utilities

## Resources

- [Meta Horizon Design Guidelines](https://developers.meta.com/horizon/design/mr-design-guideline/)
- [Design Requirements](https://developers.meta.com/horizon/documentation/android-apps/design-requirements)
- [Making Apps Compatible](https://developers.meta.com/horizon/documentation/android-apps/making-apps-compatible-overview)