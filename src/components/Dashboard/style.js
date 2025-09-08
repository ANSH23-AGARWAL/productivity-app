// style.js
import styled, { createGlobalStyle, css } from 'styled-components';

// Define theme colors using CSS variables
export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

    :root {
      --light-bg: #F8F8F8;
      --light-header-bg: #FFFFFF;
      --light-text-color: #333333;
      --light-secondary-text-color: #555555;
      --light-border-color: #E0E0E0;
      --light-card-bg: #FFFFFF;
      --light-card-border: #EEEEEE;
      --light-button-bg: #F0F0F0;
      --light-button-hover-bg: #E0E0E0;
      --light-accent-color: #1a73e8;
      --light-shadow: rgba(0, 0, 0, 0.1);
      --light-inset-shadow: rgba(0, 0, 0, 0.05);

      --dark-bg: #1A2A4A;
      --dark-header-bg: #0F1E3A;
      --dark-text-color: #E0E0E0;
      --dark-secondary-text-color: #BBBBBB;
      --dark-border-color: #2F3E5A;
      --dark-card-bg: #223555;
      --dark-card-border: #3A4C6B;
      --dark-button-bg: #2B4268;
      --dark-button-hover-bg: #355080;
      --dark-accent-color: #8AB4F8;
      --dark-shadow: rgba(0, 0, 0, 0.4);
      --dark-inset-shadow: rgba(0, 0, 0, 0.2);
    }

    body {
      margin: 0;
      font-family: 'Segoe UI', Arial, sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    button, .card-item, .left-box-button, .social-btn, .option-item {
      transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }
      &:active {
        transform: translateY(1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
`;

export const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    color: var(--text-color);
    position: relative;
    z-index: 0;
    
    background-color: var(--bg);

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
`;
export const Header = styled.header`
    background-color: var(--header-bg);
    color: var(--text-color);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px var(--shadow);
    border-bottom: 1px solid var(--border-color);
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;

    .header-left .logo {
      font-size: 1.8rem;
      font-weight: bold;
      color: var(--text-color);
      letter-spacing: 0.5px;
      background: linear-gradient(90deg, #6366f1, #00d4ff, #8a2be2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header-right {
      display: flex;
      gap: 1.5rem;
    }

    .icon-button {
      background: none;
      border: none;
      color: var(--secondary-text-color);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.8rem;
      border-radius: 8px;
      transition: all 0.2s ease;

      &:hover {
        background-color: var(--button-hover-bg);
        color: var(--accent-color);
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 4px 10px var(--shadow);
      }
      &:active {
        transform: translateY(1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }

    @media (max-width: 768px) {
      padding: 1rem;
      .header-left .logo {
        font-size: 1.5rem;
      }
      .header-right {
        gap: 0.5rem;
      }
      .icon-button {
        font-size: 0.8rem;
        padding: 0.4rem 0.6rem;
        span {
          display: none;
        }
      }
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    margin-top: 60px;
    min-height: calc(100vh - 60px);
`;

export const LeftBox = styled.div`
    background-color: var(--header-bg);
    padding: 1.5rem;
    box-shadow: 2px 0 10px var(--shadow);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    position: fixed;
    top: 60px;
    left: 0;
    width: 220px;
    height: calc(100vh - 60px);
    overflow-y: auto;
    z-index: 1000;

    .left-box-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1rem;
    }

    .left-box-button {
      background-color: var(--button-bg);
      color: var(--secondary-text-color);
      border: none;
      padding: 0.8rem 1rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        background-color: var(--button-hover-bg);
        color: var(--accent-color);
        transform: translateX(5px) scale(1.02);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      box-shadow: none;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
      padding: 1rem;
      flex-direction: row;
      justify-content: space-around;
      position: relative;
      top: 0;
      height: auto;
      .left-box-buttons {
        flex-direction: row;
        gap: 0.5rem;
      }
      .left-box-button {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
`;

export const ContentArea = styled.div`
    overflow-y: auto;
    padding-left: 3rem;
    margin-left: 235px;
    padding-top: 2rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
    flex-grow: 1;
    z-index: 1;
    background-color: transparent;

    ${(props) =>
      props.panelOpen &&
      css`
        padding-right: 340px;
        transition: padding-right 0.3s ease-out;
      `}

    .main-content {
      min-height: calc(100vh - 60px - 4rem);
    }
    
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }

    .card-item {
      background-color: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;

      h3 {
        font-size: 1.5rem;
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: var(--text-color);
      }

      p {
        font-size: 0.95rem;
        color: var(--secondary-text-color);
        margin-bottom: 1rem;
        flex-grow: 1;
      }

      .card-details {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        font-size: 0.85rem;
        color: var(--secondary-text-color);
        margin-bottom: 0.75rem;

        span {
          background-color: var(--button-bg);
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
        }

        .priority-low {
          background-color: #d4edda;
          color: #155724;
        }
        .priority-normal {
          background-color: #fff3cd;
          color: #856404;
        }
        .priority-high {
          background-color: #f8d7da;
          color: #721c24;
        }
      }

      .card-footer {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        text-align: right;
        margin-top: 0.5rem;
      }

      .delete-card-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: var(--secondary-text-color);
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        &:hover {
          color: #ff4d4d;
          background-color: rgba(255, 77, 77, 0.1);
        }
      }
    }

    .recent-viewed-section,
    .upcoming-deadlines-section {
      margin-top: 2rem;
      margin-bottom: 2rem;

      h2 {
        font-size: 1.4rem;
        font-family: 'Poppins', sans-serif;
        color: var(--text-color);
        margin-bottom: 1.5rem;
        border-bottom: 2px solid var(--border-color);
        padding-bottom: 0.5rem;
      }
    }
`;

export const AddCardFloatingButton = styled.div`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;

    button {
      background-color: var(--accent-color);
      color: white;
      padding: 1.5rem;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      width: 60px;
      height: 60px;
      border: none;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: #145cb3;
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
      }
      svg {
        color: white;
      }
    }
`;

export const RightPanel = styled.div`
    position: fixed;
    top: 60px;
    right: 0;
    width: 320px;
    height: calc(100% - 60px);
    background-color: var(--header-bg);
    box-shadow: -4px 0 15px var(--shadow);
    z-index: 1000;
    transform: translateX(0);
    transition: transform 0.3s ease-out;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    .panel-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: var(--header-bg);
      z-index: 1;
      h3 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--text-color);
      }
      .close-button {
        background: none;
        border: none;
        color: var(--secondary-text-color);
        cursor: pointer;
        font-size: 1.5rem;
        padding: 0.5rem;
        border-radius: 50%;
        &:hover {
          background-color: var(--button-hover-bg);
          color: var(--accent-color);
        }
      }
    }

    .panel-content {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 0;

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: var(--secondary-text-color);
        svg {
          color: var(--border-color);
          opacity: 0.6;
        }
        p {
          font-weight: bold;
          font-size: 1.1rem;
          margin: 0;
        }
        span {
          font-size: 0.9rem;
        }
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      top: 60px;
      height: calc(100% - 60px);
      transform: translateX(100%);
      &.active {
        transform: translateX(0);
      }
    }
`;

export const ProfileSlidePanel = styled(RightPanel)`
    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      h4 {
        margin: 0.75rem 0 0.25rem;
        color: var(--text-color);
        font-size: 1.3rem;
      }
      p {
        margin: 0;
        color: var(--secondary-text-color);
        font-size: 0.9rem;
      }
      svg {
        color: var(--secondary-text-color);
      }
    }

    .profile-options {
      display: flex;
      flex-direction: column;
      width: 100%;
      .option-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--button-bg);
        padding: 0.8rem 1rem;
        border-radius: 8px;
        margin-bottom: 0.75rem;
        cursor: pointer;
        color: var(--text-color);
        font-weight: 500;
        &:hover {
          background-color: var(--button-hover-bg);
          color: var(--accent-color);
        }
      }

      .theme-option {
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding-right: 0.8rem;
      }
    }
`;

export const ThemeToggleButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--button-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover {
      background-color: var(--button-hover-bg);
      color: var(--accent-color);
    }
    svg {
      color: inherit;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    ${(props) => props.fullScreen && css`
      z-index: 1002;
      background: rgba(0, 0, 0, 0.8);
    `}
`;

export const ModalContent = styled.div`
    background-color: var(--card-bg);
    color: var(--text-color);
    padding: 1.25rem;
    border-radius: 12px;
    box-shadow: 0 8px 30px var(--shadow);
    width: 350px;
    max-width: 90%;
    animation: fadeInScale 0.3s ease-out;

    @keyframes fadeInScale {
      from {
        transform: scale(0.9) translateY(20px);
        opacity: 0;
      }
      to {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }

    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      text-align: center;
      color: var(--text-color);
    }

    input,
    textarea,
    .date-picker,
    select {
      width: calc(100% - 1.6rem); /* Adjusting width to account for padding */
      padding: 0.6rem 0.8rem;
      margin-bottom: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: var(--button-bg);
      color: var(--text-color);
      font-size: 0.9rem;
      transition: all 0.2s ease;
      box-sizing: border-box; /* To ensure padding is included in the width */

      &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(var(--accent-color-rgb), 0.2);
      }
    }

    textarea {
      resize: vertical;
      min-height: 70px;
    }

    .form-group {
      margin-bottom: 0.8rem;
      label {
        display: block;
        margin-bottom: 0.4rem;
        font-size: 0.85rem;
        color: var(--secondary-text-color);
      }
    }

    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 0.8rem;
      margin-top: 1.2rem;

      button {
        padding: 0.7rem 1.2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.2s ease;
      }

      .cancel-button {
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--secondary-text-color);
        &:hover {
          background-color: var(--button-hover-bg);
          color: var(--text-color);
        }
      }

      .primary-button {
        background-color: var(--accent-color);
        border: none;
        color: #fff;
        &:hover {
          background-color: #145cb3;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }
      }
    }
`;

export const TemplatesModalContent = styled(ModalContent)`
    width: 350px;
    h3 {
      color: var(--accent-color);
    }
    .modal-buttons {
      justify-content: center;
    }
`;

export const TrashSlidePanel = styled(RightPanel)`
    top: auto;
    bottom: 0;
    left: 220px;
    width: calc(100% - 220px);
    height: 250px;
    transform: translateY(0);
    box-shadow: 0 -4px 15px var(--shadow);
    flex-direction: column;

    .panel-header {
      h3 {
        color: #ff6347;
      }
    }

    .panel-content {
      justify-content: flex-start;
      .deleted-items-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        .deleted-item {
          background-color: var(--button-bg);
          padding: 0.8rem 1rem;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid var(--border-color);
          span {
            font-weight: 500;
            color: var(--text-color);
          }
          small {
            color: var(--secondary-text-color);
            font-size: 0.8rem;
          }
        }
      }
    }

    @media (max-width: 768px) {
      left: 0;
      width: 100%;
      height: 50vh;
    }
`;

export const MemberSelect = styled.select`
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    padding-right: 2.5rem;
`;

export const PrioritySelect = styled(MemberSelect)`
    /* Inherits styles from MemberSelect */
`;