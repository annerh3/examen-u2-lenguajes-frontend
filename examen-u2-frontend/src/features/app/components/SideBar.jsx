import { BookOpen, FileText, House, LogOut, Logs, Users } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../../security/store/useAuthStore";

export const SideBar = () => {
    const user = JSON.parse(localStorage.getItem('user')) ?? 'USER'
    const logout = useAuthStore((state) => state.logout);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleClick = () => {
        logout();
        Navigate("/security/login"); 
    }

    return (
        <section className="flex h-screen bg-gray-100">
            <aside className="w-20 md:w-64 bg-white shadow-md flex flex-col">
                <div className="p-4">
                    <h2 className="hidden md:block text-2xl font-bold text-gray-800">Jornalizer</h2>
                    <span className="hidden md:block text-gray-600">
                        <Users className="inline-block mr-2" size={20} />
                        {user.name ?? 'USER - TESTING'}
                    </span>
                </div>
                <nav className="mt-6 flex flex-col flex-grow space-y-2">
                    <Link
                        to="dashboard"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                        <House size={25} />
                        <span className="hidden md:inline-block ml-2">Dashboard</span>
                    </Link>

                    <Link
                        to="/catalogo"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                        <BookOpen size={25} />
                        <span className="hidden md:inline-block ml-2">Catálogo de Cuentas</span>
                    </Link>

                    <Link
                        to="/partidas-contables"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                        <FileText size={25} />
                        <span className="hidden md:inline-block ml-2">Partidas Contables</span>
                    </Link>

                    <Link
                        to="/logs"
                        className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                        <Logs size={25} />
                        <span className="hidden md:inline-block ml-2">Application Logs</span>
                    </Link>

                    {isAuthenticated && (
                        <button
                            onClick={handleClick}
                            className="flex items-center px-4 py-2 text-gray-600 hover:bg-red-600 hover:text-white mt-auto"
                        >
                            <LogOut size={25} />
                            <span className="hidden md:inline-block ml-2">Cerrar Sesión</span>
                        </button>
                    )}
                </nav>
            </aside>
        </section>
    );
};
