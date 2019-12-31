import React from "react";
import "./Auth.css";
import { connect } from 'react-redux';
import { register, login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class AuthPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            msg: null,
            isLogin: true
        }
    }

    switchButtonHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        // create user object
        const newUser = {
            email,
            password
        }

        if (!this.state.isLogin) {
            this.props.register(newUser);
        } else {
            this.props.login(newUser);
        }
    };

    render() {
        console.log("AUTH Componnet? ", this.state.isLogin)

        return (
            <form className="auth-form" onSubmit={this.handleSubmit}>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} />
                </div>

                <div className="form-actions">
                    <button type="submit">Submit</button>

                    <button type="button" onClick={this.switchButtonHandler}>
                        Switch to {this.state.isLogin ? "Sign Up" : "Log In"}
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    { register, login }
)(AuthPage)
// export default AuthPage;