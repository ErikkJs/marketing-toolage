import React, {useState, ChangeEvent} from 'react';
import csv from 'csvtojson';
import {jsonToCSV} from 'react-papaparse';
import CSVTable, {CSVRow} from './CsvTable';

const App: React.FC = () => {
  const [list, setList] = useState<CSVRow[]>([]);
  const [matchBack, setMatchBack] = useState<CSVRow[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [matchField, setMatchField] = useState<string>('');
  const [matches, setMatches] = useState<CSVRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<CSVRow[]>>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      setErrorMessage('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result as string;
      try {
        const json = await csv().fromString(text);
        setter(json as CSVRow[]);
        if (json.length > 0) {
          setHeaders(Object.keys(json[0]));
        }
      } catch (error) {
        console.error('Error converting CSV to JSON', error);
        setErrorMessage('Error processing file');
      }
    };
    reader.readAsText(file);
  };

  const findMatches = () => {
    if (!list.length || !matchBack.length || !matchField) {
      setErrorMessage('Please upload both files and select a match field.');
      return;
    }

    const matchBackArray: CSVRow[] = matchBack.filter(mbRow =>
      list.some(listRow => listRow[matchField] === mbRow[matchField])
    );

    if (sortField) {
      matchBackArray.sort((a, b) => ('' + a[sortField]).localeCompare('' + b[sortField]));
    }

    setMatches(matchBackArray);
  };

  const downloadMatches = () => {
    if (!matches.length) {
      setErrorMessage('No matches to download');
      return;
    }

    const csvString = jsonToCSV(matches);
    const blob = new Blob([csvString], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'matches.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className=' flex flex-col items-center justify-center p-5 bg-white shadow rounded-lg w-full h-screen'>
      <div className='p-5'>
        <h1 className='text-3xl font-bold text-center'>Matchback Tool</h1>
        <p className='text-center'>Upload your list and matchback files to find matches.</p>
      </div>
      <div className='grid grid-col-3 justify-center'>
        <input type='file' onChange={e => handleFileChange(e, setList)} className='p-5' />
        <input type='file' onChange={e => handleFileChange(e, setMatchBack)} className='p-5'/>
        {headers.length > 0 && (
          <div className='flex flex-row w-full'>
            <select
              onChange={e => setMatchField(e.target.value)}
              className='mt-4 mr-5 block bg-gray-200 border border-gray-300 rounded px-3 py-2'>
              <option value=''>Select Match Field</option>
              {headers.map(header => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>

            <select
              onChange={e => setSortField(e.target.value)}
              className='mt-4 block bg-gray-200 border border-gray-300 rounded px-3 py-2'>
              <option value=''>Select Sort Field (optional)</option>
              {headers.map(header => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className='flex flex-row justify-center items-center space-x-3'>
        <button
          onClick={findMatches}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full md:max-w-32'>
          Find Matches
        </button>
        {matches.length > 0 && (
          <button
            onClick={downloadMatches}
            className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700  w-full md:max-w-32'>
            Download Matches
          </button>
        )}
      </div>
      <div className='p-5'>
        {' '}
        <CSVTable data={matches} />{' '}
      </div>
    </div>
  );
};

export default App;
