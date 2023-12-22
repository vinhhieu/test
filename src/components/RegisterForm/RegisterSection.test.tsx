import React from 'react'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import RegisterSection from './RegisterSection'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

afterEach(cleanup)

test('Render RegisterSection component successfully', () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<RegisterSection />} />
      </Routes>
    </MemoryRouter>,
  )

  const element = screen.getByRole('button', { name: /Register/i })

  expect(element).toBeInTheDocument()
})

test('Submit form without data', async () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<RegisterSection />} />
      </Routes>
    </MemoryRouter>,
  )

  fireEvent.click(screen.getByRole('button', { name: /Register/i }))
  await waitFor(() => {
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
  })
})

test('Submit form with invalid email', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<RegisterSection />} />
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

  fireEvent.click(screen.getByRole('button', { name: /Register/i }))
  await waitFor(() => {
    expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument()
  })
})

test('Submit form with invalid password', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<RegisterSection />} />
      </Routes>
    </MemoryRouter>,
  )

  const email = container.querySelector('input[name="email"]') as Element
  const password = container.querySelector('input[name="password"]') as Element

  fireEvent.input(email, {
    target: {
      value: 'aaa@aaa.com',
    },
  })

  fireEvent.input(password, {
    target: {
      value: 'aaa',
    },
  })

  fireEvent.click(screen.getByRole('button', { name: /Register/i }))
  await waitFor(() => {
    expect(screen.getByText(/Passwords must be at least 6 characters/i)).toBeInTheDocument()
  })
})