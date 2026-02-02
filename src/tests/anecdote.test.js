process.env.VITE_BACKEND_URL = 'http://localhost:3001/anecdotes'

import {
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from '@testing-library/react'
import axiosMock from 'axios'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import App from '../App'
import { configureStore } from '@reduxjs/toolkit'
import AnecdoteList from '../components/AnecdoteList'
import { anecdoteSlice, filterSlice, vote } from '../reducers/store'

jest.mock('axios')
let store

beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({
        data: [
            { id: 1, content: 'Anecdote 1', votes: 1 },
            { id: 2, content: 'Anecdote 2', votes: 2 },
        ],
    })

    store = configureStore({
        reducer: {
            anecdotes: anecdoteSlice.reducer,
            filter: filterSlice.reducer,
        },
        preloadedState: {
            anecdotes: [],
            filter: '',
        },
    })
})

describe('<App />', () => {
    it('it fetches data from api', async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('Anecdote 1')).toBeInTheDocument()
            expect(screen.getByText('Anecdote 2')).toBeInTheDocument()
        })
    })

    it('show votes correctly after voting', async () => {
        store = configureStore({
            reducer: {
                anecdotes: anecdoteSlice.reducer,
                filter: filterSlice.reducer,
            },
            preloadedState: {
                anecdotes: [
                    { id: 1, content: 'Anecdote 1', votes: 0 },
                    { id: 2, content: 'Anecdote 2', votes: 0 },
                ],
                filter: '',
            },
        })

        axiosMock.put.mockImplementationOnce((url, updatedAnecdote) => {
            return Promise.resolve({ data: updatedAnecdote })
        })

        render(
            <Provider store={store}>
                <AnecdoteList />
            </Provider>
        )

        const anecdoteItem = screen.getByTestId('anecdote-item-1')
        const voteButton = within(anecdoteItem).getByText('vote')

        await act(async () => {
            fireEvent.click(voteButton)
        })

        await waitFor(() => {
            expect(store.getState().anecdotes[0].votes).toBe(1)
        })
    })
})
