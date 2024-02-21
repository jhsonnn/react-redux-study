import { createSlice } from "@reduxjs/toolkit"

const todoSlice = createSlice({
    name: 'todo',
    initialState:{
        currentId: 4,
        todos: []
    },
    reducers: {
        addTodo: (state, action)=>{
            state.todos.push({
                id: state.currentId++,
                text: action.payload.trim(),
                state: 'todo'
            })
        },
        updateTodo: (state, action) =>{
            const item = state.todos.findIndex((item)=>item.id === action.payload);
            state.todos[item].state = state.todos[item].state === 'todo'? 'done':'todo';
            state.todos.push(state.todos.splice(item,1)[0]);
        },
        deleteTodo: (state, action) => {
            const item = state.todos.findIndex((item)=>item.id === action.payload);
            // 없으면 -1을 내보내기 때문에 -1보다 크다라는 뜻은 item이 있다는 말
            if(item > -1){
                state.todos.splice(item, 1);
            }
        }
    }
})

export default todoSlice.reducer;
export const {addTodo, updateTodo, deleteTodo } = todoSlice.actions;