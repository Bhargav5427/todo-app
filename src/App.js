import React, { useEffect, useRef } from "react";
import TodoList from "./components/TodoList";
import { useDispatch } from "react-redux";
import { fetchData } from "./Toolkit/Slices/todoslice";
import EditProduct from "./components/EditProduct";
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData({ endpoint: "get" }));
  }, []);

  return (
    <div className="App">
      <TodoList />
      {/* <EditProduct/> */}
    </div>
  );
}
export default App;
