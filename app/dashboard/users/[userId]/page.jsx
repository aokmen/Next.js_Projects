import GoBackButton from "@/components/GoBackButton";
import React from "react";

const UserDetail = ({ params }) => {
  const { userId } = params;
  return (
    <div className="container mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold underline text-center">
        Hello, User {userId}
      </h1>
      <GoBackButton />
    </div>
  );
};

export default UserDetail;
