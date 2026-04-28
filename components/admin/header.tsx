"use client"

import { Bell, Search, User, ChevronDown, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { User as UserType } from "@/components/admin/views/login-view"

interface HeaderProps {
  sidebarCollapsed: boolean
  onLogout: () => void
  user: UserType
}

export function Header({ sidebarCollapsed, onLogout, user }: HeaderProps) {
  const roleLabel = user.role === "admin" ? "Administrador" : "Cliente"
  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-border transition-all duration-300 ${
        sidebarCollapsed ? "left-16" : "left-64"
      }`}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={user.role === "admin" ? "Buscar productos, clientes, proveedores..." : "Buscar en mi catálogo..."}
            className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-[#E73137] font-[family-name:var(--font-lato)]"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#E73137] text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h4 className="font-semibold text-[#000000]">Notificaciones</h4>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {user.role === "admin" ? (
                  <>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <p className="text-sm font-medium">Nuevo lote cargado</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-lato)]">
                        Se han procesado 150 productos de Amazon
                      </p>
                      <span className="text-xs text-[#E73137]">Hace 5 min</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <p className="text-sm font-medium">Duplicados detectados</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-lato)]">
                        8 productos requieren revisión manual
                      </p>
                      <span className="text-xs text-[#E73137]">Hace 1 hora</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <p className="text-sm font-medium">Exportación completada</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-lato)]">
                        El catálogo para Ripley está listo
                      </p>
                      <span className="text-xs text-[#E73137]">Hace 3 horas</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <p className="text-sm font-medium">Nuevo catálogo disponible</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-lato)]">
                        Se han añadido 50 nuevos productos
                      </p>
                      <span className="text-xs text-[#E73137]">Hace 2 horas</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                      <p className="text-sm font-medium">Descarga lista</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-lato)]">
                        Tu exportación de catálogo está lista
                      </p>
                      <span className="text-xs text-[#E73137]">Hace 1 día</span>
                    </DropdownMenuItem>
                  </>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-[#E73137] text-white text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-[#000000]">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{roleLabel}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 border-b mb-1">
                <p className="text-sm font-medium text-[#000000]">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
