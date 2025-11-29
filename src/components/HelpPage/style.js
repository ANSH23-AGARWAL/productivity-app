import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 40px 20px;
`;

export const FormWrapper = styled.form`
  background: #ffffff;
  width: 100%;
  max-width: 600px;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 10px;
  text-align: center;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
  margin-top: 6px;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

export const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  resize: none;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  background-color: white;
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

export const FileInput = styled.input`
  padding: 8px;
  background-color: #f3f4f6;
  border-radius: 10px;
  cursor: pointer;
`;

export const Button = styled.button`
  background-color: #6366f1;
  color: #fff;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4f46e5;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  margin-top: 12px;
  color: #10b981;
  font-weight: 500;
`;
