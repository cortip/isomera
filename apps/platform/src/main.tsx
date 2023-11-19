import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import Router from './router/router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
