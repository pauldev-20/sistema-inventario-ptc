'use client'

import { Card, CardContent, CardHeader } from '@/modules/common/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/modules/common/components/ui/tabs'
import { useState } from 'react'
import { SignInForm } from '../sign-in-form'
import { SignUpForm } from '../sign-up-form'

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <h2 className="text-2xl font-semibold text-center">Bienvenido</h2>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => { setActiveTab(value as 'login' | 'register') }} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Iniciar</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SignInForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
