import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthContextProvider from "./context/authReducer/authContext";
import './assets/css/index.css'
import { Provider } from 'react-redux';
import store from "./redux/reducer";
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
    // </AuthContextProvider>
  // </React.StrictMode>
  ,
)
