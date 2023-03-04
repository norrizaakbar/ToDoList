import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/action/actionCreator";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formAdd, setFormAdd] = useState({
    username: "",
    password: "",
  });

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
    dispatch(login(formAdd)).then((_) => navigate("/"));
  };

  const toRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="w-3/5 bg-gradient-to-r from-pink-200 to-white h-screen">
          <h1 className="text-6xl font-extrabold ml-52 mt-52 ">To Do List</h1>
          <img className="ml-24" src="https://imgur.com/SHXr5BZ.png" />
        </div>
        <div className="w-2/5">
          <div className=" fixed inset-0 bg-white bg-opacity-10  mx-auto w-screen flex items-center justify-center pl-80 ml-96">
            <div className="w-screen max-w-lg m-auto bg-red-100 rounded-lg p-10">
              <header>
                <h1 className="text-xl font-bold">Welcome to To Do List!</h1>
                <h1 className="text-l">
                  Please sign-in to your account and start manage further
                </h1>
                <h1 className="text-xl font-bold pt-10">Sign In</h1>
              </header>
              <form onSubmit={submitHandler}>
                <div>
                  <label className="block mb-2 text-red-500">Username</label>
                  <input
                    onChange={changeHandler}
                    value={formAdd.username}
                    className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300"
                    type="text"
                    name="username"
                    placeholder="Your username"
                    required
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-red-500">Password</label>
                  <input
                    onChange={changeHandler}
                    value={formAdd.password}
                    className="w-full p-2 mb-6 text-red-700 border-b-2 border-red-500 outline-none focus:bg-gray-300"
                    type="password"
                    name="password"
                    placeholder="●●●●●"
                    required
                  ></input>
                </div>

                <div>
                  <button
                    className="w-full bg-red-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center">
                <p>
                  Don't have an account yet?{" "}
                  <a
                    className="text-blue-700 font-semibold"
                    onClick={toRegister}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
