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
    return <h1>Cargando...</h1>
  }

  return (
  // <SidebarProvider >
  //   <AppSideBar roles={user.roles}/>
  //   <UserLayer user={user} />
  //   <main className="w-full space-y-2 max-h-screen overflow-y-auto overflow-x-hidden relative">
  //     <AppHeader name={user.name} />
  //     <article className='px-4 py-2 w-full'>
  //       {children}
  //     </article>
  //   </main>
  // </SidebarProvider>
    <SidebarProvider>
      <AppSideBar variant="inset" />
      <UserLayer user={user} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
