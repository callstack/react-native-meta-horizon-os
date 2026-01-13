# Submitting

Submit your app to the Meta Horizon Store through Meta Developer Hub.

## Prerequisites

- [Meta Developer Account](https://developers.meta.com/horizon/sign-up/)
- [Meta Quest Developer Hub](https://developers.meta.com/horizon/documentation/unity/ts-mqdh/) installed
- Production APK built and ready

## Submission Process

### 1. Complete Regulatory Requirements

Before submission, complete all regulatory actions in the Meta Horizon Developer Dashboard:

- Privacy policy
- Content ratings
- Other compliance requirements

### 2. Create App Entry

1. Go to "App Distribution" in Meta Quest Developer Hub
2. Click "Create a new app"
3. Fill out app information in the dashboard:
   - App name
   - Description
   - Category
   - Contact information

### 3. Upload Build

1. Return to Meta Quest Developer Hub
2. Select your app
3. Choose a release track:
   - **Production**: Public release
   - **Testing tracks**: Internal, alpha, beta testing
4. Upload your `.apk` file

### 4. Verify Guidelines

Review [VRC Guidelines](https://developers.meta.com/horizon/resources/publish-quest-req) to ensure compliance:

- Content requirements
- Performance standards
- Privacy expectations
- Behavior guidelines

While `expo-horizon-core` handles many technical requirements, you must verify content and behavior.

### 5. App Signing

If using Expo EAS, signing is handled automatically. For local builds:

- Follow [Meta's signing instructions](https://developers.meta.com/horizon/resources/publish-mobile-app-signing/)
- Use Meta Quest Developer Hub or Oculus platform utility CLI

### 6. Submit for Review

Once everything is complete:

1. Fill out all required metadata
2. Upload screenshots and assets
3. Submit for review

**Review times**: Can take up to two weeks. Plan releases accordingly.

## Release Channels

Use release channels for testing:

- **Internal**: Team testing
- **Alpha**: Limited external testing
- **Beta**: Broader testing
- **Production**: Public release

## Resources

- [Meta Submission Guide](https://developers.meta.com/horizon/resources/publish-submit)
- [VRC Guidelines](https://developers.meta.com/horizon/resources/publish-quest-req)
- [Meta Quest Developer Hub](https://developers.meta.com/horizon/documentation/unity/ts-mqdh/)
