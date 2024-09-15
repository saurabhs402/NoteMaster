import React,{useState} from 'react'

function AddNewNote() {
  const characterLimit=255; 
  const [noteText,setNoteText]=useState('')
  console.log("NoteText:",noteText)
  return (
    <div className="w-60  bg-sky-300  text-gray-600 flex flex-col justify-center p-4 gap-4 rounded-lg shadow-md">
      <textarea
        className=" text-lg font-extrabold px-4 font-mono capitalize rounded-md resize-none"
        placeholder="Add title"
      />
      <textarea
        className="w-full h-32 px-4 rounded-md resize-none"
        placeholder="Add a note...."
        value={noteText}
        onChange={(e)=>{
            console.log(e.target.value)
            if (characterLimit - e.target.value.trim().length >= 0)
              setNoteText(e.target.value);
        }}
      />
      <div className=" flex items-center justify-between">
        <small>{characterLimit-noteText.trim().length} Remaining</small>
        <button className="bg-white text-sky-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
          save
        </button>
      </div>
    </div>
  );
}

export default AddNewNote