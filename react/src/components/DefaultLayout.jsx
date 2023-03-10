import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import "../index.css";

export default function DefaultLayout() {
    const { token, setToken, user, setUser } = useStateContext();

    console.log(token);
    console.log(user);

    // if (!token) {
    //     return <Navigate to="/login" />;
    // }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
    };

    useEffect(() => {
        axiosClient.get("/users").then((data) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>HEADER</div>
                    <div>{user.name}</div>
                    <a href="#" className="btn-logout" onClick={onLogout}>
                        Logout
                    </a>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
