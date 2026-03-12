import { useNavigate } from "react-router-dom";

const user = {
  name: "Tejas Nesarikar",
  email: "tejas@example.com",
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, {user.name}! 👋
        </h2>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
            {user.name.charAt(0)}
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Name
            </p>
            <p className="text-base font-semibold text-gray-800 mt-0.5">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Email
            </p>
            <p className="text-base font-semibold text-gray-800 mt-0.5">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
