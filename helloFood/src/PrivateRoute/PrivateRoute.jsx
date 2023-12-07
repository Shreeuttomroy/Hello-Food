import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
    const {user,loading}= useContext(AuthContext)
    if (loading) {
        return <div className=" w-full flex justify-center h-full"><span className="loading self-center loading-spinner loading-lg"></span></div>
    }
    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }
    return children;
}

export default PrivateRoute;