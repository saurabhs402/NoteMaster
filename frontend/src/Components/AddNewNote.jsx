import React,{useState} from 'react'

function AddNewNote({handleCreateNote,newNote,setNewNote}) {
  const characterLimit=255; 
//   const [noteText,setNoteText]=useState('')
//   console.log("NoteText:",noteText)

console.log("newNote inside Add:",newNote)
  return (
    <div className="w-60  bg-sky-300  text-gray-600 flex flex-col justify-center p-4 gap-4 rounded-lg shadow-md">
      <input
        className="text-lg font-extrabold px-4 font-mono capitalize rounded-md"
        placeholder="Add title"
        value={newNote.title}
        onChange={(e) => {
            setNewNote({
                title:e.target.value,
                description:newNote.description
            });
        }}
      />
      <textarea
        className="w-full h-32 px-4 rounded-md resize-none"
        placeholder="Add a note...."
        value={newNote.description}
        onChange={(e) => {
          if (characterLimit - e.target.value?.trim().length >= 0)
              setNewNote({
                title: newNote.title,
                description: e.target.value,
              });
        }}
      />
      <div className=" flex items-center justify-between">
        <small>{characterLimit - newNote.description?.trim().length} Remaining</small>
        <button
          className="bg-white text-sky-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          onClick={handleCreateNote}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddNewNote