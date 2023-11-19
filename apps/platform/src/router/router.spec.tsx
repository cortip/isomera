import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import Router from './router'
import { store } from '../redux/store'
import { Provider } from 'react-redux'

describe('Router', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should have a sign in button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    )
    expect(getByText(/Sign In/gi)).toBeTruthy()
  })
})
