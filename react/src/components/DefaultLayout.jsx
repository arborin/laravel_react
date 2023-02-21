import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { token, setToken } = useStateContext();

    console.log(token);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Default Layout</h1>
            <Outlet />
        </div>
    );
}
