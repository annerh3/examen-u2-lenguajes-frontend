import axios from "axios";

export const createAccount = async (form) => {
  try{
    const {data} = await axios.post('/Accounts', form);
         
    return data;
  }catch(error){
    console.error(error);
    return error?.response?.data;
  }
}
