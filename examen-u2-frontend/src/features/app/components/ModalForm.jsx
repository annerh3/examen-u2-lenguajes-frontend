export default function ModalForm({ isOpen, onClose }) {
  // Si el modal está abierto, mostramos el contenido
  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica para manejar el envío del formulario
    console.log('Formulario enviado');
    onClose(); // Cerrar el modal después del envío
  };

  return (
    <>
      {/* Fondo sombreado */}
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>

      {/* Contenedor del formulario */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Formulario Emergente</h2>
          
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Nombre:</label>
              <input 
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
