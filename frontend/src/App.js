import "./App.css";
import Homepage from "./Components/pages/Homepage";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addpost from "./Components/pages/Addpost";
import Registerpage from "./Components/pages/Registerpage";
import Loginpage from "./Components/pages/Loginpage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadusers } from "./Actions/user";
import Account from "./Components/Account";
import Newpost from "./Components/pages/Newpost";
import Updateuser from "./Components/updateuser/Updateuser";
import Updatepassword from "./Components/updateuser/Updatepassword";
import Search from "./Components/Search/Search";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadusers()); // loaduser funciton is called once each time the page loads
  }, [dispatch]);
  const { isauthenticated } = useSelector((state) => state.user); // pulling isauthenticated from state using useselector
  return (
    <div className="App">
      <BrowserRouter>
        {/* {isauthenticated && <Navbar />} */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/post/upload" element={<Newpost />} />
          <Route
            path="/account"
            element={isauthenticated ? <Account /> : <Registerpage />}
          />
          <Route
            path="/login"
            element={isauthenticated ? <Homepage /> : <Loginpage />}
          />
          <Route
            path="/register"
            element={isauthenticated ? <Homepage /> : <Registerpage />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/update/profile" element={<Updateuser />} />{" "}
          <Route path="/update/password" element={<Updatepassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
