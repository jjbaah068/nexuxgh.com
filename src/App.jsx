import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./pages/home";
import Services from "./pages/services";
import About from "./pages/about";
import Work from "./pages/work";
import Contact from "./pages/contact";
import Insight from "./pages/insight";
import ScrollToTop from "./components/scrolltop";
import InsightArticle from "./pages/insightarticle";

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
            { path: "/insight/:slug", element: <InsightArticle /> },
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