import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AdminLayout from "../../components/adminLayout";

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
// Quill editor formats: https://quilljs.com/docs/formats/
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

function Upload({ categoryes, subcategoryes }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [value, setValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const title = data.title;
    const stock = data.stock;
    const price = data.price;
    const descriptions = data.descriptions;

    const form = new FormData();
    form.append("category_id", category);
    form.append("subcategory_id", subcategory);
    form.append("title", title);
    form.append("stock", stock);
    form.append("price", price);
    form.append("descriptions", value);
    for (var i = 0; i < data.file.length; i++) {
      form.append(`myImage`, data.file[i]);
    }

    await axios
      .post(
        "https://techshopapi.imnayan.xyz/api/admin/product/uploadproduct",
        form
      )
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
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <div className="categoryselect">
              <h2 className="P-2 text-lg m-2 text-center">Select Category: </h2>
              <select
                onChange={(e) => {
                  setcategory(e.target.value);
                  setsubcategory("");
                }}
              >
                <option value={""} selected disabled hidden>
                  chose product Category
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
                  <h2 className="P-2 text-lg m-2 text-center">
                    Select SubCategory:{" "}
                  </h2>
                  <select
                    onChange={(e) => {
                      setsubcategory(e.target.value);
                    }}
                  >
                    <option value={""} selected disabled hidden>
                      Product Sub-Category
                    </option>
                    {subcategoryes
                      .filter((x) => x.category_id == category)
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
            {...register("title")}
          ></input>
          {errors.title && <span>{errors.title.message}</span>}

          <div>
            <input
              className="m-3 p-2  rounded-md"
              type="checkbox"
              {...register("stock")}
              id="stock"
            />
            <label htmlFor="stock"> StocK</label>
          </div>

          <input
            placeholder="Enter Price"
            className="m-3 p-2  rounded-md"
            type="number"
            {...register("price")}
          />
          {errors.price && <span>{errors.price.message}</span>}

          <QuillNoSSRWrapper
            className="m-3 p-2  rounded-md"
            value={value}
            onChange={(e) => {
              setValue(e);
            }}
            placeholder={"Product Descriptions"}
            theme="snow"
          />
          {errors.descriptions && <span>{errors.descriptions.message}</span>}

          <input
            className="m-1 p-2  "
            type="file"
            {...register("file")}
            accept="image/png, image/jpeg"
            multiple
          ></input>
          {errors.file && <span>{errors.file.message}</span>}

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
    `https://techshopapi.imnayan.xyz/api/admin/category`
  );
  const categoryes = await existingCategory.json();

  var existingSubCategory = await fetch(
    `https://techshopapi.imnayan.xyz/api/admin/subCategory`
  );
  const subcategoryes = await existingSubCategory.json();

  return {
    props: {
      categoryes,
      subcategoryes,
    },
  };
}

Upload.auth = { adminOnly: true };
export default Upload;
