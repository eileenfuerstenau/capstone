import Navigation from './Navigation'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Navigation', () => {
  it('renders links to "Abstimmung" and "Inspiration" page', () => {
    render(<Navigation />, { wrapper: MemoryRouter })
    expect(screen.getByText(/abstimmung/i)).toBeInTheDocument()
    expect(screen.getByText(/inspiration/i)).toBeInTheDocument()
  })
})
