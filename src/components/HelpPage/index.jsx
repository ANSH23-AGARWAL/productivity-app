import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  FormWrapper,
  Title,
  Label,
  Input,
  TextArea,
  Select,
  FileInput,
  Button,
  SuccessMessage
} from './style';

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueTitle: '',
    description: '',
    category: 'Bug',
    files: []
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: Array.from(e.target.files)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📩 Submitted Help Form Data:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    // In future: API call can be added here
  };

  return (
    <PageContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Help & Support</Title>

        <Label>Your Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <Label>Category</Label>
        <Select name="category" value={formData.category} onChange={handleChange}>
          <option>Bug</option>
          <option>Account Issue</option>
          <option>Feature Request</option>
          <option>Other</option>
        </Select>

        <Label>Issue Title</Label>
        <Input
          type="text"
          name="issueTitle"
          value={formData.issueTitle}
          onChange={handleChange}
          placeholder="Short issue title"
          required
        />

        <Label>Description</Label>
        <TextArea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your issue in detail..."
          required
        />

        <Label>Upload Screenshot(s)</Label>
        <FileInput type="file" name="files" multiple onChange={handleFileChange} />

        <Button type="submit">Submit Issue</Button>

        {submitted && <SuccessMessage>✅ Your issue has been submitted successfully!</SuccessMessage>}
      </FormWrapper>
    </PageContainer>
  );
};

export default HelpPage;
