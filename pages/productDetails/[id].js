import React, { useState } from "react";
import Layout from "../../components/layout";
import Slideshow from "../../components/slideShow";
import axios from "axios";
import state from "../../utils/state";

import Parser from "html-react-parser";

function Paoduct({ products }) {
  const product = products;
  const img = [];
  const images = products.images.split(",");
  for (let i = 0; i < images.length; i++) {
    img[i] = "/uploaded_images/" + images[i];
  }

  const { dispatch } = state;

  const [quantity, setQuantity] = useState(1);
  return (
    <Layout title={"product Details"}>
      <div className="grid grid-cols-6 gap-16 mt-">
        <div className=" col-span-3 col-start-3 col-end-5">
          <Slideshow images={img}> </Slideshow>
        </div>
      </div>

      <div className=" m-4  shadow-transparent p-2 rounded-md">
        <h1 className="text-3xl">{product.title}</h1>
        <div className="flex flex-row items-center justify-between m-2">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <button
                className="bg-white mr-1 rounded-md p-3"
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
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
              <div className=" rounded-md bg-white text-2xl p-4">
                {quantity}
              </div>
              <button
                className="bg-white mx-1 rounded-md p-3"
                onClick={() => {
                  if (quantity < 30) setQuantity(quantity + 1);
                }}
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
          </div>
          <div className="ml-8 flex flex-row">
            <button
              onClick={() => dispatch({ type: "onAdd", payload: product })}
              className="p-3  bg-green-200 rounded-md"
            >
              Add to cart
            </button>
            <button className="p-4 ml-1 bg-green-200 rounded-md text-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className=" m-4 shadow-inner p-2 rounded-md ">
        <h1 className="text-3xl">Product description</h1>
        <div>{Parser(product.descriptions)}</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const data = { id: id };

  let axiosProduct = await axios.post(
    `http://localhost:3000/api/user/product/oneProductGet`,
    data
  );

  let products = axiosProduct.data;

  // const images = await String(products.images);
  // const imagesuro = await images.split(",");
  // //console.log(imagesuro, "i");

  return {
    props: { products },
  };
}

export default Paoduct;
