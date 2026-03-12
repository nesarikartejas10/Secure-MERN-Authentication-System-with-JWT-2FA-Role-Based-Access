import { FaTableCellsRowUnlock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
  return (
    <>
      <div className="max-w-110 w-full m-2 p-10 border border-gray-300 shadow-xl bg-white shadow-gray-300/50 rounded-xl">
        <FaTableCellsRowUnlock className="text-5xl text-center w-full" />
        <h1 className="text-[28px] text-center font-bold mt-2">
          Login to Your Account
        </h1>
        <p className="text-base text-gray-600 mx-auto mt-2 text-center max-w-72">
          Enter your credentials to access your dashboard
        </p>
        <form>
          <div className="w-full mt-4">
            <Label
              htmlFor="email"
              className="text-sm text-black font-medium mb-1.5 block"
              value="Email"
            />

            <Input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
            />
          </div>

          <div className="w-full mt-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm text-black font-medium mb-1.5 block"
                value="Password"
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              id="password"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
            />
          </div>

          <div className="w-full mt-5">
            <Button
              type="submit"
              className="w-full text-center shadow-lg shadow-blue-600/50 py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-all duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
              title="Sign In"
            />
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link className="text-blue-600 underline">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
