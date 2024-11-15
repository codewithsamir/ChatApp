import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { otpactive } from "@/Ruduxtoolkit/registerSlice";
import { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { useDispatch } from "react-redux";

const Otpconfirm = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const handleChange = (value, index) => {
    let newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Code:", otp);
    // Add your logic here to use the OTP code
  };

  return (
    <div className="main w-full fixed left-0 right-0 top-0 bottom-0 backdrop-blur-md z-50">
      <div className="formcontainer w-full sm:w-[500px] bg-[#2344c6ad] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 px-5 sm:px-10 py-10  rounded-lg backdrop-blur-md">
        <h2 className="text-center font-bold text-white text-3xl mb-5">
            Enter your OTP
        </h2>
        <GiCrossMark className="text-3xl text-white cursor-pointer hover:text-red-500 absolute right-4 top-4" onClick={() => dispatch(otpactive(false))} />
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="text-white" onChange={(e) => handleChange(e.target.value, 0)} />
              <InputOTPSlot index={1} className="text-white" onChange={(e) => handleChange(e.target.value, 1)} />
              <InputOTPSlot index={2} className="text-white" onChange={(e) => handleChange(e.target.value, 2)} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="text-white" onChange={(e) => handleChange(e.target.value, 3)} />
              <InputOTPSlot index={4} className="text-white" onChange={(e) => handleChange(e.target.value, 4)} />
              <InputOTPSlot index={5} className="text-white" onChange={(e) => handleChange(e.target.value, 5)} />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex justify-center mt-5">
            <button type="submit" className="bg-white text-[#2344c6ad] font-bold py-2 px-4 rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otpconfirm;
