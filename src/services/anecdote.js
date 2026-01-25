import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACKEND_URL


const getAll = async () => {
   const res = await axios.get(baseUrl)
   return res.data
}

const createNew = async (content) => {
   const anecdote = { content: content, votes: 0 }
   const res = await axios.post(baseUrl, anecdote)
   return res.data
}

const voteAnecdote = async (updatedAnecdote) => {
   const { id } = updatedAnecdote
   const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
   return res.data
}

export default { getAll, createNew, voteAnecdote }
