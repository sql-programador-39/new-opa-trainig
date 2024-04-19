import { Outlet } from "react-router-dom"
import Nav from "../components/Nav/Nav"

const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer> 
    </>
  )
}

export default Layout
