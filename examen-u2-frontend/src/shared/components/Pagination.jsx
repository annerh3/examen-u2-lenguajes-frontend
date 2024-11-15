import { generateid } from "../utils";

export const Pagination = ({
  totalPages,
  handlePreviousPage = () => {},
  hasPreviousPage,
  handleNextPage = () => {},
  hasNextPage,
  handleCurrentPage,
  currentPage,
}) => {
  return (
    <div className="flex">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        className={`px-3 py-2 mx-1 font-medium text-black rounded-md ${
          !hasPreviousPage
            ? "cursor-not-allowed"
            : "bg-green-400 hover:bg-green-600 hover:text-black"
        }`}
      >
        Anterior
      </button>

      {[...Array(totalPages)].map((value, index) => (
        <button
          key={generateid()}
          onClick={() => handleCurrentPage(index + 1)}
          className={`px-3 py-2 mx-1 font-medium rounded-md text-gray-700 ${
            currentPage === index + 1
              ? "bg-yellow-200 text-black"
              : "hover:bg-yellow-400 hover:text-black"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className={`px-3 py-2 mx-1 font-medium text-black rounded-md ${
          !hasNextPage
            ? "cursor-not-allowed"
            : "bg-green-400 hover:bg-green-600 text-black"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};
