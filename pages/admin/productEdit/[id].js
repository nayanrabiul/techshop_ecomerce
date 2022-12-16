// this part for texteditor
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AdminLayout from "../../../components/adminLayout";

const getCategoryandSubcategory = (product, categoryes, subcategoryes) => {
  // console.log(product, categoryes, subcategoryes);
  let subCategory = "";
  let category_id = "";
  let subcategory_id = product.subcategory_id;
  let category = "";
  subcategoryes.forEach((element) => {
    if (element.id == product.subcategory_id) {
      subCategory = element.subcategory;
      category_id = element.category_id;
    }
  });
  categoryes.forEach((element) => {
    if (element.id == category_id) {
      category = element.category;
    }
  });
  return { category, subCategory, category_id };
};

export default function Upload({ categoryes, subcategoryes, product }) {
  const [title, settitle] = useState(product.title);
  const [stock, setstock] = useState(product.stock == "true" ? true : false);
  const [price, setprice] = useState(product.price);
  const [descriptions, setdescriptions] = useState(product.descriptions);
  const [product_id, setproduct_id] = useState(product.id);

  const [category, setcategory] = useState(
    getCategoryandSubcategory(product, categoryes, subcategoryes).category
  );
  const [category_id, setcategory_id] = useState(
    getCategoryandSubcategory(product, categoryes, subcategoryes).category_id
  );
  const [subcategory, setsubcategory] = useState(
    getCategoryandSubcategory(product, categoryes, subcategoryes).subCategory
  );
  const [subcategory_id, setsubcategory_id] = useState(product.subcategory_id);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("stock", stock);
    form.append("price", price);
    form.append("descriptions", descriptions);
    form.append("subcategory_id", subcategory_id);
    form.append("product_id", product_id);

    console.log(
      title,
      "\n",
      stock,
      "\n",
      price,
      "\n",
      subcategory_id,
      "\n",
      product.id,
      "\n",
      descriptions
    );
    // for (var i = 0; i < data.file.length; i++) {
    //   form.append(`myImage` + i, data.file[i]);
    // }

    axios
      .put("/api/admin/product/uploadproduct", form)
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        // console.error(error);
      });
  };

  return (
    <AdminLayout>
      <div className="m-4 p-4 bg-emerald-100">
        <h1 className="text-3xl m-3"> Product Details</h1>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="flex flex-col items-center justify-center">
            {/* category */}
            <div className="categoryselect">
              <h2 className="P-2 text-lg m-2 ">Select Category: </h2>
              <select
                onChange={(e) => {
                  setcategory_id(e.target.value);
                  setsubcategory("");
                  setsubcategory_id("");
                }}
              >
                <option value={category_id} selected disabled hidden>
                  {category}
                </option>
                {categoryes.map((option) => (
                  <option value={option.id} key={option}>
                    {option.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="subcategoryselect">
              {category && (
                <div className="locationSelect mt-2 ">
                  <h2 className="P-2 text-lg m-2 ">Select SubCategory: </h2>
                  <select
                    onChange={(e) => {
                      setsubcategory_id(e.target.value);
                    }}
                  >
                    <option value={subcategory_id} selected disabled hidden>
                      {subcategory}
                    </option>
                    {subcategoryes
                      .filter((x) => x.category_id == category_id)
                      .map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.subcategory}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <input
            className="m-3 p-2 rounded-md"
            placeholder="Enter Title"
            defaultValue={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          ></input>

          <div className="m-2 p-2">
            <span className="text-lg">
              {stock == true ? "IN STOCK" : "OUT OF STOCK"}
            </span>
            <span
              className="primary-button ml-2 hover:cursor-pointer	"
              onClick={(e) => {
                setstock(!stock);
              }}
            >
              Change stock
            </span>
          </div>

          <input
            placeholder="Enter Price"
            className="m-3 p-2  rounded-md"
            defaultValue={price}
            type="number"
            onChange={(e) => {
              setprice(e.target.value);
            }}
          />

          <QuillNoSSRWrapper
            className="m-3 p-2  rounded-md"
            defaultValue={descriptions}
            onChange={(e) => {
              setdescriptions(e);
            }}
            placeholder={"Product Descriptions"}
            theme="snow"
          />

          {/* <input
            className="m-1 p-2  "
            type="file"
            {...register("file")}
            accept="image/png, image/jpeg"
            multiple
          ></input>
          {errors.file && <span>{errors.file.message}</span>} */}
          {"File editing added letter"}

          <button
            type="submit"
            className="p-2 m-3 bg-green-300 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  var existingCategory = await fetch(
    https://techshop-ecomerce.vercel.app/api/admin/category`
  );
  const categoryes = await existingCategory.json();

  var existingSubCategory = await fetch(
    https://techshop-ecomerce.vercel.app/api/admin/subCategory`
  );
  const subcategoryes = await existingSubCategory.json();

  const id = context.params.id;
  const data = { id: id };

  let axiosProduct = await axios.post(
    https://techshop-ecomerce.vercel.app/api/user/product/oneProductGet`,
    data
  );

  let product = axiosProduct.data;

  // const images = await String(products.images);
  // const imagesuro = await images.split(",");
  // //console.log(imagesuro, "i");

  return {
    props: {
      categoryes,
      subcategoryes,
      product,
    },
  };
}
