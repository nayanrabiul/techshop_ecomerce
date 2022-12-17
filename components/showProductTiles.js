import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import state from "../utils/state";

export function ShowProductTiles({ products }) {
  const { useStoreState, dispatch } = state;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Items
        </h2>

        <div className=" grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} onClick={() => {}} className="group relative">
              <div className="h-404 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                <Link href={`/productDetails/${product.id}`}>
                  <Image
                    src={`https://techshopapi.imnayan.xyz/public/${
                      product.images.split(",")[0]
                    }`}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    height={160}
                    width={160}
                  />
                </Link>
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div>
                  <Link href={`/productDetails/${product.id}`}>
                    <h3 className="text-xl font-bold text-gray-700">
                      {product.title}
                    </h3>
                  </Link>

                  <p>{product.price}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ৳ {product.price}
                </p>
                <button
                  onClick={() => dispatch({ type: "onAdd", payload: product })}
                  className="p-2 m-2 bg-orange-400 rounded-md active:bg-orange-600"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ShowProductTiles.auth = { adminOnly: false };
export default ShowProductTiles;
