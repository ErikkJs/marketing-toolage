import React from 'react';
import ReactFileReader from 'react-file-reader';
import PropTypes from 'prop-types';

const GetList = ({handleFunc}) => (
  <ReactFileReader handleFiles={handleFunc} fileTypes={'.csv'}>
    <button
      type='button'
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Upload
    </button>
  </ReactFileReader>
);

GetList.propTypes = {
  handleFunc: PropTypes.func.isRequired,
};

export default GetList;
