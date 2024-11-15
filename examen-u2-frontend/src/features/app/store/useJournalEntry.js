
import { create } from "zustand";
import { createJournalEntry } from "../../../shared/actions/journalEntry/journalEntry.actions";

export const useJournalEntryStore = create((set,get) => ({
    description: '',
    error: false,
    message: '',

    createJournalEntry: async (form) => {
        const {status, data, message} = await createJournalEntry(form);
        if(status){
            set({
                error: false,
                message: message,
                description: data.description,
            })
        return { error: false, message };
        }
    set({message: message, error: true});
    return { error: true, message };
    },
}))