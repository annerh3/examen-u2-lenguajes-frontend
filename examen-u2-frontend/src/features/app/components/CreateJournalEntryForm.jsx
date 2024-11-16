import { useFormik } from "formik";
import { Delete } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JournalEntryInitValues, JournalEntryValidationSchema } from "../forms";
import { mirage } from "ldrs";
import { useJournalEntryStore } from "../store/useJournalEntry";
import { useEffect, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";

export const CreateJournalEntryForm = ({ isOpen, onClose }) => {

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
const { accounts, loadChildAccounts, isLoading} = useAccounts();
    

useEffect(() => {
    if (fetching) {
    loadChildAccounts();
    setFetching(false);
  }
}, [fetching]);

mirage.register();

const createJournalEntry = useJournalEntryStore((state) => state.createJournalEntry);
// console.log(createJournalEntry)

  const formik = useFormik({
    initialValues: JournalEntryInitValues,
    validationSchema: JournalEntryValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {

        const formattedData = {
          ...values,
          date: new Date(values.date).toISOString(),
        };
        setLoading(true)
        const { error, message } = await createJournalEntry(formattedData);
        setLoading(false)

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

  const handleAddEntry = () => {
    const newEntry = { accountId: "", amount: "", muvType: "" };
    formik.setFieldValue("accountsEntrys", [
      ...formik.values.accountsEntrys,
      newEntry,
    ]);
  };

  const handleRemoveEntry = (index) => {
    const newEntrys = formik.values.accountsEntrys.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("accountsEntrys", newEntrys);
  };

  const handleCancel = () => {
    formik.resetForm();
    onClose(); 
  };

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
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
        <div className="bg-gray-100 p-8 rounded-xl shadow-lg max-w-5xl w-[90%]">
          <h2 className="text-xl font-semibold mb-4">Crear Partida Contable</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Primera sección */}
              <section className="bg-white p-4 rounded">
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700">
                    Descripción:
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className={`w-full p-2 border rounded-md ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-700">
                    Fecha:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className={`w-full p-2 border rounded-md ${
                      formik.touched.date && formik.errors.date
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("date")}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.date}
                    </div>
                  )}
                </div>
              </section>

              {/* Segunda sección */}
              <section className="bg-white p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">
                  Cuentas de Movimiento
                </h3>
                <div className="overflow-y-auto h-48 max-h-48 p-4 rounded-md">
                  {formik.values.accountsEntrys.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-4"
                    >
                      <select
                        className={`w-1/2 p-2 border rounded-md ${
                          formik.touched.accountsEntrys?.[index]?.accountId &&
                          formik.errors.accountsEntrys?.[index]?.accountId
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        {...formik.getFieldProps(
                          `accountsEntrys.${index}.accountId`
                        )}
                      >
                        <option value="">Seleccione Cuenta</option>
                        {
                        !isLoading ? (
                          accounts.data.map((account) => (
                            <option key={account.id} value={account.id}>
                              {account.accountName}
                              
                            </option>
                        ))):("")                  
                        }
                      </select>

                      <input
                        type="number"
                        placeholder="Monto"
                        className={`w-1/4 p-2 border rounded-md ${
                          formik.touched.accountsEntrys?.[index]?.amount &&
                          formik.errors.accountsEntrys?.[index]?.amount
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        {...formik.getFieldProps(
                          `accountsEntrys.${index}.amount`
                        )}
                      />

                      <select
                        className={`w-1/4 p-2 border rounded-md ${
                          formik.touched.accountsEntrys?.[index]?.muvType &&
                          formik.errors.accountsEntrys?.[index]?.muvType
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        {...formik.getFieldProps(
                          `accountsEntrys.${index}.muvType`
                        )}
                      >
                        <option value="">Tipo</option>
                        <option value="C">Crédito</option>
                        <option value="D">Débito</option>
                      </select>

                      <button
                        type="button"
                        className="p-2 bg-red-500 text-white rounded"
                        onClick={() => handleRemoveEntry(index)}
                      >
                        <Delete />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleAddEntry}
                >
                  Agregar Cuenta
                </button>
              </section>
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancelar
              </button>

              {formik.isSubmitting ? (
                <span className="flex justify-center items-center">
                  <l-mirage size="80" speed="2.5" color="#a16207"></l-mirage>
                </span>
              ) : (
                <button
                  type="submit"
                  className={`px-4 py-2 rounded text-white ${
                    formik.isSubmitting
                      ? "bg-gray-300"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={formik.isSubmitting}
                >
                  Enviar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
