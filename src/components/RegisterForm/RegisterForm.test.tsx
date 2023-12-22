import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import RegisterForm from './RegisterForm'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

afterEach(cleanup)

test('Render RegisterForm component successfully', () => {
  render(
    <MemoryRouter initialEntries={['/sample']}>
      <Routes>
        <Route path='sample' element={<RegisterForm />} />
      </Routes>
    </MemoryRouter>,
  )

  const element = screen.getAllByText('Register')[0] as HTMLElement

  expect(element).toBeInTheDocument()
})
