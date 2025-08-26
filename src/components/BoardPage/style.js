import styled from "styled-components";

const Wrapper = styled.div`
  .board-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #0b1623;
    font-family: "Inter", sans-serif;
    color: #fff;
  }

  /* Header */
  .header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1e293b;
    padding: 0.8rem 1.5rem;
    border-bottom: 1px solid #334155;
  }

  .logo-img { height: 32px; object-fit: contain; }
  .header-middle {
    display: flex; align-items: center; gap: 1rem;
    flex: 1; max-width: 500px; margin: 0 2rem;
  }
  .search-box {
    display: flex; align-items: center;
    background: #374151; padding: 0.5rem 0.8rem;
    border-radius: 6px; flex: 1;
  }
  .search-icon { margin-right: 0.5rem; color: #94a3b8; font-size: 16px; }
  .search-input {
    flex: 1; border: none; outline: none;
    background: transparent; color: #f1f5f9; font-size: 0.9rem;
  }
  .create-btn {
    background: #3b82f6; color: white; border: none;
    padding: 0.5rem 1rem; border-radius: 6px;
    font-size: 0.9rem; font-weight: 500;
    display: flex; align-items: center; gap: 0.3rem;
    cursor: pointer; white-space: nowrap;
    transition: background 0.2s;
  }
  .create-btn:hover { background: #2563eb; }
  .header-right { display: flex; gap: 1rem; }
  .avatar, .avatar-secondary {
    background: #f59e0b; border-radius: 50%; color: #fff; font-weight: 600;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
  }
  .avatar { width: 32px; height: 32px; font-size: 0.8rem; }
  .avatar-secondary { width: 28px; height: 28px; font-size: 0.7rem; }

  /* Second Header */
  .header-row-2 {
    display: flex; align-items: center; justify-content: space-between;
    background: #1e293b; padding: 0.6rem 1.5rem;
    border-bottom: 1px solid #334155;
  }
  .header-actions { display: flex; gap: 1rem; }
  .share-btn {
    background: #3b82f6; color: white; border: none;
    padding: 0.4rem 0.8rem; border-radius: 6px;
    font-size: 0.8rem; font-weight: 500;
    display: flex; align-items: center; gap: 0.3rem;
    cursor: pointer; transition: background 0.2s;
  }
  .share-btn:hover { background: #2563eb; }

  /* Main Layout */
  .main-content { display: flex; flex: 1; overflow: hidden; }

  /* Sidebar */
  .sidebar {
    flex: 0 0 20%; max-width: 20%;
    background: #059669; padding: 1.5rem;
    display: flex; flex-direction: column;
  }
  .inbox-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; }
  .inbox-icon { font-size: 1.5rem; }
  .inbox-header h3 { font-size: 1.3rem; margin: 0; }
  .inbox-cards { flex: 1; margin-bottom: 1rem; }
  .card {
    background: #374151; padding: 0.8rem; border-radius: 8px;
    margin-bottom: 0.8rem; font-size: 0.9rem;
    cursor: grab; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  /* Board Area - Glass Effect */
  .board-area {
    flex: 0 0 80%; max-width: 80%;
    background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
    padding: 1.5rem; overflow: auto;
    position: relative;
  }

  /* Glass Plate Effect */
  .board-area::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 0;
    z-index: 1;
  }

  .board-lists {
    display: flex; gap: 1rem; align-items: flex-start;
    position: relative;
    z-index: 2;
  }

  .list-column {
    background: rgba(55, 65, 81, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    min-width: 280px;
    border-radius: 12px; padding: 1rem;
    display: flex; flex-direction: column; gap: 0.8rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 2;
  }

  .list-header { display: flex; justify-content: space-between; }
  .list-header h4 { font-size: 1rem; margin: 0; }
  .list-menu { color: #9ca3af; cursor: pointer; }
  .list-cards { display: flex; flex-direction: column; gap: 0.6rem; }
  .list-footer { display: flex; justify-content: space-between; align-items: center; }
  .add-card-btn {
    background: transparent; border: none; color: #9ca3af;
    padding: 0.5rem; border-radius: 6px; font-size: 0.9rem;
    cursor: pointer; text-align: left;
  }
  .add-card-btn:hover { background: rgba(255,255,255,0.1); }
  .list-actions { color: #9ca3af; cursor: pointer; }
  
  .add-list-btn {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    padding: 0.8rem 1.2rem; border-radius: 8px;
    font-size: 0.9rem; cursor: pointer; min-width: 200px; margin-top: 1rem;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }
  .add-list-btn:hover { 
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  /* Footer */
  .footer-nav {
    display: flex; background: #1e293b;
    border-top: 1px solid #334155; padding: 0.5rem 0;
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 0.3rem;
    padding: 0.8rem 0.5rem; cursor: pointer;
    color: #94a3b8; transition: all 0.2s;
  }
  .nav-item:hover { color: #f1f5f9; }
  .nav-item.active { color: #3b82f6; border-bottom: 2px solid #3b82f6; }
  .nav-icon { font-size: 1.2rem; }
  .nav-item span { font-size: 0.8rem; font-weight: 500; }
`;

export default Wrapper;
