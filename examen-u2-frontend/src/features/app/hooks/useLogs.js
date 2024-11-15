import { useState } from "react"
import { getLogsPagination } from "../../../shared/actions/logs/logs.actions";

export const useLogs = () => {

    const [logs, setLogs] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadLogs = async (searchTerm, page, codeStatus) => {
        setIsLoading(true);
        const result = await getLogsPagination(searchTerm, page, codeStatus);
        setLogs(result);
        setIsLoading(false);
    }


    return{
        logs,
        isLoading,
        loadLogs,
    }
}