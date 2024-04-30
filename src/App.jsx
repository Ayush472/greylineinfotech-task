import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivetRoute from "./routes/PrivetRoute";
import Post from "./pages/Post";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivetRoute />}>
          <Route path="/blog" element={<Post/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
