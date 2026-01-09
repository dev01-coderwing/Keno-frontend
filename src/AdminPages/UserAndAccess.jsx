import React from "react";
import UserAccessSection from "../Admin/UserAndAccess/UserAccessSection";
import AdminLayout from "../Layout/AdminLayout";

const UserAndAccess = () => {
  return (
    <AdminLayout title={"Virtual And Access"}>
      <UserAccessSection />
    </AdminLayout>
  );
};

export default UserAndAccess;
