import React from "react";

export default function ListTodo(props) {
  //variable
  const [edit, setEdit] = React.useState({
    id: 0,
    name: ""
  });
  //render list todo
  const list = props.listTodoFilter.map((item) => {
    return (
      <div className="Todo_listContainer" key={item.id}>
        <div className="Todo_listItem">
          <input
            className="Todo_listCheckbox"
            type="checkbox"
            checked={!item.isActive}
            onChange={() => handleCheckbox(item.id)}
          />
          <span
            className="Todo_listName"
            onClick={() => {
              setEdit((prevState) => ({
                id: item.id,
                name: item.name
              }));
            }}
            style={{ opacity: item.isActive ? 1 : 0.5 }}
          >
            {item.id}. {item.name}
            <div className="Todo_dueTo">Due to: {item.dueTo}</div>
          </span>
          <button
            className="Todo_listDelete"
            onClick={() => handleDelete(item.id)}
          >
            x
          </button>
        </div>
        {edit.id === item.id && (
          <form
            className="Todo_edit"
            onSubmit={(e) => {
              handleEdit(e);
            }}
          >
            <input
              type="text"
              className="Todo_editInput"
              defaultValue={item.name}
              onChange={(e) => {
                setEdit((prevState) => ({
                  ...prevState,
                  name: e.target.value
                }));
              }}
              required
            />
            <button className="Todo_editButton">Edit</button>
          </form>
        )}
      </div>
    );
  });

  //handle checkbox
  const handleCheckbox = (value) => {
    const updatedTodo = props.listTodo.map((item) => {
      if (item.id === value) {
        item.isActive = !item.isActive;
      }
      return item;
    });

    if (props.filter !== 0) {
      var updatedTodoFilter = props.listTodoFilter.filter((item) => {
        return item.id !== value;
      });
    }

    const result = {
      updatedTodo: updatedTodo,
      updatedTodoFilter: updatedTodoFilter ? updatedTodoFilter : null
    };
    props.handleCheckbox(result);
  };

  //handle delete todo
  const handleDelete = (value) => {
    const updatedTodo = props.listTodo.filter((item) => {
      return item.id !== value;
    });

    const updatedTodoFilter = props.listTodoFilter.filter((item) => {
      return item.id !== value;
    });

    const result = {
      updatedTodo: updatedTodo,
      updatedTodoFilter: updatedTodoFilter
    };
    props.handleDelete(result);
  };

  //handle edit todo
  const handleEdit = (e) => {
    e.preventDefault();
    // console.log(edit);
    const editList = props.listTodo.map((item) => {
      if (item.id === edit.id && item.name !== edit.name) {
        item.name = edit.name;
      }
      return item;
    });
    const editListFilter = props.listTodoFilter.map((item) => {
      if (item.id === edit.id && item.name !== edit.name) {
        item.name = edit.name;
      }
      return item;
    });
    setEdit({
      id: 0,
      name: ""
    });
    props.handleEdit({
      listTodo: editList,
      listTodoFilter: editListFilter
    });
  };

  return <div>{list}</div>;
}
