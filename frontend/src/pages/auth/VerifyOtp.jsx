import { TbPasswordFingerprint } from "react-icons/tb";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const VerifyOtp = () => {
  return (
    <div className="w-full max-w-110 m-2 p-10 border border-gray-300 shadow-xl bg-white shadow-gray-300/50 rounded-xl">
      <TbPasswordFingerprint className="text-5xl text-center w-full" />
      <h1 className="text-[28px] text-center font-bold mt-2">Verify OTP</h1>

      <p className="text-base text-gray-600 mx-auto mt-2 text-center max-w-72">
        Enter the 6-digit OTP sent to your email
      </p>
      <form>
        <div className="w-full mt-4">
          <Label
            htmlFor="otp"
            className="text-sm text-black font-medium mb-1.5 block"
            value="OTP"
          />

          <Input
            placeholder="OTP"
            id="otp"
            className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
          />
        </div>

        <div className="w-full mt-5">
          <Button
            type="submit"
            className="w-full text-center shadow-lg shadow-blue-600/50 py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-all duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
            title="Verify OTP"
          />
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          Go to Login page{" "}
          <Link className="text-blue-600 underline">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;
