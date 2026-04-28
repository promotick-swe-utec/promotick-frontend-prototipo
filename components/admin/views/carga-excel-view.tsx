"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Upload, FileSpreadsheet, ArrowRight, Check, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const columnasSistema = [
  "SKU",
  "Nombre del Producto",
  "Descripción",
  "Precio",
  "Categoría",
  "Subcategoría",
  "Stock",
  "Imagen URL",
  "Marca",
]

const columnasExcel = [
  "product_id",
  "title",
  "description",
  "price_usd",
  "main_category",
  "sub_category",
  "inventory",
  "image_link",
  "brand_name",
]

export function CargaExcelView() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [mappings, setMappings] = useState<Record<string, string>>({})

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls") || droppedFile.name.endsWith(".csv"))) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setMappings({})
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#000000]">Carga de Excel</h1>
        <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
          Sube archivos Excel o CSV para importar productos al catálogo
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000]">Subir Archivo</CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            Arrastra y suelta tu archivo o haz clic para seleccionar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer",
                isDragging
                  ? "border-[#E73137] bg-[#E73137]/5"
                  : "border-muted-foreground/25 hover:border-[#E73137] hover:bg-secondary/50"
              )}
            >
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#E73137]/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-[#E73137]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000]">
                      Arrastra tu archivo aquí
                    </p>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-lato)] mt-1">
                      o haz clic para seleccionar
                    </p>
                  </div>
                  <Badge variant="secondary" className="font-[family-name:var(--font-lato)]">
                    .xlsx, .xls, .csv
                  </Badge>
                </div>
              </label>
            </div>
          ) : (
            <div className="border rounded-xl p-6 bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileSpreadsheet className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000]">{file.name}</p>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <Check className="mr-1 h-3 w-3" />
                    Cargado
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveFile}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Column Mapping */}
      {file && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div>
              <CardTitle className="text-lg text-[#000000]">Mapeo de Columnas</CardTitle>
              <CardDescription className="font-[family-name:var(--font-lato)]">
                Relaciona las columnas del Excel con los campos del sistema
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold text-[#000000]">Campo del Sistema</TableHead>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="font-semibold text-[#000000]">Columna del Excel</TableHead>
                    <TableHead className="font-semibold text-[#000000] text-center">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {columnasSistema.map((columna) => (
                    <TableRow key={columna} className="hover:bg-secondary/30">
                      <TableCell className="font-medium text-[#000000]">{columna}</TableCell>
                      <TableCell>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={mappings[columna] || ""}
                          onValueChange={(value) =>
                            setMappings({ ...mappings, [columna]: value })
                          }
                        >
                          <SelectTrigger className="w-full max-w-[250px] font-[family-name:var(--font-lato)]">
                            <SelectValue placeholder="Seleccionar columna" />
                          </SelectTrigger>
                          <SelectContent>
                            {columnasExcel.map((col) => (
                              <SelectItem key={col} value={col}>
                                {col}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center">
                        {mappings[columna] ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <Check className="mr-1 h-3 w-3" />
                            Mapeado
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Pendiente
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleRemoveFile}>
                Cancelar
              </Button>
              <Button
                className="bg-[#E73137] hover:bg-[#AF272F] text-white"
                disabled={Object.keys(mappings).length < columnasSistema.length}
              >
                Procesar Archivo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
