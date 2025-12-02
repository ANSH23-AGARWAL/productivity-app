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
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
        max-width: 620px;
        margin: 0 2rem;
    }
    .search-box {
        display: flex;
        align-items: center;
        flex: 1;
        background-color: #14161c;
        border: 1px solid #32343c;
        padding: 0.45rem 0.85rem;
        border-radius: 999px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-box:focus-within {
        border-color: #6ea4ff;
        box-shadow: 0 0 0 1px rgba(110, 164, 255, 0.4);
    }
    .search-icon {
        margin-right: 0.5rem;
        color: #7e8495;
        font-size: 1rem;
    }
    .search-input {
        flex: 1;
        border: none;
        outline: none;
        background-color: transparent;
        color: #f3f4f6;
        font-size: 0.95rem;
        letter-spacing: 0.01em;
    }
    .search-input::placeholder {
        color: #7f8698;
    }
    .create-btn {
        background: linear-gradient(180deg, #7ab2ff, #5e96f5);
        color: #0d1424;
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 0.55rem 1.4rem;
        border-radius: 999px;
        font-size: 0.9rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.35rem;
        cursor: pointer;
        white-space: nowrap;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .create-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
    }
    .header-right {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        position: relative;
        padding: 0.1rem 0.4rem;
        background: transparent;
    }
    .avatar, .avatar-secondary {
        background-color: #00a3cf; border-radius: 50%; color: #0d1424; font-weight: 600;
        display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .avatar { width: 30px; height: 30px; font-size: 0.78rem; }
    .avatar-secondary { width: 28px; height: 28px; font-size: 0.7rem; }
    .icon, .action-icon {
        color: #cdd3e1;
        cursor: pointer;
        font-size: 1.1rem;
        transition: color 0.2s;
    }
    .header-right .icon {
        font-size: 1.1rem;
    }
    .header-right .icon-wrapper {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        background: linear-gradient(135deg, #5a4a9c 0%, #9e4a8f 100%);
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
        background: rgba(0, 0, 0, 0.15);
        z-index: 2;
    }
    .sidebar {
        flex: 0 0 240px;
        background: #172b4d;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease-in-out;
        border-right: none;
        position: relative;
        z-index: 3;
        color: white;
    }
    .planner-sidebar-main {
        background: #1a1f2e;
    }
    .planner-header-main {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1rem;
    }
    .planner-view-selector {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .view-btn {
        flex: 1;
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 6px;
        color: #94a3b8;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s;
    }
    .view-btn:hover {
        background: rgba(255, 255, 255, 0.15);
    }
    .view-btn.active {
        background: #5b9aff;
        color: white;
    }
    .planner-date-display {
        color: #94a3b8;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
    }
    .planner-tasks {
        flex: 1;
        overflow-y: auto;
    }
    .planner-info {
        color: #94a3b8;
        font-size: 0.9rem;
        text-align: center;
        margin: 2rem 0;
    }
    .planner-hint {
        background: rgba(91, 154, 255, 0.1);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
    }
    .planner-hint p {
        color: #b6c2cf;
        font-size: 0.85rem;
        margin: 0.5rem 0;
    }
    .planner-hint strong {
        color: #5b9aff;
    }
    .inbox-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem; }
    .inbox-icon { font-size: 1.5rem; }
    .inbox-header h3 { font-size: 1.3rem; margin: 0; font-weight: 600; }
    .inbox-cards { flex: 1; overflow-y: auto; margin-bottom: 1rem; }
    .inbox-cards::-webkit-scrollbar { width: 8px; }
    .inbox-cards::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.2); border-radius: 4px; }

    /* Board Area */
    .board-area {
        flex: 1;
        padding: 0.75rem 1rem;
        overflow-x: auto;
        white-space: nowrap;
        position: relative;
        z-index: 3;
    }
    .board-lists {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
        height: 100%;
        padding: 0.5rem 0;
    }
    .list-column {
        background-color: rgba(0, 0, 0, 0.5);
        min-width: 272px;
        max-height: calc(100vh - 220px);
        border-radius: 12px;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        overflow: hidden;
    }
    .list-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 0.5rem 0.5rem;
        background-color: transparent;
    }
    .list-header h4 { font-size: 0.9rem; margin: 0; color: #ffffff; font-weight: 600; }
    .list-menu { color: #9fadbc; cursor: pointer; padding: 0.2rem; }
    .list-cards { 
        display: flex; 
        flex-direction: column; 
        gap: 0.5rem; 
        overflow-y: auto; 
        padding: 0 0.3rem;
        flex: 1;
    }
    .list-cards::-webkit-scrollbar { width: 8px; }
    .list-cards::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 4px; }
    .card {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 0.6rem 0.8rem;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #172b4d;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        white-space: normal;
    }
    .card:hover {
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    .add-card-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.8);
        padding: 0.5rem 0.5rem;
        border-radius: 8px;
        font-size: 0.85rem;
        cursor: pointer;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transition: background-color 0.2s;
    }
    .add-card-btn:hover { background-color: rgba(255, 255, 255, 0.2); color: #ffffff; }
    .add-card-btn.dark {
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-weight: 500;
        border: none;
        padding: 0.8rem;
        border-radius: 4px;
    }
    .add-card-btn.dark:hover {
        background: rgba(0, 0, 0, 0.3);
    }
    .add-list-btn {
        background-color: rgba(255, 255, 255, 0.24);
        border: none;
        color: #fff;
        padding: 0.8rem 1rem;
        border-radius: 12px;
        font-size: 0.9rem;
        cursor: pointer;
        min-width: 272px;
        max-width: 272px;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
    .add-list-btn:hover { background-color: rgba(255, 255, 255, 0.35); }

    /* Footer */
    .footer-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        backdrop-filter: blur(10px);
        border-top: none;
        padding: 0.55rem 0.65rem;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        width: auto;
    }
    .footer-nav::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        border-radius: 20px;
        z-index: -1;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    .nav-item {
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.3rem;
        padding: 0.45rem 0.95rem;
        cursor: pointer;
        color: #94a3b8;
        transition: all 0.2s;
        border-bottom: none;
        border-radius: 10px;
        position: relative;
        margin: 0 0.1rem;
    }
    .nav-item:hover { 
        color: #f1f5f9;
        background: rgba(255, 255, 255, 0.08);
    }
    .nav-item.active { 
        color: #5b9aff;
        background: rgba(91, 154, 255, 0.15);
    }
    .nav-item.active::after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 2px;
        background: #5b9aff;
        border-radius: 2px;
    }
    .nav-icon { font-size: 1rem; }
    .nav-item span { font-size: 0.78rem; font-weight: 500; }

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

    /* Calendar View */
    .calendar-view {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        position: relative;
        z-index: 3;
    }
    .calendar-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 0.5rem;
    }
    .calendar-nav-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: background 0.2s;
    }
    .calendar-nav-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    .calendar-month {
        color: white;
        font-size: 1.5rem;
        margin: 0;
    }
    .today-btn {
        background: #5b9aff;
        border: none;
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        margin-left: auto;
        transition: background 0.2s;
    }
    .today-btn:hover {
        background: #4a89ee;
    }
    .week-calendar-body {
        background: rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        overflow: hidden;
    }
    .week-header {
        display: grid;
        grid-template-columns: 70px repeat(7, 1fr);
        background: rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .time-column-header {
        padding: 1rem 0.5rem;
    }
    .day-header {
        padding: 1rem;
        text-align: center;
        border-left: 1px solid rgba(255, 255, 255, 0.05);
    }
    .day-header.active {
        background: rgba(91, 154, 255, 0.15);
    }
    .day-header.active .day-number {
        background: #5b9aff;
        color: white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.3rem auto 0;
        font-weight: 600;
    }
    .day-label {
        color: #94a3b8;
        font-size: 0.75rem;
        text-transform: uppercase;
        margin-bottom: 0.3rem;
    }
    .day-number {
        color: white;
        font-size: 1.2rem;
        font-weight: 500;
    }
    .week-grid-container {
        display: grid;
        grid-template-columns: 70px 1fr;
        max-height: calc(100vh - 280px);
        overflow-y: auto;
    }
    .time-column {
        background: rgba(0, 0, 0, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    .all-day-label {
        padding: 0.5rem;
        text-align: right;
        color: #94a3b8;
        font-size: 0.7rem;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .time-label-week {
        padding: 0.5rem;
        text-align: right;
        color: #94a3b8;
        font-size: 0.7rem;
        height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .week-days-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .day-column {
        border-left: 1px solid rgba(255, 255, 255, 0.05);
    }
    .all-day-cell {
        height: 40px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
    }
    .hour-cell {
        height: 60px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        position: relative;
        transition: background 0.2s;
    }
    .hour-cell:hover {
        background: rgba(255, 255, 255, 0.03);
    }
    .event-card-week {
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        background: rgba(59, 130, 246, 0.85);
        border-left: 3px solid #3b82f6;
        border-radius: 4px;
        padding: 0.4rem;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 10;
        height: 56px;
        overflow: hidden;
    }
    .event-card-week:hover {
        background: rgba(59, 130, 246, 0.95);
        transform: scale(1.02);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    .event-title-week {
        color: white;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .event-time-week {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.7rem;
    }

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