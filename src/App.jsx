import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";

const nexuxRouter = createBrowserRouter([
  {path: "/", element: <Home/>},
])

function App() {

  return (
    <>
      <RouterProvider router={nexuxRouter} />
    </>
  )
}

export default App
