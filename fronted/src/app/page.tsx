import { AuthForm } from '@/modules/auth/auth-form'
import { checkHealth } from '@/modules/auth/server/services'

export default async function Home() {
  const health = await checkHealth()

  if (!health) {
    return (
      <h1>En mantenimiento</h1>
    )
  }
  return (
    <main className="grid min-h-screen">
      <section className="self-center px-4 sm:px-10">
        <div className='space-y-4 sm:max-w-96 mx-auto'>
          <AuthForm />
        </div>
      </section>
    </main>
  )
}
