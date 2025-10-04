import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpPage = () => {
  const navigate = useNavigate();
  const enteredOTP = useRef("");

  const [generatedOtp] = useState(() =>
    Math.floor(100000 + Math.random() * 900000)
  );
  console.log("Generated OTP:", generatedOtp);

  const handleValidation = () => {
    if (parseInt(enteredOTP.current.value) === generatedOtp) {
      toast.success("OTP verification successful!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      toast.error("Incorrect OTP, try again!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto my-10 sm:my-16 md:my-20 bg-gray-100 rounded-2xl shadow-md min-h-[50vh] p-4 sm:p-6 md:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
          OTP was sent to your phone number!
        </h1>
      </div>

      <div className="w-full sm:w-10/12 md:w-8/12">
        <input
          ref={enteredOTP}
          type="number"
          placeholder="Enter the OTP"
          className="w-full border border-gray-400 rounded-xl p-2 sm:p-3 text-center text-base sm:text-lg outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      <div className="my-6 sm:my-8">
        <button
          onClick={handleValidation}
          className="bg-blue-500 hover:bg-blue-600 transition text-white font-medium p-2 sm:p-3 rounded-xl w-32 sm:w-40"
        >
          Verify
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OtpPage;
