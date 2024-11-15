import { ChevronDown } from "lucide-react";

export const LogItemSkeleton = () => {
    return (<div className="p-4 my-4 h-28 border rounded-md shadow-sm overflow-hidden bg-white animate-pulse">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="inline-block bg-gray-300 rounded-full px-2 py-1 text-xs font-semibold mr-2 w-24 h-5"></span>
              <span className="text-sm bg-gray-300 rounded w-20 h-4 inline-block"></span>
            </div>
            <button className="text-gray-300">
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="bg-gray-300 rounded h-4 mt-2 w-3/4"></div>
        </div> 
      </div>);
  }