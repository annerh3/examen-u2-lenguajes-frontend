import { journalizeApi } from "../../../config/api/JournalizeAPI ";

export const createJournalEntry = async (form) => {
    try{
        const {data} = await journalizeApi.post('/journal-entry', form);

        return data;
    }catch(error){
        console.error(error);
        return error?.response?.data;
    }
}