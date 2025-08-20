import React, { useState, useRef, useEffect } from "react";
import { Menu, Info, Bell, UserCircle, Plus } from "lucide-react";
import { Wrapper, BoardGlobalStyle, SlidePanel, ModalOverlay, ModalContent, ProfilePanel, InboxPanel } from "./style.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from 'react-hot-toast';

const BoardPage = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false); // New state for Inbox panel
  const [cardTitle, setCardTitle] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [cards, setCards] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("Normal");
  const [members, setMembers] = useState("");

  const boxRef = useRef(null);
  const slideRef = useRef(null);
  const profileRef = useRef(null);
  const modalRef = useRef(null);
  const inboxRef = useRef(null); // New ref for Inbox panel

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) setIsBoxOpen(false);
      if (slideRef.current && !slideRef.current.contains(event.target)) setMenuOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
      if (modalRef.current && !modalRef.current.contains(event.target)) setModalOpen(false);
      if (inboxRef.current && !inboxRef.current.contains(event.target)) setInboxOpen(false); // Handle click outside Inbox
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddCard = () => setModalOpen(true);

  const handleCreateCard = () => {
    if (cardTitle.trim()) {
      const newCard = {
        title: cardTitle,
        desc: cardDesc,
        updated: "just now",
        dueDate: dueDate.toDateString(),
        priority,
        members
      };
      setCards([...cards, newCard]);
      toast.success("New card added");
      setCardTitle("");
      setCardDesc("");
      setDueDate(new Date());
      setPriority("Normal");
      setMembers("");
      setModalOpen(false);
    } else {
      toast.error("Title is required");
    }
  };

  return (
    <>
      <BoardGlobalStyle />
      <Toaster position="bottom-center" />
      <Wrapper>
        <div className="board-container">
          <div className="board-header">
            <div className="flex-items-center">
              <button className="board-icon icon-hover" onClick={() => setMenuOpen(prev => !prev)}>
                <Menu />
              </button>
              <div className="board-logo">Boardwise</div>
            </div>
            <div className="board-icons">
              <button className="icon-btn" title="Info" onClick={() => setIsBoxOpen(prev => !prev)}><Info size={20} /></button>
              <button className="icon-btn" title="Notification" onClick={() => toast("🔔 Notification Clicked!")}><Bell size={20} /></button>
              <button className="icon-btn" title="Profile" onClick={() => setProfileOpen(prev => !prev)}><UserCircle size={20} /></button>
            </div>
          </div>

          {isBoxOpen && (
            <div className="board-toggle-popover">
              <div className="board-toggle-box" ref={boxRef}>
                <p>This is the box content!</p>
                <button className="toggle-close-btn" onClick={() => setIsBoxOpen(false)}>×</button>
              </div>
            </div>
          )}

          {menuOpen && (
            <SlidePanel ref={slideRef}>
              <div className="slide-header">Rahul's Workspace</div>
              <div className="slide-option active">Home</div>
              <div className="slide-option" onClick={() => setInboxOpen(true)}>Inbox</div> {/* Open Inbox panel */}
              
              <div className="slide-option">Trash</div>
              <div className="slide-option">Invite members</div>
            </SlidePanel>
          )}

          {profileOpen && (
            <ProfilePanel ref={profileRef}>
              <div className="profile-header">
                <div className="profile-avatar"></div>
                User Profile
              </div>
              <div className="profile-item" onClick={() => toast("👤 My Account")}>My Account</div>
              <div className="profile-item" onClick={() => toast("⚙️ Settings")}>Settings</div>
              <div className="profile-item" onClick={() => toast("🚪 Logged out")}>Logout</div>
            </ProfilePanel>
          )}

          {inboxOpen && (
            <InboxPanel ref={inboxRef}>
              <div className="inbox-header">Inbox</div>
              <div className="inbox-content">
                <div className="inbox-empty">
                  <div className="inbox-icon"></div>
                  <p>You're all caught up</p>
                  <span>You'll be notified here for @mentions, page activity, and page invites</span>
                </div>
              </div>
            </InboxPanel>
          )}

          <div className="board-main">
            <div className="board-main-title">Your Pages</div>
            <div className="board-grid">
              <div className="board-card blank icon-hover" onClick={handleAddCard}>
                <Plus style={{ fontSize: "2rem", marginBottom: "0.5rem" }} />
                <div>+ Add a new card</div>
              </div>
              {cards.map((item, i) => (
                <div className="board-card icon-hover" key={i}>
                  <div className="board-card-title">{item.title}</div>
                  <div className="board-card-desc">{item.desc}</div>
                  <div className="board-card-footer">Due: {item.dueDate} | Priority: {item.priority} | Members: {item.members}</div>
                  <div className="board-card-footer">Last updated: {item.updated}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {modalOpen && (
          <ModalOverlay>
            <ModalContent ref={modalRef}>
              <h3 style={{ marginBottom: '1rem' }}>Create New Card</h3>
              <input
                type="text"
                placeholder="Card Title"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Card Description"
                value={cardDesc}
                onChange={(e) => setCardDesc(e.target.value)}
              />
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                placeholderText="Due Date"
                className="date-picker"
              />
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
              <input
                type="text"
                placeholder="Members"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
              />
              <button onClick={handleCreateCard}>Create</button>
            </ModalContent>
          </ModalOverlay>
        )}
      </Wrapper>
    </>
  );
};

export default BoardPage;