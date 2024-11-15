import { create } from "zustand";
import { createAccount } from "../../../shared/actions/accountCatalog/accountCatalog.actions";

export const useAccountStore = create((set, get) => ({
    precode: null,
    code: null,
    name: '',
    behaviorType: '',
    isParentAccount: false,
    error: false,
    message: '',

    createAccount: async (form) => {        
    const {status, data, message} = await createAccount(form);
        if(status){
            set({
                error: false,
                message: message,
                name: data.accountName
            })
        return { error: false, message };
        }
    set({message: message, error: true});
    return { error: true, message };
    }

}));