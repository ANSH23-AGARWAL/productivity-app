import styled from 'styled-components';

export const BoardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(145deg, #0a1e46, #132f62, #1d427a);
  font-family: 'Segoe UI', 'Inter', Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border-radius: 0 0 1.5rem 1.5rem;
`;

export const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: bold;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const HeaderButton = styled.button`
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 500;
  color: #444;
  transition: background 0.2s;
  &:hover {
    background: #e0e0e0;
    color: #222;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

export const List = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 1.5rem;
  min-width: 280px;
  display: flex;
  flex-direction: column;
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const ListTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

export const ThreeDot = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: #888;
  padding: 4px;
  border-radius: 50%;
  &:hover {
    background: #eee;
    color: #333;
  }
`;

export const Menu = styled.div`
  position: absolute;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TaskCard = styled.div`
  background: #f6f6f6;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  color: #444;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;

export const AddTaskBtn = styled.button`
  background: #e0e7ff;
  color: #6366f1;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #c7d2fe;
    color: #4338ca;
  }
`;

export const CreateListBtn = styled.button`
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(99,102,241,0.12);
  transition: background 0.2s;
  &:hover {
    background: #4338ca;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
`;

export const SlideInPanel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  padding: 2rem;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease forwards;
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const CenteredModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  padding: 2rem;
  z-index: 1200;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
`;