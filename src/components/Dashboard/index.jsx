// index.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { notifySuccess, notifyError } from '../../utils/toast';
import useBoardForm, { parseMemberEmails, parseCsvValues } from '../../hooks/useBoardForm';

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
  LogOut,
  MoreHorizontal,
  RotateCcw,
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

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/').replace(/\/+$/, '');
const CREATE_BOARD_ENDPOINT = '/boards/create';
const INVITE_BOARD_ENDPOINT = '/boards/invite';
const USER_SETTINGS_STORAGE_KEY = 'boardwise:user-settings';
const DEFAULT_USER_SETTINGS = Object.freeze({
  emailNotifications: true,
  pushNotifications: true,
  dailyDigest: false,
  compactMode: false,
  autoArchiveCompleted: false,
  defaultBoardView: 'board',
  preferredTheme: 'dark',
});

const getBoardId = (boardLike) => boardLike?.boardId || boardLike?._id || boardLike?.id;

const formatDateTime = (value) => {
  if (!value) return 'Unknown';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return typeof value === 'string' ? value : 'Unknown';
  }
  return parsed.toLocaleString();
};

const readTrashedBoardsFromStorage = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const stored = window.localStorage.getItem('trashedBoards');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Unable to read trashed boards from storage', error);
    return [];
  }
};

const readStoredUserSettings = () => {
  const fallback = { ...DEFAULT_USER_SETTINGS };
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const stored = window.localStorage.getItem(USER_SETTINGS_STORAGE_KEY);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === 'object') {
      return { ...fallback, ...parsed };
    }
    return fallback;
  } catch (error) {
    console.warn('Unable to read stored user settings', error);
    return fallback;
  }
};

const BoardPage = () => {
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(null);
  const [addCardModalOpen, setAddCardModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const {
    cardTitle,
    setCardTitle,
    cardDescription,
    setCardDescription,
    cardDueDate,
    setCardDueDate,
    cardPriority,
    setCardPriority,
    removeMembersInput,
    setRemoveMembersInput,
    inviteInput,
    setInviteInput,
    inviteEmails,
    setInviteEmails,
    handleInviteKeyDown,
    handleInviteBlur,
    handleRemoveInviteEmail,
    resetBoardForm,
  } = useBoardForm();
  const [cards, setCards] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState(readTrashedBoardsFromStorage);
  const [templateName, setTemplateName] = useState('');
  const [recentViewed, setRecentViewed] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [isLoadingBoards, setIsLoadingBoards] = useState(false);
  const [openCardMenuId, setOpenCardMenuId] = useState(null);
  const trashedBoardIds = useMemo(
    () =>
      new Set(
        (deletedFiles || []).map((item) => getBoardId(item.boardData) || item.id)
      ),
    [deletedFiles]
  );
  const sortedTrashBoards = useMemo(() => {
    const copy = [...(deletedFiles || [])];
    return copy.sort((a, b) => {
      const aDate = new Date(a?.deletedAt || a?.lastUpdated || 0).getTime();
      const bDate = new Date(b?.deletedAt || b?.lastUpdated || 0).getTime();
      return bDate - aDate;
    });
  }, [deletedFiles]);



  const inboxRef = useRef(null);
  const profileRef = useRef(null);
  const templatesModalRef = useRef(null);
  const trashSlideRef = useRef(null);
  const addCardModalRef = useRef(null);

  const mapBoardToCard = (board) => {
    const boardId = getBoardId(board) || Date.now();
    return {
      id: boardId,
      title: board?.title || 'Untitled Board',
      description: board?.description || 'No description provided.',
      dueDate: board?.updatedAt || board?.createdAt || new Date().toISOString(),
      member: board?.members?.length ? `${board.members.length} member${board.members.length > 1 ? 's' : ''}` : 'Owner only',
      priority: board?.members?.length >= 5 ? 'High' : board?.members?.length >= 2 ? 'Normal' : 'Low',
      boardData: board,
      lastUpdated: board?.updatedAt
        ? new Date(board.updatedAt).toLocaleString()
        : board?.createdAt
          ? new Date(board.createdAt).toLocaleString()
          : new Date().toLocaleString(),
    };
  };

  const pushToRecentViewed = (card) => {
    setRecentViewed((prev) => {
      const deduped = prev.filter((item) => item.id !== card.id);
      return [card, ...deduped].slice(0, 5);
    });
  };

  const upsertBoardCard = (board) => {
    const mappedCard = mapBoardToCard(board);
    setCards((prevCards) => {
      const exists = prevCards.some((card) => card.id === mappedCard.id);
      if (exists) {
        return prevCards.map((card) => (card.id === mappedCard.id ? mappedCard : card));
      }
      return [...prevCards, mappedCard];
    });
    pushToRecentViewed(mappedCard);
  };

  const removeBoardFromState = (boardId) => {
    setCards((prev) => prev.filter((card) => card.id !== boardId));
    setRecentViewed((prev) => prev.filter((card) => card.id !== boardId));
  };

  const openCreateBoardModal = () => {
    setOpenCardMenuId(null);
    setIsEditingBoard(false);
    setEditingBoardId(null);
    resetBoardForm();
    setAddCardModalOpen(true);
  };

  const openEditBoardModal = (card) => {
    setOpenCardMenuId(null);
    setIsEditingBoard(true);
    setEditingBoardId(getBoardId(card.boardData) || card.id);
    setCardTitle(card.title || '');
    setCardDescription(card.description || '');
    setCardDueDate(card.dueDate ? new Date(card.dueDate) : new Date());
    setCardPriority(card.priority || 'Normal');
    setRemoveMembersInput('');
    setInviteInput('');
    setInviteEmails([]);
    setAddCardModalOpen(true);
  };

  const handleOpenBoard = (card) => {
    setOpenCardMenuId(null);
    const boardPayload = card.boardData || {
      boardId: card.id,
      title: card.title,
      description: card.description,
    };
    try {
      sessionStorage.setItem('activeBoard', JSON.stringify(boardPayload));
    } catch (storageError) {
      console.warn('Unable to persist active board', storageError);
    }
    navigate('/board', { state: { board: boardPayload } });
  };

  const fetchBoardsForUser = async (userId) => {
    setIsLoadingBoards(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/boards/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });
      const boards = response?.data?.boards || [];
      const filteredBoards = boards.filter(
        (board) => !trashedBoardIds.has(getBoardId(board))
      );
      const mapped = filteredBoards.map(mapBoardToCard);
      setCards(mapped);
      setRecentViewed(mapped.slice(0, 5));
    } catch (error) {
      notifyError(error.response?.data?.message || 'Failed to load boards');
      console.error('Fetch boards error:', error);
    } finally {
      setIsLoadingBoards(false);
    }
  };

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem('trashedBoards', JSON.stringify(deletedFiles));
    } catch (error) {
      console.warn('Unable to persist trashed boards', error);
    }
  }, [deletedFiles]);

  useEffect(() => {
    const loadAuthUser = () => {
      try {
        const stored = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
        setAuthUser(stored ? JSON.parse(stored) : null);
      } catch (error) {
        console.warn('Unable to read auth user from storage', error);
        setAuthUser(null);
      }
    };

    loadAuthUser();
    window.addEventListener('storage', loadAuthUser);
    return () => window.removeEventListener('storage', loadAuthUser);
  }, []);

  useEffect(() => {
    if (!authUser?.userId) return;
    fetchBoardsForUser(authUser.userId);
  }, [authUser]);

  useEffect(() => {
    const handleMenuClose = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('.card-action-container')) {
        setOpenCardMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleMenuClose);
    return () => document.removeEventListener('mousedown', handleMenuClose);
  }, []);


  useEffect(() => {
    const today = new Date();

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const upcoming = cards.filter(card => {

      const due = new Date(card.dueDate);
      const dueStart = new Date(due.getFullYear(), due.getMonth(), due.getDate());
      const diffMs = dueStart - startOfToday;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    });
    setUpcomingDeadlines(upcoming);
  }, [cards]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    notifySuccess(`${theme === 'light' ? 'Dark' : 'Light'} mode activated!`);
  };

  const handleLogoClick = () => {
    navigate('/dash');
  };

  const handleSaveBoard = async () => {
    const trimmedTitle = cardTitle.trim();
    const trimmedDescription = cardDescription.trim();

    if (!trimmedTitle) {
      notifyError('Board title is required!');
      return;
    }

    if (!authUser?.userId) {
      notifyError('Missing owner information. Please sign in again.');
      return;
    }

    if (isEditingBoard && editingBoardId) {
      const normalizedTitle = trimmedTitle.toLowerCase();
      const duplicateExists = cards.some((card) => {
        const cardId = getBoardId(card.boardData) || card.id;
        return cardId !== editingBoardId && (card.title || '').trim().toLowerCase() === normalizedTitle;
      });
      if (duplicateExists) {
        notifyError('A board with this name already exists. Please choose another name.');
        return;
      }

      setIsCreatingBoard(true);
      const payload = {
        title: trimmedTitle,
        description: trimmedDescription,
      };

      const membersToRemove = parseCsvValues(removeMembersInput);
      if (membersToRemove.length) {
        payload.removeMembers = membersToRemove;
      }

      try {
        const response = await axios.patch(
          `${API_BASE_URL}/boards/update/${editingBoardId}`,
          payload,
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          }
        );

        const updatedBoard = response?.data?.board;
        if (updatedBoard) {
          upsertBoardCard(updatedBoard);
        }
        notifySuccess(response?.data?.message || 'Board updated');
        setAddCardModalOpen(false);
        setIsEditingBoard(false);
        setEditingBoardId(null);
        resetBoardForm();
      } catch (error) {
        notifyError(error.response?.data?.message || 'Failed to update board');
        console.error('Update board error:', error);
      } finally {
        setIsCreatingBoard(false);
      }

      return;
      return;
    }

    const normalizedTitle = trimmedTitle.toLowerCase();
    const duplicateExists = cards.some((card) => (card.title || '').trim().toLowerCase() === normalizedTitle);
    if (duplicateExists) {
      notifyError('A board with this name already exists. Please choose another name.');
      return;
    }

    setIsCreatingBoard(true);

    const ownerId = authUser.userId;
    const boardPayload = {
      title: trimmedTitle,
      description: trimmedDescription,
      ownerId,
      memberIds: [ownerId],
    };

      const preparedInviteEmails = Array.from(
        new Set([...inviteEmails, ...parseMemberEmails(inviteInput)])
      );

    try {
      const response = await axios.post(
        `${API_BASE_URL}${CREATE_BOARD_ENDPOINT}`,
        boardPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      const board = response?.data?.board;
      notifySuccess(response?.data?.message || 'Board created');

      if (board) {
        upsertBoardCard(board);

        if (preparedInviteEmails.length && getBoardId(board)) {
          try {
            const inviteResponse = await axios.post(
              `${API_BASE_URL}${INVITE_BOARD_ENDPOINT}`,
              {
                email: preparedInviteEmails,
                boardId: getBoardId(board),
                invitedBy: ownerId,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                timeout: 10000,
              }
            );
            notifySuccess(inviteResponse?.data?.message || 'Invitations sent');
          } catch (inviteError) {
            notifyError(inviteError.response?.data?.message || 'Failed to invite members');
            console.error('Invite members error:', inviteError);
          }
        }

        // Automatically navigate to the freshly created board for a smoother flow
        handleOpenBoard({ boardData: board });
      }

      setAddCardModalOpen(false);
      resetBoardForm();
    } catch (error) {
      notifyError(error.response?.data?.message || 'Failed to create board');
      console.error('Create board error:', error);
    } finally {
      setIsCreatingBoard(false);
    }
  };

  const handleTemplateAdd = () => {
    if (!templateName.trim()) {
      notifyError('Template name cannot be empty!');
      return;
    }
    notifySuccess(`Template "${templateName}" added!`);
    setPanelOpen(null);
    setTemplateName('');
  };

  const handleSoftDeleteCard = (card) => {
    const boardId = getBoardId(card.boardData) || card.id;
    if (!boardId) {
      notifyError('Unable to determine which board to delete');
      return;
    }

    setOpenCardMenuId(null);
    removeBoardFromState(boardId);

    const trashedCard = {
      ...card,
      deletedAt: new Date().toISOString(),
    };

    setDeletedFiles((prev) => {
      const filtered = prev.filter(
        (item) => (getBoardId(item.boardData) || item.id) !== boardId
      );
      return [...filtered, trashedCard];
    });

    notifySuccess('Board moved to trash.');
  };

  const handleRestoreBoard = (card) => {
    const boardId = getBoardId(card.boardData) || card.id;
    const boardPayload = card.boardData || {
      boardId: card.id,
      title: card.title,
      description: card.description,
    };

    upsertBoardCard(boardPayload);
    setDeletedFiles((prev) =>
      prev.filter((item) => (getBoardId(item.boardData) || item.id) !== boardId)
    );
    notifySuccess('Board restored from trash.');
  };

  const handlePermanentDeleteCard = async (card) => {
    const boardId = getBoardId(card.boardData) || card.id;
    if (!boardId) {
      notifyError('Unable to determine which board to delete');
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/boards/delete/${boardId}`, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });
      notifySuccess('Board permanently deleted.');
      setDeletedFiles((prev) =>
        prev.filter((item) => (getBoardId(item.boardData) || item.id) !== boardId)
      );
    } catch (error) {
      if (error.response?.status === 404) {
        notifySuccess('Board already removed.');
        setDeletedFiles((prev) =>
          prev.filter((item) => (getBoardId(item.boardData) || item.id) !== boardId)
        );
        return;
      }
      notifyError(error.response?.data?.message || 'Failed to delete board');
      console.error('Permanent delete board error:', error);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('authUser');
      sessionStorage.removeItem('pendingUser');
      localStorage.removeItem('authUser');
      localStorage.removeItem('pendingUser');
      localStorage.removeItem('trashedBoards');
    } catch (error) {
      console.warn('Unable to clear auth storage during logout', error);
    }
    setAuthUser(null);
    setDeletedFiles([]);
    setPanelOpen(null);
    notifySuccess('Logged out successfully');
    navigate('/');
  };

  return (
    <AppWrapper data-theme={theme}>
      <GlobalStyle />
      <Header>
        <div className="header-left">
          <button type="button" className="logo-button" onClick={handleLogoClick}>
            <img src="/BoardWise_logo_DashBoard.png" alt="BoardWise logo" className="logo-img" />
          </button>
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
              {isLoadingBoards && cards.length === 0 && (
                <div className="recent-boards-placeholder">
                  <p>Loading your boards...</p>
                </div>
              )}
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="card-item"
                  onClick={() => handleOpenBoard(card)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-header">
                    <h3>{card.title}</h3>
                    <div
                      className="card-action-container"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <button
                        type="button"
                        className="card-action-trigger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenCardMenuId((prev) => (prev === card.id ? null : card.id));
                        }}
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      {openCardMenuId === card.id && (
                        <div className="card-action-menu">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenCardMenuId(null);
                              openEditBoardModal(card);
                            }}
                          >
                            Edit board
                          </button>
                          <button
                            type="button"
                            className="danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSoftDeleteCard(card);
                            }}
                          >
                            Delete board
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p>{card.description}</p>
                  <div className="card-details">
                    <span>Due: {new Date(card.dueDate).toDateString()}</span>
                    <span>Member: {card.member || 'N/A'}</span>
                    <span>
                      Priority: <span className={`priority-${card.priority.toLowerCase()}`}>{card.priority}</span>
                    </span>
                  </div>
                  <div className="card-footer">Last updated: {card.lastUpdated}</div>
                </div>
              ))}
            </div>
            <div className="recent-viewed-section">
              <h2>Recent Viewed Boards</h2>
              <div className="recent-boards-list">
                {recentViewed.length > 0 ? (
                  recentViewed.map((board) => (
                    <div
                      key={board.id}
                      className="recent-board-item"
                      onClick={() => handleOpenBoard(board)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <strong>{board.title}</strong>
                        <div className="small">{board.description ? `${board.description}` : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <small>Due: {new Date(board.dueDate).toDateString()}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="recent-boards-placeholder">
                    <p>No recent boards to display.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="upcoming-deadlines-section">
              <h2>Upcoming Deadlines</h2>
              <div className="deadlines-list">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map((card) => (
                    <div
                      key={card.id}
                      className="deadline-item"
                      onClick={() => handleOpenBoard(card)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <strong>{card.title}</strong>
                        <div className="small">{card.description ? `${card.description}` : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <small>Due: {new Date(card.dueDate).toDateString()}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="deadlines-placeholder">
                    <p>No upcoming deadlines.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ContentArea>
      </ContentWrapper>

      <AddCardFloatingButton>
        <button onClick={openCreateBoardModal}>
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
              <h4>{authUser?.name || 'User Name'}</h4>
              <p>{authUser?.email || 'user.email@example.com'}</p>
            </div>
            <div className="profile-options">
              <div className="option-item" onClick={() => navigate('/switch')}>
                <span>Switch Account</span> <ChevronDown size={18} />
              </div>
              <div className="option-item" onClick={() => navigate('/manage')}>Manage Account</div>
              <div className="option-item">Settings</div>
              <div className="option-item" onClick={() => navigate('/help')}>Help</div>
              <div className="option-item theme-option">
                <span>Theme</span>
                <ThemeToggleButton onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </ThemeToggleButton>
              </div>
              <div className="option-item logout-option" onClick={handleLogout}>
                <LogOut size={18} />
                <span style={{ marginLeft: '0.5rem' }}>Log Out</span>
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
            {sortedTrashBoards.length === 0 ? (
              <div className="empty-state">
                <Trash2 size={48} />
                <p>Trash is empty!</p>
                <span>No deleted items to show.</span>
              </div>
            ) : (
              <div className="trash-grid">
                {sortedTrashBoards.map((item) => {
                  const boardId = getBoardId(item.boardData) || item.id || item.title;
                  return (
                    <div key={boardId} className="trash-card">
                      <div className="trash-card-header">
                        <h4>{item.title}</h4>
                        <span className="trash-badge">Board</span>
                      </div>
                      <p className="trash-description">{item.description || 'No description provided.'}</p>
                      <div className="trash-meta">
                        <span>Members: {item.member || 'N/A'}</span>
                        <span>Deleted: {formatDateTime(item.deletedAt || item.lastUpdated)}</span>
                      </div>
                      <div className="trash-actions">
                        <button type="button" className="restore-button" onClick={() => handleRestoreBoard(item)}>
                          <RotateCcw size={16} /> Restore
                        </button>
                        <button type="button" className="delete-button" onClick={() => handlePermanentDeleteCard(item)}>
                          <Trash2 size={16} /> Delete forever
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TrashSlidePanel>
      )}
      {addCardModalOpen && (
        <ModalOverlay fullScreen>
          <ModalContent ref={addCardModalRef}>
            <h3>{isEditingBoard ? 'Edit Board' : 'Create New Board'}</h3>
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
            {!isEditingBoard && (
              <div className="form-group">
                <label>Invite Members (emails):</label>
                {inviteEmails.length > 0 && (
                  <div className="invite-chip-list">
                    {inviteEmails.map((email) => (
                      <span key={email} className="invite-chip">
                        {email}
                        <button type="button" onClick={() => handleRemoveInviteEmail(email)} aria-label={`Remove ${email}`}>
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <MemberSelect
                  as="input"
                  type="text"
                  placeholder="Type email and press Enter, comma, or Tab"
                  value={inviteInput}
                  onChange={(e) => setInviteInput(e.target.value)}
                  onKeyDown={handleInviteKeyDown}
                  onBlur={handleInviteBlur}
                />
                <small className="help-text">You can add multiple emails. Each invite receives an email to join the board.</small>
              </div>
            )}
            {isEditingBoard && (
              <div className="form-group">
                <label>Remove Members (IDs):</label>
                <input
                  type="text"
                  placeholder="Comma separated user IDs"
                  value={removeMembersInput}
                  onChange={(e) => setRemoveMembersInput(e.target.value)}
                />
              </div>
            )}
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
              <button
                className="primary-button"
                onClick={handleSaveBoard}
                disabled={isCreatingBoard}
              >
                {isEditingBoard
                  ? isCreatingBoard
                    ? 'Saving...'
                    : 'Save Changes'
                  : isCreatingBoard
                    ? 'Creating...'
                    : 'Create Board'}
              </button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </AppWrapper>
  );
};

export default BoardPage;
