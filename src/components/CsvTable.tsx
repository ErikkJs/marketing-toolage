export type CSVRow = Record<string, any>;

export type CSVTableProps = {
  data: CSVRow[];
};

const CSVTable: React.FC<CSVTableProps> = ({data}) => {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className='overflow-x-auto mt-4'>
      <table className='table-auto w-full'>
        <thead className='text-left bg-gray-100'>
          <tr>
            {headers.map(header => (
              <th key={header} className='px-4 py-2'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={`bg-white ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
              {headers.map(header => (
                <td key={header} className='border px-4 py-2'>
                  {String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default CSVTable;
