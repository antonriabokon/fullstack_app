import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CreateUser from "./components/CreateUser.jsx";
import ListUser from "./components/ListUser.jsx";

 
function App() {
 
  return (
   <div>
    
    <BrowserRouter>
    <nav>
  <h4>Full stack app</h4>
  <ul>
    <li>
      <Link to="/">List users</Link>
    </li>
    <li>
      <Link to="user/create">Create users</Link>
    </li>
  </ul>
</nav>
      <Routes>
        <Route index element={<ListUser/>} />
        <Route path="user/create" element={<CreateUser/>} />
      </Routes>
    </BrowserRouter>
   </div>
  )
}
 
export default App