import React from 'react';
import csvConverter from 'json-to-csv-export';

const csvDownload = (matchBackData: any, matchBackName: string | any[]) => {
  const fileName =
    matchBackName.length > 0 ? `MatchedBacked_${matchBackName[0].name}` : 'MatchbackList';
  const dataToConvert = {
    data: matchBackData,
    filename: fileName,
    delimiter: ',',
  };

  return (
    <button
      onClick={() => csvConverter(dataToConvert)}
      className='bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded cursor-pointer shadow-lg'
      style={{boxShadow: 'inset 0px 1px 0px 0px #e184f3', textShadow: '0px 1px 0px #9b14b3'}}>
      Download Matchback List
    </button>
  );
};

export default csvDownload;
