import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const countries = useSelector((store) => store.APIdata.countryCodeData);
  const [selectedOption, setSelectedOption] = useState("")
  const [phnNum, setPhnNum] = useState("")
  const navigate = useNavigate();
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleInputChange = (e) => {
    setPhnNum(e.target.value);
  };
  const handleLogin = () => {
    if(!selectedOption  || !phnNum){
        alert("Please Enter Phone Number and select your country code!!")
        return;
    }
    else{
        navigate("/otp", )
    }
  }
  if(!countries) return <h1>Loading...</h1>
  return (
    <div className="">
      <div className="flex">
        <div className="">
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">--Select your Country--</option>
            {countries.map((country) => (
              <option key={country.code} value={country.dialCode}>
                ({country.dialCode}) {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="tel"
            placeholder="Enter Your Phone Number"
            value={phnNum}
            onChange={handleInputChange}
          />
        </div>
      </div>
     <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
