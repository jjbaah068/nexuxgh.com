import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import Services from "./pages/services";
import About from "./pages/about";
import Work from "./pages/work"
import Contact from "./pages/contact"

const nexuxRouter = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/services", element: <Services/>},
  {path: "/about", element: <About/>},
  {path: "/work", element: <Work/>},
  {path: "/contact", element: <Contact/>},
])

function App() {

  return (
    <>
      <RouterProvider router={nexuxRouter} />
    </>
  )
}

export default App
