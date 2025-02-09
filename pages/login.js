// filepath: /workspaces/traveleasy1/minimal-next-app/pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}