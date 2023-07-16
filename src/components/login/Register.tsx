import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css"
import { useAuth } from "../../auth/useAuth";
import { useMutation } from "react-query";
import { API_URL } from "../../consts/consts";
import axios from "axios";
import { User } from "../../interfaces/interfaces";
import { UserLoginDataResponse } from "../../auth/AuthContext";

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
            <h2>Registrar Nuevo Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email: <input name="email" type="email" />
                </label>{' '}
                <br />
                <label>
                    Password: <input name="password" type="password" />
                </label>{' '}
                <br />
                <label>
                    Nombre: <input name="name" type="text" />
                </label>{' '}
                <br />
                <label>
                    URL Avatar: <input name="avatar" type="url" />
                </label>{' '}
                <br />
                <button type="submit">
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default Register