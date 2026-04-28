"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  FolderTree,
  FileSpreadsheet,
  ClipboardCheck,
  Package,
  Users,
  Map,
  FileText,
  Download,
  Shield,
  History,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserRole } from "@/components/admin/views/login-view"

interface SidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const menuItems = [
  { id: "catalogo", label: "Catálogo Maestro", icon: Package },
  { id: "proveedores", label: "Proveedores", icon: Building2 },
  { id: "categorias", label: "Categorías", icon: FolderTree },
  { id: "carga-excel", label: "Carga Excel", icon: FileSpreadsheet },
  { id: "revision-lote", label: "Revisión de Lote", icon: ClipboardCheck },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "mapeo", label: "Mapeo", icon: Map },
  { id: "plantillas", label: "Plantillas", icon: FileText },
  { id: "exportar", label: "Exportar", icon: Download },
  { id: "usuarios", label: "Usuarios/Roles", icon: Shield },
  { id: "auditoria", label: "Auditoría", icon: History },
]

export function Sidebar({ currentView, onViewChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-[#000000] text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {/* White logo for dark background */}
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-promotick%281%29-kUKWmgbVJgCGcGNE41EsXiKowGrtpp.png" 
              alt="Promotick"
              className="h-8 w-auto brightness-0 invert"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-white hover:bg-white/10 shrink-0"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#E73137] text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-white/50 text-center">
            Powered by Promotick
          </p>
        </div>
      )}
    </aside>
  )
}
