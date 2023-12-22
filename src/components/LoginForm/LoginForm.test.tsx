import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from './LoginForm'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

afterEach(cleanup)

test('Render LoginForm component successfully', () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<LoginForm />} />
      </Routes>
    </MemoryRouter>,
  )

  const element = screen.getAllByText('Login')[0] as HTMLElement

  expect(element).toBeInTheDocument()
})
