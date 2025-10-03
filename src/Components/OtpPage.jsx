import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



const OtpPage = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const enteredOTP = useRef("")

     const [generatedOtp] = useState(() => Math.floor(100000 + Math.random() * 900000));
    console.log(generatedOtp)
    const handleValidation = () => {
        if(parseInt(enteredOTP.current.value) === generatedOtp){
            setMessage("OTP verification successfull!!")
            setTimeout( () => {
                navigate("/dashboard")
            }, 2000)
        }
        else{
            setMessage("Incorrect OTP try again!!")
        }
    }
  return (
    <div>
        <div>
            <h1>OTP was sent to your phone number!</h1>
        </div>
        <div>
            <input ref = {enteredOTP} type="number" placeholder="Enter the OTP"/>
        </div>
        <div>
            <button onClick={handleValidation}>Verify</button>
        </div>
        {message && <p className="mt-2">{message}</p>}
    </div>
  )
}

export default OtpPage