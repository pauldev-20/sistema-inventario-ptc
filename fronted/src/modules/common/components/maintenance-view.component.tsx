'use client'

import { AlertCircle } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export function MaintenanceView () {
  return (
    <Card className="mx-auto max-w-md shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
          <AlertCircle className="h-6 w-6 text-amber-600" />
        </div>
        <CardTitle className="text-2xl">Sistema en Mantenimiento</CardTitle>
        <CardDescription className="text-base">Actualmente se esta realizando un mantenimiento</CardDescription>
      </CardHeader>
    </Card>
  )
}
