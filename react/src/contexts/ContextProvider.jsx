import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState("");

    const setToken = (token) => {
        _setToken(token);

        console.log("SET TOKEN");

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider value={{ token, user, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

// --------------------------------------------------------------
export const useStateContext = () => useContext(StateContext);
