import { useState } from "react";
import "./notesCard.css";
import axios from "axios";

const BASE_URL = "https://shiori-notes-app-backend.onrender.com";

function NoteCard({ id, title, content, user_id, onDelete, onClick }) {
  const [darkMode,setDarkMode] = useState(false);
  async function deleteNote(e) {
    e.stopPropagation(); // 👈 card click trigger na ho

    try {
      const res = await axios.delete(`${BASE_URL}/notes/deleteNotes/${id}`, {
        withCredentials: true,
      });
      onDelete(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  }

  return (
    <div className="main-body-card" onClick={onClick}>
      <div className="action-keys">
        <button className="delete" onClick={deleteNote}></button>
      </div>
      <div className="title-box">{title}</div>
      <div className="note-preview-box">{content}</div>
    </div>
  );
}

export default NoteCard;