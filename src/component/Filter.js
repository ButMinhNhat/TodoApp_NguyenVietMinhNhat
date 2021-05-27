import React from "react";

export default function Filter(props) {
  const handleFilter = (value) => {
    var newListFilter = [];
    if (value === 0) {
      newListFilter = props.listTodo;
    }
    if (value === 1) {
      newListFilter = props.listTodo.filter((item) => {
        return item.isActive === true;
      });
    }
    if (value === 2) {
      newListFilter = props.listTodo.filter((item) => {
        return item.isActive === false;
      });
    }
    const result = {
      filterTab: value,
      newListFilter: newListFilter
    };
    props.handleFilter(result);
  };

  return (
    <div>
      <div className="Todo_filterTitle">Filter tasks by:</div>
      <div className="Todo_filterContainer">
        <button
          className="Todo_filterButton"
          style={{background: props.filter === 0 && " #ed455e"}}
          onClick={() => handleFilter(0)}
        >
          All
        </button>
        <button
          className="Todo_filterButton"
          style={{backgroundColor: props.filter === 1 && " #ed455e"}}
          onClick={() => handleFilter(1)}
        >
          Active
        </button>
        <button
          className="Todo_filterButton"
          style={{backgroundColor: props.filter === 2 && " #ed455e"}}
          onClick={() => handleFilter(2)}
        >
          Done
        </button>
      </div>
    </div>
  );
}
