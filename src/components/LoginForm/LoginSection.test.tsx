import React from 'react'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginSection from './LoginSection'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

afterEach(cleanup)

test('Render LoginSection component successfully', () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<LoginSection />} />
      </Routes>
    </MemoryRouter>,
  )

  const element = screen.getByRole('button', { name: /Login/i })

  expect(element).toBeInTheDocument()
})

test('Submit form without data', async () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<LoginSection />} />
      </Routes>
    </MemoryRouter>,
  )

  fireEvent.click(screen.getByRole('button', { name: /Login/i }))
  await waitFor(() => {
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
  })
})

test('Submit form with invalid email', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<LoginSection />} />
      </Routes>
    </MemoryRouter>,
  )

  const email = container.querySelector('input[name="email"]') as Element
  const password = container.querySelector('input[name="password"]') as Element

  fireEvent.input(email, {
    target: {
      value: 'abc',
    },
  })

  fireEvent.input(password, {
    target: {
      value: 'password',
    },
  })

  fireEvent.click(screen.getByRole('button', { name: /Login/i }))
  await waitFor(() => {
    expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument()
  })
})
