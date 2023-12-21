import { render } from '@testing-library/react'

import Routes from './router'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('Router', () => {
  let queryClient: QueryClient

  beforeAll(() => {
    queryClient = new QueryClient()
  })

  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should have a sign in button', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    )
    expect(getByText(/Sign In/gi)).toBeTruthy()
  })
})
