# Library Compatibility

Meta Horizon OS is based on Android but has important differences that affect library compatibility. This guide helps you understand what works, what needs configuration, and what requires alternatives.

## Quick Reference

| Category | Status | Notes |
|----------|--------|-------|
| Core Expo libraries | ✅ Works | `expo-file-system`, `expo-asset`, `expo-sqlite` |
| Self-contained libraries | ✅ Works | Libraries without external service dependencies |
| Google Play Services | ❌ Not supported | Use Meta alternatives |
| GPS hardware | ❌ Not available | WiFi/IP location only |
| SMS/Telephony | ❌ Not available | Not supported on Quest |

## Why Compatibility Differs

Meta Horizon OS is built on AOSP (Android Open Source Project) but:

- **No Google Mobile Services**: Quest doesn't include GMS
- **VR-specific permissions**: Different permission model
- **Missing hardware**: No GPS, cellular, or telephony hardware
- **Custom APIs**: Meta provides VR-specific alternatives