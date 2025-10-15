import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LayoutTemplate,
  ChevronDown,
} from 'lucide-react';

import {
  AppWrapper,
  GlobalStyle,
  Header,
  ContentWrapper,
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
  PrioritySelect,
  AddCardFloatingButton
} from './style.js';

const BoardPage = () => {
  const [panelOpen, setPanelOpen] = useState(null);
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardDueDate, setCardDueDate] = useState(new Date());
  const [cardMember, setCardMember] = useState('');
  const [cardPriority, setCardPriority] = useState('Normal');
  const [cards, setCards] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [templateName, setTemplateName] = useState('');

  const navigate = useNavigate();

  const inboxRef = useRef(null);
  const profileRef = useRef(null);
  const templatesModalRef = useRef(null);
  const trashSlideRef = useRef(null);
  const addCardModalRef = useRef(null);

  const membersList = ['Alice', 'Bob', 'Charlie', 'David'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (panelOpen === 'inbox' && inboxRef.current && !inboxRef.current.contains(event.target)) ||
        (panelOpen === 'profile' && profileRef.current && !profileRef.current.contains(event.target)) ||
        (panelOpen === 'templates' && templatesModalRef.current && !templatesModalRef.current.contains(event.target)) ||
        (panelOpen === 'trash' && trashSlideRef.current && !trashSlideRef.current.contains(event.target))
      ) {
        setPanelOpen(null);
      }
      if (addCardModalRef.current && !addCardModalRef.current.contains(event.target)) {
        setAddCardModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [panelOpen, addCardModalOpen]);

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
    setPanelOpen(null);
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
          <button className="icon-button" onClick={() => setPanelOpen(panelOpen === 'inbox' ? null : 'inbox')}>
            <Bell size={20} /> Inbox
          </button>
          <button className="icon-button" onClick={() => setPanelOpen(panelOpen === 'profile' ? null : 'profile')}>
            <UserCircle size={20} /> Profile
          </button>
        </div>
      </Header>
      <ContentWrapper>
        <LeftBox>
          <div className="left-box-buttons">
            <button className="left-box-button" onClick={() => setPanelOpen(panelOpen === 'templates' ? null : 'templates')}>
              <LayoutTemplate size={20} /> Templates
            </button>
            <button className="left-box-button" onClick={() => setPanelOpen(panelOpen === 'trash' ? null : 'trash')}>
              <Trash2 size={20} /> Trash
            </button>
          </div>
        </LeftBox>
        <ContentArea panelOpen={panelOpen}>
          <div className="main-content">
            <div className="card-grid">
              {cards.map((card) => (
                <div key={card.id} className="card-item">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className="card-details">
                    <span>Due: {card.dueDate}</span>
                    <span>Member: {card.member || 'N/A'}</span>
                    <span>
                      Priority: <span className={`priority-${card.priority.toLowerCase()}`}>{card.priority}</span>
                    </span>
                  </div>
                  <div className="card-footer">Last updated: {card.lastUpdated}</div>
                  <button className="delete-card-button" onClick={() => handleDeleteCard(card.id)}>Delete</button>
                </div>
              ))}
            </div>
            <div className="recent-viewed-section">
              <h2>Recent Viewed Boards</h2>
              <div className="recent-boards-placeholder">
                <p>No recent boards to display.</p>
              </div>
            </div>
            <div className="upcoming-deadlines-section">
              <h2>Upcoming Deadlines</h2>
              <div className="deadlines-placeholder">
                <p>No upcoming deadlines.</p>
              </div>
            </div>
          </div>
        </ContentArea>
      </ContentWrapper>

      <AddCardFloatingButton>
        <button onClick={() => setAddCardModalOpen(true)}>
          <Plus size={24} />
        </button>
      </AddCardFloatingButton>

      {panelOpen === 'inbox' && (
        <RightPanel ref={inboxRef} type="inbox">
          <div className="panel-header">
            <h3>Notifications</h3>
            <button className="close-button" onClick={() => setPanelOpen(null)}><X size={20} /></button>
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
      {panelOpen === 'profile' && (
        <ProfileSlidePanel ref={profileRef} type="profile">
          <div className="panel-header">
            <h3>My Profile</h3>
            <button className="close-button" onClick={() => setPanelOpen(null)}><X size={20} /></button>
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
      {panelOpen === 'templates' && (
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
              <button className="cancel-button" onClick={() => setPanelOpen(null)}>
                Cancel
              </button>
              <button className="primary-button" onClick={handleTemplateAdd}>
                Add Template
              </button>
            </div>
          </TemplatesModalContent>
        </ModalOverlay>
      )}
      {panelOpen === 'trash' && (
        <TrashSlidePanel ref={trashSlideRef}>
          <div className="panel-header">
            <h3>Deleted Items</h3>
            <button className="close-button" onClick={() => setPanelOpen(null)}><X size={20} /></button>
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