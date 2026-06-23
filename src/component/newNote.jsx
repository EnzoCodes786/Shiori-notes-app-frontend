import { useState } from "react";
import axios from "axios";
import "./newNote.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://shiori-notes-app-backend.onrender.com";

function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()
  async function createNotes() {
    try {
      const res = await axios.post(
        `${BASE_URL}/notes/sendNotes`,
        {
          title: title,
          content: content,
        },
        {
          withCredentials: true,
        }
      );
      alert(res.data);
      if (res.status === 200) {
      navigate("/landingPage");
    }
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    }
  }

  return (
    <div className="new-note-body">
      <div className="new-note-action">
        <input
          type="text"
          className="new-title"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="new-content"
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="note-actions">
          <button className="create-btn" onClick={createNotes}>
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewNote;