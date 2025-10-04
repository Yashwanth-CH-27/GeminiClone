import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const countries = useSelector((store) => store.APIdata.countryCodeData);
  const [selectedOption, setSelectedOption] = useState("");
  const [phnNum, setPhnNum] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setPhnNum(e.target.value);
  };

  const handleLogin = () => {
    if (!selectedOption || !phnNum) {
      alert("Please Enter Phone Number and select your country code!!");
      return;
    } else {
      navigate("/otp");
    }
  };

  if (!countries) return <h1 className="text-center mt-10 text-lg">Loading...</h1>;

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto border border-gray-300 my-10 sm:my-16 md:my-20 min-h-[50vh] flex flex-col bg-gray-100 rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-center items-center flex-1 text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
          ✨ Welcome to Gemini Clone! Please Log In
        </h1>
      </div>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-2 sm:p-4">
        <div className="border border-gray-400 rounded-2xl p-2 flex-1 bg-white">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="w-full outline-none bg-transparent text-sm sm:text-base"
          >
            <option value="">--Select your Country--</option>
            {countries.map((country) => (
              <option key={country.code} value={country.dialCode}>
                ({country.dialCode}) {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <input
            className="border border-gray-400 p-2 rounded-2xl w-full outline-none text-sm sm:text-base bg-white"
            type="tel"
            placeholder="Enter Your Phone Number"
            value={phnNum}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 transition text-white font-medium p-2 sm:p-3 rounded-2xl w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12 mx-auto my-4 text-sm sm:text-base"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
