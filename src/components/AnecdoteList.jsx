import { useDispatch, useSelector } from 'react-redux'
import { showNotification, voteAnecdote } from '../reducers/store'

const AnecdoteList = () => {
   const dispatch = useDispatch()

   const anecdotes = useSelector((state) => {
      const filterAnecdotes = state.anecdotes.filter((anecdote) =>
         anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      return filterAnecdotes.sort((a, b) => b.votes - a.votes)
   })

   const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(showNotification(`Voted anecdote: ${anecdote.content}`, 5))
   }

   return (
      <>
         {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
               <div>{anecdote.content}</div>
               <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
               </div>
            </div>
         ))}
      </>
   )
}

export default AnecdoteList
