import { useAuth } from "../../auth/useAuth";
import "./profile.css"


function Profile(){
    const auth = useAuth();

    return(
        
        <>
            <div className="container">Perfil</div>
            <div className="card-profile">
                <div className="image">
                    <img src={auth?.userInfo?.data?.avatar} />
                    
                </div>
                <div className="info">
                    <h3>
                        {auth?.userInfo?.data?.name}
                    </h3>
                    <div>
                        Email: {auth?.userInfo?.data?.email}
                    </div>
                    
                </div>
            </div>
            

        </>
    )
}

export default Profile;