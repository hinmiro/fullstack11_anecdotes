const baseUrl =
    typeof import.meta !== 'undefined' &&
    import.meta && import.meta.env && import.meta.env.VITE_BACKEND_URL
        ? import.meta.env.VITE_BACKEND_URL
        // eslint-disable-next-line no-undef
        : process.env.VITE_BACKEND_URL || 'http://localhost:3001/anecdotes'

export default baseUrl
