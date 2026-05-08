import { Chip } from '@components/Chip'
import { CATEGORY_ICONS } from '@utils/categoryMaps'

import type { Category } from '../types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: Category | null
  onCategorySelect: (category: Category | null) => void
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="gap-sm pb-xs flex overflow-x-auto"
    >
      <Chip
        label="Todas"
        isActive={selectedCategory === null}
        onClick={() => onCategorySelect(null)}
        ariaLabel="Mostrar todas as categorias"
      />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          icon={CATEGORY_ICONS[category]}
          isActive={selectedCategory === category}
          onClick={() =>
            selectedCategory === category ? onCategorySelect(null) : onCategorySelect(category)
          }
          ariaLabel={`Filtrar por ${category}`}
        />
      ))}
    </div>
  )
}
