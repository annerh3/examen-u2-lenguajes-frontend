import { BookOpen, FileText, House, LogOut, Users } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../../security/store/useAuthStore";

export const SideBar = () => {
    const user = JSON.parse(localStorage.getItem('user')) ?? 'USER'
    const logout = useAuthStore((state) => state.logout);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleClick = () =>{
     logout();
     Navigate("/security/login"); 
    }
  return (
    <section className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Jornalizer</h2>
          <span className="block text-gray-60">
            <Users className="inline-block mr-2" size={20} />
            {user.name ?? 'USER - TESTING'}
          </span>
        </div>
        <nav className="mt-6 flex flex-col flex-grow">

          
          <Link
            to="dashboard"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <House className="inline-block mr-2" size={25} />
            Dashboard
          </Link>

          <Link
            to="/catalogo"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <BookOpen className="inline-block mr-2" size={25} />
            Catálogo de Cuentas
          </Link>

          <Link
            to="/partidas-contables"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <FileText className="inline-block mr-2" size={25} />
            Partidas Contables
          </Link>

          {isAuthenticated
          ? (
            <button
            onClick={handleClick}
            className="block px-4 py-2 text-gray-600 hover:bg-red-600 hover:text-white mt-80"
          >
            <LogOut className="inline-block mr-2" size={25} />
            Cerrar Sesión
          </button>
          ):('')}
        </nav>
      </aside>
    </section>
  );
};
