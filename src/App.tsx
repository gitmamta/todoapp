import { Link, Outlet } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/">Todo</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Outlet />
    </>
  )
}

export default App
