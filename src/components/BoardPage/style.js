import styled from "styled-components";

const Wrapper = styled.div`
    .board-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: var(--bg);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
        color: var(--text-color);
        overflow: hidden;
    }

    [data-theme='light'] & {
      --bg: var(--light-bg);
      --header-bg: var(--light-header-bg);
      --text-color: var(--light-text-color);
      --secondary-text-color: var(--light-secondary-text-color);
      --border-color: var(--light-border-color);
      --card-bg: var(--light-card-bg);
      --card-border: var(--light-card-border);
      --button-bg: var(--light-button-bg);
      --button-hover-bg: var(--light-button-hover-bg);
      --accent-color: var(--light-accent-color);
      --shadow: var(--light-shadow);
      --inset-shadow: var(--light-inset-shadow);
    }

    [data-theme='dark'] & {
      --bg: var(--dark-bg);
      --header-bg: var(--dark-header-bg);
      --text-color: var(--dark-text-color);
      --secondary-text-color: var(--dark-secondary-text-color);
      --border-color: var(--dark-border-color);
      --card-bg: var(--dark-card-bg);
      --card-border: var(--dark-card-border);
      --button-bg: var(--dark-button-bg);
      --button-hover-bg: var(--dark-button-hover-bg);
      --accent-color: var(--dark-accent-color);
      --shadow: var(--dark-shadow);
      --inset-shadow: var(--dark-inset-shadow);
    }

    /* Header */
    .header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--header-bg);
        padding: 0.5rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }
    .logo-button {
        background: none;
        border: none;
        padding: 0;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
    }
    .logo-button:focus-visible {
        outline: 2px solid #4452FE;
        outline-offset: 4px;
        border-radius: 6px;
    }
    .logo-img {
        height: 36px;
        width: auto;
        display: block;
        object-fit: contain;
    }
    .header-middle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
        max-width: 620px;
        margin: 0 2rem;
    }
    .search-wrapper {
        position: relative;
        flex: 1;
    }
    .search-box {
        display: flex;
        align-items: center;
        flex: 1;
        background-color: var(--button-bg);
        border: 1px solid var(--border-color);
        padding: 0.45rem 0.85rem;
        border-radius: 999px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-box:focus-within {
        border-color: #4452FE;
        box-shadow: 0 0 0 1px rgba(68, 82, 254, 0.4);
    }
    .search-icon {
        margin-right: 0.5rem;
        color: var(--secondary-text-color);
        font-size: 1rem;
    }
    .search-input {
        flex: 1;
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--text-color);
        font-size: 0.95rem;
        letter-spacing: 0.01em;
    }
    .search-input::placeholder {
        color: var(--secondary-text-color);
    }
    .search-suggestions {
        position: absolute;
        top: calc(100% + 0.4rem);
        left: 0;
        right: 0;
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 14px;
        box-shadow: var(--shadow);
        max-height: 260px;
        overflow-y: auto;
        z-index: 25;
        padding: 0.3rem 0;
    }
    .search-suggestion {
        width: 100%;
        border: none;
        background: transparent;
        color: var(--text-color);
        text-align: left;
        padding: 0.55rem 0.95rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .search-suggestion:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    .search-suggestion.empty {
        cursor: default;
        color: var(--secondary-text-color);
    }
    .suggestion-title {
        font-weight: 600;
        font-size: 0.95rem;
    }
    .suggestion-subtitle {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .create-btn {
        background: #4452FE;
        color: #ffffff;
        border: 1px solid var(--border-color);
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
        background-color: #2FAFCC; border-radius: 50%; color: #ffffff; font-weight: 600;
        display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .avatar { width: 30px; height: 30px; font-size: 0.78rem; }
    .avatar-secondary { width: 28px; height: 28px; font-size: 0.7rem; }
    .icon, .action-icon {
        color: var(--secondary-text-color);
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
    .icon.active { color: #4452FE; }
    .avatar.active-ring { box-shadow: 0 0 0 2px #4452FE; }
    .header-actions .action-icon {
        color: var(--text-color);
    }

    /* Second Header - Now inside board-area */
    .header-row-2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.25);
        padding: 1rem 0.75rem;
        border: none;
        margin-bottom: 0.75rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
    }
    .content-wrapper {
        display: flex;
        flex: 1;
        gap: 1.5rem;
        overflow: hidden;
    }
    .team-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #fff;
        font-weight: bold;
        font-size: 1.1rem;
    }
    .board-name-input {
        background: var(--border-color);
        border: 2px solid #4452FE;
        border-radius: 4px;
        padding: 0.4rem 0.6rem;
        color: #fff;
        font-size: 1.1rem;
        font-weight: bold;
        font-family: inherit;
        outline: none;
        min-width: 200px;
    }
    .board-name-input:focus {
        background: var(--border-color);
    }
    .header-actions {
        display: flex;
        gap: 1rem;
        position: relative;
        align-items: center;
    }
    .share-btn {
        background-color: #4452FE;
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
    .share-btn:hover { background-color: #3845d4; }
    .menu-button {
        cursor: pointer;
        color: var(--text-color);
        padding: 0.4rem;
    }
    .menu-button:hover { color: #f1f5f9; }
    .action-icon.starred {
        color: #2FAFCC;
        filter: drop-shadow(0 0 5px #2FAFCC);
    }

    /* Main Layout */
    .main-content {
        display: flex;
        flex-direction: row;
        flex: 1;
        overflow: visible;
        background: var(--bg);
        transition: padding-left 0.3s ease-in-out;
        position: relative;
        z-index: 1;
        padding: 1.5rem;
        gap: 1rem;
    }
    .sidebar {
        flex: 0 0 240px;
        background: var(--header-bg);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease-in-out;
        border-right: none;
        position: relative;
        z-index: 3;
        color: var(--text-color);
        border-radius: 16px;
        border: 1px solid var(--border-color);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(18px);
    }
    .planner-sidebar-main {
        background: var(--header-bg);
        border-radius: 16px;
        border: 1px solid var(--border-color);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(18px);
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
        background: var(--border-color);
        border: none;
        border-radius: 6px;
        color: #94a3b8;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s;
    }
    .view-btn:hover {
        background: var(--border-color);
    }
    .view-btn.active {
        background: #4452FE;
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
        color: #4452FE;
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
        padding: 0.75rem 1.25rem 1.25rem 1.25rem;
        overflow-x: auto;
        white-space: nowrap;
        position: relative;
        z-index: 3;
        background: var(--header-bg);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(18px);
        display: flex;
        flex-direction: column;
    }
    .lists-status {
        margin: 0.5rem 0 0.25rem;
        padding: 0.4rem 0.75rem;
        border-radius: 10px;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(68, 82, 254, 0.12);
        color: #c7d2fe;
        font-size: 0.85rem;
        font-weight: 500;
    }
    .lists-status.error {
        background: rgba(248, 113, 113, 0.12);
        color: #fecaca;
    }
    .lists-retry {
        border: none;
        background: transparent;
        color: inherit;
        font-weight: 600;
        cursor: pointer;
        padding: 0.1rem 0.35rem;
    }
    .lists-retry:hover {
        text-decoration: underline;
    }
    @keyframes boardSwitchPulse {
        0% {
            opacity: 0.45;
            transform: scale(0.98);
            filter: saturate(0.9);
        }
        55% {
            opacity: 1;
            transform: scale(1.01);
            filter: saturate(1.05);
        }
        100% {
            opacity: 1;
            transform: scale(1);
            filter: saturate(1);
        }
    }
    .board-area.board-switching {
        animation: boardSwitchPulse 0.55s ease-out;
    }
    .board-lists {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
        flex: 1;
        padding: 0.5rem 0;
    }
    .list-column {
        background-color: var(--card-bg); /* Or header-bg for list column */
        min-width: 272px;
        max-height: calc(100vh - 220px);
        border-radius: 12px;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        /* overflow: hidden; Removed to allow popups to spill out */
        position: relative; /* Context */
    }
    .list-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 0.5rem 0.5rem;
        background-color: transparent;
    }
    .list-header h4 { font-size: 0.9rem; margin: 0; color: var(--text-color); font-weight: 600; }
    .list-menu { color: var(--secondary-text-color); cursor: pointer; padding: 0.2rem; }
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
        background-color: var(--card-bg);
        padding: 0.6rem 0.8rem;
        border-radius: 8px;
        font-size: 0.9rem;
        color: var(--text-color);
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
        color: #4452FE;
        background: rgba(68, 82, 254, 0.15);
    }
    .nav-item.active::after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 2px;
        background: #4452FE;
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
        animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    /* Animations */
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        to {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
        }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .modal-content {
        animation: modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        background: #0A0F1F;
        padding: 2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 450px;
        position: relative;
        color: var(--text-color);
    }
    .modal-overlay.closing {
        animation: fadeOut 0.2s ease-in forwards;
    }
    .modal-overlay.closing .modal-content {
        animation: modalSlideOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .modal-header h3 { margin: 0; }
    .modal-close-icon { cursor: pointer; font-size: 1.5rem; color: var(--secondary-text-color); }
    .modal-content textarea, .modal-content input[type="text"], .modal-content input[type="date"], .modal-content select {
        width: 100%;
        background: #0F162B;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 0.8rem;
        color: var(--text-color);
        margin-bottom: 1rem;
        font-family: inherit;
        box-sizing: border-box;
    }
    .modal-content label {
        display: block;
        margin-bottom: 0.4rem;
        color: var(--secondary-text-color);
        font-size: 0.9rem;
    }
    .form-group {
        margin-bottom: 1rem;
    }
    .form-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    .form-row .form-group {
        flex: 1 1 180px;
        min-width: 0;
    }
    .modal-content .submit-btn {
        background-color: #4452FE;
        color: white;
        border: none;
        padding: 0.8rem;
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .modal-content .submit-btn:hover { background-color: #3845d4; }

    .settings-modal {
        max-width: 560px;
        width: min(560px, 95%);
    }
    .settings-header h3 {
        margin-bottom: 0.2rem;
    }
    .settings-subtitle {
        margin: 0;
        color: var(--secondary-text-color);
        font-size: 0.85rem;
    }
    .settings-section {
        border: 1px solid rgba(255, 255, 255, 0.04);
        border-radius: 10px;
        padding: 1rem 1.2rem;
        margin-bottom: 1.2rem;
        background: rgba(15, 22, 43, 0.85);
    }
    .settings-section h4 {
        margin: 0 0 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 0.78rem;
        color: #8ea0ff;
    }
    .settings-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.65rem 0;
    }
    .settings-row + .settings-row {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .settings-row p {
        margin: 0;
        font-weight: 600;
    }
    .settings-row-subtitle {
        display: block;
        margin-top: 0.25rem;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
    }
    .settings-row select {
        min-width: 180px;
        margin-bottom: 0;
    }
    .settings-toggle {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        user-select: none;
        position: relative;
    }
    .settings-toggle input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
    .toggle-track {
        width: 44px;
        height: 24px;
        border-radius: 999px;
        background: var(--border-color);
        position: relative;
        transition: background 0.2s ease;
    }
    .toggle-track::after {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffffff;
        top: 3px;
        left: 4px;
        transition: transform 0.2s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    }
    .settings-toggle input:checked + .toggle-track {
        background: #4452FE;
    }
    .settings-toggle input:checked + .toggle-track::after {
        transform: translateX(18px);
    }
    .toggle-value {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        min-width: 2.5rem;
        text-align: right;
    }
    .theme-pill-group {
        display: inline-flex;
        gap: 0.5rem;
        padding: 0.2rem;
        border-radius: 999px;
        border: 1px solid var(--border-color);
        background: rgba(6, 11, 25, 0.9);
    }
    .theme-pill {
        border: none;
        background: transparent;
        color: var(--secondary-text-color);
        padding: 0.35rem 0.9rem;
        border-radius: 999px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .theme-pill.active {
        background: #4452FE;
        color: #fff;
        box-shadow: 0 10px 25px rgba(68, 82, 254, 0.35);
    }
    .settings-actions {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
    }
    .settings-actions .primary-button,
    .settings-actions .ghost-button {
        flex: 1;
        text-align: center;
    }
    .ghost-button {
        background: transparent;
        border: 1px dashed var(--border-color);
        color: var(--secondary-text-color);
        padding: 0.65rem;
        border-radius: 6px;
        cursor: pointer;
        transition: border-color 0.2s ease, color 0.2s ease;
    }
    .ghost-button:hover {
        border-color: #4452FE;
        color: #ffffff;
    }
    .settings-modal .primary-button {
        background: #4452FE;
        border: none;
        color: #ffffff;
        padding: 0.65rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    .settings-modal .primary-button:hover {
        background: #3845d4;
    }

    /* Neo Modern Pop-ups (Replacing White) */
    /* Shared styles update for consistency, overriding previous overrides if necessary */
    .notification-popup.white, .profile-menu-popup.white, .menu-popup.white {
        background: rgba(10, 15, 31, 0.95);
        backdrop-filter: blur(12px);
        color: #ffffff;
        border: 1px solid var(--border-color);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        border-radius: 12px;
    }
    .notification-popup.white .modal-close-icon,
    .profile-menu-popup.white .modal-close-icon,
    .menu-popup.white .modal-close-icon {
        color: var(--secondary-text-color);
    }
    .notification-popup.white .notification-item,
    .profile-menu-popup.white .menu-item,
    .menu-popup.white .menu-item-with-icon {
        color: var(--text-color);
    }
    .notification-popup.white .notification-item:hover,
    .profile-menu-popup.white .menu-item:hover,
    .menu-popup.white .menu-item-with-icon:hover {
        background-color: rgba(68, 82, 254, 0.2); /* Subtle blue highlight */
        transform: translateX(4px); /* Micro-interaction */
    }
    .notification-popup.white .notification-header h3 {
        color: #ffffff;
    }
    .profile-menu-popup.white .profile-header h3 {
        color: #ffffff;
    }
    .menu-popup.white .modal-header h3 {
        color: #ffffff;
    }
    .menu-popup.white .menu-item-with-icon svg {
        color: var(--secondary-text-color);
    }
    .profile-menu-popup.white .menu-item svg {
        color: var(--secondary-text-color);
    }

    /* Original dark pop-ups */
    .notification-popup .notification-header,
    .profile-menu-popup .profile-header,
    .menu-popup .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .notification-popup, .profile-menu-popup, .menu-popup {
        position: absolute;
        top: 65px; /* Slightly lower for better breathing room */
        right: 1.5rem;
        background: rgba(10, 15, 31, 0.95); /* High opacity for readability but slight transparency */
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        width: 340px; /* Slightly wider */
        padding: 1.25rem;
        z-index: 999;
        box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        animation: slideDownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        transform-origin: top right;
    }

    @keyframes slideDownFade {
        from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes slideUpFadeOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
        }
    }

    .notification-popup.closing, .profile-menu-popup.closing, .menu-popup.closing {
        animation: slideUpFadeOut 0.2s ease-in forwards;
    }
    .menu-popup {
        top: 100px;
        right: 1.5rem;
    }
    .notification-item, .menu-item, .menu-item-with-icon {
        padding: 0.9rem;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }
    .notification-item:last-child, .menu-item:last-child, .menu-item-with-icon:last-child {
        border-bottom: none;
    }
    /* Context Menus (List & Task) */
    .context-menu {
        position: absolute;
        width: 180px;
        background: rgba(10, 15, 31, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 1001;
        overflow: hidden;
        animation: fadeIn 0.1s ease-out;
    }
    .context-menu.right-side {
        left: 100%;
        top: 0;
        margin-left: 0.5rem;
    }
    .context-menu-item {
        padding: 0.7rem 1rem;
        cursor: pointer;
        color: var(--text-color);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background 0.2s;
    }
    /* Task Details Modal Styles */
    .task-detail-row {
        display: flex;
        margin-bottom: 1rem;
        gap: 1rem;
        align-items: flex-start;
    }
    .task-detail-icon {
        color: var(--secondary-text-color);
        margin-top: 0.2rem;
        font-size: 1.1rem;
    }
    .task-detail-content {
        flex: 1;
    }
    .task-detail-label {
        font-size: 0.85rem;
        color: var(--secondary-text-color);
        margin-bottom: 0.25rem;
        font-weight: 600;
    }
    .task-detail-value {
        font-size: 1rem;
        color: #fff;
        line-height: 1.5;
    }
    .task-detail-meta {
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    .context-menu-item:hover {
        background: rgba(68, 82, 254, 0.2);
    }
    .context-menu-item.delete:hover {
        background: rgba(255, 59, 48, 0.2);
        color: #ff3b30;
    }

    /* Task Card Updates */
    .card {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 0.8rem;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #172b4d;
        cursor: pointer;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        white-space: normal;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-weight: 500;
        margin-bottom: 0.2rem;
    }
    .card-actions {
        opacity: 0;
        transition: opacity 0.2s;
        margin-left: 0.5rem;
        color: #5e6c84;
    }
    .card:hover .card-actions {
        opacity: 1;
    }
    .card-meta {
        display: flex;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: #5e6c84;
        align-items: center;
        flex-wrap: wrap;
    }
    .badge {
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.7rem;
    }
    .badge.high { background: #ffebeb; color: #ff5630; }
    .badge.medium { background: #fff7d6; color: #ffab00; }
    .badge.low { background: #e3fcef; color: #36b37e; }
    
    .notification-item:hover, .menu-item:hover, .menu-item-with-icon:hover { 
        background-color: rgba(68, 82, 254, 0.2);
        transform: translateX(4px);
    }

    /* Share Modal */
    .share-input {
        width: 100%;
        background: #0F162B;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 0.6rem;
        color: var(--text-color);
        margin-bottom: 1rem;
    }
    .share-button-action {
        background-color: #4452FE;
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
    .share-link-section a { color: #4452FE; text-decoration: none; }
    .board-members { margin-top: 1rem; font-size: 0.9rem; color: var(--secondary-text-color); }
    .board-members span { font-weight: bold; color: var(--text-color); }
    
    /* Visibility Modal */
    .visibility-option {
        padding: 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .visibility-option:hover { background-color: var(--border-color); }
    .visibility-option h4 { margin: 0 0 0.5rem; }
    .visibility-option p { margin: 0; font-size: 0.8rem; color: var(--secondary-text-color); }

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
        background: var(--border-color);
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
        background: #4452FE;
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
        background: #3845d4;
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
        border-bottom: 1px solid var(--border-color);
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
        background: rgba(68, 82, 254, 0.15);
    }
    .day-header.active .day-number {
        background: #4452FE;
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
        border-right: 1px solid var(--border-color);
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
        border-bottom: 1px solid var(--border-color);
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
        border-bottom: 1px solid var(--border-color);
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
        background: rgba(68, 82, 254, 0.85);
        border-left: 3px solid #4452FE;
        border-radius: 4px;
        padding: 0.4rem;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 10;
        height: 56px;
        overflow: hidden;
    }
    .event-card-week:hover {
        background: rgba(68, 82, 254, 0.95);
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
        background: #0A0F1F;
        padding: 1.5rem;
        border-left: 1px solid var(--border-color);
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
    .planner-date { color: var(--secondary-text-color); font-size: 0.9rem; }
    .calendar-placeholder {
        background: #0F162B;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        margin-bottom: 1rem;
    }
    .hourly-tracker {
        background: #0F162B;
        border-radius: 8px;
        padding: 1rem;
    }
    .hour-slot {
        background: var(--border-color);
        padding: 0.5rem;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }
    .add-task-btn {
        color: #4452FE;
        cursor: pointer;
        font-size: 0.9rem;
    }

    /* Switch Boards Modal */
    .search-box-modal {
        display: flex;
        align-items: center;
        background: #0F162B;
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
        background: var(--border-color);
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


export const ThemeToggleButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--button-bg, #1A2333);
    color: var(--text-color, #FFFFFF);
    border: 1px solid var(--border-color, #1F2940);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--button-hover-bg, #253045);
      color: var(--accent-color, #4452FE);
    }
    
    svg {
      color: inherit;
    }
`;

export default Wrapper;