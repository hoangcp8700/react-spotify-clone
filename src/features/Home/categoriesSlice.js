const { createSlice } = require("@reduxjs/toolkit");

const categories = createSlice({
    name: 'categories',
    initialState: { 
       categories: {}
    },
    reducers: {
      setCategories: (state, action) => {
        state.categories = action.categories
      }
     
    },
})

const { reducer, actions } = categories

export const {setCategories} = actions

export default reducer