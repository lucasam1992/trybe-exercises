const Initial_State = [];

function registerReducer(state = Initial_State, action){
    switch(action.type) {
        case 'ADD_REGISTER':
            return [...state, action.data];
        default:
            return state;
        case 'DELETE_REGISTER':
            return state.filter((register)=>register !== action.value);
    }
}

export default registerReducer;
