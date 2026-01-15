import React from 'react';
import { useNavigate } from 'react-router-dom';

const Blogs: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Blogs</h1>
            <p>Blog section</p>

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

export default Blogs;