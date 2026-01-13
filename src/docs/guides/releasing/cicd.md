# CI/CD

Automate your build and publishing workflow with CI/CD.

## Expo EAS Build

Use Expo EAS for cloud builds:

```bash
eas build --profile production-quest --platform android
```

## GitHub Actions

Automate builds and uploads with GitHub Actions:

### Build Workflow

```yaml
name: Build and Publish

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: eas build --profile production-quest --platform android --non-interactive
      - uses: actions/download-artifact@v3
        with:
          name: build-artifact
```

### Upload to Store

Use the upload action:

```yaml
- uses: marketplace/actions/upload-meta-quest-build@v1
  with:
    app-id: ${{ secrets.META_APP_ID }}
    build-path: ./build.apk
    access-token: ${{ secrets.META_ACCESS_TOKEN }}
```

## Complete Workflow

Combine build and upload:

```yaml
name: Build and Publish to Meta Store

on:
  release:
    types: [created]

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
      - run: eas build --profile production-quest --platform android
      - uses: actions/download-artifact@v3
      - uses: marketplace/actions/upload-meta-quest-build@v1
        with:
          app-id: ${{ secrets.META_APP_ID }}
          build-path: ./build.apk
          access-token: ${{ secrets.META_ACCESS_TOKEN }}
```

## Secrets

Configure these secrets in your repository:

- `EXPO_TOKEN`: Expo access token
- `META_APP_ID`: Your Meta app ID
- `META_ACCESS_TOKEN`: Meta API access token

## Manual Steps

Some steps may still require manual action:

- Screenshot creation
- Store listing updates
- Review submission (can be automated via API)

## Resources

- [Expo GitHub Action](https://github.com/expo/expo-github-action)
- [Upload Meta Quest Build Action](https://github.com/marketplace/actions/upload-meta-quest-build)
- [Meta Platform API](https://developers.meta.com/horizon/documentation/native/pc/ps-get-started/)
