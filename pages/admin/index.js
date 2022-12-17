import React from "react";
import AdminLayout from "../../components/adminLayout";

function Index() {
  return (
    <AdminLayout>
      <p></p>
    </AdminLayout>
  );
}


Index.auth = { adminOnly: true };
export default Index;
