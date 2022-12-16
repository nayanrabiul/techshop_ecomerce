import React, { useEffect, useState } from "react";
import Image from "next/image";
import state from "../../../utils/state";
import Layout from "../../../components/layout";
import Shipping from "../../../components/shipping";
import { useSession } from "next-auth/react";
import axios from "axios";

function OrderHandle({ order }) {
  const { data: session } = useSession();

  const [total_price, setTotal_price] = useState(0);
  const [extrainformation, setextrainformation] = useState(0);

  const cartItems = JSON.parse(order.productdetails);
  const shippingAddress = JSON.parse(order.extra_information);
  const status =order.status;

  useEffect(() => {
    var tem = 0;
    for (let i = 0; i < cartItems.length; i++) {
      tem = tem + cartItems[i].price * cartItems[i].qty;
    }
    setTotal_price(tem);
  }, [shippingAddress, cartItems]);

  const handleOrder = () => {
    const order_id = order.id;
    const data = { order_id };
    axios.put("/api/admin/order/order", data);
    window.location.reload(false);
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
              <div className="flex flex-row items-center">
                <Image
                  className="m-2"
                  src={"/uploaded_images/" + product.images.split(",")[0]}
                  height={65}
                  width={65}
                  alt={"product order page image"}
                ></Image>
                <h3 className="m-2">{product.title}</h3>
              </div>

              <div className="flex flex-row">
                <div className=" rounded-md  text-xl p-4">{product.qty}</div>
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
            <h2 className="text-2xl text-center">Shipping address</h2>

            <h2>
              {shippingAddress[0].upozila +
                " -" +
                shippingAddress[0].district +
                " " +
                shippingAddress[0].division}
            </h2>
          </div>

          {/* payment */}
          <div>
            <div className="p-4 m-4 shadow rounded-md h-min ">
              <h2 className="text-2xl ">Selected Payment Method</h2>
              Cash on Delivery
            </div>
          </div>
          <div className="p-2 m-4 shadow rounded-md h-min col-span-2 text-cente">
            <h2 className="text-2xl text-center">Information around Shiping</h2>

            {JSON.parse(order.delivery_location)}
          </div>
          {status == "confirmed" ? (
            <button
              className="m-4 p-2 w-full bg-green-500 col-span-2"
              onClick={() => {}}
            >
              OrderConfirm 
            </button>
          ) : (
            <button
              className="m-4 p-2 w-full bg-green-500 col-span-2"
              onClick={() => handleOrder()}
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const data = { id: id };

  let order = await axios.post(
    `http://localhost:3000/api/admin/order/oneOrderGet`,
    data
  );
  order = order.data;


  return {
    props: { order },
  };
}

export default OrderHandle;
