import { FileDown, Minus, Plus, Pencil } from 'lucide-react';
import React from 'react';

export default function AccountItem({
  account,
  expandedRows,
  toggleExpand,
  handleData
}) {
  const isParent = account.childAccounts.length > 0;
  const isExpanded = expandedRows[account.id];

  return (
    <>
      <tr className={`border-b ${account.preCode === '' ? 'bg-green-400' : ''}`}>
        <td className="px-4 py-2 whitespace-nowrap">
          {isParent && (
            <button onClick={() => toggleExpand(account.id)} className="mr-2 align-middle">
              {isExpanded ? <Minus /> : <Plus />}
            </button>
          )}
          {account.code || account.fullCode}
        </td>
        <td className="px-4 py-2">{account.accountName}</td>
        <td className="px-4 py-2">{account.behaviorType === 'D' ? 'Debe' : 'Haber'}</td>

        {!isParent && (
          <td className="px-4 py-2 flex space-x-2">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleData(account)} // Obtengo toda la informacion de esta cuenta
            >
              <Pencil />
            </button>
            <button
              className="text-red-500 hover:underline"
            >
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
