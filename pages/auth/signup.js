// filepath: /workspaces/traveleasy1/minimal-next-app/pages/signup.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        try {
            await axios.post('/api/signup', { username, password });
            router.push('/login');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}