import Dashboard from "./views/Dashboard"
import NovelArchive from "./views/NovelArchive"
import { ViewNovel } from "./views/Pages"
import User from "./views/User"
// import {ViewNovel} from './views/Pages';

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
        icon: "bx bxs-user-account",
        component: User,
        status: 0,
        role: ['admin']
    },
    {
        layout: "admpanel",
        path: "novel",
        name: "Novel",
        icon: "bx bx-folder",
        component: NovelArchive,
        status: 0,
        role: ['admin']
    },
    {
        layout: "admpanel",
        path: "comment",
        name: "Comment",
        icon: "bx bxs-bx bx-chat",
        component: NovelArchive,
        status: 0,
        role: ['admin']
    },
    {
        layout: "admpanel",
        path: "setting",
        name: "Setting",
        icon: "bx bx-cog",
        component: NovelArchive,
        status: 0,
        role: ['admin']
    },
    {
        layout: "admpanel",
        path: "novel/view/:novel_slug",
        name: "Novel Detail",
        component: ViewNovel,
        status: 1,
        role: ['admin']
    }
]

export default admRoutes