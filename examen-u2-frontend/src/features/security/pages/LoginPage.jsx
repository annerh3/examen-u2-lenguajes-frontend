import { useFormik } from "formik";
import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginInitValues, loginValidationSchema } from "../forms/login_data";
import { isObjectEmpty } from "../../../shared/utils";
import { mirage } from "ldrs";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../store/useAuthStore";

export const LoginPage = () => {
 
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  // mirage.register();

 // const login = useAuthStore((state) => state.login);
  //const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/my-events");
  //   }
  // }, [isAuthenticated]);
  const navigate = useNavigate();
  mirage.register();

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      //navigate("/my-events");
      alert("Bienvenido!")
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: loginInitValues,
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (formValues) => {
      //formik.resetForm(); // <-- Vaciar inputs del form
      console.log(formValues);
      setLoading(true);
      const { error, message } = await login(formValues);
      setLoading(false);
      console.log('error es: -->', error)  
      
      
      if (error) {
        toast.error(`${message}`, {
          position: "top-center",
          autoClose: 2500, 
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
        });
      }
    },
  });




  return (
    <section
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/path/to/your/background.jpg')" }}
    >
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={formik.handleSubmit} id='loginForm'>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-yellow-500 text-xs my-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.password && formik.errors.password && (
              <div className="text-yellow-500 text-xs my-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {!loading ? (
            <button
              className={`transition duration-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block 
                ${
                  !isObjectEmpty(formik.errors)
                    ? "cursor-not-allowed bg-gray-300 text-black"
                    : "bg-yellow-700 text-white hover:bg-yellow-900"
                }
                `}
              type="submit"
              disabled={!isObjectEmpty(formik.errors)}
            >
              Login
            </button>
          ) : (
            <span className="flex justify-center">
              <l-mirage size="80" speed="2.5" color="#a16207"></l-mirage>
            </span>
          )}
        </form>
      </div>
    </section>
  );
};
