import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, fetchCategories } from "../store/action/actionCreator";

export default function FormAddTask({ visible, onClose }) {
  const [formAdd, setFormAdd] = useState({ name: "", category: "" });
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  if (!visible) return null;
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const obj = {
      ...formAdd,
      [name]: value,
    };
    setFormAdd(obj);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addTask(formAdd))
      .then((_) => onClose())
      .then((_) => setFormAdd({ name: "", category: "" }));
  };
  return (
    <div className="fixed h-max inset-0 bg-black bg-opacity-40 backdrop-blur-sm mx-auto w-screen flex items-center justify-center py-96">
      <div className="w-screen max-w-xs m-auto bg-pink-300 rounded-lg p-6 ">
        <header>
          <h1 className="text-xl font-semibold">Add New Task</h1>
        </header>
        <form onSubmit={submitHandler}>
          <div>
            <label className="mt-28">Name</label>

            <input
              onChange={changeHandler}
              value={formAdd.name}
              className="w-full p-2 mb-2 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300"
              type="text"
              name="name"
              placeholder="Category Name"
            ></input>
          </div>
          <div>
            <label className=" font-bold text-yellow-500">Category</label>

            <select
              onChange={changeHandler}
              value={formAdd.category}
              name="category"
              className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled value={""}>
                Choose a category
              </option>
              {categories.map((item) => (
                <option name="category" key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}{" "}
              *
            </select>
          </div>
          <div>
            <button
              className="w-full bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          onClick={() => onClose()}
          className="w-full bg-yellow-400 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
          type="submit"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
