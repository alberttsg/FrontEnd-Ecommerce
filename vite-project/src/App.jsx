import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { UserProvider } from "./context/UserContext/UserState";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
