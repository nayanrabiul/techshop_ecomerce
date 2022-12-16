import Link from "next/link";
import React from "react";
import AdminLayout from "../../components/adminLayout";
import { useRouter } from "next/router";
import axios from "axios";

function OrderDetails({ orders }) {
  let router = useRouter();

  return (
    <AdminLayout>
      <div className="m-4 p-2 flex flex-col">
        <div className="m-2 p-2 flex flex-row">
          <div className=" block w-fit">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Order Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Delivery Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    User
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    className="hover:cursor-pointer"
                    key={order.id}
                    onClick={() => router.push("/admin/order/" + order.id)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {order.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {order.delivery_location}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      {order.user_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  let order = await axios.get(
    `https://techshop-ecomerce.vercel.app/api/admin/order/order`
  );

  let orders = order.data;
  return {
    props: {
      orders,
    },
  };
}

export default OrderDetails;
