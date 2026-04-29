"use client"

import { useState } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"
import { LoginView, type User } from "@/components/admin/views/login-view"
import { ProveedoresView } from "@/components/admin/views/proveedores-view"
import { CategoriasView } from "@/components/admin/views/categorias-view"
import { CargaExcelView } from "@/components/admin/views/carga-excel-view"
import { RevisionLoteView } from "@/components/admin/views/revision-lote-view"
import { CatalogoView } from "@/components/admin/views/catalogo-view"
import { ClientesView } from "@/components/admin/views/clientes-view"
import { UsuariosView } from "@/components/admin/views/usuarios-view"
import { MapeoView, PlantillasView, ExportarView } from "@/components/admin/views/placeholder-views"

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState("catalogo")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    setCurrentView("catalogo")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView("catalogo")
  }

  const renderView = () => {
    switch (currentView) {
      case "proveedores":
        return <ProveedoresView />
      case "categorias":
        return <CategoriasView />
      case "carga-excel":
        return <CargaExcelView />
      case "revision-lote":
        return <RevisionLoteView />
      case "catalogo":
        return <CatalogoView />
      case "clientes":
        return <ClientesView />
      case "mapeo":
        return <MapeoView />
      case "plantillas":
        return <PlantillasView />
      case "exportar":
        return <ExportarView />
      case "usuarios":
        return <UsuariosView />
      default:
        return <CatalogoView />
    }
  }

  if (!user) {
    return <LoginView onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Header sidebarCollapsed={sidebarCollapsed} onLogout={handleLogout} user={user} />
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="p-6">{renderView()}</div>
      </main>
    </div>
  )
}
