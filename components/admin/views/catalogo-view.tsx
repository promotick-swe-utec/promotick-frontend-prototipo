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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Filter, 
  Download, 
  Package, 
  History, 
  FileText, 
  TrendingUp,
  Scale,
  Maximize
} from "lucide-react"

// Mock data based on Product Table (PDF Page 20)
const productosMaestros = [
  { 
    id: 1, 
    netsuite_code: "NS-TE-01-0001",
    sku: "IPH15PM-256", 
    ean: "194253701234",
    nombre: "iPhone 15 Pro Max 256GB Titanium", 
    display_name: "Apple iPhone 15 Pro Max",
    proveedor_preferido: "Amazon", 
    categoria: "Tecnología", 
    subcategoria: "Smartphones",
    marca: "Apple",
    precio: 1199.00, 
    estado: "activo",
    stock: 45,
    imagen: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=200&auto=format&fit=crop",
    detalles: {
      peso: "0.221 kg",
      dimensiones: "15.9 x 7.6 x 0.8 cm",
      descripcion_corta: "El iPhone más potente con acabado en titanio.",
      descripcion_larga: "Diseño de titanio de calidad aeroespacial, el chip A17 Pro más avanzado hasta la fecha y sistema de cámaras Pro.",
      tax_type: "Estándar",
      volumetric_weight: "0.45 kg"
    }
  },
  { 
    id: 2, 
    netsuite_code: "NS-TE-02-0042",
    sku: "MBA-M3-13", 
    ean: "194253705678",
    nombre: "MacBook Air M3 13\" 8GB 256GB", 
    display_name: "MacBook Air M3 13-inch",
    proveedor_preferido: "Ripley", 
    categoria: "Tecnología", 
    subcategoria: "Laptops",
    marca: "Apple",
    precio: 1099.00, 
    estado: "activo",
    stock: 23,
    imagen: "https://images.unsplash.com/photo-1517336712468-0611e7d206f3?q=80&w=200&auto=format&fit=crop",
    detalles: {
      peso: "1.24 kg",
      dimensiones: "30.4 x 21.5 x 1.1 cm",
      descripcion_corta: "Superligera. Superpotente con M3.",
      descripcion_larga: "La laptop más popular del mundo es ahora aún mejor con el chip M3 y hasta 18 horas de batería.",
      tax_type: "Estándar",
      volumetric_weight: "2.1 kg"
    }
  },
  { 
    id: 3, 
    netsuite_code: "NS-MO-01-0128",
    sku: "NIKE-AM90-01", 
    ean: "088605901234",
    nombre: "Nike Air Max 90 White/Red", 
    display_name: "Zapatillas Nike Air Max 90",
    proveedor_preferido: "Falabella", 
    categoria: "Moda", 
    subcategoria: "Calzado",
    marca: "Nike",
    precio: 150.00, 
    estado: "activo",
    stock: 120,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop",
    detalles: {
      peso: "0.8 kg",
      dimensiones: "35 x 25 x 12 cm",
      descripcion_corta: "Un clásico que nunca pasa de moda.",
      descripcion_larga: "Nada tan ligero, cómodo y probado. El Nike Air Max 90 se mantiene fiel a sus raíces con la icónica suela tipo waffle.",
      tax_type: "Estándar",
      volumetric_weight: "1.5 kg"
    }
  }
]

const historialPrecios = [
  { fecha: "2024-04-20", proveedor: "Amazon", precio: 1199.00, estado: "Actual" },
  { fecha: "2024-03-15", proveedor: "Amazon", precio: 1249.00, estado: "Anterior" },
  { fecha: "2024-02-10", proveedor: "GlobalTech", precio: 1299.00, estado: "Anterior" },
]

const auditLog = [
  { fecha: "2024-04-25 10:30", usuario: "Sebastian Hernandez", accion: "Actualización de stock", detalle: "De 40 a 45 unidades" },
  { fecha: "2024-04-20 15:20", usuario: "IA - Claude", accion: "Enriquecimiento", detalle: "Se autocompletó descripción larga y dimensiones" },
  { fecha: "2024-04-01 09:00", usuario: "Admin System", accion: "Creación", detalle: "Producto registrado vía Excel" },
]

export function CatalogoView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredProductos = productosMaestros.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.netsuite_code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Activo</Badge>
      case "bajo_stock":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Bajo Stock</Badge>
      case "agotado":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Agotado</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const handleVerDetalle = (producto: any) => {
    setSelectedProduct(producto)
    setIsDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Catálogo Maestro de Productos</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Consulta y gestiona la base maestra consolidada de Promotick
          </p>
        </div>
        <Button variant="outline" className="border-[#E73137] text-[#E73137] hover:bg-[#E73137]/10">
          <Download className="mr-2 h-4 w-4" />
          Exportar Excel (M13)
        </Button>
      </div>

      {/* Advanced Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por SKU, EAN, Nombre o Código NetSuite..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-[family-name:var(--font-lato)] focus-visible:ring-[#E73137]"
              />
            </div>
            <Select defaultValue="todas">
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="moda">Moda</SelectItem>
                <SelectItem value="hogar">Hogar</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="todos">
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="w-[80px]"></TableHead>
                <TableHead className="font-semibold text-[#000000]">Cód. NetSuite</TableHead>
                <TableHead className="font-semibold text-[#000000]">Producto</TableHead>
                <TableHead className="font-semibold text-[#000000]">Marca</TableHead>
                <TableHead className="font-semibold text-[#000000] text-right">Precio Ref.</TableHead>
                <TableHead className="font-semibold text-[#000000] text-center">Stock</TableHead>
                <TableHead className="font-semibold text-[#000000]">Estado</TableHead>
                <TableHead className="font-semibold text-[#000000] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProductos.map((p) => (
                <TableRow key={p.id} className="hover:bg-secondary/30 transition-colors">
                  <TableCell>
                    <div className="h-12 w-12 rounded-md border bg-white overflow-hidden flex items-center justify-center">
                      <img src={p.imagen} alt={p.nombre} className="h-full w-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-[#E73137]">
                    {p.netsuite_code}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#000000]">{p.nombre}</span>
                      <span className="text-xs text-muted-foreground font-mono uppercase">{p.sku}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{p.marca}</TableCell>
                  <TableCell className="text-right font-bold text-[#000000]">
                    S/ {p.precio.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-center font-[family-name:var(--font-lato)]">
                    {p.stock}
                  </TableCell>
                  <TableCell>{getStatusBadge(p.estado)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleVerDetalle(p)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalle (P07)
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Historial Precios
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Desactivar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail View Dialog (P07 - Vista Detalle) */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg border bg-white overflow-hidden">
                <img src={selectedProduct?.imagen} className="h-full w-full object-cover" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{selectedProduct?.display_name}</DialogTitle>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-[#E73137] border-[#E73137]">{selectedProduct?.netsuite_code}</Badge>
                  <Badge variant="secondary">{selectedProduct?.categoria} / {selectedProduct?.subcategoria}</Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="ficha" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ficha" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ficha Técnica
              </TabsTrigger>
              <TabsTrigger value="precios" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Historial de Precios
              </TabsTrigger>
              <TabsTrigger value="auditoria" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Auditoría
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ficha" className="pt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Información General</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-muted-foreground">SKU Interno:</span>
                    <span className="font-medium">{selectedProduct?.sku}</span>
                    <span className="text-muted-foreground">Código EAN:</span>
                    <span className="font-medium">{selectedProduct?.ean}</span>
                    <span className="text-muted-foreground">Marca:</span>
                    <span className="font-medium">{selectedProduct?.marca}</span>
                    <span className="text-muted-foreground">Tipo Impuesto:</span>
                    <span className="font-medium">{selectedProduct?.detalles.tax_type}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Logística y Medidas</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Scale className="h-3 w-3" /> Peso Real:
                    </div>
                    <span className="font-medium">{selectedProduct?.detalles.peso}</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Maximize className="h-3 w-3" /> Dimensiones:
                    </div>
                    <span className="font-medium">{selectedProduct?.detalles.dimensiones}</span>
                    <span className="text-muted-foreground">Peso Volumétrico:</span>
                    <span className="font-medium">{selectedProduct?.detalles.volumetric_weight}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground">Descripciones Enriquecidas (M05)</h3>
                <div className="p-3 bg-secondary/30 rounded-lg text-sm italic">
                  {selectedProduct?.detalles.descripcion_larga}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="precios" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha Vigencia</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead className="text-right">Precio (S/)</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historialPrecios.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm">{h.fecha}</TableCell>
                      <TableCell className="text-sm">{h.proveedor}</TableCell>
                      <TableCell className="text-right font-semibold">S/ {h.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={h.estado === "Actual" ? "default" : "secondary"}>
                          {h.estado}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="auditoria" className="pt-4">
              <div className="space-y-4">
                {auditLog.map((log, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 border rounded-lg bg-secondary/10">
                    <div className="h-8 w-8 rounded-full bg-[#E73137]/10 flex items-center justify-center text-[#E73137]">
                      <History className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{log.accion}</span>
                        <span className="text-xs text-muted-foreground">{log.fecha}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Usuario: {log.usuario}</p>
                      <p className="text-sm mt-1">{log.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
