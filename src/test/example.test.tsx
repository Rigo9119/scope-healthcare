import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

function Greeting({ name }: { name: string }) {
  return <p>Hello, {name}!</p>
}

describe('Greeting', () => {
  it('renders the name', () => {
    render(<Greeting name="World" />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})
