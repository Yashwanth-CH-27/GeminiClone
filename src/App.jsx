import Body from "./Components/Body"
import { useCountrycode } from "./CustomHooks/useCountrycode"


function App() {
  useCountrycode();
 return (
  <div>
    <Body/>
  </div>
 )
}

export default App
