import "./noteView.css";
import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://shiori-notes-app-backend.onrender.com";

function NoteView({ id, title, content, onClose, onDelete }) {
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  async function deleteNote() {
    try {
      setDeleting(true);
      await axios.delete(`${BASE_URL}/notes/deleteNotes/${id}`, {
        withCredentials: true,
      });
      onDelete(id);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  }

  async function summarizeNote() {
    try {
      setSummarizing(true);
      const res = await axios.get(
        `${BASE_URL}/notes/summarizeNotes/${id}`,
        
        { withCredentials: true }
      );
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to summarize note");
    } finally {
      setSummarizing(false);
    }
  }

 

  return (
    <div className="note-view-overlay" onClick={onClose}>
      <div className="note-view-card" onClick={(e) => e.stopPropagation()}>
        <div className="note-view-header">
          <h2 className="note-view-title">{title}</h2>
          <button className="note-view-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="note-view-content">{content}</div>

        {summary && (
          <div className="note-view-summary">
            <h4>Summary</h4>
            <p>{summary}</p>
          </div>
        )}

        <div className="note-view-actions">
          <button
            className="note-view-summarize-btn"
            onClick={summarizeNote}
            disabled={summarizing}
          >
            {summarizing ? "Summarizing..." : "Summarize"}
          </button>

          <button
            className="note-view-delete-btn"
            onClick={deleteNote}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default NoteView;