import { useMutation } from "react-query";
import { useAuth } from './useAuth';
import { useLocation, useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginMutation = useMutation(
    (data) => {
      return fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
    },
    {
      onSuccess: (userData) => {
        auth.login(userData, () => {
          navigate(from, { replace: true });
        });
      },
    },
    {
      onError: () => {
        console.log("Usuario o clave incorrectos")
      },
    }
  );

  return loginMutation;
}

export default useLogin;