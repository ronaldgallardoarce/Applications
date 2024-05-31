import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ tokenValidated, auth, roleRequired, children }) => {
    // Verifica si el usuario está autenticado y cumple con el rol requerido
    if (!auth.auth && tokenValidated) {
        // Redirige al usuario si no está autenticado
        return <Navigate to="/login" replace />
    }
    else if (auth.auth && auth.user && auth.user.role !== roleRequired && tokenValidated) {
        // Redirige al usuario si el rol no coincide
        return <Navigate to="/unauthorized" />;
    }

    // Renderiza el componente de la ruta si el usuario está autenticado y tiene el rol requerido
    return children
    // return (
    //     <Routes>
    //         <Route path={mainRoute.path} element={mainRoute.element}>
    //             {routes.map((route, index) => (
    //                 <Route key={index} path={route.path} element={route.element} />
    //             ))}
    //         </Route>
    //     </Routes>
    // );
}

export default ProtectedRoute;