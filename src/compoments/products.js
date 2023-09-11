import React, { useEffect, useContext, useState } from "react";
import axios from 'axios';
import { cartContext } from "./context/context";

const Product = () => {
  const globalState = useContext(cartContext);
  const dispatch = globalState.dispatch;

  const [games, setGames] = useState([]);

  useEffect(() => {
    const apiCall = () => {
      axios
        .get('https://api-ap-south-1.hygraph.com/v2/cler8jt4k17kr01uj7a2f88si/master?query=query%20Items%20%7B%0A%20%20items%20%7B%0A%20%20%20%20createdAt%0A%20%20%20%20id%0A%20%20%20%20itemDesc%0A%20%20%20%20itemImage%0A%20%20%20%20itemPrice%0A%20%20%20%20name%0A%20%20%20%20publishedAt%0A%20%20%20%20updatedAt%0A%20%20%7D%0A%7D%0A')
        .then((response) => {
          setGames(response.data.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    apiCall();
  }, []);

  return (
    <div className="prod">
      {games.map((data, index) => {
        data.quantity = 1;
        return (
          <div className="card" key={index}>
            <img
              className='card1'
              src={data.itemImage.img}
              placeholder='thumbnail'
              alt="pic"
            />
            <h6>{data.name}</h6>
            <div className="utility">
              <span id="price">{'₹' + data.itemPrice}</span>
              <span id="btn">
                <button onClick={() => dispatch({ type: 'ADD', payload: data })}>
                  Add To Cart
                </button>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
