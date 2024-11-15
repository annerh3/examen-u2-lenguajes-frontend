import { FileDown, Minus, Plus, Pencil } from 'lucide-react';
export default function AccountItem({
  account,
  expandedRows,
  toggleExpand,
  handleData,
  parentId = null,
  immediateParentCode = null
}) {
  const isParent = account.childAccounts.length > 0;
  const isExpanded = expandedRows[account.id];

  // Crear una copia de account con parentId y immediateParentCode añadidos
  const accountWithParent = { ...account, immediateParentId: parentId, immediateParentCode };

  return (
    <>
      <tr className={`border-b ${accountWithParent.preCode === '' ? 'bg-green-400' : ''}`}>
        <td className="px-4 py-2 whitespace-nowrap">
          {isParent && (
            <button onClick={() => toggleExpand(accountWithParent.id)} className="mr-2 align-middle">
              {isExpanded ? <Minus /> : <Plus />}
            </button>
          )}
          {accountWithParent.code || accountWithParent.fullCode}
        </td>
        <td className="px-4 py-2">{accountWithParent.accountName}</td>
        <td className="px-4 py-2">{accountWithParent.behaviorType === 'D' ? 'Debe' : 'Haber'}</td>

        {!isParent && (
          <td className="px-4 py-2 flex space-x-2">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleData(accountWithParent)} // Obtengo toda la informacion de esta cuenta (tambien codigo y id del padre de esta cuenta)
            >
              <Pencil />
            </button>
            <button className="text-red-500 hover:underline">
              <FileDown />
            </button>
          </td>
        )}
      </tr>

      {isExpanded && isParent && (
        <tr>
          <td colSpan="0">
            <table className="w-full ml-4">
              <tbody>
                {account.childAccounts.map((childAccount) => (
                  <AccountItem
                    key={childAccount.id}
                    account={childAccount}
                    expandedRows={expandedRows}
                    toggleExpand={toggleExpand}
                    handleData={handleData}
                    parentId={accountWithParent.id} // Pasar el id del padre actual
                    immediateParentCode={accountWithParent.fullCode || accountWithParent.code} // Pasar el codigo completo del padre
                  />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}
