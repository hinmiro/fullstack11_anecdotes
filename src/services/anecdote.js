import axios from 'axios'

const getBaseUrl = async () => {
    // eslint-disable-next-line no-undef
    if (typeof process !== 'undefined' && process.env && process.env.VITE_BACKEND_URL) {
        // eslint-disable-next-line no-undef
        return process.env.VITE_BACKEND_URL
    }

    // eslint-disable-next-line no-undef
    if (typeof process !== 'undefined' && process.env && process.env.JEST_WORKER_ID !== undefined) {
        const mod = await import('../../baseUrl.node')
        return mod.default
    }

    const mod = await import('../../baseUrl')
    return mod.default
}

const getAll = async () => {
    const baseUrl = await getBaseUrl()
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const baseUrl = await getBaseUrl()
    const anecdote = { content: content, votes: 0 }
    const res = await axios.post(baseUrl, anecdote)
    return res.data
}

const voteAnecdote = async (updatedAnecdote) => {
    const baseUrl = await getBaseUrl()
    const { id } = updatedAnecdote
    const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return res.data
}

export default { getAll, createNew, voteAnecdote }
