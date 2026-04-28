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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Mail } from "lucide-react"

const clientes = [
  { id: 1, nombre: "Ripley Corp", contacto: "Carolina Mendez", email: "cmendez@ripley.com", productos: 2500, plan: "Enterprise", estado: "activo", ultimaActividad: "2024-01-15" },
  { id: 2, nombre: "Falabella Retail", contacto: "Andrés Silva", email: "asilva@falabella.com", productos: 1800, plan: "Business", estado: "activo", ultimaActividad: "2024-01-14" },
  { id: 3, nombre: "Cencosud S.A.", contacto: "Paula Rojas", email: "projas@cencosud.com", productos: 3200, plan: "Enterprise", estado: "activo", ultimaActividad: "2024-01-13" },
  { id: 4, nombre: "SMU Chile", contacto: "Roberto Díaz", email: "rdiaz@smu.cl", productos: 1200, plan: "Business", estado: "inactivo", ultimaActividad: "2024-01-05" },
  { id: 5, nombre: "Walmart Chile", contacto: "Mariana Torres", email: "mtorres@walmart.cl", productos: 4500, plan: "Enterprise", estado: "activo", ultimaActividad: "2024-01-15" },
  { id: 6, nombre: "Paris S.A.", contacto: "Felipe Vargas", email: "fvargas@paris.cl", productos: 890, plan: "Starter", estado: "activo", ultimaActividad: "2024-01-12" },
  { id: 7, nombre: "Easy Retail", contacto: "Valentina Castro", email: "vcastro@easy.cl", productos: 650, plan: "Starter", estado: "pendiente", ultimaActividad: "2024-01-10" },
  { id: 8, nombre: "Mercado Libre", contacto: "Diego Fernández", email: "dfernandez@mercadolibre.cl", productos: 5600, plan: "Enterprise", estado: "activo", ultimaActividad: "2024-01-15" },
]

export function ClientesView() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-[#AF272F]/10 text-[#AF272F] hover:bg-[#AF272F]/10">{plan}</Badge>
      case "Business":
        return <Badge className="bg-[#E73137]/10 text-[#E73137] hover:bg-[#E73137]/10">{plan}</Badge>
      default:
        return <Badge variant="secondary">{plan}</Badge>
    }
  }

  const getInitials = (nombre: string) => {
    return nombre
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Clientes</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Gestiona las empresas que utilizan tu catálogo
          </p>
        </div>
        <Button className="bg-[#E73137] hover:bg-[#AF272F] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Search Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, contacto o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-[family-name:var(--font-lato)] focus-visible:ring-[#E73137]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000]">Lista de Clientes</CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            {filteredClientes.length} clientes registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-semibold text-[#000000]">Cliente</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Contacto</TableHead>
                  <TableHead className="font-semibold text-[#000000] text-center">Productos</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Plan</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Estado</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Última Actividad</TableHead>
                  <TableHead className="font-semibold text-[#000000] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id} className="hover:bg-secondary/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-[#000000] text-white text-sm">
                            {getInitials(cliente.nombre)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[#000000]">{cliente.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium font-[family-name:var(--font-lato)]">{cliente.contacto}</p>
                        <p className="text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
                          {cliente.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-[#000000]">
                      {cliente.productos.toLocaleString()}
                    </TableCell>
                    <TableCell>{getPlanBadge(cliente.plan)}</TableCell>
                    <TableCell>{getStatusBadge(cliente.estado)}</TableCell>
                    <TableCell className="font-[family-name:var(--font-lato)] text-muted-foreground">
                      {new Date(cliente.ultimaActividad).toLocaleDateString("es-CL")}
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
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" />
                            Enviar Email
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
