import { Filter, PlusCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CreateAccountForm, CreateJournalEntryForm } from '../components'

// Tipo para una partida contable
// type Partida = {
//   id: string
//   fecha: string
//   descripcion: string
//   debe: number
//   haber: number
// }

// Componente principal
// export default function Accounting() {
export const Accounting = () => {
  const [partidas, setPartidas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Simula una llamada a la API para obtener partidas
  const fetchPartidas = async () => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', fecha: '2023-06-01', descripcion: 'Venta de mercancía', debe: 1000, haber: 0 },
          { id: '2', fecha: '2023-06-02', descripcion: 'Pago de salarios', debe: 0, haber: 2000 },
          { id: '3', fecha: '2023-06-03', descripcion: 'Compra de suministros', debe: 500, haber: 0 },
          { id: '4', fecha: '2023-06-04', descripcion: 'Pago de alquiler', debe: 0, haber: 1500 },
          { id: '5', fecha: '2023-06-05', descripcion: 'Ingreso por servicios', debe: 3000, haber: 0 },
        ])
      }, 500)
    })

    
    const filtered = response.filter(partida => 
      (dateRange.from === '' || partida.fecha >= dateRange.from) &&
      (dateRange.to === '' || partida.fecha <= dateRange.to) &&
      partida.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setPartidas(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
  }

  useEffect(() => {
    fetchPartidas()
  }, [searchTerm, dateRange, itemsPerPage])

  const paginatedPartidas = partidas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target
    setDateRange(prev => ({ ...prev, [name]: value }))
  }


  const [isFormOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);


  return (
    <div className=" flex bg-gray-100">
      {/* Main content */}
      <main className="flex-1 p-8 ">

        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Partidas Contables</h1>
          <button
           onClick={openForm}
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
           <PlusCircle className="mr-2 h-4 w-4 " /> Crear Partida
          </button>

          <CreateJournalEntryForm isOpen={isFormOpen} onClose={closeForm} />
          
        </div>

        <div className="mb-6 bg-white shadow-md rounded-lg p-4">
          {/* <h3 className="text-xl font-semibold mb-4">Filtros</h3> */}
          <div className="flex space-x-4">
            <Filter className="mt-5" />
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input
                id="search"
                type="text"
                placeholder="Buscar partidas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-2 py-1"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rango de Fechas</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="from"
                  value={dateRange.from}
                  onChange={handleDateRangeChange}
                  className="w-full border border-gray-300 rounded-md py-1"
                />
                <input
                  type="date"
                  name="to"
                  value={dateRange.to}
                  onChange={handleDateRangeChange}
                  className="w-full border border-gray-300 rounded-md py-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Debe</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Haber</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPartidas.map((partida) => (
                <tr key={partida.id} className="border-b">
                  <td className="px-6 py-4">{partida.fecha}</td>
                  <td className="px-6 py-4">{partida.descripcion}</td>
                  <td className="px-6 py-4 text-right">${partida.debe.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">${partida.haber.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, partidas.length)} de {partidas.length} resultados
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="w-24 border border-gray-300 rounded-md py-1"
            >
              <option value="10">10 / pág</option>
              <option value="20">20 / pág</option>
              <option value="50">50 / pág</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded-md bg-gray-100 text-gray-600 disabled:opacity-50"
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded-md bg-gray-100 text-gray-600 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
