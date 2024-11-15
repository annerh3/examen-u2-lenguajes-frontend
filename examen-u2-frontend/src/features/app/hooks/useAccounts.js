import { useState } from "react";
import { getChildAccounts } from "../../../shared/actions/accountCatalog/accountCatalog.actions";

export const useAccounts = () => {
    const [accounts, setAccounts] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const loadChildAccounts = async () => {
        setIsLoading(true);
        const result = await getChildAccounts();
        setAccounts(result);
        setIsLoading(false);
    }


    return{
        accounts,
        isLoading,
        loadChildAccounts,
    }
}