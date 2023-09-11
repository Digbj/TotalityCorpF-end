import React, { useContext } from "react";
import { cartContext } from "./context/context";
import { Link } from "react-router-dom";
// import { useContext } from "react";
const Cart=()=>{
   const globalState=useContext(cartContext)
   const state=globalState.state;
   const dispatch=globalState.dispatch;

   const total=state.reduce((total,item)=>{
    return total+item.itemPrice*item.quantity;
   },0)
    return(
        <div className="a">
            {state.length===0?<h3>Cart Empty</h3>:<h3>Cart Items</h3>}
            {state.map((item,index)=>{
             
                return(
                    <div key={index} className="product">
                        <div className="div1">
                            <img className="pimage" src={item.itemImage.img} alt='Prd'/>
                        </div>
                        <div className="div2">
                            <p>{item.name}</p>
                            <h5>{'₹' + (item.itemPrice*item.quantity)}</h5>
                            <div className="quantity">
                                <button onClick={()=>dispatch({type:'INCREASE',payload:item})}>+</button>
                              {item.quantity} 
                                <button onClick={()=>{(item.quantity>1)?dispatch({type:'DECREASE',payload:item}):dispatch({type:'REMOVE',payload:item})}}>-</button>
                                
                                
                                
                            </div>
                            <button onClick={()=>dispatch({type:'REMOVE',payload:item})}>Remove</button>
                        </div>

                    </div>
                )
            })}
            {state.length!==0?
            <div className="total">
                <p>Total={total}</p>
             <Link to='/Payment'><button id='pbtn'>Make Payment</button></Link>  
            </div>:null} 

        </div>
    )
}
export default Cart;