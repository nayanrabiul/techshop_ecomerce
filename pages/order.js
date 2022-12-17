import React, { useEffect, useState } from "react";
import Image from "next/image";
import state from "../utils/state";
import Layout from "../components/layout";
import Shipping from "../components/shipping";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Order() {
  const { data: session } = useSession();
  const { dispatch, useStoreState } = state;
  const [total_price, setTotal_price] = useState(0);
  const [extrainformation, setextrainformation] = useState(0);

  const cartItems = useStoreState("cartItems");
  const shippingAddress = useStoreState("shippingAddress");

  useEffect(() => {
    var tem = 0;
    for (let i = 0; i < cartItems.length; i++) {
      tem = tem + cartItems[i].price * cartItems[i].qty;
    }
    setTotal_price(tem);
  }, [cartItems]);

  const handleOrder = () => {
    const user_id = session.user.id;
    const data = { cartItems, shippingAddress, extrainformation, user_id };
    console.log(
      cartItems,
      shippingAddress,
      extrainformation,
      user_id,
      "aaaaaaaa"
    );
    axios.post("https://techshopapi.imnayan.xyz/api/admin/order/order", data);
  };

  return (
    <Layout title={"order"}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* this is ordered product details and ammount and cupon */}
        <div>
          {cartItems.map((product) => (
            <div
              className="p-2 m-4 shadow rounded-md flex flex-row items-center justify-between"
              key={product.id}
            >
              <div className="flex flex-row items-center" key={product.id}>
                <Image
                  key={product.id}
                  className="m-2"
                  src={`https://techshopapi.imnayan.xyz/public/${
                    product.images.split(",")[0]
                  }`}
                  height={65}
                  width={65}
                  alt={"product order page image"}
                ></Image>
                <h3 className="m-2" key={product.id}>
                  {product.title}
                </h3>
              </div>

              <div className="flex flex-row">
                <button
                  className=" rounded-md p-2"
                  onClick={() =>
                    dispatch({ type: "onRemove", payload: product })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
                <div className=" rounded-md  text-xl p-4">{product.qty}</div>
                <button
                  className=" rounded-md p-2"
                  onClick={() => dispatch({ type: "onAdd", payload: product })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-lg m-4">
                Price:{" "}
                <span className="text-2xl"> {product.price * product.qty}</span>
              </div>
            </div>
          ))}

          <p className="text-right  m-4 p-2 mx-7 text-2xl">
            Total price: {total_price}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* shipping */}
          <div className="p-2 m-4 shadow rounded-md h-min ">
            <h2 className="text-2xl text-center">Select Shipping address</h2>
            <Shipping></Shipping>

            {/* setshippingAddress={setshippingAddress} shippingAddress={shippingAddress} */}
          </div>

          {/* payment */}
          <div>
            <div className="p-4 m-4 shadow rounded-md h-min ">
              <h2 className="text-2xl ">Select Payment Method</h2>
              <input
                className="mx-4 items-center"
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="true"
              />
              <label for="vehicle1" className="m-1">
                Cash on Delivery
              </label>
            </div>
            <div className="p-4 m-4 shadow rounded-md h-min ">
              <h2 className="text-2xl ">Provide Extra information</h2>
              <input
                className="mx-4 items-center"
                type="text"
                id="vehicle1"
                onChange={(e) => setextrainformation(e.target.value)}
              />
            </div>
          </div>

          <button
            className="m-4 p-2 w-full bg-green-500 col-span-2"
            onClick={() => handleOrder()}
          >
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
}
