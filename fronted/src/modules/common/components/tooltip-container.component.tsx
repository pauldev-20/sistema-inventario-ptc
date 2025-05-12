'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export function TooltipContainer ({ children, sideOffset = 4, content }: { children: React.ReactNode, sideOffset?: number, content: string }) {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent sideOffset={sideOffset}>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}
