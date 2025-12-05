import styled from "styled-components";

// --- Main Layout Components ---
export const PageWrapper = styled.div`
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: #0A0F1F; /* Deep Dark BG */
  min-height: 100vh;
  color: #FFFFFF;
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
  border-bottom: 1px solid #1F2940;
  margin-bottom: 8px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #FFFFFF;
    letter-spacing: 0.5px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #A0AEC0; /* Secondary Text */
  }
`;

export const HeaderLeft = styled.div``;

export const Card = styled.section`
  background: #162032; /* Dark Card BG */
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #1F2940;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;

  /* Optional gloss effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #4452FE, #9B5CFF);
  }
`;

export const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
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
  background: linear-gradient(135deg, #4452FE, #2FAFCC);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid #162032; /* Match card bg for integrated look */
  box-shadow: 0 0 0 2px #4452FE;

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
  border-radius: 12px;
  background-color: #1A2333;
  border: 1px solid #2D3748;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.2s;

  &:hover {
    border-color: #4452FE;
  }

  img { width: 100%; height: 100%; object-fit: cover; }
`;

// --- Field Components ---
export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
  
  & + & { border-top: 1px solid #1F2940; }
`;

export const Label = styled.div`
  font-weight: 500;
  color: #A0AEC0;
  font-size: 14px;
`;

export const Value = styled.div`
  font-size: 14px;
  color: #FFFFFF;
  flex-grow: 1; 
`;

export const PlaceholderText = styled.i`
  color: #718096;
`;

export const FieldControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const EditInput = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2D3748;
  flex-grow: 1;
  font-size: 14px;
  background-color: #1A2333; /* Dark Input */
  color: #FFFFFF;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4452FE;
    box-shadow: 0 0 0 2px rgba(68, 82, 254, 0.25);
    background-color: #162032;
  }
`;

// **NEW: Styling for the location dropdown**
export const StyledSelect = styled.select`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2D3748;
  flex-grow: 1;
  font-size: 14px;
  background-color: #1A2333;
  color: #FFFFFF;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4452FE;
    box-shadow: 0 0 0 2px rgba(68, 82, 254, 0.25);
  }
  
  option {
    background-color: #162032;
    color: #FFFFFF;
  }
`;

// --- Action & Permission Components ---
export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #4452FE; /* Accent */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  margin-left: auto; 
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(68, 82, 254, 0.1);
    text-decoration: none;
  }
`;

export const SaveBtn = styled.button`
  background: #4452FE;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(68, 82, 254, 0.3);
  transition: all 0.2s;

  &:hover { 
    background: #3545CC;
    transform: translateY(-1px);
  }
`;

export const CancelBtn = styled.button`
  background: transparent;
  color: #A0AEC0;
  border: 1px solid #2D3748;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s;
  
  &:hover { 
    background: #1F2940;
    color: #FFFFFF;
  }
`;

export const PermissionSelect = styled.select`
  font-family: inherit;
  font-size: 14px;
  border: none;
  background-color: transparent;
  color: #A0AEC0;
  font-weight: 500;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1F2940;
    color: #FFFFFF;
  }
  option {
    background-color: #162032;
    color: #FFFFFF;
  }
`;

export const SmallNote = styled.div`
  font-size: 14px;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 6px;
`;
