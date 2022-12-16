import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { data } from "autoprefixer";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CategoreyBar() {
  const [categoryes, setcategoryes] = useState([{}]);
  const [subcategoryes, setsubcategoryes] = useState([{}]);
  const [catSubcat, setcatSubcat] = useState([]);

  useEffect(() => {
    const dataFetch1 = async () => {
      const data = await (
        await fetch("https://techshop-ecomerce.vercel.app/api/admin/category")
      ).json();

      // set state when the data received
      setcategoryes(data);
    };
    const dataFetch2 = async () => {
      const data = await (
        await fetch(
          `https://techshop-ecomerce.vercel.app/api/admin/subCategory`
        )
      ).json();

      // set state when the data received
      setsubcategoryes(data);
    };

    dataFetch1();
    dataFetch2();
  }, []);

  useEffect(() => {
    if (categoryes && subcategoryes) {
      setcatSubcat(
        categoryes.map((element) => {
          const tem = subcategoryes.filter((x) => element.id === x.category_id);
          return { ...element, subcategory: tem };
        })
      );
    }
  }, [categoryes, subcategoryes]);

  console.log(catSubcat);

  return (
    <div className="flex flex-wrap items-center justify-center  sticky top-0">
      {catSubcat.map((x) => (
        <div className="dropdown inline-block relative mx-1" key={x}>
          <button className="  py-2 px-4  inline-flex items-center">
            <span className="mr-1">{x.category}</span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
            </svg>
          </button>
          <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
            {x.subcategory.map((y) => (
              <li className="" key={y}>
                <Link
                  className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >
                  {y.subcategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
