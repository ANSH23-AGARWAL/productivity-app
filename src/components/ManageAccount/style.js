import styled from "styled-components";

// --- Main Layout Components ---
export const PageWrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #f9fafb;
  min-height: 100vh;
  color: #1f2937;
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 32px auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 0 16px;
`;

export const Header = styled.header`
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 8px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px 0;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
  }
`;

export const HeaderLeft = styled.div``;

export const Card = styled.section`
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

// --- Image Components ---
export const TwoCols = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const ProfilePhoto = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #0052cc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 0 1px #e5e7eb;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const ProfileInitial = styled.span`
  font-size: 28px;
  font-weight: 600;
  color: white;
`;

export const HeaderImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background-color: #e0eaff;
  border: 1px solid #d1d5db;
  cursor: pointer;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

// --- Field Components ---
export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
  
  & + & { border-top: 1px solid #f3f4f6; }
`;

export const Label = styled.div`
  font-weight: 500;
  color: #374151;
  font-size: 14px;
`;

export const Value = styled.div`
  font-size: 14px;
  color: #1f2937;
  flex-grow: 1; 
`;

export const PlaceholderText = styled.i`
  color: #9ca3af;
`;

export const FieldControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const EditInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  flex-grow: 1;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`;

// **NEW: Styling for the location dropdown**
export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  flex-grow: 1;
  font-size: 14px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  }
`;

// --- Action & Permission Components ---
export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px;
  margin-left: auto; 
  
  &:hover { text-decoration: underline; }
`;

export const SaveBtn = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  &:hover { background: #1d4ed8; }
`;

export const CancelBtn = styled.button`
  background: #e5e7eb;
  color: #4b5563;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  
  &:hover { background: #d1d5db; }
`;

export const PermissionSelect = styled.select`
  font-family: inherit;
  font-size: 14px;
  border: none;
  background-color: transparent;
  color: #6b7280;
  font-weight: 500;
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const SmallNote = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;