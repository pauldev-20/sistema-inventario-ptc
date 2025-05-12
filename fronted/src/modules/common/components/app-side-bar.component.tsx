import { BoxIcon, CupSodaIcon, TruckIcon } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { NavUser } from '@/modules/auth/components/nav-user.component'
import Link from 'next/link'

const menuItems = [
  {
    title: 'Productos',
    url: '/products',
    icon: CupSodaIcon
  },
  {
    title: 'Categorías',
    url: '/categories',
    icon: BoxIcon
  }
]

export async function AppSideBar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SiderBarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SiderBarFooter />
    </Sidebar>
  )
}

const SiderBarHeader = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <a href="#">
              <TruckIcon className="h-5 w-5" />
              <span className="text-base font-semibold">Paul Inc.</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

const SiderBarFooter = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <NavUser />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
