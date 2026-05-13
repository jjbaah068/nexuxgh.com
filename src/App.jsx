import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./pages/home";
import Services from "./pages/services";
import About from "./pages/about";
import Work from "./pages/work";
import Contact from "./pages/contact";
import Insight from "./pages/insight";
import ScrollToTop from "./components/scrolltop";

function RootLayout() {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
}

const nexuxRouter = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/services", element: <Services /> },
            { path: "/about", element: <About /> },
            { path: "/work", element: <Work /> },
            { path: "/contact", element: <Contact /> },
            { path: "/insight", element: <Insight /> },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={nexuxRouter} />
        </>
    );
}

export default App