import React, { useState } from "react";
import Wrapper from "./style";
import { 
  FiSearch, FiPlus, FiVolume2, FiBell, FiHelpCircle, 
  FiInbox, FiCalendar, FiGrid, FiLayers, FiMoreVertical, 
  FiStar, FiUsers, FiShare2 
} from "react-icons/fi";

const BoardPage = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [lists, setLists] = useState([{ id: 1, title: "Name", cards: [] }]);
  const [inboxCards, setInboxCards] = useState([]);

  const addNewList = () => {
    setLists([...lists, { id: Date.now(), title: "New List", cards: [] }]);
  };

  const addCardToList = (listId) => {
    setLists(lists.map(list =>
      list.id === listId 
        ? { ...list, cards: [...list.cards, "New Card"] } 
        : list
    ));
  };

  const addCardToInbox = () => {
    setInboxCards([...inboxCards, "New Card"]);
  };

  return (
    <Wrapper>
      <div className="board-container">
        
        {/* Header */}
        <header className="header-bar">
          <div className="header-left">
            <img src="/BoardWiseApp_Logo.png" alt="BoardWise Logo" className="logo-img" />
          </div>

          <div className="header-middle">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search..." className="search-input" />
            </div>
            <button className="create-btn"><FiPlus /> Create</button>
          </div>

          <div className="header-right">
            <FiVolume2 className="icon" />
            <FiBell className="icon" />
            <FiHelpCircle className="icon" />
            <div className="avatar">JY</div>
          </div>
        </header>

        {/* Second Header */}
        <div className="header-row-2">
          <div className="team-selector"><span>team</span></div>
          <div className="header-actions">
            <div className="avatar-secondary">JY</div>
            <FiStar className="action-icon" />
            <FiUsers className="action-icon" />
            <button className="share-btn"><FiShare2 /> + Share</button>
            <FiMoreVertical className="action-icon" />
          </div>
        </div>

        {/* Main */}
        <main className="main-content">
          
          {/* Sidebar - Inbox */}
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

            <button className="add-card-btn" onClick={addCardToInbox}>
              + Add a card
            </button>
          </aside>

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
                  <div className="list-footer">
                    <button className="add-card-btn" onClick={() => addCardToList(list.id)}>
                      + Add a card
                    </button>
                    <div className="list-actions">▤</div>
                  </div>
                </div>
              ))}

              <button className="add-list-btn" onClick={addNewList}>
                + Add another list
              </button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="footer-nav">
          {[
            { key: "inbox", icon: <FiInbox />, label: "Inbox" },
            { key: "planner", icon: <FiCalendar />, label: "Planner" },
            { key: "board", icon: <FiGrid />, label: "Board" },
            { key: "switch", icon: <FiLayers />, label: "Switch boards" }
          ].map(tab => (
            <div
              key={tab.key}
              className={`nav-item ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <div className="nav-icon">{tab.icon}</div>
              <span>{tab.label}</span>
            </div>
          ))}
        </footer>
      </div>
    </Wrapper>
  );
};

export default BoardPage;
