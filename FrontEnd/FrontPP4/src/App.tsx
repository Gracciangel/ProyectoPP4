import { Outlet } from "react-router-dom"
import { NavBar } from "./Components/Navbar/NavBar"
import { Provider } from "./Components/ui/provider"



function App() {
  

  return (
   <Provider>
     <div>
      
      <NavBar/>
      <Outlet/> 
    </div>
   </Provider>
  )
}

export default App
