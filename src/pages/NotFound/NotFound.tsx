import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Not Found</h1>
            <p>Not Found Page</p>

            <section style={{ marginTop: '20px' }}>
                <h3>Our Mission</h3>
                <p>
                    We aim to provide a seamless user experience by leveraging the
                    speed of Vite and the powerful routing capabilities of React Router.
                </p>
            </section>

            <div style={{ marginTop: '30px' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor: '#646cff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    ← Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;