import axios from 'axios'

let baseUrl
if (
    typeof process !== 'undefined' &&
    // eslint-disable-next-line no-undef
    process.env.JEST_WORKER_ID !== undefined
) {
    // eslint-disable-next-line no-undef
    baseUrl = import('../../baseUrl.node').then((mod) => mod.default)
} else {
    // eslint-disable-next-line no-undef
    baseUrl = import('../../baseUrl').then((mod) => mod.default)
}

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
