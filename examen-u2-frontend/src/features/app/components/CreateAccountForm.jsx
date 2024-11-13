import { useFormik } from 'formik';
import { createAccountInitValues, createAccountValidationSchema } from '../forms';
import { isObjectEmpty } from '../../../shared/utils';

export const CreateAccountForm = ({ isOpen, onClose }) => {

  // Configuración de Formik con el esquema de validación y valores iniciales
  const formik = useFormik({
    initialValues: createAccountInitValues,
   validationSchema: createAccountValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log('Formulario enviado:', values);
      formik.resetForm();
      onClose(); // Cierra el modal al enviar el formulario
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    onClose(); 
  }
  
  // Si el modal está cerrado, no se renderiza nada
  if (!isOpen) return null;

  return (
    <div>
      {/* Fondo sombreado */}
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>

      {/* Contenedor del formulario */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Crear Cuenta en Catálogo</h2>
          
          <form onSubmit={formik.handleSubmit}>
            {/* Toggle para Cuenta Padre */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isParentAccount"
                name="isParentAccount"
                checked={formik.values.isParentAccount}
                onChange={formik.handleChange}
                className="mr-2"
              />
              <label htmlFor="isParentAccount" className="text-gray-700">¿Es cuenta padre?</label>
            </div>

            {/* Campo PreCódigo */}
            {!formik.values.isParentAccount && (
              <div className="mb-4">
                <label htmlFor="precode" className="block text-gray-700">PreCódigo:</label>
                <input
                  type="number"
                  id="precode"
                  name="precode"
                  className={`w-full p-2 border ${formik.touched.precode && formik.errors.precode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.precode}
                />
                {formik.touched.precode && formik.errors.precode ? (
                  <div className="text-red-500 text-sm">{formik.errors.precode}</div>
                ) : null}
              </div>
            )}

            {/* Campo Código */}
            <div className="mb-4">
              <label htmlFor="code" className="block text-gray-700">Código:</label>
              <input
                type="number"
                id="code"
                name="code"
                className={`w-full p-2 border ${formik.touched.code && formik.errors.code ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                required
              />
              {formik.touched.code && formik.errors.code ? (
                <div className="text-red-500 text-sm">{formik.errors.code}</div>
              ) : null}
            </div>

            {/* Campo Nombre */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`w-full p-2 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Campo Correo Electrónico */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full p-2 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!isObjectEmpty(formik.errors)}
                className={`transition duration-200 px-4 py-2 hover:shadow-md text-white rounded-md font-semibold text-center inline-block 
                  ${
                    !isObjectEmpty(formik.errors)
                      ? "cursor-not-allowed bg-gray-300 text-black"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                  `}      
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
