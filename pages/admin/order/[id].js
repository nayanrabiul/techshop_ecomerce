import React, { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../../components/layout";
import axios from "axios";

function OrderHandle({ order }) {
  const [total_price, setTotal_price] = useState(0);
  const [extrainformation, setextrainformation] = useState(
    order.extra_information
  );
  const [cartItems, setcartItems] = useState(JSON.parse(order.productdetails));
  const [shippingAddress, setshippingAddress] = useState(
    JSON.stringify(order.delivery_location)
  );
  const [status, setstatus] = useState(order.status);

  useEffect(() => {
    var tem = 0;
    for (let i = 0; i < cartItems.length; i++) {
      tem = tem + cartItems[i].price * cartItems[i].qty;
    }
    setTotal_price(tem);
  }, [cartItems]);

  const handleOrder = () => {
    const order_id = order.id;
    const data = { order_id };
    axios.put("/api/admin/order/order", data);
    window.location.reload(false);
  };

  const myLoader = ({ src, width, quality }) => {
    const image_base_url = process.env.IMAGE_BASE_URL;
    return `${image_base_url}/${src}?w=${width}&q=${quality || 75}`;
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
                  src={`https://techshopapi.imnayan.xyz/public/${
                    product.images.split(",")[0]
                  }`}
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

            <h2>{shippingAddress}</h2>
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

            {extrainformation}
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

  let order = await axios.get(
    `https://techshopapi.imnayan.xyz/api/admin/order/oneOrderGet?id=${id}`
  );
  order = order.data;

  return {
    props: { order },
  };
}

OrderHandle.auth = { adminOnly: true };
export default OrderHandle;
