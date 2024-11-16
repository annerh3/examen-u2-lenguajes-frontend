import { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  PlusCircle,
} from "lucide-react";
import { formatDate } from "../../../shared/utils";
import { CreateJournalEntryForm } from "../components";
import { useFormik } from "formik";
import { searchAccountingInitValues } from "../forms";
import { NotFound, Pagination } from "../../../shared/components";
import { useJournalEntry } from "../hooks/useJournalEntry";

export const Accounting = () => {
  const { journalEntries, loadJournalEntries, isLoading } = useJournalEntry();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedPartidas, setExpandedPartidas] = useState(new Set());
  const [isFormOpen, setFormOpen] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [selectedItems, setSelectedItems] = useState(new Set());


  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  // const response = [
  //   {
  //     id: "bd7da418-b92f-4dbb-88a3-08dd05407f79",
  //     entryNumber: 1,
  //     description: "Se Obtiene Prestamo Acra5D",
  //     date: "2024-11-14T23:23:13.696",
  //     journalEntryDetails: [
  //       {
  //         id: "7f241d09-27cc-4ef6-0cfd-08dd05407f7e",
  //         journalEntryId: "bd7da418-b92f-4dbb-88a3-08dd05407f79",
  //         accountCatalogId: "79f80939-2968-4a80-ebe3-08dd053cf5ac",
  //         account: {
  //           preCode: "020201",
  //           code: "02",
  //           accountName: "Bonos Por Pagar",
  //           behaviorType: "C",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "00fa1cfd-e530-4314-ebe1-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "79f80939-2968-4a80-ebe3-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:37:36.6658332",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 10000.0,
  //         entryType: "C",
  //       },
  //       {
  //         id: "bfb8ab35-1c03-46cc-0cfe-08dd05407f7e",
  //         journalEntryId: "bd7da418-b92f-4dbb-88a3-08dd05407f79",
  //         accountCatalogId: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //         account: {
  //           preCode: "10101",
  //           code: "01",
  //           accountName: "Caja General",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "cb6d024e-4854-4957-ebd7-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:19:49.7575049",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 1800.0,
  //         entryType: "D",
  //       },
  //       {
  //         id: "9655c829-a3b8-4650-0cff-08dd05407f7e",
  //         journalEntryId: "bd7da418-b92f-4dbb-88a3-08dd05407f79",
  //         accountCatalogId: "fa7a862f-783d-4230-ebd9-08dd053cf5ac",
  //         account: {
  //           preCode: "10101",
  //           code: "02",
  //           accountName: "Caja Chica #1",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "cb6d024e-4854-4957-ebd7-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "fa7a862f-783d-4230-ebd9-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:20:24.529574",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 200.0,
  //         entryType: "D",
  //       },
  //       {
  //         id: "22a94eb7-8932-4872-0d00-08dd05407f7e",
  //         journalEntryId: "bd7da418-b92f-4dbb-88a3-08dd05407f79",
  //         accountCatalogId: "c86a0397-37c8-4eb5-ebda-08dd053cf5ac",
  //         account: {
  //           preCode: "10101",
  //           code: "03",
  //           accountName: "Caja Chica #2",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "cb6d024e-4854-4957-ebd7-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "c86a0397-37c8-4eb5-ebda-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:20:34.1095664",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 1000.0,
  //         entryType: "D",
  //       },
  //       {
  //         id: "da4e0587-cc5c-47da-0d01-08dd05407f7e",
  //         journalEntryId: "bd7da418-b92f-4dbb-88a3-08dd05407f79",
  //         accountCatalogId: "b2a5f9fb-d8db-4eda-ebdc-08dd053cf5ac",
  //         account: {
  //           preCode: "101",
  //           code: "02",
  //           accountName: "Bancos",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "6ba22715-2a5f-45b9-ebd6-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "b2a5f9fb-d8db-4eda-ebdc-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:26:19.3380848",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 6000.0,
  //         entryType: "D",
  //       },
  //     ],
  //   },
  //   {
  //     id: "c02e490a-fc81-4013-43a4-08dd056added",
  //     entryNumber: 4,
  //     description: "Se Adquiere Dinero prov",
  //     date: "2024-11-15T05:23:13.696",
  //     journalEntryDetails: [
  //       {
  //         id: "d772f209-47a8-4fce-cf5f-08dd056addf6",
  //         journalEntryId: "c02e490a-fc81-4013-43a4-08dd056added",
  //         accountCatalogId: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //         account: {
  //           preCode: "02",
  //           code: "01",
  //           accountName: "Activo Corriente",
  //           behaviorType: "C",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "f2745419-bf2b-4920-ebdd-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:27:57.4115177",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "C",
  //       },
  //       {
  //         id: "1e1b29b1-20eb-4976-cf60-08dd056addf6",
  //         journalEntryId: "c02e490a-fc81-4013-43a4-08dd056added",
  //         accountCatalogId: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //         account: {
  //           preCode: "10101",
  //           code: "01",
  //           accountName: "Caja General",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "cb6d024e-4854-4957-ebd7-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:19:49.7575049",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "D",
  //       },
  //     ],
  //   },
  //   {
  //     id: "7e87669a-57d0-4597-fcee-08dd056b8657",
  //     entryNumber: 5,
  //     description: "Se Adquiere Dinero prov",
  //     date: "2024-11-15T05:23:13.696",
  //     journalEntryDetails: [
  //       {
  //         id: "baefa1fa-6d89-47a2-e4d7-08dd056b8660",
  //         journalEntryId: "7e87669a-57d0-4597-fcee-08dd056b8657",
  //         accountCatalogId: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //         account: {
  //           preCode: "02",
  //           code: "01",
  //           accountName: "Activo Corriente",
  //           behaviorType: "C",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "f2745419-bf2b-4920-ebdd-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:27:57.4115177",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "C",
  //       },
  //       {
  //         id: "9d793af6-08bc-4a0f-e4d8-08dd056b8660",
  //         journalEntryId: "7e87669a-57d0-4597-fcee-08dd056b8657",
  //         accountCatalogId: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //         account: {
  //           preCode: "10101",
  //           code: "01",
  //           accountName: "Caja General",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "cb6d024e-4854-4957-ebd7-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:19:49.7575049",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "D",
  //       },
  //     ],
  //   },
  //   {
  //     id: "6804b6ba-2272-4d17-7569-08dd05741111",
  //     entryNumber: 6,
  //     description: "Se Adquiere Dinero prov",
  //     date: "2024-11-15T05:23:13.696",
  //     journalEntryDetails: [
  //       {
  //         id: "8c22897e-14a4-461a-fbb0-08dd0574193b",
  //         journalEntryId: "6804b6ba-2272-4d17-7569-08dd05741111",
  //         accountCatalogId: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //         account: {
  //           preCode: "02",
  //           code: "01",
  //           accountName: "Activo Corriente",
  //           behaviorType: "C",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "f2745419-bf2b-4920-ebdd-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:27:57.4115177",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "C",
  //       },
  //       {
  //         id: "06d300dd-c5aa-40db-fbb1-08dd0574193b",
  //         journalEntryId: "6804b6ba-2272-4d17-7569-08dd05741111",
  //         accountCatalogId: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //         account: {
  //           preCode: "10101",
  //           code: "01",
  //           accountName: "Caja General",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "cb6d024e-4854-4957-ebd7-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:19:49.7575049",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "D",
  //       },
  //     ],
  //   },
  //   {
  //     id: "96e521e3-88d0-49ad-dd3c-08dd05bcb3a7",
  //     entryNumber: 7,
  //     description: "Se Adquiere Dinero prov",
  //     date: "2024-11-15T05:23:13.696",
  //     journalEntryDetails: [
  //       {
  //         id: "2c79a74c-8686-4b5c-7cd7-08dd05bcb3e5",
  //         journalEntryId: "96e521e3-88d0-49ad-dd3c-08dd05bcb3a7",
  //         accountCatalogId: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //         account: {
  //           preCode: "02",
  //           code: "01",
  //           accountName: "Activo Corriente",
  //           behaviorType: "C",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "f2745419-bf2b-4920-ebdd-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "b698d823-8a52-4cac-ebdf-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:27:57.4115177",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "C",
  //       },
  //       {
  //         id: "87815bdd-6773-4340-7cd8-08dd05bcb3e5",
  //         journalEntryId: "96e521e3-88d0-49ad-dd3c-08dd05bcb3a7",
  //         accountCatalogId: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //         account: {
  //           preCode: "10101",
  //           code: "01",
  //           accountName: "Caja General",
  //           behaviorType: "D",
  //           allowsMovement: true,
  //           isActive: true,
  //           parentId: "cb6d024e-4854-4957-ebd7-08dd053cf5ac",
  //           childAccounts: [],
  //           id: "fb20b827-2ec7-4196-ebd8-08dd053cf5ac",
  //           createdDate: "2024-11-15T00:19:49.7575049",
  //           updatedDate: "0001-01-01T00:00:00",
  //         },
  //         amount: 2000.0,
  //         entryType: "D",
  //       },
  //     ],
  //   },
  // ];
  
 
  useEffect(() => {
    if (fetching) {
      console.log(formik.values)
      loadJournalEntries(formik.values);
      setFetching(false);
    }
  }, [fetching]);

  // Manejar la selección de elementos
  const toggleSelection = (itemId) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

   // Enviar los elementos seleccionados
   const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Elementos seleccionados:", Array.from(selectedItems));
  };

  const formik = useFormik({
    initialValues: searchAccountingInitValues,
    onSubmit: async (values) => {
      // setFetching(true);
      console.log(values);
      
      loadJournalEntries(values);
    },
  });

  const handlePreviousPage = () => {
    if (journalEntries.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  const handleNextPage = () => {
    if (journalEntries.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetching(true);
  };

  const togglePartidaExpansion = (id) => {
    setExpandedPartidas((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Partidas Contables
        </h1>

        <button
          className="flex items-center px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-900"
          onClick={openForm}
        >
          <PlusCircle className="mr-2 h-4 w-4 " /> Nueva Partida
        </button>
        <CreateJournalEntryForm isOpen={isFormOpen} onClose={closeForm} />

        <form className="flex flex-wrap w-full sm:w-auto items-center"
            onSubmit={formik.handleSubmit}>  
          <div className="flex justify-between items-center mb-6"></div>
          <div className="bg-white flex items-center mt-2 shadow-sm mb-6 p-4">
            <div className="flex items-center w-full">
              <button type="submit" className="flex justify-center items-center bg-yellow-200 hover:bg-yellow-400 hover:pointer w-10 h-10 rounded-md">
                <Search className="text-gray-800" size={20} />
              </button>
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                placeholder="Buscar partidas..."
                value={formik.values.searchTerm}
                  onChange={formik.handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </form>

        <div className="space-y-4">
          {
            isLoading 
            ?(
                <p>Cargando . . .</p>
            ): journalEntries && journalEntries.data ? (
              journalEntries.data.items.length ? (
                journalEntries.data.items.map((partida) => (
                  <div
                    key={partida.id}
                    className="bg-white hover:bg-gray-200  rounded-lg shadow-sm overflow-hidden"
                  >
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => togglePartidaExpansion(partida.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <span className="text-sm text-gray-500">
                            {formatDate(partida.date)}
                          </span>
                          <span className="text-sm font-medium">
                            #{partida.entryNumber}
                          </span>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          {expandedPartidas.has(partida.id) ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      </div>
                      <h3 className="text-base font-semibold mt-2">
                        {partida.description}
                      </h3>
                    </div>
      
                    {expandedPartidas.has(partida.id) && (
                      <div className="bg-gray-50 p-4 border-t">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left py-2">Código</th>
                              <th className="text-left py-2">Cuenta</th>
                              <th className="text-right py-2">Debe</th>
                              <th className="text-right py-2">Haber</th>
                            </tr>
                          </thead>
                          <tbody>
                            {partida.journalEntryDetails.map((detail, index) => (
                              <tr key={index} className="border-t">
                                <td className="py-2">{detail.account.preCode}</td>
                                <td className="py-2">{detail.account.accountName}</td>
                                <td className="text-right py-2">
                                  {detail.entryType === "D"
                                    ? `$${detail.amount.toLocaleString()}`
                                    : "-"}
                                </td>
                                <td className="text-right py-2">
                                  {detail.entryType === "C"
                                    ? `$${detail.amount.toLocaleString()}`
                                    : "-"}
                                </td>
                              </tr>
                            ))}
                            <tr className="font-bold border-t">
                              <td colSpan={2} className="py-2">
                                Total
                              </td>
                              <td className="text-right py-2">
                                $
                                {partida.journalEntryDetails
                                  .reduce(
                                    (sum, detail) =>
                                      sum +
                                      (detail.entryType === "D" ? detail.amount : 0),
                                    0
                                  )
                                  .toLocaleString()}
                              </td>
                              <td className="text-right py-2">
                                $
                                {partida.journalEntryDetails
                                  .reduce(
                                    (sum, detail) =>
                                      sum +
                                      (detail.entryType === "C" ? detail.amount : 0),
                                    0
                                  )
                                  .toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))
              ):(
                <NotFound message ={journalEntries?.message} />
              )
            ) : (
              <NotFound message ={"No hay conexión al servidor"} />
            )
          }
        </div>

    
         {/* Inicio de Paginación */}
         <div className="my-8">
          <Pagination
            totalPages={journalEntries?.data?.totalPages}
            hasPreviousPage={journalEntries?.data?.hasPreviousPage}
            handlePreviousPage={handlePreviousPage}
            hasNextPage={journalEntries?.data?.hasNextPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
          />
        </div>
        {/* Fin de Paginación */}
      </main>
    </div>
  );
};
