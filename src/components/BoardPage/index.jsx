import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Wrapper from "./style";
import {
    FiSearch, FiPlus, FiVolume2, FiBell, FiHelpCircle,
    FiInbox, FiCalendar, FiGrid, FiLayers, FiMoreVertical,
    FiStar, FiUsers, FiShare2, FiInfo, FiSettings, FiImage, FiLink2, FiX
} from "react-icons/fi";

const BoardPage = () => {
    const navigate = useNavigate();
    const [lists, setLists] = useState([
        {
            id: 1,
            title: "Today Task",
            cards: [
                { id: 101, title: "Design System", description: "Create initial tokens", members: "JY", dueDate: "2023-12-10", priority: "High" }
            ]
        }
    ]);
    const [inboxCards, setInboxCards] = useState([]);
    const [isStarred, setIsStarred] = useState(false);
    const [boardName, setBoardName] = useState("My Trello board");
    const [isEditingBoardName, setIsEditingBoardName] = useState(false);

    const [isInboxOpen, setIsInboxOpen] = useState(true);
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    const [isSwitchBoardsModalOpen, setIsSwitchBoardsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isNotificationsClosing, setIsNotificationsClosing] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isProfileMenuClosing, setIsProfileMenuClosing] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isFeedbackClosing, setIsFeedbackClosing] = useState(false);

    // Notifications State
    const [notifications, setNotifications] = useState([
        { id: 1, text: "You have a new mention in a card." },
        { id: 2, text: "A new member joined the board." },
        { id: 3, text: "BoardWise update available." }
    ]);

    // Add Item Modal State
    const [addItemModal, setAddItemModal] = useState({
        isOpen: false,
        isClosing: false,
        type: null, // 'task', 'list', 'inbox', 'edit-task', 'edit-list'
        listId: null,
        editId: null
    });

    const [newItemText, setNewItemText] = useState("");
    const [newItemDesc, setNewItemDesc] = useState("");
    const [newItemMembers, setNewItemMembers] = useState("");
    const [newItemDate, setNewItemDate] = useState("");
    const [newItemPriority, setNewItemPriority] = useState("Medium");

    const [activeListMenu, setActiveListMenu] = useState(null);
    const [activeTaskMenu, setActiveTaskMenu] = useState(null);

    // Functions
    const createNewBoard = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            const val = document.getElementById('search-input').value;
            if (val) {
                alert(`Creating new board: "${val}"`);
                document.getElementById('search-input').value = '';
            } else {
                alert("Please enter a board name.");
            }
        }
    };

    const handleVolumeClick = () => {
        if (!isFeedbackModalOpen) setIsFeedbackModalOpen(true);
        else closeFeedbackModal();
    };

    const closeFeedbackModal = () => {
        setIsFeedbackClosing(true);
        setTimeout(() => { setIsFeedbackModalOpen(false); setIsFeedbackClosing(false); }, 200);
    };

    const handleFeedbackSubmit = () => {
        alert("Thank you for your feedback!");
        closeFeedbackModal();
    };

    const handleNotificationClick = () => {
        if (!isNotificationsOpen) {
            if (isProfileMenuOpen) closeProfileMenu();
            if (isMenuOpen) closeMenu();
            setIsNotificationsOpen(true);
        } else {
            closeNotifications();
        }
    };

    const closeNotifications = () => {
        setIsNotificationsClosing(true);
        setTimeout(() => { setIsNotificationsOpen(false); setIsNotificationsClosing(false); }, 200);
    };

    const handleProfileClick = () => {
        if (!isProfileMenuOpen) {
            if (isNotificationsOpen) closeNotifications();
            if (isMenuOpen) closeMenu();
            setIsProfileMenuOpen(true);
        } else {
            closeProfileMenu();
        }
    };

    const closeProfileMenu = () => {
        setIsProfileMenuClosing(true);
        setTimeout(() => { setIsProfileMenuOpen(false); setIsProfileMenuClosing(false); }, 200);
    };

    const handleProfileOption = (option) => {
        if (option === "Switch Account") navigate('/switch');
        else if (option === "Manage Account") navigate('/manage');
        else if (option === "Help") navigate('/help');
        else {
            alert(`${option} clicked`);
            setIsProfileMenuOpen(false);
        }
    };

    const handleStarClick = () => setIsStarred(!isStarred);
    const handleUsersClick = () => setIsVisibilityModalOpen(!isVisibilityModalOpen);
    const handleShareClick = () => setIsShareModalOpen(!isShareModalOpen);

    const handleMenuClick = () => {
        if (!isMenuOpen) {
            if (isNotificationsOpen) closeNotifications();
            if (isProfileMenuOpen) closeProfileMenu();
            setIsMenuOpen(true);
        } else {
            closeMenu();
        }
    };

    const closeMenu = () => {
        setIsMenuClosing(true);
        setTimeout(() => { setIsMenuOpen(false); setIsMenuClosing(false); }, 200);
    };

    const toggleInbox = () => setIsInboxOpen(!isInboxOpen);

    const togglePlanner = () => {
        setIsPlannerOpen(!isPlannerOpen);
        if (!isPlannerOpen) setIsInboxOpen(false);
    };

    const toggleSwitchBoards = () => setIsSwitchBoardsModalOpen(!isSwitchBoardsModalOpen);

    const handleBoardNameClick = () => setIsEditingBoardName(true);
    const handleBoardNameChange = (e) => setBoardName(e.target.value);
    const handleBoardNameBlur = () => {
        setIsEditingBoardName(false);
        if (boardName.trim() === '') setBoardName('My Trello board');
    };
    const handleBoardNameKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBoardNameBlur();
        }
    };

    const handleClearNotifications = () => setNotifications([]);

    const handleVisibilityOptionClick = (option) => {
        alert(`Visibility changed to "${option}".`);
        setIsVisibilityModalOpen(false);
    };

    // Item Management
    const addNewList = () => setAddItemModal({ isOpen: true, type: 'list' });
    const addTaskToList = (listId) => setAddItemModal({ isOpen: true, type: 'task', listId });
    const addCardToInbox = () => setAddItemModal({ isOpen: true, type: 'inbox' });

    const openEditListModal = (list) => {
        setNewItemText(list.title);
        setAddItemModal({ isOpen: true, type: 'edit-list', editId: list.id });
        setActiveListMenu(null);
    };

    const openEditTaskModal = (task, listId) => {
        setNewItemText(task.title);
        setNewItemDesc(task.description || "");
        setNewItemMembers(task.members || "");
        setNewItemDate(task.dueDate || "");
        setNewItemPriority(task.priority || "Medium");
        setAddItemModal({ isOpen: true, type: 'edit-task', listId, editId: task.id });
        setActiveTaskMenu(null);
    };

    const closeAddItemModal = () => {
        setAddItemModal(prev => ({ ...prev, isClosing: true }));
        setTimeout(() => {
            setAddItemModal({ isOpen: false, isClosing: false, type: null, listId: null, editId: null });
            setNewItemText("");
            setNewItemDesc("");
            setNewItemMembers("");
            setNewItemDate("");
            setNewItemPriority("Medium");
        }, 200);
    };

    const handleAddItemSubmit = () => {
        if (!newItemText.trim()) return;

        if (addItemModal.type === 'list') {
            setLists([...lists, { id: Date.now(), title: newItemText, cards: [] }]);
        } else if (addItemModal.type === 'edit-list') {
            setLists(lists.map(l => l.id === addItemModal.editId ? { ...l, title: newItemText } : l));
        } else if (addItemModal.type === 'task') {
            const newTask = {
                id: Date.now(),
                title: newItemText,
                description: newItemDesc,
                members: newItemMembers,
                dueDate: newItemDate,
                priority: newItemPriority
            };
            setLists(lists.map(list =>
                list.id === addItemModal.listId ? { ...list, cards: [...list.cards, newTask] } : list
            ));
        } else if (addItemModal.type === 'edit-task') {
            if (addItemModal.listId === 'inbox') {
                setInboxCards(inboxCards.map(c => c.id === addItemModal.editId ? {
                    ...c,
                    title: newItemText,
                    description: newItemDesc,
                    members: newItemMembers,
                    dueDate: newItemDate,
                    priority: newItemPriority
                } : c));
            } else {
                setLists(lists.map(list =>
                    list.id === addItemModal.listId ? {
                        ...list,
                        cards: list.cards.map(c => c.id === addItemModal.editId ? {
                            ...c,
                            title: newItemText,
                            description: newItemDesc,
                            members: newItemMembers,
                            dueDate: newItemDate,
                            priority: newItemPriority
                        } : c)
                    } : list
                ));
            }
        } else if (addItemModal.type === 'inbox') {
            const newTask = {
                id: Date.now(),
                title: newItemText,
                description: newItemDesc,
                members: newItemMembers,
                dueDate: newItemDate,
                priority: newItemPriority
            };
            setInboxCards([...inboxCards, newTask]);
        }
        closeAddItemModal();
    };

    const deleteList = (listId) => {
        setLists(lists.filter(l => l.id !== listId));
        setActiveListMenu(null);
    };

    const deleteTask = (listId, taskId) => {
        setLists(lists.map(list => {
            if (list.id === listId) {
                return { ...list, cards: list.cards.filter(card => card.id !== taskId) };
            }
            return list;
        }));
        setActiveTaskMenu(null);
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Wrapper>
            <div className="board-container">
                {/* Header */}
                <header className="header-bar">
                    <div className="header-left">
                        <img src="/BoardWise-logo.png" alt="BoardWise logo" className="logo-img" />
                    </div>
                    <div className="header-middle">
                        <div className="search-box">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Search your boards..."
                                className="search-input"
                                onKeyDown={createNewBoard}
                            />
                        </div>
                        <button className="create-btn" onClick={createNewBoard}><FiPlus /> Create</button>
                    </div>
                    <div className="header-right">
                        <FiVolume2 className={`icon ${isFeedbackModalOpen ? "active" : ""}`} onClick={handleVolumeClick} />
                        <FiBell className={`icon ${isNotificationsOpen ? "active" : ""}`} onClick={handleNotificationClick} />
                        <FiHelpCircle className="icon" />
                        <div className={`avatar ${isProfileMenuOpen ? "active-ring" : ""}`} onClick={handleProfileClick}>JY</div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="main-content">
                    <div className="content-wrapper">
                        {/* Inbox Sidebar */}
                        {isInboxOpen && !isPlannerOpen && (
                            <aside className="sidebar">
                                <div className="inbox-header">
                                    <FiInbox className="inbox-icon" />
                                    <h3>Inbox</h3>
                                </div>
                                <div className="inbox-cards">
                                    {inboxCards.map((task, idx) => (
                                        <div key={task.id || idx} className="card">
                                            <div className="card-header">
                                                <span>{typeof task === 'string' ? task : task.title}</span>
                                                {typeof task !== 'string' && (
                                                    <div style={{ position: 'relative' }}>
                                                        <FiMoreVertical
                                                            className="card-actions"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveTaskMenu(activeTaskMenu === task.id ? null : task.id);
                                                            }}
                                                        />
                                                        {activeTaskMenu === task.id && (
                                                            <div className="context-menu" style={{ top: '20px', right: 0 }}>
                                                                <div className="context-menu-item" onClick={() => openEditTaskModal(task, 'inbox')}>Edit Task</div>
                                                                <div className="context-menu-item delete" onClick={() => {
                                                                    setInboxCards(inboxCards.filter(c => c.id !== task.id));
                                                                    setActiveTaskMenu(null);
                                                                }}>Delete</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            {typeof task !== 'string' && (
                                                <div className="card-meta">
                                                    {task.priority && <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>}
                                                    {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button className="add-card-btn dark" onClick={addCardToInbox}>
                                    <FiPlus /> Add a task
                                </button>
                            </aside>
                        )}

                        {/* Planner Sidebar */}
                        {isPlannerOpen && (
                            <aside className="sidebar planner-sidebar-main">
                                <div className="planner-header-main">
                                    <FiCalendar className="inbox-icon" />
                                    <h3>Planner</h3>
                                </div>
                                <div className="planner-view-selector">
                                    <button className="view-btn active">Day</button>
                                    <button className="view-btn">Week</button>
                                    <button className="view-btn">Month</button>
                                </div>
                                <div className="planner-date-display">{formattedDate}</div>
                                <div className="planner-tasks">
                                    <p className="planner-info">📅 Add dates to your cards to see them here</p>
                                    <div className="planner-hint">
                                        <p><strong>How to use Planner:</strong></p>
                                        <p>1️⃣ Click any card and set a due date</p>
                                        <p>2️⃣ Cards with dates appear here automatically</p>
                                        <p>3️⃣ Drag & drop to reschedule tasks</p>
                                    </div>
                                </div>
                            </aside>
                        )}

                        {/* Board Area / Calendar View */}
                        {!isPlannerOpen ? (
                            <section className="board-area">
                                <div className="header-row-2">
                                    <div className="team-selector">
                                        {isEditingBoardName ? (
                                            <input
                                                type="text"
                                                value={boardName}
                                                onChange={handleBoardNameChange}
                                                onBlur={handleBoardNameBlur}
                                                onKeyPress={handleBoardNameKeyPress}
                                                autoFocus
                                                className="board-name-input"
                                            />
                                        ) : (
                                            <span onClick={handleBoardNameClick} style={{ cursor: 'pointer' }}>{boardName}</span>
                                        )}
                                        <div className="avatar-secondary" onClick={() => alert("Edit profile option goes here.")}>JY</div>
                                    </div>
                                    <div className="header-actions">
                                        <FiStar className={`action-icon ${isStarred ? "starred" : ""}`} onClick={handleStarClick} />
                                        <FiUsers className="action-icon" onClick={handleUsersClick} />
                                        <button className="share-btn" onClick={handleShareClick}><FiShare2 /> Share</button>
                                        <div className="menu-button" onClick={handleMenuClick}>
                                            <FiMoreVertical className="action-icon" />
                                        </div>
                                    </div>
                                </div>
                                <div className="board-lists">
                                    {lists.map(list => (
                                        <div key={list.id} className="list-column">
                                            <div className="list-header">
                                                <h4>{list.title}</h4>
                                                <div style={{ position: 'relative' }}>
                                                    <FiMoreVertical
                                                        className="list-menu"
                                                        onClick={() => setActiveListMenu(activeListMenu === list.id ? null : list.id)}
                                                    />
                                                    {activeListMenu === list.id && (
                                                        <div className="context-menu" style={{ top: '20px', right: 0 }}>
                                                            <div className="context-menu-item" onClick={() => openEditListModal(list)}>Edit List</div>
                                                            <div className="context-menu-item delete" onClick={() => deleteList(list.id)}>Delete List</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="list-cards">
                                                {list.cards.map((task, i) => (
                                                    <div key={task.id || i} className="card">
                                                        <div className="card-header">
                                                            <span>{task.title}</span>
                                                            <div style={{ position: 'relative' }}>
                                                                <FiMoreVertical
                                                                    className="card-actions"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setActiveTaskMenu(activeTaskMenu === task.id ? null : task.id);
                                                                    }}
                                                                />
                                                                {activeTaskMenu === task.id && (
                                                                    <div className="context-menu" style={{ top: '20px', right: 0 }}>
                                                                        <div className="context-menu-item" onClick={() => openEditTaskModal(task, list.id)}>Edit Task</div>
                                                                        <div className="context-menu-item delete" onClick={() => deleteTask(list.id, task.id)}>Delete</div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="card-meta">
                                                            {task.priority && <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>}
                                                            {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>}
                                                            {task.members && <span>👤 {task.members}</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="add-card-btn dark" onClick={() => addTaskToList(list.id)}>
                                                <FiPlus /> Add a task
                                            </button>
                                        </div>
                                    ))}
                                    <button className="add-list-btn" onClick={addNewList}>
                                        <FiPlus /> Add another list
                                    </button>
                                </div>
                            </section>
                        ) : (
                            <section className="calendar-view">
                                <div className="calendar-header">
                                    <button className="calendar-nav-btn">‹</button>
                                    <h2 className="calendar-month">Dec 2025</h2>
                                    <button className="calendar-nav-btn">›</button>
                                    <button className="today-btn">Today</button>
                                </div>
                                <div className="week-calendar-body">
                                    {/* Simplified Calendar Body for brevity, could restore full if needed */}
                                    <div className="week-header">
                                        <div className="time-column-header"></div>
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                                            <div key={i} className={`day-header ${i === 1 ? 'active' : ''}`}>
                                                <div className="day-label">{day}</div>
                                                <div className="day-number">{30 + i > 31 ? 30 + i - 31 : 30 + i}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="week-grid-container">
                                        <div className="time-column">
                                            <div className="all-day-label">All day</div>
                                            {['12 am', '1 am', '2 am', '3 am'].map((time, idx) => (
                                                <div key={idx} className="time-label-week">{time}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </main>

                {/* Footer Navigation */}
                <footer className="footer-nav">
                    <div className={`nav-item ${isInboxOpen ? "active" : ""}`} onClick={toggleInbox}>
                        <div className="nav-icon"><FiInbox /></div>
                        <span>Inbox</span>
                    </div>
                    <div className={`nav-item ${isPlannerOpen ? "active" : ""}`} onClick={togglePlanner}>
                        <div className="nav-icon"><FiCalendar /></div>
                        <span>Planner</span>
                    </div>
                    <div className="nav-item active">
                        <div className="nav-icon"><FiGrid /></div>
                        <span>Board</span>
                    </div>
                    <div className={`nav-item ${isSwitchBoardsModalOpen ? "active" : ""}`} onClick={toggleSwitchBoards}>
                        <div className="nav-icon"><FiLayers /></div>
                        <span>Switch Boards</span>
                    </div>
                </footer>
            </div >

            {/* Modals & Pop-ups (Backdrop) */}
            {
                (isNotificationsOpen || isProfileMenuOpen || isMenuOpen) && (
                    <div
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998, cursor: 'default' }}
                        onClick={() => {
                            if (isNotificationsOpen) closeNotifications();
                            if (isProfileMenuOpen) closeProfileMenu();
                            if (isMenuOpen) closeMenu();
                        }}
                    />
                )
            }

            {/* Notifications Modal */}
            {
                isNotificationsOpen && (
                    <div className={`notification-popup white ${isNotificationsClosing ? 'closing' : ''}`}>
                        <div className="notification-header">
                            <h3>Notifications</h3>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', color: '#4452FE', cursor: 'pointer' }} onClick={handleClearNotifications}>Clear All</span>
                                <FiX className="modal-close-icon" onClick={closeNotifications} />
                            </div>
                        </div>
                        {notifications.length === 0 ? (
                            <div style={{ padding: '1rem', textAlign: 'center', color: '#a1b0c0' }}>No new notifications</div>
                        ) : (
                            notifications.map(notif => (
                                <div key={notif.id} className="notification-item" onClick={() => alert("Notification clicked")}>
                                    {notif.text}
                                </div>
                            ))
                        )}
                    </div>
                )
            }

            {/* Profile Modal */}
            {
                isProfileMenuOpen && (
                    <div className={`profile-menu-popup white ${isProfileMenuClosing ? 'closing' : ''}`}>
                        <div className="profile-header">
                            <h3>Account</h3>
                            <FiX className="modal-close-icon" onClick={closeProfileMenu} />
                        </div>
                        <div className="user-info-section" style={{ paddingBottom: '1rem', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div className="avatar large" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>JY</div>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#fff' }}>Jhon Year</div>
                                    <div style={{ fontSize: '0.8rem', color: '#9fadbc' }}>jhon.year@example.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item" onClick={() => handleProfileOption("Switch Account")}>Switch Account</div>
                        <div className="menu-item" onClick={() => handleProfileOption("Manage Account")}>Manage Account</div>
                        <div className="menu-item" onClick={() => handleProfileOption("Settings")}>Settings</div>
                        <div className="menu-item" onClick={() => handleProfileOption("Help")}>Help</div>
                        <div className="menu-item" onClick={() => handleProfileOption("Theme")}>Theme</div>
                        <div className="menu-item" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.5rem' }} onClick={() => handleProfileOption("Log Out")}>Log Out</div>
                    </div>
                )
            }

            {/* Menu Modal */}
            {
                isMenuOpen && (
                    <div className={`menu-popup white ${isMenuClosing ? 'closing' : ''}`}>
                        <div className="modal-header">
                            <h3>Menu</h3>
                            <FiX className="modal-close-icon" onClick={closeMenu} />
                        </div>
                        <div className="menu-item-with-icon"><FiShare2 /> Share</div>
                        <div className="menu-item-with-icon"><FiInfo /> About this board</div>
                        <div className="menu-item-with-icon"><FiUsers /> Visibility: Workspace</div>
                        <div className="menu-item-with-icon"><FiStar /> Star</div>
                        <div className="menu-item-with-icon"><FiSettings /> Settings</div>
                        <div className="menu-item-with-icon"><FiImage /> Change background</div>
                    </div>
                )
            }

            {/* Feedback Modal */}
            {
                isFeedbackModalOpen && (
                    <div className={`modal-overlay ${isFeedbackClosing ? 'closing' : ''}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Share Your Thoughts</h3>
                                <FiX className="modal-close-icon" onClick={closeFeedbackModal} />
                            </div>
                            <p style={{ marginBottom: '1rem', color: '#a1b0c0' }}>We'd love to hear your feedback on BoardWise.</p>
                            <textarea placeholder="Enter your feedback here..." rows="5"></textarea>
                            <button className="submit-btn" onClick={handleFeedbackSubmit}>Submit Feedback</button>
                        </div>
                    </div>
                )
            }

            {/* Add Item Modal */}
            {
                addItemModal.isOpen && (
                    <div className={`modal-overlay ${addItemModal.isClosing ? 'closing' : ''}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>
                                    {(addItemModal.type === 'list' || addItemModal.type === 'edit-list') && (addItemModal.type === 'edit-list' ? "Edit List" : "Add Another List")}
                                    {(addItemModal.type === 'task' || addItemModal.type === 'edit-task') && (addItemModal.type === 'edit-task' ? "Edit Task" : "Create New Task")}
                                    {addItemModal.type === 'inbox' && "Add to Inbox"}
                                </h3>
                                <FiX className="modal-close-icon" onClick={closeAddItemModal} />
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="share-input"
                                    autoFocus
                                    placeholder={addItemModal.type.includes('list') ? "Enter list title..." : "Task title"}
                                    value={newItemText}
                                    onChange={(e) => setNewItemText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addItemModal.type.includes('list') && handleAddItemSubmit()}
                                />
                            </div>

                            {(addItemModal.type === 'task' || addItemModal.type === 'edit-task' || addItemModal.type === 'inbox') && (
                                <>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Add a more detailed description..."
                                            value={newItemDesc}
                                            onChange={(e) => setNewItemDesc(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Members</label>
                                            <input
                                                type="text"
                                                placeholder="Add members encoded..."
                                                value={newItemMembers}
                                                onChange={(e) => setNewItemMembers(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Due Date</label>
                                            <input
                                                type="date"
                                                value={newItemDate}
                                                onChange={(e) => setNewItemDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority</label>
                                        <select
                                            value={newItemPriority}
                                            onChange={(e) => setNewItemPriority(e.target.value)}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            <button className="submit-btn" onClick={handleAddItemSubmit}>
                                {addItemModal.type.includes('list') ? (addItemModal.type === 'edit-list' ? "Save List" : "Add List") : (addItemModal.type.includes('edit') ? "Save Task" : "Create Task")}
                            </button>
                        </div>
                    </div>
                )
            }
        </Wrapper >
    );
};

export default BoardPage;
