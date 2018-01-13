import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import appReducers from './reducers'
import Layout from './components/Layout'

const store = createStore(
    appReducers,
    applyMiddleware(thunk)
)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        )
    }
}

export default App
