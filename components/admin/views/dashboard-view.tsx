"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Building2, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const kpiData = [
  {
    title: "Total Productos",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    color: "#E73137",
  },
  {
    title: "Proveedores Activos",
    value: "45",
    change: "+3",
    trend: "up",
    icon: Building2,
    color: "#AF272F",
  },
  {
    title: "Clientes Registrados",
    value: "128",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "#666666",
  },
  {
    title: "Cargas Este Mes",
    value: "234",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "#000000",
  },
]

const uploadsData = [
  { name: "Amazon", uploads: 156 },
  { name: "Ripley", uploads: 124 },
  { name: "Sodimac", uploads: 98 },
  { name: "Falabella", uploads: 87 },
  { name: "Paris", uploads: 76 },
  { name: "Lider", uploads: 65 },
]

const categoryData = [
  { name: "Tecnología", value: 3500, color: "#E73137" },
  { name: "Hogar", value: 2800, color: "#AF272F" },
  { name: "Moda", value: 2200, color: "#666666" },
  { name: "Deportes", value: 1800, color: "#000000" },
  { name: "Otros", value: 2547, color: "#BABABA" },
]

const recentActivity = [
  {
    id: 1,
    action: "Carga de Excel completada",
    description: "150 productos de Amazon procesados correctamente",
    time: "Hace 5 minutos",
    type: "success",
  },
  {
    id: 2,
    action: "Duplicados detectados",
    description: "8 productos requieren revisión manual en lote #1234",
    time: "Hace 1 hora",
    type: "warning",
  },
  {
    id: 3,
    action: "Nuevo cliente registrado",
    description: "Falabella Corp se unió a la plataforma",
    time: "Hace 2 horas",
    type: "info",
  },
  {
    id: 4,
    action: "Exportación completada",
    description: "Catálogo para Ripley exportado exitosamente",
    time: "Hace 3 horas",
    type: "success",
  },
  {
    id: 5,
    action: "Categoría actualizada",
    description: "Nueva subcategoría 'Smart Home' añadida a Tecnología",
    time: "Hace 5 horas",
    type: "info",
  },
]

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#000000]">Dashboard</h1>
        <p className="text-muted-foreground font-[family-name:var(--font-lato)]">
          Bienvenido de vuelta. Aquí está el resumen de tu plataforma.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground font-[family-name:var(--font-lato)]">
                      {kpi.title}
                    </p>
                    <p className="text-3xl font-bold text-[#000000] mt-1">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      {kpi.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ml-1 ${
                          kpi.trend === "up" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {kpi.change}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1 font-[family-name:var(--font-lato)]">
                        vs mes anterior
                      </span>
                    </div>
                  </div>
                  <div
                    className="h-12 w-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${kpi.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: kpi.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 grid-cols-2">
        {/* Bar Chart - Uploads by Supplier */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-[#000000]">Cargas por Proveedor</CardTitle>
            <CardDescription className="font-[family-name:var(--font-lato)]">
              Productos cargados este mes por proveedor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={uploadsData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80}
                    tick={{ fontSize: 12, fontFamily: 'Lato' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      fontFamily: 'Lato',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="uploads" 
                    fill="#E73137" 
                    radius={[0, 4, 4, 0]}
                    name="Productos"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Products by Category */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-[#000000]">Productos por Categoría</CardTitle>
            <CardDescription className="font-[family-name:var(--font-lato)]">
              Distribución del catálogo por categoría principal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      fontFamily: 'Lato',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value: number) => [`${value.toLocaleString()} productos`, '']}
                  />
                  <Legend 
                    verticalAlign="middle" 
                    align="right"
                    layout="vertical"
                    wrapperStyle={{ fontFamily: 'Lato', fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#000000]">Actividad Reciente</CardTitle>
          <CardDescription className="font-[family-name:var(--font-lato)]">
            Últimas acciones realizadas en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    activity.type === "success"
                      ? "bg-green-100"
                      : activity.type === "warning"
                      ? "bg-amber-100"
                      : "bg-blue-100"
                  }`}
                >
                  <Clock
                    className={`h-5 w-5 ${
                      activity.type === "success"
                        ? "text-green-600"
                        : activity.type === "warning"
                        ? "text-amber-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#000000]">{activity.action}</p>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-lato)] truncate">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap font-[family-name:var(--font-lato)]">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
