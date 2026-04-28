"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export type UserRole = "admin" | "cliente"

export interface User {
  email: string
  name: string
  role: UserRole
}

interface LoginViewProps {
  onLogin: (user: User) => void
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Accept any credentials for this prototype
    const user: User = {
      email: email,
      name: email.split("@")[0] || "Administrador",
      role: "admin"
    }
    onLogin(user)
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] to-[#2D2D2D] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-4 text-center pb-2">
          {/* Promotick Logo for light background */}
          <div className="flex justify-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-promotick%281%29-kUKWmgbVJgCGcGNE41EsXiKowGrtpp.png" 
              alt="Promotick"
              className="h-12 w-auto"
            />
          </div>
          <CardDescription className="text-base text-muted-foreground font-[family-name:var(--font-lato)]">
            Sistema de Administración
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#000000] font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 font-[family-name:var(--font-lato)] focus-visible:ring-[#E73137]"
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#000000] font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10 font-[family-name:var(--font-lato)] focus-visible:ring-[#E73137]"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#000000] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end text-sm">
              <a href="#" className="text-[#E73137] hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#E73137] hover:bg-[#AF272F] text-white font-semibold text-base transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground font-[family-name:var(--font-lato)]">
            ¿Necesitas ayuda?{" "}
            <a href="#" className="text-[#E73137] hover:underline font-medium">
              Contacta a soporte
            </a>
          </p>
        </CardContent>
      </Card>
      
      {/* Brand phrase */}
      <p className="absolute bottom-6 text-white/60 text-sm font-[family-name:var(--font-lato)]">
        Powered by Promotick
      </p>
    </div>
  )
}
