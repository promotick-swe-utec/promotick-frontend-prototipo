"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Map, 
  FileText, 
  Download, 
  History, 
  Plus,
  Trash2,
  GripVertical,
  Save,
  FileSpreadsheet,
  RefreshCw
} from "lucide-react"

// ==================== Mapeo View ====================
export function MapeoView() {
  const [mappings, setMappings] = useState([
    { id: 1, clientCategory: "Celulares", masterSubcategory: "Tecnología > Smartphones" },
    { id: 2, clientCategory: "Computadoras", masterSubcategory: "Tecnología > Laptops" },
    { id: 3, clientCategory: "Auriculares", masterSubcategory: "Tecnología > Audio" },
    { id: 4, clientCategory: "Electrodomésticos", masterSubcategory: "Hogar > Electrodomésticos" },
    { id: 5, clientCategory: "Cafeteras", masterSubcategory: "Hogar > Cocina" },
  ])

  const masterCategories = [
    "Tecnología > Smartphones",
    "Tecnología > Laptops",
    "Tecnología > Audio",
    "Tecnología > Wearables",
    "Tecnología > Tablets",
    "Hogar > Electrodomésticos",
    "Hogar > Cocina",
    "Hogar > Limpieza",
    "Deportes > Fitness",
    "Deportes > Relojes",
  ]

  const handleAddMapping = () => {
    setMappings([...mappings, { id: Date.now(), clientCategory: "", masterSubcategory: "" }])
  }

  const handleRemoveMapping = (id: number) => {
    setMappings(mappings.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Mapeo de Categorías</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Relaciona las categorías del cliente con tu catálogo maestro
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="cliente1">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cliente1">Falabella Corp</SelectItem>
              <SelectItem value="cliente2">Ripley Chile</SelectItem>
              <SelectItem value="cliente3">Paris Cencosud</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
                <Map className="h-5 w-5 text-[#E73137]" />
                Tabla de Mapeo
              </CardTitle>
              <CardDescription className="font-[family-name:var(--font-lato)]">
                Define cómo se traducen las categorías del cliente a tu sistema
              </CardDescription>
            </div>
            <Button onClick={handleAddMapping} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Añadir Mapeo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[45%]">Categoría del Cliente</TableHead>
                <TableHead className="w-[45%]">Subcategoría Maestra</TableHead>
                <TableHead className="w-[10%] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappings.map((mapping) => (
                <TableRow key={mapping.id}>
                  <TableCell>
                    <Input 
                      value={mapping.clientCategory}
                      placeholder="Ej: Celulares"
                      className="font-[family-name:var(--font-lato)]"
                      onChange={(e) => {
                        setMappings(mappings.map(m => 
                          m.id === mapping.id ? { ...m, clientCategory: e.target.value } : m
                        ))
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={mapping.masterSubcategory}
                      onValueChange={(value) => {
                        setMappings(mappings.map(m => 
                          m.id === mapping.id ? { ...m, masterSubcategory: value } : m
                        ))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar subcategoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {masterCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveMapping(mapping.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6">
            <Button className="bg-[#E73137] hover:bg-[#AF272F] text-white">
              <Save className="h-4 w-4 mr-2" />
              Guardar Mapeo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== Plantillas View ====================
export function PlantillasView() {
  const [columns, setColumns] = useState([
    { id: 1, order: 1, outputName: "SKU", sourceField: "sku_interno" },
    { id: 2, order: 2, outputName: "Nombre Producto", sourceField: "nombre" },
    { id: 3, order: 3, outputName: "Descripción", sourceField: "descripcion" },
    { id: 4, order: 4, outputName: "Categoría", sourceField: "categoria_mapeada" },
    { id: 5, order: 5, outputName: "Precio", sourceField: "precio_venta" },
    { id: 6, order: 6, outputName: "Stock", sourceField: "disponibilidad" },
  ])

  const sourceFields = [
    { value: "sku_interno", label: "SKU Interno" },
    { value: "sku_proveedor", label: "SKU Proveedor" },
    { value: "nombre", label: "Nombre Producto" },
    { value: "descripcion", label: "Descripción" },
    { value: "descripcion_corta", label: "Descripción Corta" },
    { value: "categoria_mapeada", label: "Categoría Mapeada" },
    { value: "categoria_original", label: "Categoría Original" },
    { value: "precio_costo", label: "Precio Costo" },
    { value: "precio_venta", label: "Precio Venta" },
    { value: "disponibilidad", label: "Disponibilidad" },
    { value: "marca", label: "Marca" },
    { value: "imagen_url", label: "URL Imagen" },
  ]

  const handleAddColumn = () => {
    const newOrder = columns.length + 1
    setColumns([...columns, { id: Date.now(), order: newOrder, outputName: "", sourceField: "" }])
  }

  const handleRemoveColumn = (id: number) => {
    setColumns(columns.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Plantillas de Exportación</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Define la estructura de los archivos de salida para cada cliente
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="plantilla1">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar Plantilla" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plantilla1">Plantilla Falabella</SelectItem>
              <SelectItem value="plantilla2">Plantilla Ripley</SelectItem>
              <SelectItem value="plantilla3">Plantilla Estándar</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Nueva Plantilla
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#E73137]" />
                Definición de Columnas
              </CardTitle>
              <CardDescription className="font-[family-name:var(--font-lato)]">
                Configura las columnas que aparecerán en el archivo de exportación
              </CardDescription>
            </div>
            <Button onClick={handleAddColumn} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Añadir Columna
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">Orden</TableHead>
                <TableHead className="w-[35%]">Nombre Columna Salida</TableHead>
                <TableHead className="w-[35%]">Campo Origen BD</TableHead>
                <TableHead className="w-[20%] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((column, index) => (
                <TableRow key={column.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={column.outputName}
                      placeholder="Ej: Nombre Producto"
                      className="font-[family-name:var(--font-lato)]"
                      onChange={(e) => {
                        setColumns(columns.map(c => 
                          c.id === column.id ? { ...c, outputName: e.target.value } : c
                        ))
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={column.sourceField}
                      onValueChange={(value) => {
                        setColumns(columns.map(c => 
                          c.id === column.id ? { ...c, sourceField: value } : c
                        ))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar campo" />
                      </SelectTrigger>
                      <SelectContent>
                        {sourceFields.map((field) => (
                          <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveColumn(column.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6 gap-2">
            <Button variant="outline">
              Vista Previa
            </Button>
            <Button className="bg-[#E73137] hover:bg-[#AF272F] text-white">
              <Save className="h-4 w-4 mr-2" />
              Guardar Plantilla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== Exportar View ====================
export function ExportarView() {
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [format, setFormat] = useState("xlsx")

  const exportHistory = [
    { id: 1, client: "Falabella Corp", date: "15/01/2024 14:30", products: 1245, format: "XLSX", status: "Completado" },
    { id: 2, client: "Ripley Chile", date: "15/01/2024 10:15", products: 890, format: "CSV", status: "Completado" },
    { id: 3, client: "Paris Cencosud", date: "14/01/2024 16:45", products: 2100, format: "XLSX", status: "Completado" },
    { id: 4, client: "Falabella Corp", date: "14/01/2024 09:00", products: 567, format: "XLSX", status: "Procesando" },
  ]

  const productCount = 1432

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#000000]">Generar Exportación</h1>
        <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
          Crea archivos de catálogo personalizados para tus clientes
        </p>
      </div>

      {/* Export Form */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
            <Download className="h-5 w-5 text-[#E73137]" />
            Nueva Exportación
          </CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            Configura los parámetros para generar el archivo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 grid-cols-3">
            <div className="space-y-2">
              <Label className="text-[#000000] font-medium">Seleccionar Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Elegir cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="falabella">Falabella Corp</SelectItem>
                  <SelectItem value="ripley">Ripley Chile</SelectItem>
                  <SelectItem value="paris">Paris Cencosud</SelectItem>
                  <SelectItem value="lider">Lider Walmart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#000000] font-medium">Categorías a Incluir</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  <SelectItem value="tecnologia">Tecnología</SelectItem>
                  <SelectItem value="hogar">Hogar</SelectItem>
                  <SelectItem value="deportes">Deportes</SelectItem>
                  <SelectItem value="moda">Moda</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#000000] font-medium">Formato de Archivo</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Count */}
          <div className="flex items-center justify-between p-4 bg-[#E73137]/10 rounded-lg">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-8 w-8 text-[#E73137]" />
              <div>
                <p className="font-medium text-[#000000]">Productos listos para exportar</p>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
                  Basado en los filtros seleccionados
                </p>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#E73137]">{productCount.toLocaleString()}</p>
          </div>

          <Button className="w-full h-12 bg-[#E73137] hover:bg-[#AF272F] text-white text-lg font-semibold">
            <Download className="h-5 w-5 mr-2" />
            Generar Archivo
          </Button>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
                <History className="h-5 w-5 text-[#E73137]" />
                Historial de Exportaciones
              </CardTitle>
              <CardDescription className="font-[family-name:var(--font-lato)]">
                Últimas exportaciones generadas
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Actualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exportHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.client}</TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                  <TableCell>{item.products.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.format}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        item.status === "Completado" 
                          ? "bg-[#666666]/20 text-[#000000] hover:bg-[#666666]/30" 
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-[#E73137]"
                      disabled={item.status === "Procesando"}
                    >
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

// ==================== Auditoría View ====================
export function AuditoriaView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#000000]">Auditoría</h1>
        <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
          Registro de todas las acciones realizadas en el sistema
        </p>
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
            <History className="h-5 w-5 text-[#E73137]" />
            Historial de Actividad
          </CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            Últimas acciones registradas en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Carga de Excel", user: "Admin User", time: "Hace 5 min", details: "150 productos de Amazon" },
              { action: "Aprobación de lote", user: "Admin User", time: "Hace 1 hora", details: "Lote #1233 aprobado" },
              { action: "Nuevo cliente", user: "Admin User", time: "Hace 2 horas", details: "Falabella Corp registrado" },
              { action: "Exportación", user: "Editor User", time: "Hace 3 horas", details: "Catálogo Ripley exportado" },
              { action: "Edición de categoría", user: "Admin User", time: "Hace 5 horas", details: "Smart Home añadida" },
              { action: "Login exitoso", user: "Viewer User", time: "Hace 6 horas", details: "Acceso desde 192.168.1.100" },
              { action: "Actualización de permisos", user: "Admin User", time: "Hace 8 horas", details: "Rol Operador modificado" },
            ].map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#000000]/10 flex items-center justify-center">
                    <History className="h-5 w-5 text-[#000000]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#000000]">{log.action}</p>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
                      {log.details}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#000000]">{log.user}</p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-lato)]">
                    {log.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
