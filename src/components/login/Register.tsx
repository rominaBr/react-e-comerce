import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css"
import { useAuth } from "../../auth/useAuth";
import { useMutation } from "react-query";
import { API_URL } from "../../consts/consts";
import axios from "axios";
import { User } from "../../interfaces/interfaces";
import { UserLoginDataResponse } from "../../auth/AuthContext";
import "./styles.css"

function Register(){

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const from = location.state?.from.pathname || "/";

    const signinMutation = useMutation(
        (data: User) => {
            return axios.post(`${API_URL}/users`, data)            
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
        const name = formData.get('name') as string;
        const avatar = formData.get('avatar') as string;
        
        const newUser: User = {
            email, password, name, avatar,
        };        
        signinMutation.mutate(newUser);        
    }


    return(
        <div className="container">
            <div className="form">
                <div className="wrapper-form">
                <h2>Registrar Nuevo Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                       <input name="email" type="email" placeholder="Email" required/>
                       <i className="fa-solid fa-envelope"></i>
                    </div>
                    
                    <div className="input-box">
                        <input name="password" type="password" placeholder="Contraseña" required/>
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    
                    <div className="input-box">
                        <input name="name" type="text" placeholder="Nombre" required/>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    
                    <div className="input-box">
                        <input name="avatar" type="url" placeholder="URL Avatar" required/>
                        <i className="fa-solid fa-image"></i>
                    </div>                 
                    <button className="btn" type="submit">
                        Registrarse
                    </button>
                </form>
                </div>
            </div>
            
        </div>
    )
}

export default Register