import { useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const parseMemberEmails = (input = '') => {
  if (!input.trim()) {
    return [];
  }
  const emails = input
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email && emailRegex.test(email));
  return Array.from(new Set(emails));
};

export const parseCsvValues = (input = '') =>
  input
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

const useBoardForm = () => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardDueDate, setCardDueDate] = useState(new Date());
  const [cardPriority, setCardPriority] = useState('Normal');
  const [removeMembersInput, setRemoveMembersInput] = useState('');
  const [inviteInput, setInviteInput] = useState('');
  const [inviteEmails, setInviteEmails] = useState([]);

  const resetBoardForm = () => {
    setCardTitle('');
    setCardDescription('');
    setCardDueDate(new Date());
    setCardPriority('Normal');
    setRemoveMembersInput('');
    setInviteInput('');
    setInviteEmails([]);
  };

  const addInviteEmails = (rawInput) => {
    if (!rawInput?.trim()) return;
    const parsed = parseMemberEmails(rawInput);
    if (!parsed.length) return;
    setInviteEmails((prev) => Array.from(new Set([...prev, ...parsed])));
  };

  const handleInviteKeyDown = (event) => {
    if (['Enter', ',', 'Tab'].includes(event.key)) {
      if (event.key !== 'Tab') {
        event.preventDefault();
      }
      if (inviteInput.trim()) {
        addInviteEmails(inviteInput);
        setInviteInput('');
      }
    } else if (event.key === 'Backspace' && !inviteInput && inviteEmails.length) {
      event.preventDefault();
      setInviteEmails((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const handleInviteBlur = () => {
    if (!inviteInput.trim()) return;
    addInviteEmails(inviteInput);
    setInviteInput('');
  };

  const handleRemoveInviteEmail = (email) => {
    setInviteEmails((prev) => prev.filter((item) => item !== email));
  };

  return {
    cardTitle,
    setCardTitle,
    cardDescription,
    setCardDescription,
    cardDueDate,
    setCardDueDate,
    cardPriority,
    setCardPriority,
    removeMembersInput,
    setRemoveMembersInput,
    inviteInput,
    setInviteInput,
    inviteEmails,
    setInviteEmails,
    handleInviteKeyDown,
    handleInviteBlur,
    handleRemoveInviteEmail,
    resetBoardForm,
  };
};

export default useBoardForm;
