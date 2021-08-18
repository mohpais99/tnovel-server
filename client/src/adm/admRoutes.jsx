import Dashboard from "./views/Dashboard"
import NovelArchive from "./views/NovelArchive"
import User from "./views/User"

const admRoutes = [
    {
        layout: "admpanel",
        path: "dashboard",
        name: "Dashboard",
        icon: "bx bxs-dashboard",
        component: Dashboard,
        status: 0,
        role: ['admin']
    },
    {
        layout: "admpanel",
        path: "users",
        name: "User",
        icon: "bx bxs-dashboard",
        component: User,
        status: 0,
        role: ['admin']
    },
    {
        layout: "admpanel",
        path: "novel",
        name: "Novel",
        icon: "bx bxs-dashboard",
        component: NovelArchive,
        status: 0,
        role: ['admin']
    }
]

export default admRoutes