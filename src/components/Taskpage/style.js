import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(135deg, #1e1f23, #2a2c31);
  min-height: 100vh;
  padding: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .card-detail-page {
    display: flex;
    gap: 40px;
    width: 100%;
    max-width: 1200px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  .left-section {
    flex: 1;
  }

  .right-section {
    flex: 1;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 20px;
    overflow-y: auto;
  }

  .card-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
  }

  .button-group button {
    background: #2f3237;
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s;
  }

  .button-group button:hover {
    background: #3b3f44;
  }

  .popup {
    background: #2f3237;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    animation: fadeIn 0.3s ease-in-out;
  }

  .label-palette {
    display: flex;
    gap: 10px;
    margin-top: 8px;
  }

  .label-palette span {
    width: 25px;
    height: 25px;
    border-radius: 6px;
    cursor: pointer;
  }

  .green { background: #00c853; }
  .blue { background: #2979ff; }
  .red { background: #ff1744; }
  .yellow { background: #ffeb3b; }

  .checklist ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }

  .checklist li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 6px 0;
  }

  .checklist .done {
    text-decoration: line-through;
    color: #aaa;
  }

  .task-add {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .task-add input {
    flex: 1;
    padding: 6px;
    border-radius: 6px;
    border: none;
  }

  .task-add button {
    background: #3b3f44;
    border: none;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  .description-section {
    margin-top: 20px;
  }

  textarea {
    width: 100%;
    background: #2f3237;
    border: none;
    color: white;
    padding: 12px;
    border-radius: 8px;
    font-size: 0.95rem;
    resize: vertical;
    min-height: 100px;
  }

  .activity-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .activity-header {
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .comment-btn {
    background: #3b3f44;
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
  }

  .comment {
    background: #2b2e33;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .comment .user {
    color: #66b3ff;
    font-weight: bold;
  }

  .comment .time {
    display: block;
    color: #aaa;
    font-size: 0.8rem;
    margin-top: 4px;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .card-detail-page {
      flex-direction: column;
      gap: 20px;
      padding: 20px;
    }
  }
`;
