# Testing

Testing React Native apps for Meta VR follows the same principles as testing any React Native application. This guide covers recommended tools and practices for writing maintainable, reliable tests.

## Philosophy

The goal of testing is to give you confidence that your app works correctly. The best way to achieve this is to **test how users interact with your app**, not implementation details.

As Kent C. Dodds puts it: "The more your tests resemble the way your software is used, the more confidence they can give you."

### What to Test

Focus on use cases, not code coverage:

- **User interactions**: Button presses, text input, gestures
- **Rendered output**: What the user sees on screen
- **Prop changes**: How components respond to different inputs
- **Edge cases**: Error states, loading states, empty states

### What Not to Test

Avoid testing implementation details:

- Internal component state
- Private methods
- Component lifecycle methods
- Specific implementation approaches

Testing implementation details leads to:
- **False negatives**: Tests break during refactoring even when functionality works
- **False positives**: Tests pass even when bugs exist

## Recommended Tools

### React Native Testing Library

[React Native Testing Library](https://callstack.github.io/react-native-testing-library/) is the recommended testing library. It encourages testing from the user's perspective.

```bash
npm install --save-dev @testing-library/react-native
```

#### Query Priority

When querying elements, prefer queries that reflect how users find elements:

| Priority | Query Type | When to Use |
|----------|------------|-------------|
| 1st | `*ByRole` | Primary choice - uses semantic accessibility roles |
| 2nd | `*ByLabelText` | For form inputs with labels |
| 3rd | `*ByPlaceholderText` | For text inputs |
| 4th | `*ByText` | For visible text content |
| Last | `*ByTestId` | Last resort - not user-visible |

```tsx
// Prefer this - queries by accessibility role
const button = screen.getByRole('button', { name: 'Submit' });

// Avoid this - testID is not user-visible
const button = screen.getByTestId('submit-button');
```

#### Query Variants

Choose the right variant for your situation:

- `getBy*` - Element exists, returns immediately
- `queryBy*` - Element may not exist (returns null)
- `findBy*` - Element appears asynchronously (returns promise)
- `*AllBy*` - Multiple elements expected

```tsx
// Element should exist
const title = screen.getByText('Welcome');

// Check element doesn't exist
expect(screen.queryByText('Error')).toBeNull();

// Wait for async element
const data = await screen.findByText('Loaded');
```

### MSW for API Mocking

[Mock Service Worker (MSW)](https://mswjs.io/) intercepts network requests at the network level, providing realistic API mocking without modifying your application code.

```bash
npm install --save-dev msw
```

```tsx
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/user', () => {
    return HttpResponse.json({ name: 'John' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays user name', async () => {
  render(<UserProfile />);
  expect(await screen.findByText('John')).toBeTruthy();
});
```

## Example Test

Here's a complete example testing a login form:

```tsx
import { render, screen, userEvent } from '@testing-library/react-native';
import { LoginForm } from './LoginForm';

test('shows error when submitting empty form', async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={jest.fn()} />);

  // Find and press submit button by its role
  const submitButton = screen.getByRole('button', { name: 'Sign In' });
  await user.press(submitButton);

  // Check error message appears
  expect(screen.getByText('Email is required')).toBeTruthy();
});

test('calls onSubmit with credentials', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  // Fill in form fields
  await user.type(
    screen.getByLabelText('Email'),
    'user@example.com'
  );
  await user.type(
    screen.getByLabelText('Password'),
    'password123'
  );

  // Submit form
  await user.press(screen.getByRole('button', { name: 'Sign In' }));

  // Verify callback
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'password123',
  });
});
```

## Test Prioritization

For large applications, prioritize tests by user impact:

1. **Identify critical paths**: What would upset users most if broken?
2. **Start with integration tests**: Cover the happy path of important features
3. **Add edge case tests**: Error handling, boundary conditions
4. **Unit test complex logic**: Business rules, calculations, data transformations

Don't aim for 100% code coverage. Focus on meaningful coverage of user-facing functionality.

## Meta Spatial Simulator

Meta Spatial Simulator runs your app as a panel on your desktop, so you can test without loading a build onto a headset every time.

### Requirements

| | Minimum |
|---|---|
| macOS | Apple silicon (M1 or later), macOS 12+, Xcode Command Line Tools (`xcode-select --install`) |
| Windows | Windows 10+, 64-bit, 8+ cores, hardware virtualisation enabled in BIOS |
| GPU | Vulkan-capable, with current drivers |
| Disk space | 8 GB free |
| Memory | 4 GB free |
| Android SDK | `platform-tools` (for `adb`) and `emulator` |

Your app must target API 34 (Android 14) or later.

### Install Meta VR CLI

[Meta VR CLI](https://developers.meta.com/horizon/documentation/android-apps/ts-ai-tooling-mcp/) (`metavr`) manages devices, logs, screenshots and Meta Spatial Simulator.

```bash
# macOS / Linux
curl -fsSL https://developers.meta.com/horizon/install-cli/ | sh

# Windows (PowerShell)
iwr -useb https://developers.meta.com/horizon/install-cli/windows/ | iex
```

With Node.js 18 or later you can run it through npm instead:

```bash
npx metavr@latest init
```

Verify the install and check what developer software it found:

```bash
metavr --version
metavr doctor
```

### Install and start the simulator

Once you have installed Meta VR CLI, you can start the simulator:

```bash
metavr tools install spatialsim
metavr ssim start
metavr ssim status
```

### Run your app

`metavr` does not build your app. Build the APK with Expo first, then deploy it:

```bash
npx expo run:android --variant questDebug
metavr app install android/app/build/outputs/apk/quest/debug/app-quest-debug.apk
metavr app launch <your.package.name>
```

Your app appears as a panel. Click UI elements, type into text fields, and scroll with your mouse wheel or trackpad.

### Capture a screenshot

```bash
metavr capture screenshot -o app.png
```

### Targeting a specific device

If a headset or phone is connected at the same time, commands fail with `Multiple devices connected`. List what is attached and pin the target with `-d`:

```bash
metavr device list
metavr -d emulator-5554 capture screenshot -o app.png
```

### Troubleshooting

- Allow up to five minutes on first boot.
- The simulator does not include Google Play services, so an app that depends on GMS will not run.
- If `adb` cannot see the simulator, restart the server with `adb kill-server && adb start-server`.

## End-to-End Testing

For full end-to-end testing of your app running on Meta VR devices, you can use [Maestro](https://maestro.dev/) — an open-source UI testing framework that supports React Native apps. With the Meta Spatial Simulator, Maestro can automate user flows by interacting with your app just like a real user would: tapping elements, entering text, and validating screen content.

[Maestro Studio](https://docs.maestro.dev/getting-started/maestro-studio-desktop) provides a visual IDE for building tests without writing code, while the CLI integrates seamlessly into CI pipelines. Since the testing workflow is standard across all React Native platforms, refer to the official Maestro documentation for setup and usage instructions.

## Further Reading

- [React Native Testing Library Documentation](https://callstack.github.io/react-native-testing-library/)
- [How to Query - RNTL Guide](https://callstack.github.io/react-native-testing-library/docs/guides/how-to-query)
- [How to Know What to Test - Kent C. Dodds](https://kentcdodds.com/blog/how-to-know-what-to-test)
- [Testing Implementation Details - Kent C. Dodds](https://kentcdodds.com/blog/testing-implementation-details)
- [Maestro Documentation](https://docs.maestro.dev/)
- [Maestro React Native Support](https://docs.maestro.dev/platform-support/react-native-support)