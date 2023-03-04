import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/action/actionCreator";

export default function ({ visible, onClose }) {
  if (!visible) return null;
  const [formAdd, setFormAdd] = useState({ name: "" });
  const dispatch = useDispatch();
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
    dispatch(addCategory(formAdd)).then((_) => onClose());
  };
  return (
    <div className="fixed h-max inset-0 bg-black bg-opacity-40 backdrop-blur-sm mx-auto w-screen flex items-center justify-center py-96">
      <div className="w-screen max-w-xs m-auto bg-pink-300 rounded-lg p-6 ">
        <header>
          <h1 className="text-xl font-semibold">Add New Category</h1>
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
          to="/dashboard"
          className="w-full bg-yellow-400 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
          type="submit"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
