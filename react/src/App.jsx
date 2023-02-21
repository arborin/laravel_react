import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import router from "./router";

function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    );
}

export default App;
