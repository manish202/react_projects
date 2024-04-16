import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./Navbar";
import TodoApp from "./TodoApp";
import Accordion from "./Accordion";
import GithubUsers from "./GithubUsers";
import ShoppingCart from "./ShoppingCart";
const App = () => {
  console.log("App");
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/react_projects" element={<TodoApp />} />
        <Route path="/accordion" element={<Accordion />} />
        <Route path="/github_users" element={<GithubUsers />} />
        <Route path="/shopping_cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;