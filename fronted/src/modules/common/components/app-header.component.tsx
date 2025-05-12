import { ToggleTheme } from './toggle-theme.component'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'

export function AppHeader({ page }: { page: string }) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{page}</h1>
        <div className='flex-1 flex justify-end items-center'>
          <ToggleTheme />
        </div>
      </div>
    </header>
  )
}
