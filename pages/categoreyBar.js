import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CategoreyBar() {
  const [categoryes, setcategoryes] = useState([{}]);
  const [subcategoryes, setsubcategoryes] = useState([{}]);
  const [catSubcat, setcatSubcat] = useState([]);

  useEffect(() => {
    (async () => {
      var data1 = await axios(`https://techshopapi.imnayan.xyz/api/admin/category`);
      setcategoryes(data1.data);

      var data2 = await axios(`https://techshopapi.imnayan.xyz/api/admin/subCategory`);
      setsubcategoryes(data2.data);
    })();
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

  return (
    <div className="flex flex-wrap items-center justify-center  sticky top-0">
      {catSubcat.map((x) => (
        <div className="dropdown inline-block relative mx-1" key={x.id}>
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

