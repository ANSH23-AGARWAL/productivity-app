import React from 'react';
import { Wrapper, Container, Title, Subtext, UnimplementedBox } from './style';
import { FiSettings } from 'react-icons/fi';

const ManageAccount = () => {
    return (
        <Wrapper>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '50%' }}>
                        <FiSettings size={48} color="#60A5FA" />
                    </div>
                </div>
                <Title>Manage Account</Title>
                <Subtext>
                    Update your profile details, change your password, and manage your subscription preferences.
                </Subtext>
                <UnimplementedBox>
                    <p>⚠️ This feature is currently under development.</p>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748B' }}>
                        We're working hard to bring you the best experience. Check back soon!
                    </p>
                </UnimplementedBox>
            </Container>
        </Wrapper>
    );
};

export default ManageAccount;
