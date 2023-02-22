import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const onSubmit = (e) => {
        e.preventDefaults();
    };

    return (
        <div className="login-signup-form animated fadeInDonw">
            <div className="form">
                <h1 className="title">Login into your account</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered?{" "}
                        <Link to="/signup">Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
