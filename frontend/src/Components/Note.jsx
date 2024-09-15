import React, { useState,useEffect } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

function Note({
  title,
  description,
  date,
  handleDeleteNote,
  handleEditNote,
  isEditing,
  currentNote,
  handleUpdateNote,
}) {
   const characterLimit=255;
 
   const [updatedTitle, setUpdatedTitle] = useState('');
   const [updatedDescription, setUpdatedDescription] = useState('');

   // Update internal state when entering edit mode
   useEffect(() => {
     if (isEditing) {
       setUpdatedTitle(title);
       setUpdatedDescription(description);
     }
   }, [isEditing, title, description]);

  // Handle save update
  const handleSaveUpdate = () => {
    handleUpdateNote({
      id: currentNote.id,
      title: updatedTitle,
      description: updatedDescription,
      date: currentNote.date,
    });
  };
  console.log("isEditing and CurrrentNode:",isEditing,currentNote);
  console.log(
    "updatedTitle and updatedDescription:",
    updatedTitle,
    updatedDescription
  );

  return (
    <div className="w-60 bg-sky-100 text-gray-600 flex flex-col justify-center p-4 gap-4 rounded-lg shadow-md">
      {isEditing && currentNote?.id === currentNote?.id ? (
        <>
          <input
            className="text-lg font-extrabold px-4 font-mono capitalize rounded-md"
            value={updatedTitle}
            onChange={(e) =>{ 
                 if (characterLimit - e.target.value?.trim().length >= 0)
                   setUpdatedTitle(e.target.value);
            }}
          />
          <textarea
            className="px-4 h-32 rounded-md resize-none"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <div className=" flex items-center justify-between">
            <small>
              {characterLimit - updatedDescription.trim().length} Remaining
            </small>
            <button
              onClick={handleSaveUpdate}
              className="bg-white text-sky-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-lg underline font-extrabold font-mono capitalize rounded-md">
            {title}
          </div>
          <div className="px-4 rounded-md whitespace-pre-line">
            {description}
          </div>
          <div className="flex items-center justify-between">
            <small>{date}</small>
            <div>
              <button className="mr-2" onClick={handleEditNote}>
                <MdEdit />
              </button>
              <button onClick={handleDeleteNote}>
                <MdDeleteForever />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
