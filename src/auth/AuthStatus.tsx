import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth?.user) {
    return <p>No estás logueado.</p>;
  }

  return (
    <p>
      Bienvenido {auth.user.access_token}!{' '}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export default AuthStatus;
