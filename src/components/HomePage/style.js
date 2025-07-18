import styled from 'styled-components';

const Wrapper = styled.div`
  .kanban-app-container {
    min-height: 100vh;
    background: linear-gradient(120deg, #f3f4f6 60%, #c7d2fe 100%);
    font-family: 'Segoe UI', 'Inter', Arial, sans-serif;
    display: flex;
  }
  
  .kanban-sidebar {
    width: 260px;
    background: #fff;
    box-shadow: 2px 0 24px rgba(60,72,88,0.13);
    padding: 2.5rem 1.5rem 1.5rem 1.5rem;
    border-radius: 0 2rem 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 100vh;
    z-index: 2;
    border-right: 2px solid #e0e7ff;
  }
  
  .kanban-logo {
    background: linear-gradient(90deg, #6366f1 60%, #818cf8 100%);
    color: #fff;
    font-weight: bold;
    font-size: 1.7rem;
    padding: 0.85rem 1.7rem;
    border-radius: 1rem;
    margin-bottom: 2.7rem;
  }
  
  .kanban-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    overflow: hidden;
  }
`;

export default Wrapper;
