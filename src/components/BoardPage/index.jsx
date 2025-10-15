import React, { useState } from "react";
import Wrapper from "./style";
import {
  FiSearch, FiPlus, FiVolume2, FiBell, FiHelpCircle,
  FiInbox, FiCalendar, FiGrid, FiLayers, FiMoreVertical,
  FiStar, FiUsers, FiShare2
} from "react-icons/fi";

const BoardPage = () => {
  const [lists, setLists] = useState([
    { id: 1, title: "To Do", cards: [] },
   
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

  // Background state
  const [boardBg, setBoardBg] = useState("/board-bg-1.png");

  // Dropdown state for list menus
  const [activeMenu, setActiveMenu] = useState(null);

  // 🔹 Functions
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

  const handleVolumeClick = () => setIsFeedbackModalOpen(!isFeedbackModalOpen);
  const handleNotificationClick = () => setIsNotificationsOpen(!isNotificationsOpen);
  const handleProfileClick = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const handleStarClick = () => setIsStarred(!isStarred);
  const handleUsersClick = () => setIsVisibilityModalOpen(!isVisibilityModalOpen);
  const handleShareClick = () => setIsShareModalOpen(!isShareModalOpen);
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  const toggleInbox = () => setIsInboxOpen(!isInboxOpen);
  const togglePlanner = () => setIsPlannerOpen(!isPlannerOpen);
  const toggleSwitchBoards = () => setIsSwitchBoardsModalOpen(!isSwitchBoardsModalOpen);

  const addNewList = () => {
    const title = prompt("Enter a name for this list:");
    if (title) setLists([...lists, { id: Date.now(), title, cards: [] }]);
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
    if (content) setInboxCards([...inboxCards, content]);
  };

  // 🔹 List menu actions
  const handleListAction = (action, listId) => {
    if (action === "rename") {
      const newName = prompt("Enter new list name:");
      if (newName) {
        setLists(lists.map(list =>
          list.id === listId ? { ...list, title: newName } : list
        ));
      }
    }
    if (action === "delete") {
      setLists(lists.filter(list => list.id !== listId));
    }
    setActiveMenu(null);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Wrapper>
      <div className="board-container" style={{ backgroundImage: `url(${boardBg})`, backgroundSize: "cover" }}>
        {/* Header */}
        <header className="header-bar">
          <div className="header-left">
            <img src="/BoardWiseApp_Logo.png" alt="BoardWise" className="logo-img" />
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
            <FiHelpCircle className="icon" onClick={() => alert("Help section")} />
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

          <section className="board-area">
            <div className="board-lists">
              {lists.map(list => (
                <div key={list.id} className="list-column">
                  <div className="list-header">
                    <h4>{list.title}</h4>
                    <div className="list-menu-wrapper" style={{ position: "relative" }}>
                      <FiMoreVertical
                        className="list-menu"
                        onClick={() => setActiveMenu(activeMenu === list.id ? null : list.id)}
                      />
                      {activeMenu === list.id && (
                        <div
                          className="dropdown-menu"
                          style={{
                            position: "absolute",
                            top: "-80px",   // 👈 popup upar open hoga
                            right: "0",
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                            zIndex: 10,
                            padding: "6px 0",
                            minWidth: "140px"
                          }}
                        >
                          <div
                            style={{ padding: "8px 12px", cursor: "pointer", fontSize: "14px" }}
                            onClick={() => handleListAction("rename", list.id)}
                          >
                            Rename List
                          </div>
                          <div
                            style={{ padding: "8px 12px", cursor: "pointer", fontSize: "14px" }}
                            onClick={() => handleListAction("delete", list.id)}
                          >
                            Delete List
                          </div>
                        </div>
                      )}
                    </div>
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
    </Wrapper>
  );
};

export default BoardPage;
