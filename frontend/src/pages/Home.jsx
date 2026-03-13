import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    toast.success("Login successfull! 🎉");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">
            Enterprise Auth System
          </h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center mt-32 px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Welcome Back! 👋
        </h2>
        <p className="text-gray-500 mt-3 text-center text-base">
          You are successfully logged in.
        </p>
      </div>
    </div>
  );
};

export default Home;
