"use client"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Package, 
  Download, 
  TrendingUp, 
  Gift, 
  Search,
  FileSpreadsheet,
  Eye,
  Calendar
} from "lucide-react"

// ==================== Mi Dashboard ====================
export function MiDashboardView() {
  const stats = [
    { label: "Productos Disponibles", value: "1,245", icon: Package, trend: "+12 esta semana" },
    { label: "Puntos Acumulados", value: "15,800", icon: Gift, trend: "Próximo nivel: 20,000" },
    { label: "Descargas Este Mes", value: "8", icon: Download, trend: "+3 vs mes anterior" },
    { label: "Categorías Activas", value: "12", icon: TrendingUp, trend: "De 15 disponibles" },
  ]

  const recentDownloads = [
    { name: "Catálogo Tecnología Q1", date: "15/01/2024", products: 342, format: "XLSX" },
    { name: "Productos Hogar", date: "10/01/2024", products: 156, format: "CSV" },
    { name: "Catálogo Completo", date: "05/01/2024", products: 1245, format: "XLSX" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#000000]">Mi Dashboard</h1>
        <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
          Resumen de tu cuenta y actividad reciente
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground font-[family-name:var(--font-lato)]">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-[#000000]">{stat.value}</p>
                    <p className="text-xs text-[#E73137] mt-1 font-[family-name:var(--font-lato)]">
                      {stat.trend}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-[#E73137]/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-[#E73137]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Downloads */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000]">Descargas Recientes</CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            Tus últimas exportaciones de catálogo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDownloads.map((download, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{download.name}</TableCell>
                  <TableCell className="text-muted-foreground">{download.date}</TableCell>
                  <TableCell>{download.products}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{download.format}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="text-[#E73137]">
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== Mi Catálogo ====================
export function MiCatalogoView() {
  const productos = [
    { id: 1, sku: "TECH-001", nombre: "iPhone 15 Pro Max 256GB", categoria: "Tecnología > Smartphones", precio: "$1,199", stock: "Disponible" },
    { id: 2, sku: "TECH-002", nombre: "MacBook Air M3 13\"", categoria: "Tecnología > Laptops", precio: "$1,299", stock: "Disponible" },
    { id: 3, sku: "HOME-001", nombre: "Dyson V15 Detect", categoria: "Hogar > Electrodomésticos", precio: "$749", stock: "Disponible" },
    { id: 4, sku: "TECH-003", nombre: "Sony WH-1000XM5", categoria: "Tecnología > Audio", precio: "$349", stock: "Limitado" },
    { id: 5, sku: "HOME-002", nombre: "Nespresso Vertuo Plus", categoria: "Hogar > Cocina", precio: "$179", stock: "Disponible" },
    { id: 6, sku: "TECH-004", nombre: "Apple Watch Series 9", categoria: "Tecnología > Wearables", precio: "$399", stock: "Disponible" },
    { id: 7, sku: "SPORT-001", nombre: "Garmin Fenix 7X", categoria: "Deportes > Relojes", precio: "$899", stock: "Disponible" },
    { id: 8, sku: "HOME-003", nombre: "iRobot Roomba j7+", categoria: "Hogar > Limpieza", precio: "$799", stock: "Limitado" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Mi Catálogo</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Explora los productos disponibles para tu plan
          </p>
        </div>
        <Button className="bg-[#E73137] hover:bg-[#AF272F] text-white">
          <Download className="mr-2 h-4 w-4" />
          Exportar Catálogo
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10 font-[family-name:var(--font-lato)]"
              />
            </div>
            <Select defaultValue="todas">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="hogar">Hogar</SelectItem>
                <SelectItem value="deportes">Deportes</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="todos">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="limitado">Limitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio Ref.</TableHead>
                <TableHead>Disponibilidad</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell className="font-mono text-sm">{producto.sku}</TableCell>
                  <TableCell className="font-medium">{producto.nombre}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{producto.categoria}</TableCell>
                  <TableCell>{producto.precio}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={producto.stock === "Disponible" ? "default" : "secondary"}
                      className={producto.stock === "Disponible" ? "bg-[#666666]/20 text-[#000000] hover:bg-[#666666]/30" : ""}
                    >
                      {producto.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="text-[#E73137]">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== Mis Descargas ====================
export function MisDescargasView() {
  const descargas = [
    { id: 1, nombre: "Catálogo Tecnología Q1 2024", fecha: "15/01/2024", productos: 342, formato: "XLSX", tamano: "2.4 MB", estado: "Completado" },
    { id: 2, nombre: "Productos Hogar Enero", fecha: "10/01/2024", productos: 156, formato: "CSV", tamano: "890 KB", estado: "Completado" },
    { id: 3, nombre: "Catálogo Completo 2024", fecha: "05/01/2024", productos: 1245, formato: "XLSX", tamano: "8.2 MB", estado: "Completado" },
    { id: 4, nombre: "Novedades Diciembre", fecha: "20/12/2023", productos: 89, formato: "XLSX", tamano: "1.1 MB", estado: "Completado" },
    { id: 5, nombre: "Catálogo Deportes", fecha: "15/12/2023", productos: 234, formato: "CSV", tamano: "1.5 MB", estado: "Completado" },
    { id: 6, nombre: "Black Friday 2023", fecha: "24/11/2023", productos: 567, formato: "XLSX", tamano: "4.3 MB", estado: "Expirado" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Mis Descargas</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Historial de exportaciones de tu catálogo
          </p>
        </div>
        <Button variant="outline" className="border-[#E73137] text-[#E73137] hover:bg-[#E73137]/10">
          <Calendar className="mr-2 h-4 w-4" />
          Filtrar por Fecha
        </Button>
      </div>

      {/* Downloads Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-[#000000]">Historial de Exportaciones</CardTitle>
              <CardDescription className="font-[family-name:var(--font-lato)]">
                Los archivos están disponibles por 30 días
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              <FileSpreadsheet className="h-4 w-4 mr-1" />
              {descargas.length} archivos
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Archivo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {descargas.map((descarga) => (
                <TableRow key={descarga.id}>
                  <TableCell className="font-medium">{descarga.nombre}</TableCell>
                  <TableCell className="text-muted-foreground">{descarga.fecha}</TableCell>
                  <TableCell>{descarga.productos.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{descarga.formato}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{descarga.tamano}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={descarga.estado === "Completado" ? "default" : "secondary"}
                      className={descarga.estado === "Completado" 
                        ? "bg-[#666666]/20 text-[#000000] hover:bg-[#666666]/30" 
                        : "bg-gray-100 text-gray-500"
                      }
                    >
                      {descarga.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-[#E73137]"
                      disabled={descarga.estado === "Expirado"}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      {descarga.estado === "Expirado" ? "Expirado" : "Descargar"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
