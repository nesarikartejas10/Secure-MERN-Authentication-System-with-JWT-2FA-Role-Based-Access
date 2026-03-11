import { SiGnuprivacyguard } from "react-icons/si";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full max-w-110 m-2 p-10 border border-gray-300 shadow-xl bg-white shadow-gray-300/50 rounded-xl">
      <SiGnuprivacyguard className="text-5xl text-center w-full" />
      <h1 className="text-[28px] text-center font-bold mt-2">
        Create Your Account
      </h1>
      <p className="text-base text-gray-600 mx-auto mt-2 text-center max-w-72">
        Get started by creating your secure account
      </p>

      <form>
        <div className="w-full mt-4">
          <Label
            htmlFor="username"
            className="text-sm text-black font-medium mb-1.5 block"
            value="Username"
          />

          <Input
            placeholder="Username"
            id="username"
            className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
          />
        </div>

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
          <Label
            htmlFor="password"
            className="text-sm text-black font-medium mb-1.5 block"
            value="Password"
          />

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
            title="Create Account"
          />
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link className="text-blue-600 underline" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
