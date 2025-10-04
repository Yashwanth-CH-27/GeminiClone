import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const countries = useSelector((store) => store.APIdata.countryCodeData);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleCountryChange = (e) => setCountryCode(e.target.value);
  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);

  const handleLogin = () => {
    if (!countryCode || !phoneNumber) {
      toast.error("Please select a country and enter your phone number!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const phonePattern = /^[0-9]{6,15}$/;
    if (!phonePattern.test(phoneNumber)) {
      toast.error("Invalid phone number format!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    toast.info("Logging in...", {
      position: "top-center",
      autoClose: 1500,
      pauseOnHover: false,
      closeButton: false,
    });

    setTimeout(() => {
      try {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/otp");
      } catch {
        toast.error("Something went wrong! Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }, 1500);
  };

  if (!countries) {
    return <h1 className="text-center mt-10 text-lg">Loading country codes...</h1>;
  }

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto border border-gray-300 my-10 sm:my-16 md:my-20 min-h-[50vh] flex flex-col bg-gray-100 rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
      <div className="flex justify-center items-center flex-1 text-center mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
          ✨ Welcome to Gemini Clone! Please Log In
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-2 sm:p-4">
        <div className="border border-gray-400 rounded-2xl p-2 flex-1 bg-white">
          <select
            value={countryCode}
            onChange={handleCountryChange}
            className="w-full outline-none bg-transparent text-sm sm:text-base"
          >
            <option value="">--Select your Country--</option>
            {countries.map((c) => (
              <option key={c.code} value={c.dialCode}>
                ({c.dialCode}) {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <input
            className="border border-gray-400 p-2 rounded-2xl w-full outline-none text-sm sm:text-base bg-white"
            type="tel"
            placeholder="Enter Your Phone Number"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 transition text-white font-medium p-2 sm:p-3 rounded-2xl w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12 mx-auto my-4 text-sm sm:text-base"
        onClick={handleLogin}
      >
        Login
      </button>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
