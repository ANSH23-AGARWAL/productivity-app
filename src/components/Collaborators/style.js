import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f6f7f9;
`;

export const Sidebar = styled.div`
  width: 260px;
  background: #fff;
  border-right: 1px solid #e5e5e5;
  padding: 20px;
`;

export const TabButton = styled.button`
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 10px;
  border-radius: 8px;
  text-align: left;
  background: ${({ active }) => (active ? "#e9f2ff" : "#fff")};
  border: 1px solid ${({ active }) => (active ? "#4c9aff" : "#ddd")};
  color: ${({ active }) => (active ? "#0052cc" : "#333")};
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: #f4f5f7;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px 40px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InviteBtn = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 15px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #006ae0;
  }
`;

export const SectionTitle = styled.h3`
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 18px;
  color: #222;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #eee;
  margin-bottom: 25px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SecondaryBtn = styled.button`
  background: #f1f3f5;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

export const DangerBtn = styled.button`
  background: #ff4d4f;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #d9363e;
  }
`;

export const CopyBadge = styled.span`
  display: inline-block;
  margin-left: 12px;
  color: #2ecc71;
  font-weight: 600;
`;
