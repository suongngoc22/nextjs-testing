"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import TodoCard from "@/components/TodoCard";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import Nav from "@/components/Nav";

const Todo = () => {
  const { userInfo, currentUser } = useAuth();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const userRef = doc(db, "users", currentUser.uid);

  // fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { todos: data } = docSnap.data();
        setTodoList(data ?? []);
        console.log(docSnap.data());
      } else {
        console.log("Failed to load todos");
      }
    };
    fetchTodos();
  }, []);

  // handle add and add todo into firestore
  const handleAddToDo = async () => {
    if (!todo) return;

    setTodoList([...todoList, { id: uuidv4(), content: todo }]);

    await setDoc(
      userRef,
      {
        todos: [...todoList, { id: uuidv4(), content: todo }],
      },
      { merge: true }
    );
    setTodo("");
  };

  const handleEdit = async (id, newValue) => {
    let newTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          content: newValue,
        };
      } else {
        return todo;
      }
    });

    setTodoList(newTodos);

    await setDoc(
      userRef,
      {
        todos: newTodos,
      },
      { merge: true }
    );
  };

  const handleDelete = async (id) => {
    //cach 1
    // let newTodos = [...todoList];
    // const objWithIdIndex = newTodos.findIndex((obj) => obj.id === id);
    // if (objWithIdIndex > -1) {
    //   newTodos.splice(objWithIdIndex, 1);
    // }

    //cach 2 dung filter
    const newTodos = todoList.filter((todo) => todo.id !== id);

    setTodoList(newTodos);
    await setDoc(
      userRef,
      {
        todos: newTodos,
      },
      { merge: true }
    );
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col justify-center items-center w-[400px] mx-auto mb-10">
        <h2 className="text-3xl font-semibold uppercase text-center my-8">
          Todo List
        </h2>
        <div className="flex justify-center items-stretch mb-6">
          <input
            type="text"
            placeholder="Enter todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="p-3 text-sm border focus:outline-none"
          />
          <button
            onClick={() => {
              handleAddToDo();
            }}
            className="p-3 bg-green-500 text-white"
          >
            Add
          </button>
        </div>

        <div className="w-full items-center flex-col flex gap-2">
          {userInfo && (
            <>
              {todoList.length > 0 &&
                todoList.map((todo, i) => {
                  return (
                    <TodoCard
                      key={i}
                      todo={todo}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
