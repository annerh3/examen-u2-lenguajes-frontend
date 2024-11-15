import { useState, useEffect } from "react";
import { HttpStatusSelect, LogItem, LogItemSkeleton } from "../components";
import { useFormik } from "formik";
import { createSearchLogsInitValues } from "../forms";
import { useLogs } from "../hooks/useLogs";
import { Pagination } from "../../../shared/components/Pagination";
import { generateid } from "../../../shared/utils";
import { Search } from "lucide-react";
import { NotFound } from "../../../shared/components";

export default function LogsPage() {
  const { logs, loadLogs, isLoading } = useLogs();
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (fetching) {
      const code = formik.values.code === "default" ? 0 : formik.values.code;
      const searchTerm =
        formik.values.searchTerm === "" ? "" : formik.values.searchTerm;

      loadLogs(searchTerm, currentPage, code);
      setFetching(false);
    }
  }, [fetching]);

  const formik = useFormik({
    initialValues: createSearchLogsInitValues,
    onSubmit: async () => {
      setFetching(true);
    },
  });

  const handlePreviousPage = () => {
    if (logs.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
      setFetching(true);
    }
  };

  const handleNextPage = () => {
    if (logs.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      setFetching(true);
    }
  };

  const handleCurrentPage = (index = 1) => {
    setCurrentPage(index);
    setFetching(true);
  };

  const [expandedLogs, setExpandedLogs] = useState(new Set());

  const toggleLogExpansion = (id) => {
    setExpandedLogs((prevExpanded) => {
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
    <div className="flex h-screen bg-gray-100 mb-10">
      <main className="flex-1 px-4">
        <div className="flex flex-wrap items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 w-full sm:w-auto">
            Application Logs
          </h1>

          <form
            className="flex flex-wrap w-full sm:w-auto items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col sm:flex-row sm:w-auto w-full sm:space-x-4 mb-4 sm:mb-0">
              <div className="flex items-center w-full sm:w-64 rounded-lg mb-2 sm:mb-0">
                <input
                  type="text"
                  id="searchTerm"
                  name="searchTerm"
                  placeholder="Busca logs..."
                  value={formik.values.searchTerm}
                  onChange={formik.handleChange}
                  className="px-4 py-2 border rounded-lg w-full ml-3"
                />
              </div>

              <div className="w-full sm:w-auto ">
                <HttpStatusSelect formik={formik} />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-black rounded-lg shadow-lg"
            >
              <Search className="mx-3" />
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {isLoading ? (
             [...Array(4)].map(() => (
                <LogItemSkeleton   key={generateid()}  />
            ))
          ) : logs && logs.data ? (
            logs.data.items.length ? (
              logs.data.items.map((log) => (
                <LogItem
                  key={log.id}
                  log={log}
                  expandedLogs={expandedLogs}
                  toggleLogExpansion={toggleLogExpansion}
                />
              ))
            ) : (
              <p>{logs?.message}</p>
            )
          ) : (
            <NotFound message ={"No hay conexión al servidor"} />
          )}
        </div>      

        {/* Inicio de Paginación */}
        <div className="my-8">
          <Pagination
            totalPages={logs?.data?.totalPages}
            hasPreviousPage={logs?.data?.hasPreviousPage}
            handlePreviousPage={handlePreviousPage}
            hasNextPage={logs?.data?.hasNextPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
          />
        </div>
        {/* Fin de Paginación */}
      </main>
    </div>
  );
}