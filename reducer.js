export const initialState = {
  todos: [],
  dragIndex: -1,
  focus: 0,
};

export function reducer(state, action) {
  if (action.type === "newTask") {
    const newTask = {
        status: false,
        text: "",
    }
    return {
      ...state,
      focus: state.focus + 1,
      todos: [newTask, ...state.todos],
    };
  } else if (action.type === "inputTask") {
    return {
      ...state,
      todos: state.todos.map((value, i) => {
        if (i === action.index) {
          return {
            ...value,
            text: action.text,
          };
        }
        return value;
      }),
    };
  } else if (action.type === "checkboxClick") {
    return {
      ...state,
      todos: state.todos.map((value, i) => {
        if (i === action.index) {
          return {
            ...value,
            status: !value.status,
          };
        }
        return value;
      }),
    };
  } else if (action.type === "startDrag") {
    return {
      ...state,
      dragIndex: action.index,
    };
  } else if (action.type === "stopDrag") {
    const startValue = state.todos[state.dragIndex];
    const stopValue = state.todos[action.index];
    return {
      ...state,
      todos: state.todos.map((value, i) => {
        if (i === state.dragIndex) {
          return stopValue;
        } else if (i === action.index) {
          return startValue;
        }
        return value;
      }),
    };
  } else if (action.type === "deleteTask") {
    return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.index)
    }
  }
}
