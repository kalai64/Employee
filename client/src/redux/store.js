import {configureStore, createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"users",
    initialState:{
        list:[],
    },
    reducers:{
        setUsers:(state, action)=>{
            state.list = action.payload
        },
        deleteUser:(state,action)=>{
            state.list = state.list.filter(user=> user._id !== action.payload)
        }
    }
});

export const {setUsers,deleteUser} = userSlice.actions
export default configureStore({
    reducer:{
        users: userSlice.reducer,
    },
})