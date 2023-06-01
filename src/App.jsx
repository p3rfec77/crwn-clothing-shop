import { Routes, Route } from "react-router-dom";

import Home from "./routs/home/home.component";
import Navigation from "./routs/navigation/navigation.component";
import SignIn from "./routs/sign-in/sign-in.component";

const Shop = () => {
  return (
    <h1>Shop Page</h1>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App
