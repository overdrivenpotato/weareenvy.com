import React from 'react'
import block from 'bem-cn'

const b = block('submit')

class Submit extends React.Component {
    constructor() {
        super()

        this.state = {
            name: '',
            email: '',
            link: '',
            info: '',
            submitted: false,
        }
    }

    nameChange = event => {
        this.setState({
            name: event.target.value
        })
    }

    emailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    linkChange = event => {
        this.setState({
            link: event.target.value
        })
    }

    linkValid = () => (
        /(https?:\/\/)?soundcloud.com\/[^\/]+\/[^\/]+/.test(this.state.link)
    )

    handleSubmit = e => {
        e.preventDefault()

        if(!this.state.name || !this.state.email || !this.linkValid()) {
            this.setState({ validate: true })
        } else {
            this.setState({ submitted: true })
            this.submit()
        }
    }

    submit = () => {
        const body = {
            type: this.props.choice,
            name: this.state.name,
            email: this.state.email,
            link: this.state.link,
            info: this.state.info,
        }

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
    }

    render() {
        return <div className={b}>
            <h1 className={b('title')}>
                {this.props.choice || 'Choose a submission target'}
            </h1>

            <form className={b('content')} onSubmit={this.handleSubmit}>
                <div className={b('screen', {hidden: !this.props.choice, submitted: this.state.submitted})}>
                    {
                        this.state.submitted ?
                            "Thanks for submitting!" :
                            null
                    }
                </div>

                <div className={b('heading', { recheck: this.state.validate && !this.state.name })}>Name</div>
                <input
                    className={b('field')}
                    type="text"
                    placeholder="Full name"
                    value={this.state.name}
                    onChange={this.nameChange} />

                <div className={b('heading', { recheck: this.state.validate && !this.state.email })}>Email</div>
                <input
                    className={b('field')}
                    type="email"
                    placeholder="email@example.com"
                    value={this.state.email}
                    onChange={this.emailChange} />

                <div className={b('heading', { recheck: this.state.validate && !this.linkValid() })}>Link</div>
                <input
                    className={b('field')}
                    type="link"
                    placeholder="Working soundcloud link"
                    value={this.state.link}
                    onChange={this.linkChange} />

                <div className={b('heading')}>Additional info</div>
                <textarea
                    className={b('field', {type: 'info'})}
                    placeholder="Any additional info you may have" />

                <input
                    className={b('submit')}
                    value="Submit"
                    type="submit" />
            </form>
        </div>
    }
}

export default Submit
