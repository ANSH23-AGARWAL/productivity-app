import React, { useState } from "react";
import Wrapper from "./style";
import {
    FiSearch, FiPlus, FiVolume2, FiBell, FiHelpCircle,
    FiInbox, FiCalendar, FiGrid, FiLayers, FiMoreVertical,
    FiStar, FiUsers, FiShare2, FiSettings, FiX, FiInfo,
    FiLink2, FiImage
} from "react-icons/fi";

const BoardPage = () => {
    const [lists, setLists] = useState([
        { id: 1, title: "To Do", cards: [] },
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Done", cards: [] }
    ]);
    const [inboxCards, setInboxCards] = useState([]);
    const [isStarred, setIsStarred] = useState(false);

    const [isInboxOpen, setIsInboxOpen] = useState(true);
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    const [isSwitchBoardsModalOpen, setIsSwitchBoardsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const createNewBoard = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            const boardName = document.getElementById('search-input').value;
            if (boardName) {
                alert(`Creating new board: "${boardName}"`);
                document.getElementById('search-input').value = '';
            } else {
                alert("Please enter a board name.");
            }
        }
    };

    const handleVolumeClick = () => {
        setIsFeedbackModalOpen(!isFeedbackModalOpen);
    };

    const handleNotificationClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    const handleProfileClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleStarClick = () => {
        setIsStarred(!isStarred);
    };

    const handleUsersClick = () => {
        setIsVisibilityModalOpen(!isVisibilityModalOpen);
    };

    const handleShareClick = () => {
        setIsShareModalOpen(!isShareModalOpen);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleVisibilityOptionClick = (option) => {
        alert(`Visibility changed to "${option}".`);
        setIsVisibilityModalOpen(false);
    };

    const toggleInbox = () => {
        setIsInboxOpen(!isInboxOpen);
    };

    const togglePlanner = () => {
        setIsPlannerOpen(!isPlannerOpen);
    };

    const toggleSwitchBoards = () => {
        setIsSwitchBoardsModalOpen(!isSwitchBoardsModalOpen);
    };

    const addNewList = () => {
        const title = prompt("Enter a name for this list:");
        if (title) {
            setLists([...lists, { id: Date.now(), title, cards: [] }]);
        }
    };

    const addCardToList = (listId) => {
        const content = prompt("Enter a name for this card:");
        if (content) {
            setLists(lists.map(list =>
                list.id === listId ? { ...list, cards: [...list.cards, content] } : list
            ));
        }
    };

    const addCardToInbox = () => {
        const content = prompt("Enter a name for the new inbox item:");
        if (content) {
            setInboxCards([...inboxCards, content]);
        }
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Wrapper>
            <div className="board-container">
                {/* Header */}
                <header className="header-bar">
                    <div className="header-left">
                        <img src="/Trello-logo.png" alt="Trello Logo" className="logo-img" />
                    </div>
                    <div className="header-middle">
                        <div className="search-box">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Search your boards..."
                                className="search-input"
                                onKeyDown={(e) => createNewBoard(e)}
                            />
                        </div>
                        <button className="create-btn" onClick={createNewBoard}><FiPlus /> Create</button>
                    </div>
                    <div className="header-right">
                        <FiVolume2 className="icon" onClick={handleVolumeClick} />
                        <FiBell className="icon" onClick={handleNotificationClick} />
                        <FiHelpCircle className="icon" />
                        <div className="avatar" onClick={handleProfileClick}>JY</div>
                    </div>
                </header>

                {/* Second Header */}
                <div className="header-row-2">
                    <div className="team-selector">
                        <span>Team</span>
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

                {/* Main Content */}
                <main className="main-content">
                    {/* Inbox Sidebar (Conditionally rendered) */}
                    {isInboxOpen && (
                        <aside className="sidebar">
                            <div className="inbox-header">
                                <FiInbox className="inbox-icon" />
                                <h3>Inbox</h3>
                            </div>
                            <div className="inbox-cards">
                                {inboxCards.map((card, idx) => (
                                    <div key={idx} className="card">{card}</div>
                                ))}
                            </div>
                            <button className="add-card-btn dark" onClick={addCardToInbox}>
                                <FiPlus /> Add a card
                            </button>
                        </aside>
                    )}

                    {/* Board Area */}
                    <section className="board-area">
                        <div className="board-lists">
                            {lists.map(list => (
                                <div key={list.id} className="list-column">
                                    <div className="list-header">
                                        <h4>{list.title}</h4>
                                        <FiMoreVertical className="list-menu" />
                                    </div>
                                    <div className="list-cards">
                                        {list.cards.map((card, i) => (
                                            <div key={i} className="card">{card}</div>
                                        ))}
                                    </div>
                                    <button className="add-card-btn dark" onClick={() => addCardToList(list.id)}>
                                        <FiPlus /> Add a card
                                    </button>
                                </div>
                            ))}
                            <button className="add-list-btn" onClick={addNewList}>
                                <FiPlus /> Add another list
                            </button>
                        </div>
                    </section>
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
            </div>

            {/* Modals & Pop-ups */}
            {isFeedbackModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Share Your Thoughts</h3>
                            <FiX className="modal-close-icon" onClick={() => setIsFeedbackModalOpen(false)} />
                        </div>
                        <p>We'd love to hear your feedback on BoardWise.</p>
                        <textarea placeholder="Enter your feedback here..." rows="5"></textarea>
                        <button className="submit-btn">Submit Feedback</button>
                    </div>
                </div>
            )}

            {isNotificationsOpen && (
                <div className="notification-popup white">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        <FiX className="modal-close-icon" onClick={() => setIsNotificationsOpen(false)} />
                    </div>
                    <div className="notification-item">You have a new mention in a card.</div>
                    <div className="notification-item">A new member joined the board.</div>
                    <div className="notification-item">BoardWise update available.</div>
                </div>
            )}

            {isProfileMenuOpen && (
                <div className="profile-menu-popup white">
                    <div className="profile-header">
                        <h3>Account</h3>
                        <FiX className="modal-close-icon" onClick={() => setIsProfileMenuOpen(false)} />
                    </div>
                    <div className="menu-item">Switch Account</div>
                    <div className="menu-item">Manage Account</div>
                    <div className="menu-item">Settings</div>
                    <div className="menu-item">Help</div>
                    <div className="menu-item">Theme</div>
                    <div className="menu-item">Log Out</div>
                </div>
            )}

            {isVisibilityModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Change Visibility</h3>
                            <FiX className="modal-close-icon" onClick={() => setIsVisibilityModalOpen(false)} />
                        </div>
                        <div className="visibility-option private" onClick={() => handleVisibilityOptionClick('Private')}>
                            <h4>Private</h4>
                            <p>Only board members can see this board.</p>
                        </div>
                        <div className="visibility-option workspace" onClick={() => handleVisibilityOptionClick('Workspace')}>
                            <h4>Workspace</h4>
                            <p>All members of the Trello Workspace can see and edit this board.</p>
                        </div>
                        <div className="visibility-option organization" onClick={() => handleVisibilityOptionClick('Organization')}>
                            <h4>Organization</h4>
                            <p>All members of the organization can see this board.</p>
                        </div>
                        <div className="visibility-option public" onClick={() => handleVisibilityOptionClick('Public')}>
                            <h4>Public</h4>
                            <p>Anyone on the internet can see this board.</p>
                        </div>
                    </div>
                </div>
            )}

            {isShareModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Share board</h3>
                            <FiX className="modal-close-icon" onClick={() => setIsShareModalOpen(false)} />
                        </div>
                        <input type="text" placeholder="Email address or name" className="share-input" />
                        <button className="share-button-action">Share</button>
                        <div className="share-link-section">
                            <FiLink2 /> Share this board with a link
                            <a href="#">Create link</a>
                        </div>
                        <div className="board-members">
                            Board members <span>1</span>
                        </div>
                    </div>
                </div>
            )}

            {isMenuOpen && (
                <div className="menu-popup white">
                    <div className="modal-header">
                        <h3>Menu</h3>
                        <FiX className="modal-close-icon" onClick={() => setIsMenuOpen(false)} />
                    </div>
                    <div className="menu-item-with-icon"><FiShare2 /> Share</div>
                    <div className="menu-item-with-icon"><FiInfo /> About this board</div>
                    <div className="menu-item-with-icon"><FiUsers /> Visibility: Workspace</div>
                    <div className="menu-item-with-icon"><FiStar /> Star</div>
                    <div className="menu-item-with-icon"><FiSettings /> Settings</div>
                    <div className="menu-item-with-icon"><FiImage /> Change background</div>
                </div>
            )}

            {isPlannerOpen && (
                <div className="planner-sidebar">
                    <div className="planner-header">
                        <FiCalendar />
                        <h3>Planner</h3>
                        <FiX className="close-icon" onClick={() => setIsPlannerOpen(false)} />
                    </div>
                    <div className="planner-content">
                        <p className="planner-date">{formattedDate}</p>
                        <div className="calendar-placeholder">
                           <p>Calendar component would go here...</p>
                        </div>
                        <div className="hourly-tracker">
                           <h4>Hourly Tracker</h4>
                           <div className="hour-slot">9:00 AM - 10:00 AM: Meeting</div>
                           <div className="hour-slot">10:00 AM - 11:00 AM: Coding</div>
                           <div className="add-task-btn">+ Add a task</div>
                        </div>
                    </div>
                </div>
            )}

            {isSwitchBoardsModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Switch boards</h3>
                            <FiX className="modal-close-icon" onClick={() => setIsSwitchBoardsModalOpen(false)} />
                        </div>
                        <div className="search-box-modal">
                            <FiSearch />
                            <input type="text" placeholder="Search your boards" />
                        </div>
                        <div className="board-list-modal">
                            <div className="board-thumb all-boards">All</div>
                            <div className="board-thumb recent-boards">Trello Workspace</div>
                        </div>
                        <div className="recent-boards-section">
                            <h4>Recent</h4>
                            <div className="board-thumbnails">
                                <div className="board-thumbnail" style={{backgroundImage: `url(${'/board-bg-1.png'})`}}>
                                    <p>My Trello board</p>
                                </div>
                                <div className="board-thumbnail" style={{backgroundImage: `url(${'/board-bg-2.png'})`}}>
                                    <p>learn</p>
                                </div>
                                <div className="board-thumbnail" style={{backgroundImage: `url(${'/board-bg-3.png'})`}}>
                                    <p>jnfjdj</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
};

export default BoardPage;