"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Plus, Shield, Users, Edit, Trash2, Search, MoreHorizontal, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

const initialRoles = ["Administrador", "Editor", "Viewer", "Operador"]

const initialPermisos = [
  { id: "dashboard", nombre: "Ver Dashboard", permissions: { "Administrador": true, "Editor": true, "Viewer": true, "Operador": true } },
  { id: "proveedores_ver", nombre: "Ver Proveedores", permissions: { "Administrador": true, "Editor": true, "Viewer": true, "Operador": true } },
  { id: "proveedores_editar", nombre: "Editar Proveedores", permissions: { "Administrador": true, "Editor": true, "Viewer": false, "Operador": false } },
  { id: "proveedores_eliminar", nombre: "Eliminar Proveedores", permissions: { "Administrador": true, "Editor": false, "Viewer": false, "Operador": false } },
  { id: "categorias_ver", nombre: "Ver Categorías", permissions: { "Administrador": true, "Editor": true, "Viewer": true, "Operador": true } },
  { id: "categorias_editar", nombre: "Editar Categorías", permissions: { "Administrador": true, "Editor": true, "Viewer": false, "Operador": false } },
  { id: "carga_excel", nombre: "Cargar Excel", permissions: { "Administrador": true, "Editor": true, "Viewer": false, "Operador": true } },
  { id: "revision_lote", nombre: "Revisar Lotes", permissions: { "Administrador": true, "Editor": true, "Viewer": false, "Operador": true } },
  { id: "catalogo_ver", nombre: "Ver Catálogo", permissions: { "Administrador": true, "Editor": true, "Viewer": true, "Operador": true } },
  { id: "catalogo_editar", nombre: "Editar Catálogo", permissions: { "Administrador": true, "Editor": true, "Viewer": false, "Operador": false } },
  { id: "clientes_ver", nombre: "Ver Clientes", permissions: { "Administrador": true, "Editor": true, "Viewer": true, "Operador": false } },
  { id: "clientes_editar", nombre: "Editar Clientes", permissions: { "Administrador": true, "Editor": false, "Viewer": false, "Operador": false } },
  { id: "exportar", nombre: "Exportar Datos", permissions: { "Administrador": true, "Editor": true, "Viewer": false, "Operador": true } },
  { id: "usuarios_ver", nombre: "Ver Usuarios", permissions: { "Administrador": true, "Editor": false, "Viewer": false, "Operador": false } },
  { id: "usuarios_editar", nombre: "Gestionar Usuarios", permissions: { "Administrador": true, "Editor": false, "Viewer": false, "Operador": false } },
  { id: "auditoria", nombre: "Ver Auditoría", permissions: { "Administrador": true, "Editor": false, "Viewer": false, "Operador": false } },
]

const initialUsers = [
  { id: 1, nombre: "Sebastian Hernandez", email: "sebastian@promotick.com", rol: "Administrador", estado: "Activo" },
  { id: 2, nombre: "Ana García", email: "ana.garcia@promotick.com", rol: "Editor", estado: "Activo" },
  { id: 3, nombre: "Carlos Ruiz", email: "c.ruiz@cliente.com", rol: "Viewer", estado: "Inactivo" },
  { id: 4, nombre: "Maria Lopez", email: "m.lopez@promotick.com", rol: "Operador", estado: "Activo" },
]

export function UsuariosView() {
  const [roles, setRoles] = useState(initialRoles)
  const [permisos, setPermisos] = useState(initialPermisos)
  const [usuarios, setUsuarios] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  
  // User Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [userData, setUserData] = useState({ nombre: "", email: "", rol: "Viewer", estado: "Activo" })

  // Role Modal State
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")

  const handleTogglePermission = (permisoId: string, rol: string) => {
    setPermisos(prev => prev.map(p => {
      if (p.id === permisoId) {
        return {
          ...p,
          permissions: {
            ...p.permissions,
            [rol]: !p.permissions[rol as keyof typeof p.permissions]
          }
        }
      }
      return p
    }))
  }

  const handleSaveUser = () => {
    if (editingUser) {
      setUsuarios(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...userData } : u))
      toast.success("Usuario actualizado correctamente")
    } else {
      const newId = Math.max(...usuarios.map(u => u.id), 0) + 1
      setUsuarios(prev => [...prev, { id: newId, ...userData }])
      toast.success("Usuario creado correctamente")
    }
    setIsUserModalOpen(false)
    setEditingUser(null)
    setUserData({ nombre: "", email: "", rol: "Viewer", estado: "Activo" })
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setUserData({ nombre: user.nombre, email: user.email, rol: user.rol, estado: user.estado })
    setIsUserModalOpen(true)
  }

  const handleDeleteUser = (id: number) => {
    setUsuarios(prev => prev.filter(u => u.id !== id))
    toast.success("Usuario eliminado")
  }

  const handleAddRole = () => {
    if (newRoleName && !roles.includes(newRoleName)) {
      setRoles(prev => [...prev, newRoleName])
      setPermisos(prev => prev.map(p => ({
        ...p,
        permissions: { ...p.permissions, [newRoleName]: false }
      })))
      setIsRoleModalOpen(false)
      setNewRoleName("")
      toast.success(`Rol ${newRoleName} creado`)
    }
  }

  const filteredUsers = usuarios.filter(u => 
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Usuarios y Roles</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Gestiona los permisos y roles de acceso al sistema
          </p>
        </div>
      </div>

      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-4">
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles y Permisos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-[#000000]">Lista de Usuarios</CardTitle>
                <CardDescription>Gestiona las cuentas de acceso de tu equipo</CardDescription>
              </div>
              <Button 
                onClick={() => {
                  setEditingUser(null)
                  setUserData({ nombre: "", email: "", rol: "Viewer", estado: "Activo" })
                  setIsUserModalOpen(true)
                }}
                className="bg-[#E73137] hover:bg-[#AF272F] text-white"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 font-[family-name:var(--font-lato)]"
                  />
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-semibold text-[#000000]">Nombre</TableHead>
                      <TableHead className="font-semibold text-[#000000]">Email</TableHead>
                      <TableHead className="font-semibold text-[#000000]">Rol</TableHead>
                      <TableHead className="font-semibold text-[#000000]">Estado</TableHead>
                      <TableHead className="font-semibold text-[#000000] text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-secondary/30">
                        <TableCell className="font-medium text-[#000000]">{user.nombre}</TableCell>
                        <TableCell className="font-[family-name:var(--font-lato)]">{user.email}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                            {user.rol}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ${
                            user.estado === "Activo" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}>
                            {user.estado}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditUser(user)} className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteUser(user.id)}
                                className="cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#E73137]" />
                  Matriz de Permisos
                </CardTitle>
                <CardDescription>Define qué acciones puede realizar cada rol en el sistema</CardDescription>
              </div>
              <Button onClick={() => setIsRoleModalOpen(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Rol
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-semibold text-[#000000] min-w-[200px]">Permiso</TableHead>
                      {roles.map((rol) => (
                        <TableHead
                          key={rol}
                          className="font-semibold text-[#000000] text-center min-w-[120px]"
                        >
                          <div className="flex flex-col items-center gap-1">
                            {rol}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                if (confirm(`¿Eliminar rol ${rol}?`)) {
                                  setRoles(prev => prev.filter(r => r !== rol))
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permisos.map((permiso) => (
                      <TableRow key={permiso.id} className="hover:bg-secondary/30">
                        <TableCell className="font-medium text-[#000000] font-[family-name:var(--font-lato)]">
                          {permiso.nombre}
                        </TableCell>
                        {roles.map((rol) => (
                          <TableCell key={`${permiso.id}-${rol}`} className="text-center">
                            <div className="flex justify-center">
                              <Checkbox
                                checked={permiso.permissions[rol as keyof typeof permiso.permissions] || false}
                                onCheckedChange={() => handleTogglePermission(permiso.id, rol)}
                                className="data-[state=checked]:bg-[#E73137] data-[state=checked]:border-[#E73137]"
                              />
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button className="bg-[#E73137] hover:bg-[#AF272F] text-white">
                  Guardar Cambios de Permisos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
            <DialogDescription>
              Completa la información para el acceso del colaborador.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input 
                id="name" 
                value={userData.nombre} 
                onChange={(e) => setUserData({...userData, nombre: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={userData.email} 
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Rol</Label>
              <Select value={userData.rol} onValueChange={(v) => setUserData({...userData, rol: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(rol => (
                    <SelectItem key={rol} value={rol}>{rol}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={userData.estado} onValueChange={(v) => setUserData({...userData, estado: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveUser} className="bg-[#E73137] hover:bg-[#AF272F] text-white">
              {editingUser ? "Actualizar" : "Crear Usuario"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Modal */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Nuevo Rol</DialogTitle>
            <DialogDescription>
              Crea un nuevo rol para personalizar los permisos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roleName">Nombre del Rol</Label>
              <Input 
                id="roleName" 
                placeholder="Ej. Auditor Externo"
                value={newRoleName} 
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddRole} className="bg-[#E73137] hover:bg-[#AF272F] text-white">
              Crear Rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
