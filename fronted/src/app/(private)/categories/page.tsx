import { CategoryList } from '@/modules/categories/category-list'
import { AppHeader } from '@/modules/common/components/app-header.component'

export default function CategoriesPage() {
  return (
    <>
      <AppHeader page="Categorias" />
      <section className="w-full px-2 py-4 space-y-2 max-h-screen overflow-y-auto overflow-x-hidden">
        <CategoryList />
      </section>
    </>
  )
}
