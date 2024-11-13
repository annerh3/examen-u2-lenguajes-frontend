import { journalizeApi } from "../../../config/api/JournalizeAPI ";

export const loginAsync = async (form) => {
    try{
        console.log("este es el form que se está enviando:  ", form )
        const {data} = await journalizeApi.post('/auth/login', form)
        console.log("esta es la data ",data)
        return data;
    }
    catch(error){
        console.error(error)
        return error?.response?.data;
    }
}