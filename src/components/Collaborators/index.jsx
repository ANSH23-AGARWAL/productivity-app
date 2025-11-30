import React, { useState } from "react";
import {
  PageWrapper,
  Sidebar,
  TabButton,
  ContentWrapper,
  Header,
  InviteBtn,
  SectionTitle,
  Card,
  Row,
  SecondaryBtn,
  DangerBtn,
  CopyBadge,
} from "./style";

const Collaborators = () => {
  const [activeTab, setActiveTab] = useState("workspace");
  const [inviteLink, setInviteLink] = useState(
    "https://invite-link-example.com/abc123"
  );
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const disableInvite = () => {
    setInviteLink(null);
    setCopied(false);
  };

  const regenerateInviteLink = () => {
    const newLink =
      "https://invite-link-example.com/" + Math.random().toString(36).slice(2);
    setInviteLink(newLink);
  };

  return (
    <PageWrapper>
      {/* LEFT SIDEBAR */}
      <Sidebar>
        <TabButton
          active={activeTab === "workspace"}
          onClick={() => setActiveTab("workspace")}
        >
          Workspace members (1)
        </TabButton>

        <TabButton
          active={activeTab === "guests"}
          onClick={() => setActiveTab("guests")}
        >
          Guests (0)
        </TabButton>

        <TabButton
          active={activeTab === "requests"}
          onClick={() => setActiveTab("requests")}
        >
          Join requests (0)
        </TabButton>
      </Sidebar>

      {/* RIGHT SECTION */}
      <ContentWrapper>
        <Header>
          <h2>Collaborators</h2>
          <InviteBtn>Invite Workspace Members</InviteBtn>
        </Header>

        {/* WORKSPACE PAGE */}
        {activeTab === "workspace" && (
          <>
            <SectionTitle>Invite members to join you</SectionTitle>

            <Card>
              {inviteLink ? (
                <>
                  <button onClick={handleCopyLink}>Invite with link</button>
                  {copied && <CopyBadge>Copied!</CopyBadge>}
                  <p style={{ marginTop: "10px" }}>{inviteLink}</p>

                  <DangerBtn onClick={disableInvite}>
                    Disable invite link
                  </DangerBtn>
                </>
              ) : (
                <>
                  <button onClick={regenerateInviteLink}>Generate new link</button>
                </>
              )}
            </Card>

            <SectionTitle>Workspace members</SectionTitle>

            <Card>
              <Row>
                <div>
                  <strong>rahul saini</strong>
                  <p>@rahulsaini88 • Admin</p>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <SecondaryBtn>View boards (3)</SecondaryBtn>
                  <DangerBtn>Leave</DangerBtn>
                </div>
              </Row>
            </Card>
          </>
        )}

        {/* GUEST PAGE */}
        {activeTab === "guests" && (
          <>
            <SectionTitle>Guests</SectionTitle>
            <Card>
              <p>There are no guests in this workspace.</p>
            </Card>
          </>
        )}

        {/* JOIN REQUESTS PAGE */}
        {activeTab === "requests" && (
          <>
            <SectionTitle>Join Requests</SectionTitle>
            <Card>
              <p>There are no join requests.</p>
            </Card>
          </>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Collaborators;
