import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import RoleRoutes from './RoleRoutes'


// Mocks
vi.mock('../../common/LoadingSpinner', () => ({
  default: () => <div>Cargando...</div>
}))

const DummyComponent = () => <div>Ruta protegida</div>

const renderWithAuth = ({ user = null, loading = false, allowedRoles = [] }) => {
  return render(
    <AuthContext.Provider value={{ user, loading }}>
      <MemoryRouter initialEntries={['/protegido']}>
        <Routes>
          <Route element={<RoleRoutes allowedRoles={allowedRoles} />}>
            <Route path="/protegido" element={<DummyComponent />} />
          </Route>
          <Route path="/" element={<div>Inicio</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  )
}
describe('RoleRoutes', () => {
  it('muestra el spinner cuando está cargando', () => {
    renderWithAuth({ loading: true })
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('redirecciona al inicio si no hay usuario', () => {
    renderWithAuth({ user: null, allowedRoles: ['usuario'] })
    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })

  it('redirecciona al inicio si el rol no está permitido', () => {
    renderWithAuth({ user: { tipoUsuario: 'usuario' }, allowedRoles: ['admin'] })
    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })

  it('muestra la ruta protegida si el usuario tiene el rol permitido', () => {
    renderWithAuth({ user: { tipoUsuario: 'librarian' }, allowedRoles: ['librarian'] })
    expect(screen.getByText('Ruta protegida')).toBeInTheDocument()
  })
})