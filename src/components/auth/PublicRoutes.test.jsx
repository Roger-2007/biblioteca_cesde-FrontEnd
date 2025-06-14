import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Mock del AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn()
}));

// Mock del spinner
vi.mock("../../common/LoadingSpinner", () => ({
  default: () => <div>Cargando...</div>
}));

import { useAuth } from "../../context/AuthContext";
import PublicRoutes from "./PublicRoutes";

describe("PublicRoutes", () => {
  const renderWithRouter = (element, initialEntries = ["/"]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={element}>
            <Route index element={<div>Ruta pública</div>} />
          </Route>
          <Route path="/controlPanel/admin" element={<div>Redirigido admin</div>} />
          <Route path="/controlPanel/librarian" element={<div>Redirigido librarian</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("muestra el spinner si está cargando", () => {
    useAuth.mockReturnValue({ loading: true, user: null });
    renderWithRouter(<PublicRoutes />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("redirige al panel de admin si el usuario es admin", () => {
    useAuth.mockReturnValue({
      loading: false,
      user: { tipoUsuario: "admin" }
    });
    renderWithRouter(<PublicRoutes />);
    expect(screen.getByText("Redirigido admin")).toBeInTheDocument();
  });

  it("redirige al panel de librarian si el usuario es librarian", () => {
    useAuth.mockReturnValue({
      loading: false,
      user: { tipoUsuario: "librarian" }
    });
    renderWithRouter(<PublicRoutes />);
    expect(screen.getByText("Redirigido librarian")).toBeInTheDocument();
  });

  it("muestra la ruta pública si el usuario no tiene rol restringido", () => {
    useAuth.mockReturnValue({
      loading: false,
      user: { tipoUsuario: "reader" }
    });
    renderWithRouter(<PublicRoutes />);
    expect(screen.getByText("Ruta pública")).toBeInTheDocument();
  });

  it("muestra la ruta pública si no hay usuario", () => {
    useAuth.mockReturnValue({
      loading: false,
      user: null
    });
    renderWithRouter(<PublicRoutes />);
    expect(screen.getByText("Ruta pública")).toBeInTheDocument();
  });
});