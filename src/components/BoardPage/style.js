import styled from "styled-components";

const Wrapper = styled.div`
    .board-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #0b1623;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
        color: #fff;
        overflow: hidden;
    }

    /* Header */
    .header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #1d2125;
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid #373b3e;
    }
    .logo-img { height: 28px; object-fit: contain; }
    .header-middle {
        display: flex; align-items: center; gap: 0.5rem;
        flex: 1; max-width: 500px; margin: 0 2rem;
    }
    .search-box {
        display: flex; align-items: center;
        background-color: #373b3e; padding: 0.5rem 0.8rem;
        border-radius: 3px; flex: 1;
    }
    .search-icon { margin-right: 0.5rem; color: #a1b0c0; font-size: 16px; }
    .search-input {
        flex: 1; border: none; outline: none;
        background-color: transparent; color: #e3e6e8; font-size: 0.9rem;
    }
    .create-btn {
        background-color: #3b82f6; color: white; border: none;
        padding: 0.5rem 1rem; border-radius: 3px;
        font-size: 0.9rem; font-weight: 500;
        display: flex; align-items: center; gap: 0.3rem;
        cursor: pointer; white-space: nowrap;
        transition: background-color 0.2s;
    }
    .create-btn:hover { background-color: #2563eb; }
    .header-right { display: flex; gap: 1rem; position: relative; }
    .avatar, .avatar-secondary {
        background-color: #f59e0b; border-radius: 50%; color: #fff; font-weight: 600;
        display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .avatar { width: 32px; height: 32px; font-size: 0.8rem; }
    .avatar-secondary { width: 28px; height: 28px; font-size: 0.7rem; }
    .icon, .action-icon {
        color: #e3e6e8;
        cursor: pointer;
        font-size: 1.2rem;
        transition: color 0.2s;
    }
    .icon:hover, .action-icon:hover { color: #f1f5f9; }
    .header-actions .action-icon {
        color: #e3e6e8;
    }

    /* Second Header */
    .header-row-2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #212529;
        padding: 0.6rem 1.5rem;
        border-bottom: 1px solid #373b3e;
    }
    .team-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #fff;
        font-weight: bold;
        font-size: 1.1rem;
    }
    .header-actions {
        display: flex;
        gap: 1rem;
        position: relative;
    }
    .share-btn {
        background-color: #3b82f6;
        color: white;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 3px;
        font-size: 0.8rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .share-btn:hover { background-color: #2563eb; }
    .menu-button {
        cursor: pointer;
        color: #e3e6e8;
        padding: 0.4rem;
    }
    .menu-button:hover { color: #f1f5f9; }
    .action-icon.starred {
        color: #f59e0b;
        filter: drop-shadow(0 0 5px #f59e0b);
    }

    /* Main Layout */
    .main-content {
        display: flex;
        flex: 1;
        overflow: hidden;
        background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
        transition: padding-left 0.3s ease-in-out;
        position: relative;
        z-index: 1;
    }
    .main-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 2;
    }
    .sidebar {
        flex: 0 0 280px;
        background: #059669;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease-in-out;
        border-right: 1px solid #373b3e;
        position: relative;
        z-index: 3;
    }
    .inbox-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem; }
    .inbox-icon { font-size: 1.5rem; }
    .inbox-header h3 { font-size: 1.3rem; margin: 0; }
    .inbox-cards { flex: 1; overflow-y: auto; margin-bottom: 1rem; }
    .inbox-cards::-webkit-scrollbar { width: 8px; }
    .inbox-cards::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; }

    /* Board Area */
    .board-area {
        flex: 1;
        padding: 1rem;
        overflow-x: auto;
        white-space: nowrap;
        position: relative;
        z-index: 3;
    }
    .board-lists {
        display: flex;
        gap: 0.8rem;
        align-items: flex-start;
        height: 100%;
        padding: 1rem 0;
    }
    .list-column {
        background-color: rgba(43, 49, 54, 0.8);
        min-width: 280px;
        max-height: 100%;
        border-radius: 8px;
        padding: 0.8rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    }
    .list-header { display: flex; justify-content: space-between; align-items: center; }
    .list-header h4 { font-size: 1rem; margin: 0; color: #e3e6e8; }
    .list-menu { color: #a1b0c0; cursor: pointer; padding: 0.2rem; }
    .list-cards { display: flex; flex-direction: column; gap: 0.6rem; overflow-y: auto; padding-right: 0.5rem; }
    .list-cards::-webkit-scrollbar { width: 8px; }
    .list-cards::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 4px; }
    .card {
        background-color: #373b3e;
        padding: 0.8rem;
        border-radius: 3px;
        font-size: 0.9rem;
        color: #e3e6e8;
        cursor: grab;
        box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    }
    .add-card-btn {
        background: transparent;
        border: none;
        color: #a1b0c0;
        padding: 0.5rem 0.2rem;
        border-radius: 3px;
        font-size: 0.9rem;
        cursor: pointer;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.2s;
    }
    .add-card-btn:hover { background-color: rgba(255, 255, 255, 0.1); }
    .add-card-btn.dark {
        background: #1e293b;
        color: #f1f5f9;
        font-weight: 500;
        border: 1px solid #334155;
    }
    .add-card-btn.dark:hover {
        background: #253347;
    }
    .add-list-btn {
        background-color: rgba(255, 255, 255, 0.15);
        border: none;
        color: #fff;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        cursor: pointer;
        min-width: 280px;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .add-list-btn:hover { background-color: rgba(255, 255, 255, 0.25); }

    /* Footer */
    .footer-nav {
        display: flex;
        justify-content: center;
        background: #1e293b;
        border-top: 1px solid #334155;
        padding: 0.5rem 1rem;
    }
    .nav-item {
        flex: 0 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        padding: 0.8rem 1.5rem;
        cursor: pointer;
        color: #94a3b8;
        transition: all 0.2s;
    }
    .nav-item:hover { color: #f1f5f9; }
    .nav-item.active { color: #3b82f6; border-bottom: 2px solid #3b82f6; }
    .nav-icon { font-size: 1.2rem; }
    .nav-item span { font-size: 0.8rem; font-weight: 500; }

    /* Modals & Pop-ups */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .modal-content {
        background: #2b3136;
        padding: 2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 450px;
        position: relative;
        color: #e3e6e8;
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .modal-header h3 { margin: 0; }
    .modal-close-icon { cursor: pointer; font-size: 1.5rem; color: #a1b0c0; }
    .modal-content textarea {
        width: 100%;
        background: #1d2125;
        border: 1px solid #373b3e;
        border-radius: 4px;
        padding: 0.8rem;
        color: #e3e6e8;
        margin-bottom: 1rem;
    }
    .modal-content .submit-btn {
        background-color: #3b82f6;
        color: white;
        border: none;
        padding: 0.8rem;
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .modal-content .submit-btn:hover { background-color: #2563eb; }

    /* White Pop-ups */
    .notification-popup.white, .profile-menu-popup.white, .menu-popup.white {
        background: #fff;
        color: #1d2125;
        border: 1px solid #dcdfe4;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .notification-popup.white .modal-close-icon,
    .profile-menu-popup.white .modal-close-icon,
    .menu-popup.white .modal-close-icon {
        color: #6b7280;
    }
    .notification-popup.white .notification-item,
    .profile-menu-popup.white .menu-item,
    .menu-popup.white .menu-item-with-icon {
        color: #1d2125;
    }
    .notification-popup.white .notification-item:hover,
    .profile-menu-popup.white .menu-item:hover,
    .menu-popup.white .menu-item-with-icon:hover {
        background-color: #f3f4f6;
    }
    .notification-popup.white .notification-header h3 {
        color: #1d2125;
    }
    .profile-menu-popup.white .profile-header h3 {
        color: #1d2125;
    }
    .menu-popup.white .modal-header h3 {
        color: #1d2125;
    }
    .menu-popup.white .menu-item-with-icon svg {
        color: #4b5563;
    }
    .profile-menu-popup.white .menu-item svg {
        color: #4b5563;
    }

    /* Original dark pop-ups */
    .notification-popup, .profile-menu-popup, .menu-popup {
        position: absolute;
        top: 60px;
        right: 1.5rem;
        background: #2b3136;
        border: 1px solid #373b3e;
        border-radius: 8px;
        width: 300px;
        padding: 1rem;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .menu-popup {
        top: 100px;
        right: 1.5rem;
    }
    .notification-item, .menu-item, .menu-item-with-icon {
        padding: 0.8rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    .notification-item:hover, .menu-item:hover, .menu-item-with-icon:hover { background-color: #373b3e; }

    /* Share Modal */
    .share-input {
        width: 100%;
        background: #1d2125;
        border: 1px solid #373b3e;
        border-radius: 4px;
        padding: 0.6rem;
        color: #e3e6e8;
        margin-bottom: 1rem;
    }
    .share-button-action {
        background-color: #3b82f6;
        color: white;
        border: none;
        padding: 0.6rem;
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .share-link-section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1rem;
        font-size: 0.9rem;
    }
    .share-link-section a { color: #3b82f6; text-decoration: none; }
    .board-members { margin-top: 1rem; font-size: 0.9rem; color: #a1b0c0; }
    .board-members span { font-weight: bold; color: #e3e6e8; }
    
    /* Visibility Modal */
    .visibility-option {
        padding: 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .visibility-option:hover { background-color: #373b3e; }
    .visibility-option h4 { margin: 0 0 0.5rem; }
    .visibility-option p { margin: 0; font-size: 0.8rem; color: #a1b0c0; }

    /* Planner Sidebar */
    .planner-sidebar {
        flex: 0 0 350px;
        background: #212529;
        padding: 1.5rem;
        border-left: 1px solid #373b3e;
        transition: all 0.3s ease-in-out;
        position: relative;
        z-index: 3;
    }
    .planner-header {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1.5rem;
        position: relative;
    }
    .planner-header h3 { font-size: 1.3rem; margin: 0; }
    .close-icon { position: absolute; right: 0; cursor: pointer; }
    .planner-date { color: #a1b0c0; font-size: 0.9rem; }
    .calendar-placeholder {
        background: #19212b;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        margin-bottom: 1rem;
    }
    .hourly-tracker {
        background: #19212b;
        border-radius: 8px;
        padding: 1rem;
    }
    .hour-slot {
        background: #373b3e;
        padding: 0.5rem;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }
    .add-task-btn {
        color: #3b82f6;
        cursor: pointer;
        font-size: 0.9rem;
    }

    /* Switch Boards Modal */
    .search-box-modal {
        display: flex;
        align-items: center;
        background: #1d2125;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
    }
    .search-box-modal input {
        background: transparent;
        border: none;
        color: white;
        width: 100%;
        padding-left: 0.5rem;
    }
    .board-list-modal {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .board-thumb {
        background: #373b3e;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }
    .recent-boards-section h4 { margin-top: 0; }
    .board-thumbnails {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
    }
    .board-thumbnail {
        min-width: 150px;
        height: 100px;
        border-radius: 8px;
        background-size: cover;
        background-position: center;
        position: relative;
        cursor: pointer;
    }
    .board-thumbnail p {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        margin: 0;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
`;

export default Wrapper;