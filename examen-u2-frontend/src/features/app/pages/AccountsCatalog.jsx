import { useState } from 'react';
import AccountItem from '../components/AccountItem';
import { CreateAccountForm } from '../components';

export const AccountsCatalog = () => {
  const [cuentas, setCuentas] = useState([
    {
      id: "db992460-6b1e-44f9-af80-08dd03sdfsdfsd",
      preCode: "",
      code: "1",
      accountName: "Activos",
      behaviorType: "D",
      allowsMovement: false,
      childAccounts: [
        {
          id: "52065e32-720f-4c89-af81-08dd03a2e85e",
          fullCode: "101",
          accountName: "Activos Corrientes",
          behaviorType: "D",
          allowsMovement: true,
          childAccounts: [
            {
              id: "ad87d852-7fa4-4a2d-a317-08dd03a2e85f",
              fullCode: "1011",
              accountName: "Efectivo",
              behaviorType: "D",
              allowsMovement: true,
              childAccounts: [
                {
                  id: "3e8654a2-5e47-4ed5-967a-08dd03a2e861",
                  fullCode: "10111",
                  accountName: "Caja General",
                  behaviorType: "D",
                  allowsMovement: true,
                  childAccounts: []
                },
                {
                  id: "4d8654b2-1e48-4ed5-967b-08dd03a2e862",
                  fullCode: "10112",
                  accountName: "Caja Chica",
                  behaviorType: "D",
                  allowsMovement: true,
                  childAccounts: []
                }
              ]
            }
          ]
        },
        {
          id: "efb050ef-97f7-4dfd-c389-08dd03ab77b5",
          fullCode: "102",
          accountName: "Activos NO Corrientes",
          behaviorType: "D",
          allowsMovement: false,
          childAccounts: [
            {
              id: "c4e050ef-37f7-4dfd-a389-08dd03aa77b7",
              fullCode: "1021",
              accountName: "Propiedades",
              behaviorType: "D",
              allowsMovement: false,
              childAccounts: [
                {
                  id: "d5f9601f-28c7-41af-9681-08dd03ac77b9",
                  fullCode: "10211",
                  accountName: "Terrenos",
                  behaviorType: "D",
                  allowsMovement: false,
                  childAccounts: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "db992460-6b1444444454af80-08dd03a2e85e",
      preCode: "",
      code: "2",
      accountName: "Pasivos",
      behaviorType: "C",
      allowsMovement: false,
      childAccounts: [
        {
          id: "aa865f2e-1e48-4cd5-94b2-08df03b2e86c",
          fullCode: "201",
          accountName: "Pasivos Corrientes",
          behaviorType: "C",
          allowsMovement: false,
          childAccounts: [
            {
              id: "e216b864-1a47-4b6e-967c-08df03e2f863",
              fullCode: "2011",
              accountName: "Cuentas por Pagar",
              behaviorType: "C",
              allowsMovement: false,
              childAccounts: []
            }
          ]
        }
      ]
    }
  ]);
  const [isFormOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleData = (account) => {
    console.log("Cuenta Seleccionada:", account); 
  };

  return (
    <div className="overflow-x-auto ">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Catálogo de Cuentas</h1>
          <button
           onClick={openForm}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Agregar Cuenta Padre
          </button>
          <CreateAccountForm isOpen={isFormOpen} onClose={closeForm} />
        </div>

        <table className="w-full text-left bg-white rounded-xl shadow-md">
          <thead className="border-b bg-gray-100">
            <tr className='bg-gray-300'>
              <th className="px-4 py-2 font-medium ">Código</th>
              <th className="px-4 py-2 font-medium ">Nombre</th>
              <th className="px-4 py-2 font-medium ">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {cuentas.map((account) => (
              <AccountItem
                key={account.id}
                account={account}
                expandedRows={expandedRows}
                toggleExpand={toggleExpand}
                handleData={handleData}             
              />
            ))}
          </tbody>
        </table>

      </main>
    </div>
  );
}
