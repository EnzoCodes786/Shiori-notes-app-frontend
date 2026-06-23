import "./mainGrid.css";
import NoteCard from "../component/notesCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoteView from "../component/noteView";

const BASE_URL = "https://shiori-notes-app-backend.onrender.com";

function MainGrid() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null); 
  const [Title,setTitle] = useState("");
  const [email,setEmail] = useState("");
  const[editNotes,setEditNotes] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    async function getNotes() {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/notes/getNotes`, {
          withCredentials: true,
        });

        console.log("API response:", res.data);

        const fetchedNotes = Array.isArray(res.data)
          ? res.data
          : res.data.notes || res.data.data || [];

        setNotes(fetchedNotes);
      } catch (err) {
        console.error("Error fetching notes:", err.response?.status, err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    }

    getNotes();
  }, []);

  function handleDeleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }
  
  async function searchTitle() {
    const res = await axios.post(`${BASE_URL}/notes/getNotesFilter?title=${Title}`);
    
  }
  useEffect(()=>{
  async function getUserInfo() {
    const res = await axios.get(`${BASE_URL}/auth/getUserInfo`,{
      withCredentials :true
    });
    setEmail(res.data.info.email);
  }
  getUserInfo()
  },[])
  const d = darkMode;
  return (
    <div className={d ? "dashboard-dark" : "dashboard"} >
      <aside className={d? "sidebar-dark":"sidebar"}>
        <div className={d?"logo-dark":"logo"}>しおり</div>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={d ? "toggle-btn-dark" : "toggle-btn"}
            aria-label="Toggle dark mode"
          >
            {d ? "☀️ Light" : "🌙 Dark"}
          </button>
        <div className={d? "user-box-dark" : "user-box"}>
          <div className={d?"user-info-dark":"user-info"}>
            <h3>{email.split('@')[0].split('.')[0].charAt(0).toUpperCase()+email.split('@')[0].split('.')[0].slice(1)}</h3>
            <p>{email}</p>
          </div>
        </div>
      </aside>

      <main className={d?"content-dark":"content"}>
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search your thoughts..."
            className="search-box"
          />
          <Link to="/newNote" className="new-note-link">New Note</Link>
        </div>

        <div className="notes-grid">
          {loading && <p>Loading notes...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && notes.length === 0 && <p>No notes found.</p>}

          {notes.map((e) => (
            <NoteCard
              key={e.id}
              id={e.id}
              title={e.title}
              content={e.content}
              user_id={e.user_id}
              onDelete={handleDeleteNote}
              onClick={() => setSelectedNote(e)} // 
            />
          ))}
        </div>
      </main>

      {selectedNote && (
        <NoteView
          id={selectedNote.id}
          title={selectedNote.title}
          content={selectedNote.content}
          onClose={() => setSelectedNote(null)}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
}

export default MainGrid;