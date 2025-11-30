import React, { useEffect, useState, useRef } from "react";
import {
  PageWrapper, Header, HeaderLeft, Container, Card,
  ProfilePhoto, HeaderImage, FieldRow, Label, Value, EditInput,
  TwoCols, SaveBtn, CancelBtn, FieldControls,
  SectionTitle, SmallNote, ProfileInitial, ActionButton, PlaceholderText,
  PermissionSelect, StyledSelect // Import StyledSelect
} from "./style";

// List of locations + timezones
const LOCATION_OPTIONS = [
  { label: "Select Location...", value: "" },
  { label: "India (Kolkata)", value: "Asia/Kolkata" },
  { label: "New York, USA", value: "America/New_York" },
  { label: "London, UK", value: "Europe/London" },
  { label: "Tokyo, Japan", value: "Asia/Tokyo" },
];

// Helper component for the permission dropdown
const PermissionSelector = ({ value, onChange }) => {
  const icon = value === 'anyone' ? '🌐' : '🔒';
  return (
    <PermissionSelect value={value} onChange={onChange}>
      <option value="anyone">{icon} Anyone</option>
      <option value="private">{icon} Only you and admins</option>
    </PermissionSelect>
  );
};

// **THE BIG FIX IS HERE: This component now has its own internal state**
function EditableRow({ fieldKey, labelText, value, onSave, placeholder }) {
  const [isEditing, setIsEditing] = useState(false);
  // This local state holds the input value while editing
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    // Syncs the input value if the original prop changes from outside
    setInputValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(inputValue); // Send the final value back to the parent
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value); // Revert any changes
    setIsEditing(false);
  };
  
  // This will be handled by the parent component's state
  const { permissions, handlePermissionChange } = React.useContext(PermissionContext);

  return (
    <FieldRow>
      <Label>{labelText}</Label>
      <FieldControls>
        {isEditing ? (
          <>
            <EditInput 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder || `Your ${labelText.toLowerCase()}`}
            />
            <SaveBtn onClick={handleSave}>Save</SaveBtn>
            <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
          </>
        ) : (
          <>
            <Value>{value || <PlaceholderText>{placeholder || "Not set"}</PlaceholderText>}</Value>
            <PermissionSelector
              value={permissions[fieldKey]}
              onChange={(e) => handlePermissionChange(fieldKey, e.target.value)}
            />
            <ActionButton onClick={() => setIsEditing(true)}>Edit</ActionButton>
          </>
        )}
      </FieldControls>
    </FieldRow>
  );
}

// Create a context to pass permissions down easily
const PermissionContext = React.createContext();

export default function ManageAccount() {
  // Main data state
  const [profileImage, setProfileImage] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [publicName, setPublicName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [organization, setOrganization] = useState("");
  const [basedIn, setBasedIn] = useState(""); // This is the timezone value e.g. "Asia/Kolkata"
  const [localTime, setLocalTime] = useState("You have not set your time zone yet");
  const [contactEmail, setContactEmail] = useState("");

  // Permissions state
  const [permissions, setPermissions] = useState({
    profilePhoto: "anyone", fullName: "anyone", publicName: "anyone",
    jobTitle: "anyone", department: "anyone", organization: "anyone",
    basedIn: "anyone", localTime: "anyone", contactEmail: "private",
  });

  const profileInputRef = useRef(null);
  const headerInputRef = useRef(null);

  useEffect(() => {
    setFullName("rahul saini");
    setPublicName("rahul saini");
    setContactEmail("r290602s@gmail.com");
  }, []);

  useEffect(() => {
    if (!basedIn) {
      setLocalTime("You have not set your time zone yet");
      return;
    }
    const timer = setInterval(() => {
      try {
        const time = new Date().toLocaleString("en-IN", { timeZone: basedIn, hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: true });
        setLocalTime(time);
      } catch (e) {
        setLocalTime("Invalid time zone");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [basedIn]);

  const handlePermissionChange = (fieldKey, newPermission) => {
    setPermissions(prev => ({ ...prev, [fieldKey]: newPermission }));
  };
  
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return (nameParts[0]?.[0] || "" + (nameParts[1]?.[0] || "")).toUpperCase();
  };

  return (
    <PermissionContext.Provider value={{ permissions, handlePermissionChange }}>
      <PageWrapper>
        <Container>
          <Header>
            <HeaderLeft>
              <h2>Profile and visibility</h2>
              <p>Manage your personal information, and control which information other people see and apps may access.</p>
            </HeaderLeft>
          </Header>

          <Card>
            <SectionTitle>Profile photo and header image</SectionTitle>
            <TwoCols>
              <ProfilePhoto onClick={() => profileInputRef.current?.click()}>
                {profileImage ? <img src={profileImage.url} alt="profile" /> : <ProfileInitial>{getInitials(fullName)}</ProfileInitial>}
              </ProfilePhoto>
              <HeaderImage onClick={() => headerInputRef.current?.click()}>
                {headerImage ? <img src={headerImage.url} alt="header" /> : null}
              </HeaderImage>
            </TwoCols>
            <input ref={profileInputRef} type="file" accept="image/*" style={{ display: "none" }} />
            <input ref={headerInputRef} type="file" accept="image/*" style={{ display: "none" }} />
            <SmallNote>
              Who can see your profile photo? 
              <PermissionSelector
                value={permissions.profilePhoto}
                onChange={(e) => handlePermissionChange('profilePhoto', e.target.value)}
              />
            </SmallNote>
          </Card>

          <Card>
            <SectionTitle>About you</SectionTitle>
            <EditableRow fieldKey="fullName" labelText="Full name" value={fullName} onSave={setFullName} />
            <EditableRow fieldKey="publicName" labelText="Public name" value={publicName} onSave={setPublicName} />
            <EditableRow fieldKey="jobTitle" labelText="Job title" value={jobTitle} onSave={setJobTitle} />
            <EditableRow fieldKey="department" labelText="Department" value={department} onSave={setDepartment} />
            <EditableRow fieldKey="organization" labelText="Organization" value={organization} onSave={setOrganization} />
            
            <FieldRow>
              <Label>Based in</Label>
              <FieldControls>
                <StyledSelect value={basedIn} onChange={(e) => setBasedIn(e.target.value)}>
                  {LOCATION_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </StyledSelect>
                <PermissionSelector value={permissions.basedIn} onChange={(e) => handlePermissionChange('basedIn', e.target.value)} />
              </FieldControls>
            </FieldRow>

            <FieldRow>
              <Label>Local time</Label>
              <FieldControls>
                <Value>{localTime}</Value>
              </FieldControls>
            </FieldRow>
          </Card>
          
          <Card>
            <SectionTitle>Contact</SectionTitle>
            <EditableRow fieldKey="contactEmail" labelText="Email address" value={contactEmail} onSave={setContactEmail} />
          </Card>
        </Container>
      </PageWrapper>
    </PermissionContext.Provider>
  );
}