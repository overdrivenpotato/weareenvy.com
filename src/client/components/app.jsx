import React from 'react'
import block from 'bem-cn'
import Submit from './submit'
import Header from './header'
import Packages from './packages'

const b = block('app')

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            choice: ''
        }
    }

    render() {
        return <section className={b}>
            <Header />
            <Packages choice={this.state.choice} choose={choice => this.setState({choice})} />
            <Submit choice={this.state.choice} />
        </section>
    }
}

export default App
