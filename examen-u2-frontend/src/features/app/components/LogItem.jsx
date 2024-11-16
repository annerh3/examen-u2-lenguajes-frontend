import { ChevronDown, ChevronUp } from 'lucide-react';
import { errorDictionary } from '../../../shared/utils/errorDictionary';
import { formatDate } from '../../../shared/utils';


export const LogItem = ({ log, expandedLogs, toggleLogExpansion }) => {
    // Aquí mapeamos el código de estado a las clases correspondientes
    const logData = errorDictionary[log.status] || {
        name: "Unknown",
        styles: "bg-gray-300 text-gray-800"
    };
    return (
      <div className="border rounded-md shadow-sm overflow-hidden bg-white">
        <div className="p-4 cursor-pointer" onClick={() => toggleLogExpansion(log.id)}>
          <div className="flex justify-between items-center">
            <div>
              <span   
                className={`inline-block font-bold px-2 py-1 rounded-full text-xs mr-2 ${logData.styles}`}
              >
                {`${log.status} ${logData.name}` }
              </span>
              <span className="text-sm text-gray-500">{formatDate(log.timestamp)}</span>
            </div>
            <button className="text-gray-600">
              {expandedLogs.has(log.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          <div className="text-base mt-2">{log.message}</div>
        </div>
        {expandedLogs.has(log.id) && (
  <div className="bg-gray-50 p-4 border-t">
    <pre className="whitespace-pre-wrap text-sm">
      
      {/* Sección de Detalles */}
      {log.detail && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Detalles:</h3>
          <div className="bg-gray-100 p-2 rounded-md">
            {JSON.stringify(log.detail, null, 2)}
          </div>
        </div>
      )}

      {/* Sección de Errores */}
      {log.error && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Errores:</h3>
          <div className="bg-red-100 p-2 rounded-md">
            {JSON.stringify(log.error, null, 2)}
          </div>
        </div>
      )}

    </pre>
  </div>
)}

      </div>
    );
}
