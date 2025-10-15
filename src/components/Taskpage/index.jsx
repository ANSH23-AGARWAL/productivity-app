import React, { useState, useEffect } from "react";
import { Wrapper } from "./style";
import { 
  FiTag, FiCalendar, FiCheckSquare, FiUser, FiPaperclip, FiPlus,
   FiMessageSquare
} from "react-icons/fi";

const CardDetailPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [description, setDescription] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 🔹 Load from localStorage
  useEffect(() => {
    setDescription(localStorage.getItem("description") || "");
    setChecklist(JSON.parse(localStorage.getItem("checklist")) || []);
    setComments(JSON.parse(localStorage.getItem("comments")) || []);
  }, []);

  // 🔹 Save to localStorage
  useEffect(() => {
    localStorage.setItem("description", description);
    localStorage.setItem("checklist", JSON.stringify(checklist));
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [description, checklist, comments]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setChecklist([...checklist, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...checklist];
    updated[index].done = !updated[index].done;
    setChecklist(updated);
  };

  const addComment = () => {
    if (comment.trim() !== "") {
      const newComment = {
        text: comment,
        time: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <Wrapper>
      <div className="card-detail-page">
        {/* Left Section */}
        <div className="left-section">
          <h1 className="card-title">rahul</h1>
          <div className="button-group">
            <button onClick={() => toggleSection("add")}><FiPlus /> Add</button>
            <button onClick={() => toggleSection("labels")}><FiTag /> Labels</button>
            <button onClick={() => toggleSection("dates")}><FiCalendar /> Dates</button>
            <button onClick={() => toggleSection("checklist")}><FiCheckSquare /> Checklist</button>
            <button onClick={() => toggleSection("members")}><FiUser /> Members</button>
            <button onClick={() => toggleSection("cover")}><FiPaperclip /> Cover</button>
          </div>

          {activeSection === "add" && (
            <div className="popup"><p>📋 Add new item to your card.</p></div>
          )}

          {activeSection === "labels" && (
            <div className="popup labels">
              <p>🏷️ Choose a label:</p>
              <div className="label-palette">
                <span className="green"></span>
                <span className="blue"></span>
                <span className="red"></span>
                <span className="yellow"></span>
              </div>
            </div>
          )}

          {activeSection === "dates" && (
            <div className="popup"><input type="date" /></div>
          )}

          {activeSection === "checklist" && (
            <div className="popup checklist">
              <p>✅ Add Checklist</p>
              <div className="task-add">
                <input
                  type="text"
                  placeholder="Enter task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
              </div>
              <ul>
                {checklist.map((task, i) => (
                  <li key={i}>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(i)}
                    />
                    <span className={task.done ? "done" : ""}>{task.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === "members" && (
            <div className="popup"><p>👥 Add team members.</p></div>
          )}

          {activeSection === "cover" && (
            <div className="popup"><p>🖼️ Upload cover image.</p><input type="file" /></div>
          )}

          <div className="description-section">
            <h3>Description</h3>
            <textarea
              placeholder="Add a more detailed description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="activity-section">
            <div className="activity-header">
              <FiMessageSquare /> Comments and activity
            </div>
            <textarea
              className="comment-input"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button onClick={addComment} className="comment-btn">Add Comment</button>
            <div className="comment-list">
              {comments.map((c, i) => (
                <div className="comment" key={i}>
                  <span className="user">rahul saini</span>
                  <p>{c.text}</p>
                  <span className="time">{c.time}</span>
                </div>
              ))}
              <div className="comment">
                <span className="user">rahul saini</span>
                <p>added this card to to do</p>
                <span className="time">Sep 5, 2025, 11:43 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CardDetailPage;
