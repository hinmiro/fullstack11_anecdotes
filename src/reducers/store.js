import anecdoteService from '../services/anecdote'
import { configureStore, createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
   name: 'set_filter',
   initialState: '',
   reducers: {
      filterReducer(state, action) {
         return action.payload
      },
   },
})

const anecdoteSlice = createSlice({
   name: 'anecdotes',
   initialState: [],
   reducers: {
      createAnecdote(state, action) {
         state.push(action.payload)
      },
      vote(state, action) {
         const updatedAnecdote = action.payload
         return state.map((anecdote) =>
            anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
         )
      },
      setAnecdotes(state, action) {
         return action.payload
      },
   },
})

const notificationSlice = createSlice({
   name: 'notifications',
   initialState: '',
   reducers: {
      setNotification(state, action) {
         return action.payload
      },
      removeNotification(state, action) {
         return action.payload
      },
   },
})

const store = configureStore({
   reducer: {
      anecdotes: anecdoteSlice.reducer,
      filter: filterSlice.reducer,
      notification: notificationSlice.reducer,
   },
})

export const { filterReducer } = filterSlice.actions
export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export const { setNotification, removeNotification } = notificationSlice.actions

export const initializeAnecdotes = () => {
   return async (dispatch) => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({ type: 'anecdotes/setAnecdotes', payload: anecdotes })
   }
}

export const createNewAnecdote = (content) => {
   return async (dispatch) => {
      const anecdote = await anecdoteService.createNew(content)
      dispatch({ type: 'anecdotes/createAnecdote', payload: anecdote })
   }
}

export const voteAnecdote = (anecdote) => {
   return async (dispatch) => {
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      const anecdoteFromDb = await anecdoteService.voteAnecdote(updatedAnecdote)
      dispatch({ type: 'anecdotes/vote', payload: anecdoteFromDb })
   }
}

export const showNotification = (text, time) => {
   return (dispatch) => {
      dispatch({ type: 'notifications/setNotification', payload: text })
      setTimeout(() => {
         dispatch({ type: 'notifications/setNotification', payload: null })
      }, time * 1000)
   }
}

export default store
