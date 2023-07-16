import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles.css"
import { useAuth } from "../../auth/useAuth";
import { useMutation } from "react-query";
import axios from "axios";
import { UserLoginData, UserLoginDataResponse } from "../../auth/AuthContext";
import { API_URL } from "../../consts/consts";


function Login(){

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const from = location.state?.from.pathname || "/";

    const signinMutation = useMutation(
        (data: UserLoginData) => {
            return axios.post(`${API_URL}/auth/login`, data)            
        },
        {
            onSuccess: (data) => {
                const userData: UserLoginDataResponse = {
                    email: data.data.email,
                    access_token: data.data.access_token,
                };
                auth.signin(userData, () => {
                    navigate(from, { replace: true});
                });
            },
        }
    )
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const newUser: UserLoginData = { email, password };        
        signinMutation.mutate(newUser);        
    }

    return(
        <div className="container">
            
            <form onSubmit={handleSubmit}>
                <label>
                    Email: <input name="email" type="email" />
                </label>{' '}
                <br />
                <label>
                    Password: <input name="password" type="password" />
                </label>{' '}
                <br />
                <button type="submit">
                    {signinMutation.isLoading ? 'Cargando...' : 'Login'}
                </button>
                
            </form>
            <Link to="/register">Registrarse</Link>
        </div>
    )
}

export default Login