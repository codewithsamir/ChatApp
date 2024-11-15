"use client";
import React from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import Forgotpassword from "./Forgotpassword";

import Signup from "./Signup";
import Otpconfirm from "./Otpconfirm";


const Loginwrapper = () => {
  const isactive = useSelector((state: any) => state.registeractive);
  
//   console.log(isloginactive);
  return ( 
  <div className="">
    {isactive.isActivelogin && <Login /> } 
    {isactive.isActiveforgotpassword && <Forgotpassword />}
    {isactive.isActivesignup &&  <Signup />}
    {isactive.isActiveotp &&   <Otpconfirm />}
  
  
 
  </div>);
};

export default Loginwrapper;
