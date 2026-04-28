"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Filter } from "lucide-react"

const proveedores = [
  {
    id: 1,
    nombre: "Amazon",
    contacto: "Juan Pérez",
    email: "juan.perez@amazon.com",
    productos: 3245,
    estado: "activo",
    ultimaCarga: "2024-01-15",
  },
  {
    id: 2,
    nombre: "Ripley",
    contacto: "María González",
    email: "maria.gonzalez@ripley.com",
    productos: 2180,
    estado: "activo",
    ultimaCarga: "2024-01-14",
  },
  {
    id: 3,
    nombre: "Sodimac",
    contacto: "Carlos Rodríguez",
    email: "carlos.rodriguez@sodimac.com",
    productos: 1890,
    estado: "activo",
    ultimaCarga: "2024-01-13",
  },
  {
    id: 4,
    nombre: "Falabella",
    contacto: "Ana Martínez",
    email: "ana.martinez@falabella.com",
    productos: 1654,
    estado: "inactivo",
    ultimaCarga: "2024-01-10",
  },
  {
    id: 5,
    nombre: "Paris",
    contacto: "Pedro Sánchez",
    email: "pedro.sanchez@paris.cl",
    productos: 1432,
    estado: "activo",
    ultimaCarga: "2024-01-12",
  },
  {
    id: 6,
    nombre: "Lider",
    contacto: "Laura Torres",
    email: "laura.torres@lider.cl",
    productos: 987,
    estado: "activo",
    ultimaCarga: "2024-01-11",
  },
  {
    id: 7,
    nombre: "Cencosud",
    contacto: "Roberto Díaz",
    email: "roberto.diaz@cencosud.com",
    productos: 876,
    estado: "pendiente",
    ultimaCarga: "2024-01-09",
  },
  {
    id: 8,
    nombre: "Easy",
    contacto: "Carmen López",
    email: "carmen.lopez@easy.cl",
    productos: 654,
    estado: "activo",
    ultimaCarga: "2024-01-08",
  },
]

export function ProveedoresView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const filteredProveedores = proveedores.filter((proveedor) => {
    const matchesSearch =
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || proveedor.estado === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>
      case "inactivo":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactivo</Badge>
      case "pendiente":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Proveedores</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Gestiona los proveedores de tu catálogo de productos
          </p>
        </div>
        <Button className="bg-[#E73137] hover:bg-[#AF272F] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      {/* Filters Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, contacto o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-[family-name:var(--font-lato)] focus-visible:ring-[#E73137]"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activos</SelectItem>
                  <SelectItem value="inactivo">Inactivos</SelectItem>
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000]">Lista de Proveedores</CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            {filteredProveedores.length} proveedores encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-semibold text-[#000000]">Nombre</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Contacto</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Email</TableHead>
                  <TableHead className="font-semibold text-[#000000] text-center">Productos</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Estado</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Última Carga</TableHead>
                  <TableHead className="font-semibold text-[#000000] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProveedores.map((proveedor) => (
                  <TableRow key={proveedor.id} className="hover:bg-secondary/30">
                    <TableCell className="font-medium text-[#000000]">{proveedor.nombre}</TableCell>
                    <TableCell className="font-[family-name:var(--font-lato)]">{proveedor.contacto}</TableCell>
                    <TableCell className="font-[family-name:var(--font-lato)] text-muted-foreground">
                      {proveedor.email}
                    </TableCell>
                    <TableCell className="text-center font-[family-name:var(--font-lato)]">
                      {proveedor.productos.toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(proveedor.estado)}</TableCell>
                    <TableCell className="font-[family-name:var(--font-lato)] text-muted-foreground">
                      {new Date(proveedor.ultimaCarga).toLocaleDateString("es-CL")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
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
    </div>
  )
}
