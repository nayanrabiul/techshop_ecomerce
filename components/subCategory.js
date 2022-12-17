import React, { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import EditSubCategoryModal from "./editSubCategoryModal";

export default function SubCategory({ subCategoryArray }) {
  const [editEnable, setEditEnable] = useState(true);
  const editedCategoryName = useRef(undefined);

  return (
    <div>
      
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-10/12 text-left py-3 px-4 uppercase font-semibold text-sm ">
              Sub Category
            </th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
              Edit
            </th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
              Delete
            </th>
          </tr>
        </thead>

        {subCategoryArray.map((x) => (
          <tbody className="text-gray-700" key={x.id}>
            <tr>
              <td className="w-1/3 text-left py-3 px-4">{x.subcategory}</td>
              <td className="w-1/3 text-left py-3 px-4">
   
                <EditSubCategoryModal
                  subcategory={x.subcategory}
                ></EditSubCategoryModal>
              </td>
              <td className="text-left py-3 px-4">
                <button
                  className="   rounded-md flex flex-row items-center bg-red-600"
                  onClick={(e) => {
                    {
                      e.preventDefault();
                      try {
              

                        axios.delete("/api/admin/subCategory", {
                          data: {
                            name: x.subcategory,
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
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
