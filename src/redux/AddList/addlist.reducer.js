import { ITEMCLICK, DELCLICK } from "./addlist.types";
const INITIAL_STATE = {
    list: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEMCLICK:
            {
                const listItem = [...state.list];
                if (listItem.includes(action.getItem)) {
                    listItem.pop()
                } else {
                    listItem.push(action.getItem)
                }
                return {
                    ...state,
                    list: listItem
                }
            }
        case DELCLICK:
            {
                const listItem = [...state.list];
                if (listItem.includes(action.getItem)) {
                    return {
                        ...state,
                        list: listItem.filter(values => values !== action.getItem)
                    }
                } else {
                    listItem.push(action.getItem)
                }
                return {
                    ...state,
                    list: listItem
                }
            }
        default:
            return state;
    }
}

export default reducer;