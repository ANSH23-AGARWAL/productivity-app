import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import {
  Bell,
  UserCircle,
  Plus,
  Moon,
  Sun,
  X,
  Archive,
  Trash2,
  Users,
  LayoutTemplate,
  ChevronDown,
} from 'lucide-react';

import {
  AppWrapper,
  GlobalStyle,
  Header,
  ContentWrapper, // Naya component jo LeftBox aur ContentArea ko wrap karega
  ContentArea,
  LeftBox,
  RightPanel,
  ModalOverlay,
  ModalContent,
  TemplatesModalContent,
  TrashSlidePanel,
  ProfileSlidePanel,
  ThemeToggleButton,
  MemberSelect,
  PrioritySelect
} from './style.js';

const BoardPage = () => {
  const [inboxOpen, setInboxOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);
  const [trashSlideOpen, setTrashSlideOpen] = useState(false);
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'

  // Card states
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardDueDate, setCardDueDate] = useState(new Date());
  const [cardMember, setCardMember] = useState('');
  const [cardPriority, setCardPriority] = useState('Normal');
  const [cards, setCards] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [templateName, setTemplateName] = useState('');


  // Refs for click outside
  const inboxRef = useRef(null);
  const profileRef = useRef(null);
  const templatesModalRef = useRef(null);
  const trashSlideRef = useRef(null);
  const addCardModalRef = useRef(null);

  const membersList = ['Alice', 'Bob', 'Charlie', 'David']; // Example members

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inboxRef.current && !inboxRef.current.contains(event.target)) {
        setInboxOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (templatesModalRef.current && !templatesModalRef.current.contains(event.target)) {
        setTemplatesModalOpen(false);
      }
      if (trashSlideRef.current && !trashSlideRef.current.contains(event.target)) {
        setTrashSlideOpen(false);
      }
      if (addCardModalRef.current && !addCardModalRef.current.contains(event.target)) {
        setAddCardModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Theme change effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    toast.success(`${theme === 'light' ? 'Dark' : 'Light'} mode activated!`);
  };

  const handleAddCard = () => {
    if (!cardTitle.trim()) {
      toast.error('Card title is required!');
      return;
    }
    const newCard = {
      id: Date.now(),
      title: cardTitle,
      description: cardDescription,
      dueDate: cardDueDate.toDateString(),
      member: cardMember,
      priority: cardPriority,
      lastUpdated: new Date().toLocaleString(),
    };
    setCards((prevCards) => [...prevCards, newCard]);
    toast.success('Card added successfully!');
    setAddCardModalOpen(false);
    // Reset form fields
    setCardTitle('');
    setCardDescription('');
    setCardDueDate(new Date());
    setCardMember('');
    setCardPriority('Normal');
  };

  const handleTemplateAdd = () => {
    if (!templateName.trim()) {
      toast.error('Template name cannot be empty!');
      return;
    }
    toast.success(`Template "${templateName}" added!`);
    setTemplatesModalOpen(false);
    setTemplateName('');
  };

  const handleDeleteCard = (id) => {
    const cardToDelete = cards.find(card => card.id === id);
    if (cardToDelete) {
      setDeletedFiles(prev => [...prev, cardToDelete]);
      setCards(prev => prev.filter(card => card.id !== id));
      toast.success('Card moved to trash!');
    }
  };

  return (
    <AppWrapper data-theme={theme}>
      <GlobalStyle />
      <Toaster position="bottom-right" />

      <Header>
        <div className="header-left">
          <div className="logo">Boardwise</div>
        </div>
        <div className="header-right">
          <button className="icon-button" onClick={() => setInboxOpen(!inboxOpen)}>
            <Bell size={20} /> Inbox
          </button>
          <button className="icon-button" onClick={() => setProfileOpen(!profileOpen)}>
            <UserCircle size={20} /> Profile
          </button>
        </div>
      </Header>

      <ContentWrapper>
        {/* Left Box (Wireframe inspired) */}
        <LeftBox>
          <div className="left-box-buttons">
            <button className="left-box-button" onClick={() => setTemplatesModalOpen(true)}>
              <LayoutTemplate size={20} /> Templates
            </button>
            <button className="left-box-button" onClick={() => setTrashSlideOpen(true)}>
              <Trash2 size={20} /> Trash
            </button>
          </div>
          <button className="invite-member-button">
            <Users size={20} /> Invite Members
          </button>
        </LeftBox>

        {/* Main Content Area */}
        <ContentArea inboxOpen={inboxOpen} profileOpen={profileOpen}>
          <div className="main-content">
            <h1 className="welcome-text">Welcome</h1>

            <div className="add-card-section">
              <button className="add-card-button" onClick={() => setAddCardModalOpen(true)}>
                <Plus size={24} /> Add a new card
              </button>
              <div className="card-grid">
                {cards.map((card) => (
                  <div key={card.id} className="card-item">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="card-details">
                      <span>Due: {card.dueDate}</span>
                      <span>Member: {card.member || 'N/A'}</span>
                      <span>Priority: <span className={`priority-${card.priority.toLowerCase()}`}>{card.priority}</span></span>
                    </div>
                    <div className="card-footer">Last updated: {card.lastUpdated}</div>
                    <button className="delete-card-button" onClick={() => handleDeleteCard(card.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-viewed-section">
              <h2>Recent Viewed Boards</h2>
              <div className="recent-boards-placeholder">No recent boards to display.</div>
            </div>

            <div className="upcoming-deadlines-section">
              <h2>Upcoming Deadlines</h2>
              <div className="deadlines-placeholder">No upcoming deadlines.</div>
            </div>
          </div>
        </ContentArea>
      </ContentWrapper>

      {/* Inbox Slide Panel */}
      {inboxOpen && (
        <RightPanel ref={inboxRef} type="inbox">
          <div className="panel-header">
            <h3>Notifications</h3>
            <button className="close-button" onClick={() => setInboxOpen(false)}><X size={20} /></button>
          </div>
          <div className="panel-content">
            <div className="empty-state">
              <Archive size={48} />
              <p>You're all caught up!</p>
              <span>No new notifications at the moment.</span>
            </div>
          </div>
        </RightPanel>
      )}

      {/* Profile Slide Panel */}
      {profileOpen && (
        <ProfileSlidePanel ref={profileRef} type="profile">
          <div className="panel-header">
            <h3>My Profile</h3>
            <button className="close-button" onClick={() => setProfileOpen(false)}><X size={20} /></button>
          </div>
          <div className="panel-content">
            <div className="profile-info">
              <UserCircle size={60} />
              <h4>User Name</h4>
              <p>user.email@example.com</p>
            </div>
            <div className="profile-options">
              <div className="option-item">
                <span>Switch Account</span> <ChevronDown size={18} />
              </div>
              <div className="option-item">Manage Account</div>
              <div className="option-item">Settings</div>
              <div className="option-item">Help</div>
              <div className="option-item theme-option">
                <span>Theme</span>
                <ThemeToggleButton onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </ThemeToggleButton>
              </div>
            </div>
          </div>
        </ProfileSlidePanel>
      )}

      {/* Templates Add Modal */}
      {templatesModalOpen && (
        <ModalOverlay>
          <TemplatesModalContent ref={templatesModalRef}>
            <h3>Add New Template</h3>
            <input
              type="text"
              placeholder="Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setTemplatesModalOpen(false)}>
                Cancel
              </button>
              <button className="primary-button" onClick={handleTemplateAdd}>
                Add Template
              </button>
            </div>
          </TemplatesModalContent>
        </ModalOverlay>
      )}

      {/* Trash Slide Panel */}
      {trashSlideOpen && (
        <TrashSlidePanel ref={trashSlideRef}>
          <div className="panel-header">
            <h3>Deleted Items</h3>
            <button className="close-button" onClick={() => setTrashSlideOpen(false)}><X size={20} /></button>
          </div>
          <div className="panel-content">
            {deletedFiles.length === 0 ? (
              <div className="empty-state">
                <Trash2 size={48} />
                <p>Trash is empty!</p>
                <span>No deleted items to show.</span>
              </div>
            ) : (
              <div className="deleted-items-list">
                {deletedFiles.map((item) => (
                  <div key={item.id} className="deleted-item">
                    <span>{item.title}</span>
                    <small>Deleted: {item.lastUpdated}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TrashSlidePanel>
      )}

      {/* Add Card Modal */}
      {addCardModalOpen && (
        <ModalOverlay fullScreen>
          <ModalContent ref={addCardModalRef}>
            <h3>Add New Card</h3>
            <input
              type="text"
              placeholder="Title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
              rows="3"
            ></textarea>
            <div className="form-group">
              <label>Due Date:</label>
              <DatePicker
                selected={cardDueDate}
                onChange={(date) => setCardDueDate(date)}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
              />
            </div>
            <div className="form-group">
              <label>Member:</label>
              <MemberSelect value={cardMember} onChange={(e) => setCardMember(e.target.value)}>
                <option value="">Select Member</option>
                {membersList.map((member) => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </MemberSelect>
            </div>
            <div className="form-group">
              <label>Priority:</label>
              <PrioritySelect value={cardPriority} onChange={(e) => setCardPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </PrioritySelect>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setAddCardModalOpen(false)}>
                Cancel
              </button>
              <button className="primary-button" onClick={handleAddCard}>
                Add Card
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </AppWrapper>
  );
};

export default BoardPage;