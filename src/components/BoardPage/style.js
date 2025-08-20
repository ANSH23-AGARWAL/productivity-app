import styled, { createGlobalStyle } from "styled-components";

export const BoardGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
  }
  body {
    margin: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
  }
`;

export const Wrapper = styled.div`
  .board-container {
    min-height: 100vh;
    background: #f8f8f8; /* Lighter background from the second image */
  }
  .board-header {
    background: #ffffff; /* White background from the second image */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08); /* Soft shadow from the second image */
    padding: 1rem 2rem;
    border-radius: 0 0 1.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #444; /* Darker text for header */
  }
  .board-logo {
    background: none; /* No background for logo */
    color: #0d0d0d; /* Darker color for "Boardwise" */
    font-weight: bold;
    font-size: 1.5rem; /* Slightly larger font size */
    padding: 0; /* Remove padding */
    border-radius: 0; /* Remove border-radius */
    box-shadow: none; /* Remove shadow */
    margin-left: 0.75rem;
  }
  .flex-items-center {
    display: flex;
    align-items: center;
  }
  .board-icon {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 8px; /* Add padding for better click area */
    border-radius: 8px;
    &:hover {
        background: #e0e0e0; /* Light gray hover for menu icon */
    }
  }
  .board-icons {
    display: flex;
    gap: 1rem;
  }
  .icon-btn {
    background: #f0f0f0; /* Lighter background for icons */
    border: none; /* No border for icons */
    border-radius: 50%; /* Circular icons */
    padding: 10px; /* Adjust padding for circular shape */
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666; /* Darker icon color */
  }
  .icon-btn:hover {
    background: #e0e0e0; /* Lighter hover background */
    color: #333; /* Darker hover icon color */
    box-shadow: none; /* Remove shadow on hover */
    transform: scale(1.05);
  }
  .icon-btn:hover svg {
    color: #333;
    stroke: #333;
    transition: color 0.2s, stroke 0.2s;
  }
  .board-toggle-popover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .board-toggle-box {
    background: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
    position: relative;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15); /* More prominent shadow */
  }
  .toggle-close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    &:hover {
      color: #333;
    }
  }
  .board-main {
    padding: 2rem;
  }
  .board-main-title {
    font-size: 1.8rem; /* Slightly larger title */
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333; /* Darker title color */
  }
  .board-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Slightly wider cards */
    gap: 1.5rem;
  }
  .board-card {
    background: #ffffff; /* White card background */
    border-radius: 0.75rem; /* More rounded corners */
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08); /* More subtle shadow */
    display: flex;
    flex-direction: column;
    min-height: 180px;
    border: 1px solid #eee; /* Light border */
  }
  .board-card.blank {
    background: #ffffff; /* White background for blank card */
    border: 2px dashed #d1d5db;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #6b7280;
    cursor: pointer;
    box-shadow: none; /* No shadow for blank card */
    &:hover {
      border-color: #a0a0a0; /* Darker border on hover */
      color: #333;
    }
  }
  .board-card-title {
    font-size: 1.35rem; /* Slightly larger title */
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: #333; /* Darker title color */
  }
  .board-card-desc {
    color: #555; /* Slightly darker description color */
    margin-bottom: 1rem;
    flex: 1;
  }
  .board-card-footer {
    font-size: 0.875rem;
    color: #777; /* Slightly darker footer color */
  }
  .icon-hover:hover {
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.2); /* Softer shadow on hover */
    transform: translateY(-3px);
    cursor: pointer;
  }
`;

export const SlidePanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px; /* Wider panel */
  height: 100%;
  background-color: #ffffff;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  z-index: 200;
  animation: slideIn 0.3s ease forwards;
  display: flex;
  flex-direction: column;

  .slide-header {
    font-size: 1.4rem; /* Larger header font */
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
  }
  .slide-option {
    padding: 0.85rem 1rem; /* More padding */
    border-radius: 0.5rem; /* More rounded corners */
    margin-bottom: 0.5rem;
    background: #f6f6f6; /* Lighter background for options */
    color: #444; /* Darker text for options */
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    &:last-child {
      margin-top: auto; /* Push invite members to bottom */
    }
  }
  .slide-option.active {
    background: #ebf5ff; /* Light blue for active item */
    color: #1a73e8; /* Blue text for active item */
    font-weight: bold;
  }
  .slide-option:hover {
    background: #e0e0e0; /* Grayish hover */
    color: #333;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  min-width: 400px; /* Wider modal */
  box-shadow: 0 8px 30px rgba(0,0,0,0.2); /* More pronounced shadow */
  animation: fadeInScale 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @keyframes fadeInScale {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  input, select {
    width: 100%;
    padding: 0.9rem; /* More padding */
    border: 1px solid #ddd; /* Lighter border */
    border-radius: 8px;
    font-size: 1rem;
    &:focus {
      outline: none;
      border-color: #4c8bf5; /* Blue focus border */
      box-shadow: 0 0 0 3px rgba(76, 139, 245, 0.2);
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .date-picker {
    width: 100%;
  }

  button {
    padding: 1rem 1.5rem; /* More padding */
    background: #1a73e8; /* Blue button color */
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.1rem; /* Larger font size */
    margin-top: 1rem;
    &:hover {
      background: #145cb3; /* Darker blue on hover */
    }
  }
`;

export const ProfilePanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px; /* Wider panel */
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  z-index: 250;
  animation: slideInRight 0.3s ease forwards;
  display: flex;
  flex-direction: column;

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .profile-header {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #333;
  }
  .profile-avatar {
    width: 56px; /* Larger avatar */
    height: 56px;
    border-radius: 50%;
    background: url('https://i.pravatar.cc/100') center/cover no-repeat;
    border: 2px solid #ddd; /* Light border for avatar */
  }
  .profile-item {
    padding: 0.85rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    background: #f6f6f6;
    color: #444;
    cursor: pointer;
    &:hover {
      background: #e0e0e0;
      color: #333;
    }
  }
`;

export const InboxPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px; /* Adjust width as needed for inbox content */
  height: 100%;
  background: #ffffff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  z-index: 250;
  animation: slideInRight 0.3s ease forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .inbox-header {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
  }

  .inbox-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .inbox-empty {
    color: #777;
  }

  .inbox-icon {
    width: 80px; /* Larger icon */
    height: 80px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>') center/contain no-repeat;
    margin-bottom: 1rem;
    opacity: 0.4; /* Slightly faded icon */
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #555;
  }

  span {
    font-size: 0.9rem;
    color: #888;
  }
`;