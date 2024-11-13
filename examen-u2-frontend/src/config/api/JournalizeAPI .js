import axios from "axios";
// import { useAuthStore } from "../../features/security/store/useAuthStore";
const API_URL = 'https://localhost:7166/api';

//axios.defaults.baseURL = API_URL;

const journalizeApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
}); 


// const setAuthToken = () => { // colocar el token el header
//     const auth = getAuth();
//     if (auth) {
//         journalizeApi.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
//     }
  
//     delete journalizeApi.defaults.headers.common["Authorization"];
//   };


//   const getAuth = () => {
//     // ir a buscar el token en el locale storage
//     const lsToken = localStorage.getItem("token");
//     const lsRefreshToken = localStorage.getItem("refreshToken");
  
//     if (lsToken && lsRefreshToken) {
//       // si existe...
//       return { token: lsToken, refreshToken: lsRefreshToken };
//     }
//     return null;
//   };

//   setAuthToken();
  
//   let refreshingTokenPromise = null;



// journalizeApi.interceptors.response.use(
//     (config) => config,
//     (error) => {
//       const auth = getAuth(); //aqui esta el token y refreshToken
  
//       //response{status:401}
//       if (
//         error.response &&
//         error.response.status === 401 &&
//         auth &&
//         !refreshingTokenPromise
//       ) {
//         refreshingTokenPromise = journalizeApi.post(
//           "/auth/refresh-token",
//           {
//             token: auth.token, // este es el body de la peticíon
//             refreshToken: auth.refreshToken,
//           },
//           {
//             withCredentials: true,
//           }
//         ).then((response) => {
//           const setSession = useAuthStore.getState().setSession();
//           const user = {
//               email: response.data.data.email,
//               fullName: response.data.data.fullName,
//               tokenExpiration: response.data.data.tokenExpiration
//           };
//         });
//       }
//     }
//   );

// journalizeApi.interceptors.request.use(
//     (config) => {
//       const token = useAuthStore().getState().token;
//       if (token) {
//         config.headers["Authentication"] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );


export {
    journalizeApi,
    API_URL
}