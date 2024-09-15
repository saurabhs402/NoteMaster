import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";
import Navbar from "./Navbar";
import AddNewNote from "./AddNewNote";

const Dashboard = () => {
  const [notes, setNotes] = useState([
    {
      title: "mNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
    {
      title: "pNote",
      description: "ahjdkskl dkdkdk kskdkfkl",
      date: "13/04/2024",
    },
    {
      title: "qNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
    {
      title: "mNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
    {
      title: "rNote",
      description: "ahjdkskl",
      date: "13/04/2024",
    },
  ]);
   const [newNote, setNewNote] = useState({ title: "", content: "" });
   const [search,setSearch] =useState('');

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

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 justify-center">
      {/* Navbar at the top */}
      <Navbar search={search} setSearch={setSearch} />

      {/* Add a container for notes below Navbar */}
      <div className="flex flex-col items-start mx-auto mt-4 w-full max-w-4xl">
        <h1 className="text-4xl font-bold py-8 mt-24 font-mono text-gray-600">My Notes</h1>
        {/* Add new note creation (if needed) */}

        {/* List of notes */}
        <ul className="w-full flex flex-wrap gap-4 items-start">
          <AddNewNote />
          {notes
          .filter((note)=> {
            console.log(note.title)
            return note.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((note) => (
            <li key={note.id}>
              <Note
                title={note.title}
                description={note.description}
                date={note.date}
                handleDeleteNote={() => handleDeleteNote(note.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
