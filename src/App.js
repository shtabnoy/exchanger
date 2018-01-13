import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './reducers'
import Layout from './components/Layout'

const store = createStore(appReducers)

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
