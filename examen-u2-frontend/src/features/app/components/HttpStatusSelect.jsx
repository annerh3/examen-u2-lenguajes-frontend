import { errorDictionary } from "../../../shared/utils/errorDictionary";

export const HttpStatusSelect = ({ formik }) => {
    const options = [];
  
    // Iteramos sobre el diccionario de errores
    for (let code in errorDictionary) {
      if (errorDictionary.hasOwnProperty(code)) {
        const { name } = errorDictionary[code];
        options.push(
          <option key={code} value={code}>
            {code} - {name}
          </option>
        );
      }
    }
  
    return (
      <div>
        <select
          id="code"
          name= "code"
          onChange={formik.handleChange}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="default">Busca por código HTTP</option>
          {options}
        </select>
      </div>
    );
  };