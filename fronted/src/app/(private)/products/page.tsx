import { AppHeader } from '@/modules/common/components/app-header.component'
import { ProductList } from '@/modules/products/product-list'

export default function ProductsPage() {
  return (
    <>
      <AppHeader page="Productos" />
      <section className="w-full px-2 py-4 space-y-2 max-h-screen overflow-y-auto overflow-x-hidden">
        <ProductList />
      </section>
    </>
  )
}
