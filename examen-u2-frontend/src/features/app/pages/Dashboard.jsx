import { BarChart, DollarSign, PlusCircle } from "lucide-react";
import { CreateJournalEntryForm } from "../components";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [isFormOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  // Estos datos deberían venir de tu backend en una aplicación real
  const ultimasPartidas = [
    {
      id: 1,
      descripcion: "Venta de servicios",
      monto: 5000,
      fecha: "2023-06-15",
    },
    {
      id: 2,
      descripcion: "Pago de salarios",
      monto: -3000,
      fecha: "2023-06-14",
    },
    {
      id: 3,
      descripcion: "Compra de suministros",
      monto: -500,
      fecha: "2023-06-13",
    },
  ];

  const saldoGeneral = 15000;
  return (
    <main className="flex-1 p-8 w-full h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Saldo General */}
        <div className="rounded-lg border bg-white text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Saldo General
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-3xl font-bold text-green-600">
              ${saldoGeneral.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Accesos Rápidos
            </h3>
          </div>
          <div className="p-6 pt-0 flex gap-4">
            <button
              className="flex items-center px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-900"
              onClick={openForm}
            >
              <PlusCircle className="mr-2 h-4 w-4 " /> Nueva Partida
            </button>
            <CreateJournalEntryForm isOpen={isFormOpen} onClose={closeForm} />

            <Link
              to="/logs"
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              <BarChart size={25} />
              <span className="hidden md:inline-block ml-2">Ver Reportes</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white text-card-foreground shadow-sm mb-6 ">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Últimas Partidas Registradas
          </h3>
          <p className="text-sm text-muted-foreground">
            Resumen de las transacciones más recientes
          </p>
        </div>
        <div className="p-6 pt-0 h-[200px] overflow-y-auto">
          {ultimasPartidas.map((partida) => (
            <div
              key={partida.id}
              className="flex items-center justify-between py-4 border-b last:border-0"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                  <DollarSign
                    className={
                      partida.monto > 0 ? "text-green-500" : "text-red-500"
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {partida.descripcion}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {partida.fecha}
                  </p>
                </div>
              </div>
              <div
                className={`font-medium ${
                  partida.monto > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${Math.abs(partida.monto).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
