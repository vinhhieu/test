import React from 'react'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'

jest.mock('react-router-dom', () => {
  const nav = jest.fn()
  return {
    ...jest.requireActual('react-router-dom'),
    mockedNavigation: nav,
    useLocation: jest.fn(() => ({ pathname: '/example' })),
    useNavigate: jest.fn(() => nav),
  }
})

const Router = require('react-router-dom')

afterEach(cleanup)

test('Render Header component successfully', () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<Header />} />
      </Routes>
    </MemoryRouter>,
  )

  const element = screen.getByText(/Homepage/i)

  expect(element).toBeInTheDocument()
})

test('Click button homepage', async () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='/' element={<Box component='div'>Homepage</Box>} />
        <Route path='sample' element={<Header />} />
      </Routes>
    </MemoryRouter>,
  )

  fireEvent.click(screen.getByText(/Homepage/i))

  expect(Router.mockedNavigation).toHaveBeenCalledWith('/')
})
