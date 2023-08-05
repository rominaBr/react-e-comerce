import empty from "../../assets/empty-cart.png"

function EmptyCart(){
    return(
        <>
            <div className="container">
                <img src={empty} alt="" />
            </div>
            
        </>
    )
}

export default EmptyCart