import { retrieveData, USERDATA } from "../../service/LocalStorage";

let INITIAL_STATE = {
  data: retrieveData(USERDATA) ? retrieveData(USERDATA) : null,
};

let userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USERDATA":
      // On renvoie le meme objet state avec "data" modifié
      return { ...state, data: action.value };
    default:
      return state;
  }
};

export default userReducer;
