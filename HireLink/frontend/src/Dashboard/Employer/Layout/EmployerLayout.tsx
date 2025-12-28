import { Outlet } from "react-router"
import { Header } from "../../../Components/Header"
import { Footer } from "../../../Components/Footer"
import { EmployerDashboardNav } from "../component/EmployerDashboardNav"

const EmployerLayout = () => {
    return (
        <main>
            {/* Navbar */}
            <EmployerDashboardNav/>

            <Outlet />

            <Footer />
        </main>
    )
}

export default EmployerLayout