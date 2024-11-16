import { journalizeApi } from "../../../config/api/JournalizeAPI ";

export const createJournalEntryAsync = async (form) => {
    try{
        const {data} = await journalizeApi.post('/journal-entry', form);

        return data;
    }catch(error){
        console.error(error);
        return error?.response?.data;
    }
}

export const getJournalEntriesPaginationAsync = async (form) => {
    try{
        const {data} = await journalizeApi.get('/journal-entry/get', form);

        return data;
    }catch(error){
        console.error(error);
        return error?.response?.data;
    }
}