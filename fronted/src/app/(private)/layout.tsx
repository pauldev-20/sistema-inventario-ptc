import { UserLayer } from '@/modules/auth/components/user-layer.component'
import { getProfile } from '@/modules/auth/server/services'
import { AppSideBar } from '@/modules/common/components/app-side-bar.component'
import { SidebarInset, SidebarProvider } from '@/modules/common/components/ui/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Inventario',
  description: 'Sistema de Inventario'
}

export default async function PrivateLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getProfile()

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Acceso Denegado</h1>
          <p className="mt-2 text-lg">No tienes permiso para acceder a esta página.</p>
          <p className="mt-2 text-lg">Por favor, inicia sesión con una cuenta válida.</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSideBar variant="inset" />
      <UserLayer user={user} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
