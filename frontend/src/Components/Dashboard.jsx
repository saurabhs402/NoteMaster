import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";
import Navbar from "./Navbar";
import AddNewNote from "./AddNewNote";
import {nanoid} from 'nanoid'

const Dashboard = () => {
  const [notes, setNotes] = useState([
    {
      id:nanoid(),
      title: "mNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
    {
      id:nanoid(),
      title: "pNote",
      description: "ahjdkskl dkdkdk kskdkfkl",
      date: "13/04/2024",
    },
    {
      id:nanoid(),
      title: "qNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
    {
      id:nanoid(),
      title: "mNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
    {
      id:nanoid(),
      title: "rNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
  ]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");

  const [editNote, setEditNote] = useState(null); // Track the note being edited
  // const [isEditing, setIsEditing] = useState(false); // Track if in edit mode

  useEffect(() => {
    // const fetchNotes = async () => {
    //   const response = await axios.get("/api/notes");
    //   setNotes(response.data);
    // };
    // fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    const response = await axios.post("/api/notes", newNote);
    setNotes([...notes, response.data]);
    setNewNote({ title: "", content: "" });
  };

  const handleDeleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}`);
    setNotes(notes.filter((note) => note.id !== id));
  };

   const handleUpdateNote = async (updatedNote) => {
     const response = await axios.put(
       `/api/notes/${updatedNote.id}`,
       updatedNote
     );
     setNotes(
       notes.map((note) => (note.id === updatedNote.id ? response.data : note))
     );
    //  setIsEditing(false); // Exit edit mode after updating
     setEditNote(null); // Clear the editable note state
   };
   console.log(notes)

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 justify-center">
      {/* Navbar at the top */}
      <Navbar search={search} setSearch={setSearch} />

      {/* Add a container for notes below Navbar */}
      <div className="flex flex-col items-center mx-auto mt-4 w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold py-8 mt-24 mb-4 font-mono text-gray-600 text-center">
          My Notes
        </h1>
        {/* Add new note creation (if needed) */}

        {/* List of notes */}
        <ul className="w-full flex flex-wrap gap-4 items-start">
          <AddNewNote />
          {notes
            .filter((note) => {
              console.log(note.title);
              return note.title.toLowerCase().includes(search.toLowerCase());
            })
            .map((note) => (
              <li key={note.id}>
                <Note
                  title={note.title}
                  description={note.description}
                  date={note.date}
                  handleDeleteNote={() => handleDeleteNote(note.id)}
                  handleEditNote={() => {
                    // setIsEditing(true);
                    setEditNote(note);
                  }}
                  isEditing={note.id === editNote?.id}
                  currentNote={editNote}
                  handleUpdateNote={handleUpdateNote}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
