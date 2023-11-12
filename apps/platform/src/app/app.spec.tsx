import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import App from './app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should have a sign in button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
    expect(getByText(/Sign In/gi)).toBeTruthy()
  })
})
