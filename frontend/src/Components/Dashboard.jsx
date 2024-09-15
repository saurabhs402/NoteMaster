import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Note from "./Note";
import Navbar from "./Navbar";
import AddNewNote from "./AddNewNote";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    // {
    //   id:nanoid(),
    //   title: "mNote",
    //   description: "ahjdkskl",
    //   date: "13/04/2024",
    // },
    // {
    //   id:nanoid(),
    //   title: "pNote",
    //   description: "ahjdkskl dkdkdk kskdkfkl",
    //   date: "13/04/2024",
    // },
    // {
    //   id:nanoid(),
    //   title: "qNote",
    //   description: "ahjdkskl",
    //   date: "13/04/2024",
    // },
    // {
    //   id:nanoid(),
    //   title: "mNote",
    //   description: "ahjdkskl",
    //   date: "13/04/2024",
    // },
    // {
    //   id:nanoid(),
    //   title: "rNote",
    //   description: "ahjdkskl",
    //   date: "13/04/2024",
    // },
  ]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");

  const [editNote, setEditNote] = useState(null); // Track the note being edited
 
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_BACKEND}/api/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const getNotes = response.data.map((note) => ({
            id: note._id,
            title: note.title,
            description: note.description,
            date: new Date(note.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              }
            ),
          }));
          console.log("getNotes:", getNotes);
          setNotes(getNotes.reverse());
        }
      } catch (error) {
        console.log("error:", error);
        console.log("errorMessage:", error?.response?.data?.message);
        if (error.status === 401) {
          toast.error("Session Expired", {
            duration: 1000,
          });
          navigate("/login");
        } else {
          toast.error(error?.response?.data?.message || "Server Error", {
            duration: 1000,
          });
        }
      }
    };
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    console.log("NewNote:", newNote);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/api/notes/`,
        newNote,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const note = response.data;
      console.log("Response:", response.data);
      if (response.status === 201) {
        setNotes([
          {
            id: note._id,
            title: note.title,
            description: note.description,
            date: new Date(note.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }),
          },
          ...notes
        ]);
      }
      setNewNote({ title: "", description: "" });
    } catch (error) {
      if (error.status === 401) {
        toast.error("Session Expired", {
          duration: 1000,
        });
        navigate("/login");
      } else {
        toast.error(error?.response?.data?.message || "Server Error", {
          duration: 1000,
        });
      }
    }
  };

  const handleDeleteNote = async (id) => {
    try{
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL_BACKEND}/api/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("deleteResponse:",response)
    if(response.status===204)
    setNotes(notes.filter((note) => note.id !== id));
  }catch(error){
     if (error.status === 401) {
       toast.error("Session Expired", {
         duration: 1000,
       });
       navigate("/login");
     } else {
       toast.error(error?.response?.data?.message || "Server Error", {
         duration: 1000,
       });
     }

   }
  };

  const handleUpdateNote = async (updatedNote) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL_BACKEND}/api/notes/${updatedNote.id}`,
        {
          title: updatedNote.title,
          description: updatedNote.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200)
        setNotes(
          notes.map((note) =>
            note.id === updatedNote.id
              ? {
                  id: response.data._id,
                  title: response.data.title,
                  description: response.data.description,
                  date: new Date(response.data.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    }
                  ),
                }
              : note
          )
        );

      setEditNote(null); // Clear the editable note state
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        toast.error("Session Expired", {
          duration: 1000,
        });
        navigate("/login");
      } else {
        toast.error(error?.response?.data?.message || "Server Error", {
          duration: 1000,
        });
      }
    }
  };
  console.log("Notes:",notes);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 justify-center">
      {/* Navbar at the top */}

      <Navbar search={search} setSearch={setSearch} />
      <Toaster />

      {/* Add a container for notes below Navbar */}
      <div className="flex flex-col items-center mx-auto mt-4 w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold py-8 mt-24 mb-4 font-mono text-gray-600 text-center">
          My Notes
        </h1>
        {/* Add new note creation (if needed) */}

        {/* List of notes */}
        <ul className="w-full flex flex-wrap gap-4 items-start">
          <AddNewNote
            handleCreateNote={handleCreateNote}
            newNote={newNote}
            setNewNote={setNewNote}
          />
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
