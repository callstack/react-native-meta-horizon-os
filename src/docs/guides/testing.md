# Testing

Testing React Native apps for Meta Horizon OS follows the same principles as testing any React Native application. This guide covers recommended tools and practices for writing maintainable, reliable tests.

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

## End-to-End Testing

For full end-to-end testing of your app running on Meta Horizon OS, you can use [Maestro](https://maestro.dev/) — an open-source UI testing framework that supports React Native apps. With the Meta Spatial Simulator, Maestro can automate user flows by interacting with your app just like a real user would: tapping elements, entering text, and validating screen content.

[Maestro Studio](https://docs.maestro.dev/getting-started/maestro-studio-desktop) provides a visual IDE for building tests without writing code, while the CLI integrates seamlessly into CI pipelines. Since the testing workflow is standard across all React Native platforms, refer to the official Maestro documentation for setup and usage instructions.

## Further Reading

- [React Native Testing Library Documentation](https://callstack.github.io/react-native-testing-library/)
- [How to Query - RNTL Guide](https://callstack.github.io/react-native-testing-library/docs/guides/how-to-query)
- [How to Know What to Test - Kent C. Dodds](https://kentcdodds.com/blog/how-to-know-what-to-test)
- [Testing Implementation Details - Kent C. Dodds](https://kentcdodds.com/blog/testing-implementation-details)
- [Maestro Documentation](https://docs.maestro.dev/)
- [Maestro React Native Support](https://docs.maestro.dev/platform-support/react-native-support)