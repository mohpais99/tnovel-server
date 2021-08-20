import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";

const authRoutes = [
    {
        layout: "auth",
        path: "sign-in",
        name: "Sign In",
        component: SignIn,
    },
    {
        layout: "auth",
        path: "sign-up",
        name: "Sign Up",
        component: SignUp,
    }
]

export default authRoutes;