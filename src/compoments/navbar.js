// import react from "react"


import { BsCart2 } from "react-icons/bs";
import { cartContext } from "./context/context";
import { useContext } from "react";
import { UserContext } from "./context/ucontext";
import { Navigate, Link } from "react-router-dom";
// import Home from "./home";
const Navbar=()=>{
    const globalState=useContext(cartContext)
    const state=globalState.state;
    const { setInfo, info } = useContext(UserContext);
    const user = info?.name;
    const logout = async () => {
        await fetch("http://localhost:8000/logout", {
          method: "POST",
          credentials: "include"
        });
        setInfo(null);
      };
    
      if (info === null) {
        return <Navigate to="/" />;
      }
    return(
        <div className="nav">
<div className="nav1">e-Shop</div>
<div>{user?(<button className="btn" onClick={logout}>Logout</button>):(<button className="btn" onClick='/'>Login</button>)}
<span className="num">{state.length!==0?state.length:null}
                <Link to='/Cart'><BsCart2/> </Link>
                </span>
</div>
        </div>
    )
}
export default Navbar;