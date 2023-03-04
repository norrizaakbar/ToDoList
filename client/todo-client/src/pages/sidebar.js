import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormAddCategory from "../components/formAddCategory";
import FormAddTask from "../components/formAddTask";
import {
  deleteTaskById,
  fetchCategories,
  fetchTask,
  updateTask,
} from "../store/action/actionCreator";

export default function Sidebar() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const handleOnClose = () => setShowAddForm(false);
  const handleOnCloseTask = () => setShowAddTask(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  let tasks = useSelector((state) => state.tasks.tasks);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTask());
  }, []);
  //   console.log(categories);
  //   console.log(tasks, "><><><");
  function date() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date();
    return today.toLocaleDateString("en-US", options);
  }

  function time() {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const now = new Date();
    return now.toLocaleTimeString("en-US", options);
  }

  function checked(id) {
    dispatch(updateTask(id));
  }

  function deleteTask(id) {
    dispatch(deleteTaskById(id)).then((_) => dispatch(fetchTask()));
  }
  function filter(name) {
    // console.log(name);
    // tasks.filter((el) => el.category.name === name);
    setSelectedCategory(name);
  }
  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category.name === selectedCategory)
    : tasks;
  return (
    <>
      <div class="min-h-screen flex flex-row bg-gray-100 ">
        <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
          <div class="flex items-center justify-center h-20 shadow-md">
            <h1 class="text-3xl uppercase text-indigo-500">To Do List</h1>
          </div>
          <ul class="flex flex-col py-4 relative">
            <li>
              <a
                href="#"
                onClick={() => localStorage.clear()}
                class="flex flex-row items-start justify-start h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i class="bx bx-log-out"></i>
                </span>
                <span class="text-sm  text-red-500 font-bold">Logout</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={() => filter(null)}
                class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i class="bx bx-home"></i>
                </span>
                <span class="text-sm font-medium">All Tasks</span>
              </a>
            </li>
            {categories.map((el) => {
              return (
                <li>
                  <a
                    href="#"
                    onClick={() => filter(el.name)}
                    class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i class="bx bx-music"></i>
                    </span>
                    <span class="text-sm font-medium">{el.name}</span>
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="#"
                class="absolute top-96 flex-row items-start justify-start h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <i class="bx bx-log-out"></i>
                </span>
                <span
                  onClick={() => setShowAddForm(true)}
                  class="text-sm  text-blue-500 font-bold"
                >
                  + New Category
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="flex justify-center items-center min-h-screen w-screen bg-gradient-to-r from-pink-200 to-purple-200">
          <div class="h-auto  w-2/3 bg-white rounded-lg p-4">
            <div class="mt-3 text-sm text-[#8ea6c8] flex justify-between items-center">
              <p class="set_date">{date()}</p>
              <p class="set_time">{time()}</p>
            </div>
            <p class="text-xl font-semibold mt-2 text-[#063c76]">All Tasks</p>
            <div class="w-full mt-4 flex text-sm flex-col text-center justify-center ">
              <div class="w-full pl-1 flex justify-between text-center items-center"></div>
            </div>
            <ul class="my-4 ">
              <li class=" mt-4" id="2">
                <button
                  onClick={() => setShowAddTask(true)}
                  class="flex gap-2 w-full"
                >
                  <div class="w-full h-12 bg-[#9eb2d8] rounded-[7px] flex justify-start items-center px-3">
                    <h1
                      id="strike2"
                      class="strike_none text-sm ml-4 text-[#5b7a9d] font-semibold"
                    >
                      Add new tasks
                    </h1>
                  </div>
                </button>
              </li>
              {filteredTasks.map((el) => {
                return (
                  <li class=" mt-4" id="1">
                    <div class="flex gap-2">
                      {el.status === true && (
                        <div class="w-9/12 h-12 bg-[#ffffff] rounded-[7px] flex justify-start items-center px-3">
                          <span
                            class=" w-7 h-7 bg-[#ffffff] rounded-full border border-[#b7d1ff] transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center"
                            onClick={() => checked(el._id)}
                          >
                            <i class="text-white fa fa-check"></i>
                          </span>

                          <h1
                            id="strike1"
                            class="strike_none text-lg ml-4 text-[#5b7a9d] font-semibold"
                          >
                            {el.name}
                          </h1>
                          <span class="w-1/4 h-6 bg-[#f4beff] rounded-[15px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ml-5 px-8 ">
                            {el.category.name}
                          </span>
                        </div>
                      )}
                      {el.status === false && (
                        <div class="w-9/12 h-12 bg-[#ffffff] rounded-[7px] flex justify-start items-center px-3">
                          <span class=" w-7 h-7 bg-white rounded-full border border-white transition-all cursor-pointer hover:border-[#36d344] flex justify-center items-center">
                            <i class="text-white fa fa-check">✔</i>
                          </span>

                          <strike
                            id="strike1"
                            class="strike_none text-lg ml-4 text-red-500 font-semibold"
                          >
                            {el.name}
                          </strike>

                          <span class="w-1/4 h-6 bg-[#f4beff] rounded-[15px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ml-5 px-8 ">
                            {el.category.name}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => deleteTask(el._id)}
                        class="w-1/4 h-8 bg-[#f4beff] rounded-[7px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center mt-3"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <FormAddCategory onClose={handleOnClose} visible={showAddForm} />
        <FormAddTask onClose={handleOnCloseTask} visible={showAddTask} />
      </div>
    </>
  );
}
