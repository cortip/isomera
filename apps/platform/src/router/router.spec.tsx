import { render } from '@testing-library/react'

import Router from './router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

describe('Router', () => {
  let queryClient: QueryClient

  beforeAll(() => {
    queryClient = new QueryClient()
  })

  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should have a sign in button', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    )
    expect(getByText(/Sign In/gi)).toBeTruthy()
  })
})
