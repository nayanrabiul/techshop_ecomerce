import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import getError from "../utils/error";
import axios from "axios";
import Image from "next/image";

export default function AddSubCatModal({cat_id}) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [categoryName, setcategvoryvalue] = useState("");

  const formHandler = (e) => {
    setOpen(false);
    e.preventDefault();
    console.log(categoryName);

    try {
      axios.post("/api/admin/subCategory", {
        name: categoryName,
        cat_id: cat_id,
      });
    } catch (e) {
      console.log(e);
    }
    window.location.reload(false);
  };
  return (
    <div>
      <button
        type="button"
        className=" inline-flex w-full justify-center items-center rounded-md borderborder-gray-300 bg-blue-200 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => setOpen(true)}
        ref={cancelButtonRef}
      >
        <Image src="/add.svg" alt="add image" height={30} width={30} />
        Add new Sub-Category
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Enter Sub-Category Name
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={formHandler}>
                            <label>
                              <input
                                type="text"
                                value={categoryName}
                                onChange={(e) =>
                                  setcategvoryvalue(e.target.value)
                                }
                              />
                            </label>

                            <button className="mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
