import { useFormik } from 'formik';
import { createAccountInitValues, createAccountValidationSchema } from '../forms';
import { isObjectEmpty } from '../../../shared/utils';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAccountStore } from '../store/useAccountStore';
import { useState } from 'react';
import { mirage } from 'ldrs';

export const CreateAccountForm = ({ isOpen, onClose }) => {
  // Configuración de Formik con el esquema de validación y valores iniciales
  const [loading, setLoading] = useState(false);
  mirage.register();
  const createAccount = useAccountStore((state) => state.createAccount);
  
  const formik = useFormik({
    initialValues: createAccountInitValues,
    validationSchema: createAccountValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      if (!values.isParentAccount) {
        values.parentId = "6e88e7bc-f0ea-4bf8-aa49-7edb8ceb575f"; 
      } else {
        values.parentId = null; // Deja como null si es cuenta padre
      }
      delete values.isParentAccount;

      console.log('Formulario enviado:', values);
      setLoading(true);
      const { error, message } = await createAccount(values);
      setLoading(false);
         
      formik.setErrors({}); 
      formik.resetForm(); 
      
      if (error) {
        toast.error(`${message}`, {
          position: "top-center",
          autoClose: 4500, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       
      } else{
        toast.success(`${message}`, {
          position: "top-center",
          autoClose: 2500,  // <----------------
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: onClose,
        })
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    onClose(); 
  };
  
  // Si el modal está cerrado, no se renderiza nada
  if (!isOpen) return null;

  return (
    <div>
      <ToastContainer
                  position="top-center"
                  autoClose={1300}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
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
              <label htmlFor="accountName" className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                className={`w-full p-2 border ${formik.touched.accountName && formik.errors.accountName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accountName}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.accountName}</div>
              ) : null}
            </div>

            {/* Campo Tipo de Movimiento */}
            <div className="mb-4">
              <label htmlFor="behaviorType" className="block text-gray-700">Tipo de Movimiento:</label>
              <select
                id="behaviorType"
                name="behaviorType"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={formik.handleChange}
                value={formik.values.behaviorType}
              >
                <option value="*">Seleccione una opción</option>
                <option value="C">Crédito</option>
                <option value="D">Débito</option>
              </select>
              {formik.touched.behaviorType && formik.errors.behaviorType ? (
                <div className="text-red-500 text-sm">{formik.errors.behaviorType}</div>
              ) : null}
            </div>

            {/* Campo Permite Movimientos */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="allowsMovement"
                name="allowsMovement"
                checked={formik.values.allowsMovement}
                onChange={formik.handleChange}
                className="mr-2"
              />
              <label htmlFor="allowsMovement" className="text-gray-700">¿Permite Movimientos?</label>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-2 items-center">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
              {!loading ?(
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
              ):
              (
                <span className="flex justify-center">
                 <l-mirage size="80" speed="2.5" color="purple"></l-mirage>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
