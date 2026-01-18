const filterReducer = (state = '', action) => {
   switch (action.type) {
      case 'SET_FILTER':
         return action.payload
   }
   return state
}

export const filterText = (content) => {
   return {
      type: 'SET_ FILTER',
      payload: content,
   }
}

export default filterReducer
