import React, { useState } from "react"; 
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/ucontext";

const Home = () => {
  const [log, setLog] = useState(true);
  const {setInfo}=useContext(UserContext);
  const [msg, setMsg] = useState("");
  const [reg, setReg] = useState({
    rname: "",
    remail: "",
    rpassword: "",
    rcpassword: "",
  });
  const [login, setLogin] = useState({
    lemail: "",
    lpassword: "",
  });

  const Login = async (e) => {
    console.log("hello from login");
    if (!login.lemail || !login.lpassword) {
      setMsg("Enter The Credentials");
    } else {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(login), 
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setMsg("");
      console.log(login);
      if (response.status === 200) {
        response.json().then((userInfo) => {
          setInfo(userInfo);
        });
       
        setMsg("Login Successful");
      } else {
        setMsg("Wrong Credentials");
      }
    }
  };

  const Register = async (e) => {
    if (!reg.rname || !reg.remail || !reg.rpassword || !reg.rcpassword) {
      setMsg("Enter the Credentials");
    } else if (reg.rpassword !== reg.rcpassword) {
      setMsg("Password Not Matched");
    } else {
      setMsg("");
      console.log("hello from register");
      e.preventDefault();
      const response = await fetch("http://localhost:8000/reg", {
        method: "POST",
        body: JSON.stringify(reg), 
        headers: { "Content-Type": "application/json" },
      });

      console.log(reg.rname, reg.remail, reg.rpassword);

      if (response.status === 200) {
        setMsg("Registration Successful");
      } else {
        setMsg("Registration Failed");
      }
    }
  };

  if(msg==="Registration Successful"){
    // setLog(true);
  }else if(msg==="Login Successful"){
    return <Navigate to='/products'/>
  }
  return (
    <div className="mainp">
      <h3>Welcome to e-Shop Page</h3>
      {log ? (
        <div className="auth">
          <div className="login">
            <input
              placeholder="E-Mail"
              type="text"
              onBlur={(e) => setLogin({ ...login, lemail: e.target.value })}
            />
            <input
              placeholder="Password"
              type="password"
              onBlur={(e) => setLogin({ ...login, lpassword: e.target.value })}
            />
            <button className="btn" onClick={Login}>
              Login
            </button>
          </div>
          <p>
            New User Click{" "}
            <span
              className="switch"
              onClick={() => {
                setLog(false);
              }}
            >
              Here
            </span>{" "}
          </p>
        </div>
      ) : (
        <div className="auth">
          <div className="regis">
            <input
              placeholder="Name"
              onBlur={(e) => setReg({ ...reg, rname: e.target.value })}
            />
            <input
              placeholder="E-mail"
              type="email"
              onBlur={(e) => setReg({ ...reg, remail: e.target.value })}
            />
            <input
              placeholder="Password"
              type="password"
              onBlur={(e) => setReg({ ...reg, rpassword: e.target.value })}
            />
            <input
              placeholder="Confirm-Password"
              type="password"
              onBlur={(e) => setReg({ ...reg, rcpassword: e.target.value })}
            />
            <button className="btn" onClick={Register}>
              Register
            </button>
          </div>
          <p>
            Already Registered click{" "}
            <span
              className="switch"
              onClick={() => {
                setLog(true);
              }}
            >
              Here
            </span>{" "}
          </p>
        </div>
      )}
      <p>{msg}</p>
    </div>
  );
};
export default Home;
