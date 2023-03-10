import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordRef.current.value,
        };

        console.log(payload);

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                console.log("HERE AM I");
                console.log(data);
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
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
            <input ref={nameRef} type="text" placeholder="Full name" />
            <input ref={emailRef} type="text" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already registered? <Link to="/login">Sign in</Link>
            </p>
        </form>
    );
}
