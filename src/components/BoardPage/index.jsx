import React, { useState, useRef } from "react";
import { Menu, Info, User, Plus } from "lucide-react";
import Wrapper from "./style.js";

const Board = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const boxRef = useRef(null);

  // Close box when clicking outside
  React.useEffect(() => {
    if (!isBoxOpen) return;
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsBoxOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isBoxOpen]);

  const handleToggleBox = () => {
    setIsBoxOpen((prev) => !prev);
  };

  return (
    <Wrapper>
      <div className="board-container">
        <div className="board-header">
          <div className="flex-items-center">
            <button className="board-icon" onClick={handleToggleBox}>
              <Menu />
            </button>
            <div className="board-logo">APP</div>
            <span className="board-title">Your App</span>
          </div>
          <div className="board-icons">
            <button onClick={handleToggleBox}>
              <Info />
            </button>
            <button onClick={handleToggleBox}>
              <User />
            </button>
            <button onClick={handleToggleBox}>
              <Plus />
            </button>
          </div>
        </div>
        {isBoxOpen && (
          <div className="board-toggle-popover">
            <div className="board-toggle-box" ref={boxRef}>
              <p>This is the box content!</p>
              <button className="toggle-close-btn" onClick={handleToggleBox}>
                ×
              </button>
            </div>
          </div>
        )}
        <div className="board-main">
          <div className="board-main-title">Your Pages</div>
          <div className="board-grid">
            <div className="board-card blank">
              <Plus style={{ fontSize: "2rem", marginBottom: "0.5rem" }} />
              <div>+ Add a new card</div>
            </div>
            <div className="board-card">
              <div className="board-card-title">Project Overview</div>
              <div className="board-card-desc">
                A brief description of this page's content or purpose.
              </div>
              <div className="board-card-footer">Last updated: 2 days ago</div>
            </div>
            <div className="board-card">
              <div className="board-card-title">Team Collaboration</div>
              <div className="board-card-desc">
                Details about team tasks and shared resources.
              </div>
              <div className="board-card-footer">Last updated: 1 week ago</div>
            </div>
            <div className="board-card">
              <div className="board-card-title">Client Feedback</div>
              <div className="board-card-desc">
                Summary of client reviews and action items.
              </div>
              <div className="board-card-footer">Last updated: 3 days ago</div>
            </div>
            <div className="board-card blank">
              <div>Empty Slot</div>
            </div>
            <div className="board-card blank">
              <div>Empty Slot</div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Board;
