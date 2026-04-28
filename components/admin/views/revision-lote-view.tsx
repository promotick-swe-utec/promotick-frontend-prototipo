"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye, Package } from "lucide-react"

interface Product {
  id: number
  sku: string
  nombre: string
  precio: number
  categoria: string
  imagen: string
}

const nuevosProductos: Product[] = [
  { id: 1, sku: "AMZ-001", nombre: "iPhone 15 Pro Max 256GB", precio: 1199, categoria: "Tecnología", imagen: "/placeholder.svg?height=80&width=80" },
  { id: 2, sku: "AMZ-002", nombre: "MacBook Air M3 13 pulgadas", precio: 1299, categoria: "Tecnología", imagen: "/placeholder.svg?height=80&width=80" },
  { id: 3, sku: "AMZ-003", nombre: "AirPods Pro 2da Generación", precio: 249, categoria: "Tecnología", imagen: "/placeholder.svg?height=80&width=80" },
  { id: 4, sku: "AMZ-004", nombre: "Samsung Galaxy S24 Ultra", precio: 1099, categoria: "Tecnología", imagen: "/placeholder.svg?height=80&width=80" },
  { id: 5, sku: "AMZ-005", nombre: "Sony WH-1000XM5 Auriculares", precio: 399, categoria: "Tecnología", imagen: "/placeholder.svg?height=80&width=80" },
]

export function RevisionLoteView() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Revisión de Lote</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Revisa y aprueba los productos del último lote cargado
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-[#000000] text-white text-sm py-1 px-3">
            Lote #1234
          </Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3 font-[family-name:var(--font-lato)]">
            Amazon - 15 Ene 2024
          </Badge>
        </div>
      </div>

      {/* Products List */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
                <Package className="h-5 w-5 text-[#E73137]" />
                Productos del Lote ({nuevosProductos.length})
              </CardTitle>
              <CardDescription className="font-[family-name:var(--font-lato)]">
                Revisa cada producto antes de agregarlo al catálogo
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <X className="mr-2 h-4 w-4" />
                Rechazar Todos
              </Button>
              <Button size="sm" className="bg-[#E73137] hover:bg-[#AF272F] text-white">
                <Check className="mr-2 h-4 w-4" />
                Aprobar Todos
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nuevosProductos.map((producto) => (
              <div
                key={producto.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="h-16 w-16 rounded-lg object-cover bg-secondary"
                  />
                  <div>
                    <p className="font-semibold text-[#000000]">{producto.nombre}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="secondary" className="font-[family-name:var(--font-lato)]">
                        {producto.sku}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
                        {producto.categoria}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-[#000000] text-lg">
                    ${producto.precio.toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-9 w-9 bg-[#E73137] hover:bg-[#AF272F] text-white"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
