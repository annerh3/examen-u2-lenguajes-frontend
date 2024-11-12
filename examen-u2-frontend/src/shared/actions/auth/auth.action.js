import { journalizeApi } from "../../../config/api/JournalizeAPI ";

export const loginAsync = async (form) => {
    try{
        const {data} = await journalizeApi.post('/auth/login', form)

        return data;
    }
    catch(error){
        console.error(error)
        return error?.response?.data;
    }
}