import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles.css"
import { useAuth } from "../../auth/useAuth";
import { useMutation } from "react-query";
import axios from "axios";
import { UserLoginData, UserLoginDataResponse } from "../../auth/AuthContext";
import { API_URL } from "../../consts/consts";
import "./styles.css"

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
            <div className="form">
                <div className="wrapper-form">
                    <form onSubmit={handleSubmit}>
                        <h1>Iniciar Sesión</h1>
                        <div className="input-box">
                            <input type="email" name="email" placeholder="Email" required />
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" name="password" placeholder="Contraseña" required/>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <button className="btn" type="submit">
                            {signinMutation.isLoading ? 'Cargando...' : 'Login'}
                        </button>
                        
                        <div className="register-link">
                            <p>¿No tienes una cuenta?
                                <Link to="/register">Registrarse</Link>
                            </p>
                        </div>
                    </form> 
                </div>
                 
            </div>
                   
            
        </div>
    )
}

export default Login