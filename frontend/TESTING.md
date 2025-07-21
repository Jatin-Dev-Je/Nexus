# Testing Guide

## Overview
This project uses multiple testing strategies to ensure reliability and quality:

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Component interactions
- **E2E Tests**: Cypress (configured but requires installation)

## Running Tests

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### E2E Tests (Cypress)
```bash
# Install Cypress (not included due to size)
npm install --save-dev cypress

# Open Cypress Test Runner
npx cypress open

# Run headless tests
npx cypress run
```

## Test Structure

### Unit Tests Location
```
__tests__/
├── ContentCard.test.tsx
├── helpers.test.ts
└── ... (additional test files)
```

### Test Coverage Goals
- **Components**: All major UI components
- **Utilities**: All helper functions
- **Redux**: Actions and reducers
- **Hooks**: Custom hooks
- **API**: Mock API responses

### Example Test Patterns

#### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import ComponentName from '@/components/ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <ComponentName />
      </Provider>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

#### Hook Testing
```typescript
import { renderHook } from '@testing-library/react';
import { useCustomHook } from '@/hooks/useCustomHook';

describe('useCustomHook', () => {
  it('returns expected values', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.value).toBe('expected');
  });
});
```

#### Redux Testing
```typescript
import store from '@/store';
import { actionName } from '@/store/slices/sliceName';

describe('Redux Actions', () => {
  it('updates state correctly', () => {
    store.dispatch(actionName(payload));
    const state = store.getState();
    
    expect(state.sliceName.property).toBe(expectedValue);
  });
});
```

## Mock Data

### API Mocking
```typescript
// In tests, mock API calls
jest.mock('@/store/api/contentApi', () => ({
  useGetNewsQuery: jest.fn(() => ({
    data: mockNewsData,
    isLoading: false,
    error: null,
  })),
}));
```

### Sample Mock Data
```typescript
const mockContentItem = {
  id: 'test-1',
  type: 'news',
  title: 'Test Article',
  description: 'Test description',
  imageUrl: 'https://example.com/image.jpg',
  url: 'https://example.com/article',
  timestamp: '2023-12-01T12:00:00Z',
  category: 'technology',
  isFavorite: false,
  data: { /* full article data */ },
};
```

## Testing Best Practices

### 1. Test Behavior, Not Implementation
- Test what the user sees and does
- Avoid testing internal component state
- Focus on user interactions and outcomes

### 2. Use Proper Selectors
```typescript
// Good: Test user-visible text
screen.getByText('Login')

// Good: Test by role
screen.getByRole('button', { name: 'Submit' })

// Avoid: Test by class names or IDs
screen.getByClassName('submit-btn')
```

### 3. Mock External Dependencies
- API calls
- Browser APIs (localStorage, etc.)
- Third-party libraries

### 4. Test Error States
```typescript
it('handles error states', () => {
  // Mock API error
  const mockError = new Error('API Error');
  
  render(<ComponentWithError error={mockError} />);
  
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
```

### 5. Test Loading States
```typescript
it('shows loading spinner', () => {
  render(<ComponentWithLoading isLoading={true} />);
  
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});
```

## Accessibility Testing

### Screen Reader Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  
  expect(results).toHaveNoViolations();
});
```

## Performance Testing

### React Testing Library Performance
```typescript
import { render, screen, waitFor } from '@testing-library/react';

it('renders large lists efficiently', async () => {
  const start = performance.now();
  
  render(<LargeList items={largeItemArray} />);
  
  await waitFor(() => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
  
  const end = performance.now();
  expect(end - start).toBeLessThan(1000); // Should render in under 1s
});
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run build
```

## Test Data Management

### Fixtures
Create reusable test data:
```typescript
// __tests__/fixtures/contentData.ts
export const mockNewsArticle = {
  // ... mock data
};

export const mockMovieData = {
  // ... mock data
};
```

### Test Utilities
```typescript
// __tests__/utils/testUtils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
```

## Code Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Debugging Tests

### VSCode Configuration
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Jest Tests",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Common Issues
1. **Redux State**: Ensure proper store setup in tests
2. **Async Operations**: Use waitFor or findBy queries
3. **Mock Cleanup**: Clean up mocks between tests
4. **Environment Variables**: Mock env vars in tests

## Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
