import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50 w-full min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
