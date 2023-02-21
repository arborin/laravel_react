import React, { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "../index.css";

export default function DefaultLayout() {
    const { token, setToken, user } = useStateContext();

    console.log(token);
    console.log(user);

    // if (!token) {
    //     return <Navigate to="/login" />;
    // }

    const logout = (e) => {
        e.preventDefault();
    };

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
                    <a href="#" className="btn-logout" onClick={logout}>
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
