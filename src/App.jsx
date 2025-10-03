import { Provider } from "react-redux";
import Body from "./Components/Body"
import { useCountrycode } from "./CustomHooks/useCountrycode"
import appStore from "./utils/appStore";


function App() {
  useCountrycode();
 return (
  <Provider store = {appStore}>
    <Body/>
  </Provider>
 )
}

export default App
