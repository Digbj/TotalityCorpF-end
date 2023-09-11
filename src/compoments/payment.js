import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import { cartContext } from "./context/context";
import { useContext } from "react";
export const Payment=()=>{
    const globalState=useContext(cartContext)
   const state=globalState.state;
   const total=state.reduce((total,item)=>{
    return total+item.itemPrice*item.quantity;
   },0)
    const onToken=(token)=>{
        console.log(token)
    }
    return(
        <div className="a">

             <StripeCheckout
             name='e-Shop'
             currency="inr"
             amount={total*100}
        token={onToken}
        stripeKey="pk_test_51MhimVSFK1PyaPRAfNj2J6L8vsaPazU9D6eOe54r1YMUmsO4zoHsHDIJVr4H2PxWc5WJp8ky1sYm99oLGQrtIySv00yGngPim8"
      />
        </div>
    )
}