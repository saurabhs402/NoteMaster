import React from 'react'
import { MdDeleteForever } from "react-icons/md";

function Note({ title, description, date, handleDeleteNote }) {
  return (
    /* From Uiverse.io by catraco */
    <div className="w-60  bg-sky-100  text-gray-600 flex flex-col justify-center p-4 gap-4 rounded-lg shadow-md">
      <div className=" text-lg underline font-extrabold font-mono capitalize rounded-md">
        {title}
      </div>
      <div className="px-4 rounded-md whitespace-pre-line ">{description}</div>
      <div className=" flex items-center justify-between">
        <small>{date}</small>
        <button className="text-right" onClick={handleDeleteNote}>
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default Note