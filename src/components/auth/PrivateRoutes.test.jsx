import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'




// Mock de Outlet
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Outlet: () => <div>Contenido protegido</div>,
    Navigate: ({ to }) => <div>Navegando a: {to}</div>
  }
})

// Mock del contexto
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn()
}))

import { useAuth } from '../../context/AuthContext'

describe('PrivateRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el LoadingSpinner si loading es true', () => {
    useAuth.mockReturnValue({ loading: true, user: null })

    render(
      <MemoryRouter>
        <PrivateRoutes />
      </MemoryRouter>
    )

     expect(screen.getByRole('status')).toBeInTheDocument()

  })

  it('redirecciona al home si no hay usuario', () => {
    useAuth.mockReturnValue({ loading: false, user: null })

    render(
      <MemoryRouter>
        <PrivateRoutes />
      </MemoryRouter>
    )

    expect(screen.getByText('Navegando a: /')).toBeInTheDocument()
  })

  it('muestra el contenido protegido si hay usuario', () => {
    useAuth.mockReturnValue({ loading: false, user: { tipoUsuario: 'admin' } })

    render(
      <MemoryRouter>
        <PrivateRoutes />
      </MemoryRouter>
    )

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })
})
