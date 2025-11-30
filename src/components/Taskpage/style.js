import styled from "styled-components";

const Wrapper = styled.div`
    .card-detail-page {
        background: #1e2125;
        color: #e3e6e8;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
    }
    
    /* Header */
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem 1.5rem;
        background: #212529;
        border-bottom: 1px solid #373b3e;
    }
    .list-selector {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.8rem;
        background: #373b3e;
        border-radius: 4px;
        cursor: pointer;
    }
    .header-actions {
        display: flex;
        gap: 1rem;
    }
    .header-actions svg {
        cursor: pointer;
        font-size: 1.2rem;
        color: #e3e6e8;
    }

    /* Main Content */
    .card-main {
        display: flex;
        flex: 1;
        padding: 1rem 1.5rem;
        gap: 2rem;
        overflow: auto;
    }
    .left-section {
        flex: 3;
        display: flex;
        flex-direction: column;
    }
    .right-section {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .card-title h1 {
        font-size: 1.5rem;
        margin: 0 0 1rem 0;
    }
    .card-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    .card-actions button {
        background: #373b3e;
        color: #e3e6e8;
        border: none;
        border-radius: 4px;
        padding: 0.6rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }
    .card-actions button:hover {
        background: #474d53;
    }
    .description-section {
        flex: 1;
    }
    .description-section textarea {
        width: 100%;
        min-height: 100px;
        background: #373b3e;
        border: 1px solid #474d53;
        color: #e3e6e8;
        border-radius: 4px;
        padding: 0.8rem;
        resize: none;
    }

    /* Right Section - Comments */
    .activity-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .activity-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
    }
    .show-details-btn {
        margin-left: auto;
        background: #373b3e;
        color: #e3e6e8;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
    }
    .activity-section textarea {
        background: #373b3e;
        color: #e3e6e8;
        border: none;
        padding: 0.6rem;
        border-radius: 4px;
        min-height: 60px;
        resize: none;
    }
    .comment-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .comment {
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
    }
    .user-initials {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #3b82f6;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
    }
    .comment-content {
        flex: 1;
    }
    .comment-meta b {
        font-weight: bold;
    }
    .comment-date {
        font-size: 0.8rem;
        color: #a1b0c0;
        margin: 0;
    }

    /* Modals & Pop-ups */
    .popup-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2b3136;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        z-index: 1000;
        min-width: 300px;
        max-width: 450px;
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    .modal-header h3 {
        margin: 0;
        font-size: 1.2rem;
    }
    .close-icon {
        cursor: pointer;
        font-size: 1.5rem;
        color: #a1b0c0;
    }
    .modal-options button {
        background: #373b3e;
        color: #e3e6e8;
        border: none;
        padding: 0.8rem;
        border-radius: 4px;
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
    }
    .modal-options button:hover {
        background: #474d53;
    }

    /* Labels Modal */
    .labels-modal {
        min-width: 250px;
    }
    .label-search {
        display: flex;
        align-items: center;
        background: #373b3e;
        border-radius: 4px;
        padding: 0.5rem 0.8rem;
        margin-bottom: 1rem;
    }
    .label-search input {
        background: transparent;
        border: none;
        color: #e3e6e8;
        flex: 1;
        padding-left: 0.5rem;
        outline: none;
    }
    .label-search svg {
        color: #a1b0c0;
    }
    .label-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .label-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #373b3e;
        padding: 0.6rem;
        border-radius: 4px;
        cursor: pointer;
    }
    .label-option:hover { background: #474d53; }
    .label-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
    }
    .label-text {
        flex: 1;
    }
    .edit-icon {
        color: #a1b0c0;
    }
    .modal-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .create-label-btn, .colorblind-btn {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 0.8rem;
        border-radius: 4px;
        cursor: pointer;
    }
    .colorblind-btn {
        background: #474d53;
        color: #e3e6e8;
    }
    .label-option .green { background: #44b673; }
    .label-option .yellow { background: #f2d600; }
    .label-option .orange { background: #ff9f1a; }
    .label-option .red { background: #eb5a46; }
    .label-option .purple { background: #a272a2; }
    .label-option .blue { background: #0079bf; }
    /* Cover Modal */
    .cover-options h4 { font-size: 1rem; margin-top: 0; }
    .size-options { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .size-preview {
        border-radius: 4px;
        border: 2px solid #373b3e;
    }
    .size-preview.small { width: 100px; height: 60px; background: #373b3e; }
    .size-preview.large { width: 150px; height: 100px; background: #373b3e; }
    .color-palette {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .color-box {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        cursor: pointer;
    }
    .color-box.green { background: #44b673; }
    .color-box.yellow { background: #f2d600; }
    .color-box.orange { background: #ff9f1a; }
    .color-box.red { background: #eb5a46; }
    .color-box.purple { background: #a272a2; }
    .color-box.blue { background: #0079bf; }
    .color-box.teal { background: #00c2e0; }
    .color-box.pink { background: #ff78cb; }
    .color-box.gray { background: #94a3b8; }
    .upload-btn {
        background: #373b3e;
        color: #e3e6e8;
        border: none;
        padding: 0.8rem;
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
    }
    .upload-tip { font-size: 0.8rem; color: #a1b0c0; }
    .unsplash-photos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }
    .unsplash-photos img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        cursor: pointer;
    }
`;

export default Wrapper;