import React, { useEffect, useState, useRef } from "react";
import "../App.css";

export default function Todo() {
  const getItems = () => {
    const list = localStorage.getItem("Lists");
    if (list) {
      console.log(list);
      return JSON.parse(list);
    } else {
      return [];
    }
  };
  const inputRef = useRef();
  const [inputData, setInputData] = useState("");
  const [items, addItems] = useState(getItems());
  const [touggleBtn, settouggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
    } else if (inputData && !touggleBtn) {
      addItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );

      settouggleBtn(true);

      setInputData("");

      setIsEditItem(null);
    } else if (inputData) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      addItems([...items, allInputData]);

      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItem = items.filter((ele) => {
      return ele.id !== id;
    });
    addItems(updatedItem);
  };

  const removeAll = () => {
    addItems([]);
  };

  const editItem = (id) => {
    let newEditItem = items.find((ele) => {
      return ele.id === id;
    });
    console.log(newEditItem);
    settouggleBtn(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
    inputRef.current.focus();
  };
  const _handleKeyDown = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      addItem();
    }
  };

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <h1
              style={{
                fontSize: 30,
                color: "black",
                fontWeight: 600,
              }}
            >
              TODO LIST
            </h1>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              value={inputData}
              ref={inputRef}
              onChange={(e) => setInputData(e.target.value)}
              onKeyPress={(e) => _handleKeyDown(e)}
            />
            {touggleBtn ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item "
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit add-btn"
                title="Add Item "
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(element.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(element.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => removeAll()}
            >
              <span>Clear TODO</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
