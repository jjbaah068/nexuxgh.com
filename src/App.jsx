import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import Services from "./pages/services";

const nexuxRouter = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/services", element: <Services/>},
])

function App() {

  return (
    <>
      <RouterProvider router={nexuxRouter} />
    </>
  )
}

export default App
