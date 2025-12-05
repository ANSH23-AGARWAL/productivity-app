import React from 'react';
import { Wrapper, Container, Title, Subtext, HelpList, HelpItem } from './style';
import { FiHelpCircle, FiBookOpen, FiMessageCircle, FiMail } from 'react-icons/fi';

const HelpPage = () => {
    return (
        <Wrapper>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '50%' }}>
                        <FiHelpCircle size={48} color="#34D399" />
                    </div>
                </div>
                <Title>Help & Support</Title>
                <Subtext>
                    Need assistance? Our support team is here to help you get the most out of BoardWise.
                </Subtext>

                <HelpList>
                    <HelpItem onClick={() => alert("Documentation coming soon!")}>
                        <FiBookOpen size={20} color="#34D399" />
                        <div>
                            <h4 style={{ margin: 0, fontWeight: 500, color: '#fff' }}>Documentation</h4>
                            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Read guides and tutorials</span>
                        </div>
                    </HelpItem>
                    <HelpItem onClick={() => alert("Chat support coming soon!")}>
                        <FiMessageCircle size={20} color="#34D399" />
                        <div>
                            <h4 style={{ margin: 0, fontWeight: 500, color: '#fff' }}>Live Chat</h4>
                            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Chat with our support team</span>
                        </div>
                    </HelpItem>
                    <HelpItem onClick={() => window.location.href = "mailto:support@boardwise.com"}>
                        <FiMail size={20} color="#34D399" />
                        <div>
                            <h4 style={{ margin: 0, fontWeight: 500, color: '#fff' }}>Email Support</h4>
                            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Get help via email</span>
                        </div>
                    </HelpItem>
                </HelpList>

            </Container>
        </Wrapper>
    );
};

export default HelpPage;
