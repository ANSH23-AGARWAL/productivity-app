import styled from 'styled-components';

const Wrapper = styled.div`
  .board-container {
    min-height: 100vh;
    background: #f3f4f6;
    font-family: 'Segoe UI', Arial, sans-serif;
  }
  
  .board-header {
    background: #fff;
    box-shadow: 0 2px 12px rgba(60,72,88,0.08);
    padding: 1rem 2rem;
    border-radius: 0 0 1.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .board-logo {
    background: #6366f1;
    color: #fff;
    font-weight: bold;
    font-size: 1.25rem;
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(99,102,241,0.12);
  }
  
  .board-title {
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
  }
  
  .board-icons {
    display: flex;
    gap: 1rem;
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
  }
  
  .toggle-close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .board-main {
    padding: 2rem;
  }
  
  .board-main-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  
  .board-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .board-card {
    background: #fff;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    min-height: 180px;
  }
  
  .board-card.blank {
    background: #f9fafb;
    border: 2px dashed #d1d5db;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #6b7280;
    cursor: pointer;
  }
  
  .board-card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }
  
  .board-card-desc {
    color: #4b5563;
    margin-bottom: 1rem;
    flex: 1;
  }
  
  .board-card-footer {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

export default Wrapper;
