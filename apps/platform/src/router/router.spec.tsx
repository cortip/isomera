import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import Router from './router'
import { QueryClient, QueryClientProvider } from 'react-query'

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
