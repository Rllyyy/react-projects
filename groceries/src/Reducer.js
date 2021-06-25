export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        ...state,
        list: action.payload,
      };
    case "ADD_ITEM":
      return {
        ...state,
        list: state.list.length > 0 ? [...state.list, action.payload] : [action.payload],
      };
    case "EDIT_ITEM":
      return {
        ...state,
        isEditing: true,
        editID: action.payload.id,
      };
    case "RESET_EDIT_ITEM":
      return {
        ...state,
        isEditing: false,
        editID: null,
      };
    case "ALERT":
      return {
        ...state,
        alert: { show: action.payload.show, msg: action.payload.msg, type: action.payload.type },
      };
    case "REMOVE_ALERT":
      return { ...state, alert: { show: false } };
    case "ACCEPTED_COOKIES":
      return {
        ...state,
        userAcceptedCookies: true,
      };
    default:
      throw new Error("No matching action type");
  }
};

//Local Storage
const getLocalStorageGroceries = () => {
  let list = localStorage.getItem("groceriesListCookie");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const getLocalStorageCookieAccepted = () => {
  let acceptedCookie = localStorage.getItem("groceries-accepted-cookies");
  if (acceptedCookie) {
    return true;
  }
  return false;
};

export const init = {
  isEditing: false,
  editID: null,
  alert: { show: false, msg: "", type: "" },
  userAcceptedCookies: getLocalStorageCookieAccepted(),
  list: getLocalStorageGroceries(),
};
