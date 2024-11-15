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

export const getChildAccounts = async () => {
  try{
    const {data} = await axios.get('/Accounts/childs');
         
    return data;
  }catch(error){
    console.error(error);
    return error?.response?.data;
  }
}
