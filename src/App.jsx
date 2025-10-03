import { Provider } from "react-redux";
import Body from "./Components/Body"
import { useCountrycode } from "./CustomHooks/useCountrycode"



function App() {
  useCountrycode();
 return (
    <Body/>
 )
}

export default App
