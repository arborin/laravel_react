import React from "react";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <div>
            FOR GUEST USERS ONLY
            <Outlet />
        </div>
    );
}
