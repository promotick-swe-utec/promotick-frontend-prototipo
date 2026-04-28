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
import { Search, MoreHorizontal, Edit, Trash2, Eye, Filter, Download } from "lucide-react"

const productos = [
  { id: 1, sku: "PRD-001", nombre: "iPhone 15 Pro Max 256GB", proveedor: "Amazon", categoria: "Tecnología", precio: 1199, stock: 45, estado: "activo" },
  { id: 2, sku: "PRD-002", nombre: "MacBook Air M3 13\"", proveedor: "Ripley", categoria: "Tecnología", precio: 1299, stock: 23, estado: "activo" },
  { id: 3, sku: "PRD-003", nombre: "Nike Air Max 90", proveedor: "Falabella", categoria: "Moda", precio: 150, stock: 120, estado: "activo" },
  { id: 4, sku: "PRD-004", nombre: "Sofá Seccional Gris", proveedor: "Sodimac", categoria: "Hogar", precio: 899, stock: 8, estado: "bajo_stock" },
  { id: 5, sku: "PRD-005", nombre: "PlayStation 5 Digital", proveedor: "Amazon", categoria: "Gaming", precio: 449, stock: 0, estado: "agotado" },
  { id: 6, sku: "PRD-006", nombre: "Samsung Galaxy S24", proveedor: "Paris", categoria: "Tecnología", precio: 999, stock: 67, estado: "activo" },
  { id: 7, sku: "PRD-007", nombre: "Bicicleta MTB Aro 29", proveedor: "Lider", categoria: "Deportes", precio: 450, stock: 15, estado: "activo" },
  { id: 8, sku: "PRD-008", nombre: "Cafetera Nespresso Vertuo", proveedor: "Ripley", categoria: "Hogar", precio: 199, stock: 34, estado: "activo" },
  { id: 9, sku: "PRD-009", nombre: "Lego Star Wars Millennium", proveedor: "Amazon", categoria: "Juguetes", precio: 849, stock: 5, estado: "bajo_stock" },
  { id: 10, sku: "PRD-010", nombre: "AirPods Pro 2da Gen", proveedor: "Falabella", categoria: "Tecnología", precio: 249, stock: 89, estado: "activo" },
]

export function CatalogoView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("todas")
  const [estadoFilter, setEstadoFilter] = useState("todos")

  const filteredProductos = productos.filter((producto) => {
    const matchesSearch =
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = categoriaFilter === "todas" || producto.categoria === categoriaFilter
    const matchesEstado = estadoFilter === "todos" || producto.estado === estadoFilter
    return matchesSearch && matchesCategoria && matchesEstado
  })

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>
      case "bajo_stock":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Bajo Stock</Badge>
      case "agotado":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Agotado</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Catálogo Maestro</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Gestiona todos los productos de tu catálogo
          </p>
        </div>
        <Button variant="outline" className="border-[#E73137] text-[#E73137] hover:bg-[#E73137]/10">
          <Download className="mr-2 h-4 w-4" />
          Exportar Catálogo
        </Button>
      </div>

      {/* Filters Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, SKU o proveedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-[family-name:var(--font-lato)] focus-visible:ring-[#E73137]"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="activo">Activos</SelectItem>
                  <SelectItem value="bajo_stock">Bajo Stock</SelectItem>
                  <SelectItem value="agotado">Agotados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000]">Productos</CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            {filteredProductos.length} productos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="font-semibold text-[#000000]">SKU</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Producto</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Proveedor</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Categoría</TableHead>
                  <TableHead className="font-semibold text-[#000000] text-right">Precio</TableHead>
                  <TableHead className="font-semibold text-[#000000] text-center">Stock</TableHead>
                  <TableHead className="font-semibold text-[#000000]">Estado</TableHead>
                  <TableHead className="font-semibold text-[#000000] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProductos.map((producto) => (
                  <TableRow key={producto.id} className="hover:bg-secondary/30">
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {producto.sku}
                    </TableCell>
                    <TableCell className="font-medium text-[#000000] max-w-[250px] truncate">
                      {producto.nombre}
                    </TableCell>
                    <TableCell className="font-[family-name:var(--font-lato)]">
                      {producto.proveedor}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-[family-name:var(--font-lato)]">
                        {producto.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-[#000000]">
                      ${producto.precio.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center font-[family-name:var(--font-lato)]">
                      {producto.stock}
                    </TableCell>
                    <TableCell>{getStatusBadge(producto.estado)}</TableCell>
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
