import { h, render, Component } from 'preact'
import { createStore, Provider, connect } from 'unistore/full/preact'
import {MobxApp} from './mobx-app'
import { HtmComponent } from '@demo/components'
import {observable} from 'mobx'
import React from 'preact/compat'
import {observer , useObserver} from 'mobx-react'

//@ts-ignore
window["React"] = React
window["h"] = h

import './style.less'

interface State {
  count: number
}

let store = createStore<State>({ count: 0 })

let actions = () => ({
  increment (state: State): State {
    return { count: state.count + 1 }
  },

  decrement (state: State): State {
    return { count: state.count - 1 }
  }
})

interface Props {
  count?: number,
  increment?: any,
  decrement?: any
}

@connect('count', actions)
class UnistoreApp extends Component<Props, any> {
  render () {
    return (
      <div>
          <p>Count: {this.props.count}</p>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.props.decrement}>Decrement</button>
      </div>
    )
  }
}


@observer
class ComponentStateApp extends Component<Props, any> {
  @observable
  state = {
    count: 0
  }

  increment = () => {
    const current = this.state.count
    const next = current+1
    this.setState({count: next})
  }
  
  decrement = () => {
    const current = this.state.count
    const next = current-1
    this.setState({count: next})
  }

  render () {
    return (
      <div>
          <p>Count: {this.state.count}</p>
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
      </div>
    )
  }
}


//same thing, just in a different file, will make it keep state on reaload
import {CounterValue} from './store'
var CounterValue1 = observable({
    count: 0,
    increment: () => CounterValue.count = CounterValue.count+1,
    decrement: () => CounterValue.count = CounterValue.count-1
})

class JustCopyPasteMobxEz extends Component<Props, any> {
  render () {
    return useObserver(() => (
      <div>
          <p>Count: {CounterValue.count}</p>
          <button onClick={CounterValue.increment}>Increment</button>
          <button onClick={CounterValue.decrement}>Decrement</button>
      </div>
    ))
  }
}


class App extends Component<Props, any> {
  render () {
    return (
      <div>
        <header>Unistore Counter</header>
        <section>
			<UnistoreApp/>
        </section>

        <header>Mobx Counter</header>
        <section>
          <MobxApp/>
        </section>

        <header>Component State Counter</header>
        <section>
          <ComponentStateApp/>
        </section>

        <header>Why i've never used setState</header>
        <section>
          <JustCopyPasteMobxEz/>
        </section>

        <HtmComponent/>
      </div>
    )
  }
}

const mountApp = ({selector}) => {
  render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.querySelector(selector))
}

mountApp({selector: "#app"})

export {mountApp}

// render((
//   <Provider store={store}>
//     <App />
//   </Provider>
// ), document.getElementById('content'))
//document.body also works fine


if (process.env.NODE_ENV === 'development') {
  if(module && module['hot']){
      module['hot'].accept()
  }
}
