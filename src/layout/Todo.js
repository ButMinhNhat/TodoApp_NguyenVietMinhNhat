import React from "react";
import "../styles.css";
import Filter from "../component/Filter";
import ListTodo from "../component/ListTodo";

export default function Todo() {
  /// Variable
  const [input, setInput] = React.useState("");
  const defaultDate = new Date();
  const [inputDate, setInputDate] = React.useState(defaultDate);
  const [filterTab, setFilterTab] = React.useState(0);
  const [listTodo, setListTodo] = React.useState([
    {
      id: 1,
      name: "Do housework",
      dueTo: "2021-05-25",
      isActive: true
    },
    {
      id: 2,
      name: "Learning",
      dueTo: "2021-05-25",
      isActive: false
    },
    {
      id: 3,
      name: "Watch film",
      dueTo: "2021-05-25",
      isActive: true
    }
  ]);
  //filter list todo
  const [listTodoFilter, setTodoFilter] = React.useState(listTodo);

  // / Handle function
  //handle on submit input todo
  const handleSubtmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: listTodo.length > 0 ? listTodo[listTodo.length - 1].id + 1 : 1,
      name: input,
      dueTo: inputDate,
      isActive: true
    };
    setInput("");
    setInputDate(new Date());
    listTodo.push(newTodo);
    if (filterTab !== 2 && listTodo.length !== listTodoFilter.length) {
      listTodoFilter.push(newTodo);
    }
  };
  //handle on click checkbox
  const handleCheckbox = (value) => {
    setListTodo(value.updatedTodo);
    if (value.updatedTodoFilter !== null) {
      setTodoFilter(value.updatedTodoFilter);
    }
  };
  //handle delete todo
  const handleDelete = (value) => {
    setListTodo(value.updatedTodo);
    setTodoFilter(value.updatedTodoFilter);
  };

  //handle filter
  const handleFilter = (value) => {
    setFilterTab(value.filterTab);
    setTodoFilter(value.newListFilter);
  };

  //handle edit
  const handleEdit = (value) => {
    setListTodo(value.listTodo);
    setTodoFilter(value.listTodoFilter);
  };

  //handle toggle all
  const handleToggle = () => {
    const updatedTodo = listTodo.map((item) => {
      if (item.isActive === true) {
        item.isActive = false;
      }
      return item;
    });
    setListTodo(updatedTodo);
    if (filterTab === 1) {
      setTodoFilter([]);
    }
    if (filterTab === 2) {
      setTodoFilter(listTodo);
    }
  };

  return (
    <div className="Todo_container">
      <h2 className="Todo_title">Todo App</h2>

      {/* Form add todo list */}
      <form onSubmit={(e) => handleSubtmit(e)} className="Todo_addContainer">
        <span className="Todo_addInputContainer">
          <input
            className="Todo_addInput"
            type="text"
            placeholder="Enter todo name here"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            required
          />
          <div style={{ margin: "10px 0 3px" }}>
            <b>Due to:</b>
          </div>
          <input
            className="Todo_addInput"
            type="date"
            value={inputDate}
            onChange={(e) => {
              setInputDate(e.target.value);
            }}
            required
          />
        </span>
        <button className="Todo_addButton">+</button>
      </form>

      {/* Filter button */}
      <Filter
        listTodo={listTodo}
        handleFilter={handleFilter}
        filter={filterTab}
      />

      {/* Total tasks */}
      <div className="Todo_totalTasks">
        Total: <b>{listTodoFilter.length} Tasks</b>
        <div style={{ fontSize: "14px" }}>(Click Todo item to edit)</div>
      </div>

      {/* List Todo */}
      <ListTodo
        listTodoFilter={listTodoFilter}
        listTodo={listTodo}
        handleDelete={handleDelete}
        handleCheckbox={handleCheckbox}
        filter={filterTab}
        handleEdit={handleEdit}
      />

      {/* Toggle All */}
      <button className="Todo_toggleButton" onClick={() => handleToggle()}>
        Toggle All
      </button>
    </div>
  );
}
