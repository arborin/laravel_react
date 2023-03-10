import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        console.log(payload);

        setErrors(null);

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                console.log("LOGIN DATA");
                console.log(data);
                console.log("LOGIN DATA");
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors(response.data);
                    }
                }
            });
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => {
                        return <p key={key}>* {errors[key]}</p>;
                    })}
                </div>
            )}
            <input ref={emailRef} type="text" placeholder="email" />
            <input ref={passwordRef} type="password" placeholder="password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not registered? <Link to="/signup">Create an Account</Link>
            </p>
        </form>
    );
}
