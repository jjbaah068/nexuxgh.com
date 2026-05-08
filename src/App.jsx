import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import Services from "./pages/services";
import About from "./pages/about";

const nexuxRouter = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/services", element: <Services/>},
  {path: "/about", element: <About/>},
])

function App() {

  return (
    <>
      <RouterProvider router={nexuxRouter} />
    </>
  )
}

export default App
