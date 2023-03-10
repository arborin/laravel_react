import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { token, setToken } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-signup-form animated fadeInDonw">
            <div className="form">
                <Outlet />
            </div>
        </div>
    );
}
