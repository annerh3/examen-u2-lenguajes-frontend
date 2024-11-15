import { journalizeApi } from "../../../config/api/JournalizeAPI ";

export const getLogsPagination = async (searchTerm = "",  page = 1,  codeStatus = 0) => {
    try{
        const {data} = await journalizeApi.get(
            `/logs?searchTerm${searchTerm}&page=${page}&codeStatus=${codeStatus}`
        );

        return data;
    }catch(error){
        console.error(error);
        return error.response
    }
    
}
