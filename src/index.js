import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducers from './reducers'
import App from './containers/App'

const store = createStore(
    appReducers,
    applyMiddleware(thunk)
)

export default class ExchangerWidget extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

