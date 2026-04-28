"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Plus, Search, Edit, Trash2, FolderTree, Package } from "lucide-react"

interface SubCategory {
  id: number
  nombre: string
  productos: number
}

interface Category {
  id: number
  nombre: string
  productos: number
  subcategorias: SubCategory[]
}

const categorias: Category[] = [
  {
    id: 1,
    nombre: "Tecnología",
    productos: 3500,
    subcategorias: [
      { id: 11, nombre: "Smartphones", productos: 850 },
      { id: 12, nombre: "Laptops", productos: 620 },
      { id: 13, nombre: "Tablets", productos: 430 },
      { id: 14, nombre: "Accesorios", productos: 980 },
      { id: 15, nombre: "Smart Home", productos: 320 },
      { id: 16, nombre: "Gaming", productos: 300 },
    ],
  },
  {
    id: 2,
    nombre: "Hogar",
    productos: 2800,
    subcategorias: [
      { id: 21, nombre: "Muebles", productos: 650 },
      { id: 22, nombre: "Decoración", productos: 520 },
      { id: 23, nombre: "Cocina", productos: 780 },
      { id: 24, nombre: "Baño", productos: 340 },
      { id: 25, nombre: "Jardín", productos: 510 },
    ],
  },
  {
    id: 3,
    nombre: "Moda",
    productos: 2200,
    subcategorias: [
      { id: 31, nombre: "Ropa Hombre", productos: 580 },
      { id: 32, nombre: "Ropa Mujer", productos: 720 },
      { id: 33, nombre: "Calzado", productos: 450 },
      { id: 34, nombre: "Accesorios", productos: 280 },
      { id: 35, nombre: "Deportiva", productos: 170 },
    ],
  },
  {
    id: 4,
    nombre: "Deportes",
    productos: 1800,
    subcategorias: [
      { id: 41, nombre: "Fitness", productos: 420 },
      { id: 42, nombre: "Ciclismo", productos: 380 },
      { id: 43, nombre: "Natación", productos: 210 },
      { id: 44, nombre: "Fútbol", productos: 350 },
      { id: 45, nombre: "Running", productos: 440 },
    ],
  },
  {
    id: 5,
    nombre: "Alimentos y Bebidas",
    productos: 1547,
    subcategorias: [
      { id: 51, nombre: "Snacks", productos: 320 },
      { id: 52, nombre: "Bebidas", productos: 280 },
      { id: 53, nombre: "Gourmet", productos: 450 },
      { id: 54, nombre: "Saludable", productos: 497 },
    ],
  },
  {
    id: 6,
    nombre: "Entretenimiento",
    productos: 1000,
    subcategorias: [
      { id: 61, nombre: "Streaming", productos: 150 },
      { id: 62, nombre: "Gaming", productos: 280 },
      { id: 63, nombre: "Música", productos: 220 },
      { id: 64, nombre: "Libros", productos: 350 },
    ],
  },
]

export function CategoriasView() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategorias = categorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.subcategorias.some((sub) =>
      sub.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#000000]">Categorías</h1>
          <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
            Organiza tu catálogo con categorías y subcategorías
          </p>
        </div>
        <Button className="bg-[#E73137] hover:bg-[#AF272F] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar categorías o subcategorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-[family-name:var(--font-lato)] focus-visible:ring-[#E73137]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Tree */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000] flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-[#E73137]" />
            Árbol de Categorías
          </CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            {categorias.length} categorías principales con{" "}
            {categorias.reduce((acc, cat) => acc + cat.subcategorias.length, 0)} subcategorías
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-2">
            {filteredCategorias.map((categoria) => (
              <AccordionItem
                key={categoria.id}
                value={`cat-${categoria.id}`}
                className="border rounded-lg px-4 bg-white shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#E73137]/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-[#E73137]" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-[#000000]">{categoria.nombre}</p>
                        <p className="text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
                          {categoria.subcategorias.length} subcategorías
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#000000]/10 text-[#000000] hover:bg-[#000000]/10">
                        {categoria.productos.toLocaleString()} productos
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-[#E73137]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="ml-13 space-y-2 pt-2 border-t">
                    {categoria.subcategorias.map((subcategoria) => (
                      <div
                        key={subcategoria.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors ml-6"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-[#E73137]" />
                          <span className="font-medium text-[#000000] font-[family-name:var(--font-lato)]">
                            {subcategoria.nombre}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
                            {subcategoria.productos.toLocaleString()} productos
                          </span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-[#E73137]"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-6 text-[#E73137] hover:text-[#AF272F] hover:bg-[#E73137]/10"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar Subcategoría
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
