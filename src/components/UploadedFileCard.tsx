import React from "react";

const UploadedFile = ({ list, resetFunc }: { list: any[], resetFunc: () => void }) => {
  if (!list || list.length === 0) return null; // Ensure there's a list item to display

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-4">
        <div className="mb-2 text-xl font-medium text-gray-900">{list[0].name}</div>
        <p className="text-gray-700 text-base">
          Last Modified Date: {new Date(list[0].lastModified).toDateString()}
        </p>
      </div>
      <div className="p-4">
        <button
          onClick={resetFunc}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UploadedFile;
