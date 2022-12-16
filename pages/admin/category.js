import React, { useState, useRef } from "react";

import Image from "next/image";
import Modal from "../../components/modal";
import AdminLayout from "../../components/adminLayout";
import SubCategory from "../../components/subCategory";
import axios from "axios";
import AddSubCatModal from "../../components/addsubcatmodal";

function CategoryScreen({ categoryes, subcategoryes }) {
  const editedCategoryName = useRef(undefined);
  const [editEnable, setEditEnable] = useState(false);

  const [subCategoryArray, setsubCategoryArray] = useState(
    subcategoryes.filter((x) => categoryes[0].id === x.category_id)
  );
  const [categoryName, setCategoryName] = useState(categoryes[0].category);

  const [selectedCategoryId, setselectedCategoryId] = useState(
    categoryes ? categoryes[0].id : null
  );

  function subCategorySelect(cat_id) {
    setselectedCategoryId(cat_id);
    const selectedSubCategoryArray = subcategoryes.filter(
      (x) => cat_id === x.category_id
    );
    setsubCategoryArray(selectedSubCategoryArray);
    const selectedCategoryName = categoryes.filter((x) => cat_id === x.id);
    setCategoryName(selectedCategoryName[0].category);
  }

  console.log(categoryes);
  return (
    <AdminLayout>
      <div className="flex flex-col">
        <div className="max-w-full mx-4 bg-gray-100 flex flex-wrap items-center ">
          {categoryes.map((cat) => {
            <div key={cat.id}>
              <button
                key={cat.id}
                className=" m-2 p-2 bg-green-200 rounded-md active:bg-blue-200 focus-within:bg-blue-400"
                onClick={() => subCategorySelect(cat.id)}
              >
                {cat.category}a
              </button>
            </div>;
          })}
          <Modal></Modal>
        </div>

        <div className="max-w-full bg-gray-100 h-96 m-4 rounded-md">
          <div className="max-w-full  bg-gray-300 m-4 rounded-md flex flex-row items-center justify-between">
            {!editEnable && (
              <h2 className="font-medium leading-tight text-2xl p-3 rounded-md  self-center">
                {categoryName}
              </h2>
            )}
            <div>
              {editEnable && (
                <form
                  className="ml-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(editedCategoryName.current.value);
                    if (!editedCategoryName.current.value) {
                      alert("Enter A Value");
                    } else {
                      try {
                        axios.put("/api/admin/category", {
                          name: categoryName,
                          newName: editedCategoryName.current.value,
                        });
                        setEditEnable(false);
                        window.location.reload(false);
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  }}
                >
                  <input
                    name={"updatedcategorname"}
                    placeholder="Enter New Category name"
                    ref={editedCategoryName}
                  ></input>
                  <button className="m-2 p-2 bg-green-300">Submit</button>
                </form>
              )}
            </div>

            <div className="flex flex-row">
              <button
                className=" m-2 p-2 py-1  rounded-md flex flex-row items-center bg-green-300"
                onClick={() => setEditEnable(true)}
              >
                <Image src="/edit.svg" alt="add image" height={25} width={25} />
                <span>Edit</span>
              </button>
              <button
                className=" m-2 p-2  rounded-md flex flex-row items-center bg-red-600"
                onClick={(e) => {
                  {
                    e.preventDefault();
                    try {
                      console.log(categoryName);

                      axios.delete("/api/admin/category", {
                        data: {
                          name: categoryName,
                        },
                      });

                      window.location.reload(false);
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              >
                <Image
                  src="/delete.svg"
                  alt="add image"
                  height={30}
                  width={30}
                />
                <span>Delete</span>
              </button>
            </div>
          </div>
          <div>
            <div className="md:px-32 w-full">
              <div className="shadow overflow-hidden rounded  border-gray-200 mx-4 ">
                <AddSubCatModal cat_id={selectedCategoryId}></AddSubCatModal>
                <SubCategory subCategoryArray={subCategoryArray}></SubCategory>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  var existingCategory = await fetch(
    `https://techshop-ecomerce.vercel.app/api/admin/category`
  );
  var existingSubCategory = await fetch(
    `https://techshop-ecomerce.vercel.app/api/admin/subCategory`
  );
  const categoryes = await existingCategory.json();
  const subcategoryes = await existingSubCategory.json();

  //console.log(categoryes);
  return {
    props: {
      categoryes,
      subcategoryes,
    },
  };
}

CategoryScreen.auth = { adminOnly: true };
export default CategoryScreen;
