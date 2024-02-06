interface Action {
    type: string;
}


const counter = (state = 0, action: Action)=>{
    switch(action.type){
        case "INCREMENT":
            return state+1;
            break;
        case "DECREMENT":
            return state-1;
            break;
        default:
            return state;
    }
}

export default counter;