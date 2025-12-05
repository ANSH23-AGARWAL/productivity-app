import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #0A0F1F; /* Deep Dark BG */
  padding: 40px 20px;
  color: #FFFFFF;
`;

export const FormWrapper = styled.form`
  background: #162032; /* Dark Card BG */
  width: 100%;
  max-width: 600px;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #1F2940;

  /* Optional top gradient strip */
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4452FE, #2FAFCC, #9B5CFF);
  }
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 0.5px;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #A0AEC0; /* Secondary Text */
  margin-top: 6px;
  font-size: 0.95rem;
`;

export const Input = styled.input`
  padding: 12px;
  background-color: #1A2333; /* Dark Input BG */
  border: 1px solid #2D3748;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  color: #FFFFFF;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4452FE; /* Accent */
    box-shadow: 0 0 0 3px rgba(68, 82, 254, 0.2);
    background-color: #162032;
  }
  &::placeholder {
    color: #4A5568;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  background-color: #1A2333;
  border: 1px solid #2D3748;
  border-radius: 10px;
  font-size: 15px;
  color: #FFFFFF;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4452FE;
    box-shadow: 0 0 0 3px rgba(68, 82, 254, 0.2);
    background-color: #162032;
  }
  &::placeholder {
    color: #4A5568;
  }
`;

export const Select = styled.select`
  padding: 12px;
  background-color: #1A2333;
  border: 1px solid #2D3748;
  border-radius: 10px;
  font-size: 15px;
  color: #FFFFFF;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4452FE;
    box-shadow: 0 0 0 3px rgba(68, 82, 254, 0.2);
  }
`;

export const FileInput = styled.input`
  padding: 10px;
  background-color: #1A2333;
  border: 1px dashed #2D3748;
  border-radius: 10px;
  cursor: pointer;
  color: #A0AEC0;
  
  &:hover {
    border-color: #4452FE;
    color: #FFFFFF;
  }
`;

export const Button = styled.button`
  background-color: #4452FE; /* Accent Blue */
  color: #fff;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(68, 82, 254, 0.3);

  &:hover {
    background-color: #3545CC; /* Slightly darker */
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(68, 82, 254, 0.4);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  margin-top: 12px;
  color: #2FAFCC; /* Teal Accent for success */
  font-weight: 500;
  background: rgba(47, 175, 204, 0.1);
  padding: 10px;
  border-radius: 8px;
`;
