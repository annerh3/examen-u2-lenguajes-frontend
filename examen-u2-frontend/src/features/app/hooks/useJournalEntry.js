import { useState } from "react";
import { getJournalEntriesPaginationAsync } from "../../../shared/actions/journalEntry/journalEntry.actions";


export const useJournalEntry = () => {
    const [journalEntries, setJournalEntry] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadJournalEntries = async (form) => {
        setIsLoading(true);
        const result = await getJournalEntriesPaginationAsync(form);
        setJournalEntry(result);
        setIsLoading(false);
    }
    return{
        journalEntries,
        isLoading,
        loadJournalEntries,
    }
}