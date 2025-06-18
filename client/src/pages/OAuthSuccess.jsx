import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let processed = false;

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    if (processed) return; // ⛔️ Prevent double execution
    processed = true;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const id = urlParams.get('id');
    const name = decodeURIComponent(urlParams.get('name') || '');
    const email = urlParams.get('email');

    console.log("🔍 Redirect URL values:");
    console.log({ id, name, email, token });

    if (token && id && name && email) {
      const userPayload = {
        message: 'Login successful (Google)',
        token,
        user: {
          id,
          full_name: name,
          email,
        },
      };

      console.log("✅ Saving to localStorage:", userPayload);

      localStorage.setItem('currentUser', JSON.stringify(userPayload));
      navigate('/dashboard');
    } else {
      alert('⚠️ Google login failed or missing data.');
      navigate('/login');
    }
  }, [navigate]);

  return null;
}
