import { Chip } from '@components/Chip'
import { CATEGORY_COLORS, CATEGORY_ICONS_BOLD_PI } from '@utils/categoryMaps'

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
    <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2 p-1">
      <Chip
        label="Todas"
        isActive={selectedCategory === null}
        onClick={() => onCategorySelect(null)}
        ariaLabel="Mostrar todas as categorias"
        className={
          selectedCategory === null
            ? 'px-3 py-1.5 ring-2 ring-(--color-primary)'
            : 'bg-[#1F2A1E] px-3 py-1.5 text-(--color-bg) hover:bg-[#486147]'
        }
      />
      {categories.map((category) => {
        const IconComponent = CATEGORY_ICONS_BOLD_PI[category]
        const isSelected = selectedCategory === category
        return (
          <Chip
            key={category}
            label={category}
            icon={<IconComponent size={14} style={{ color: CATEGORY_COLORS[category] }} />}
            isActive={isSelected}
            onClick={() =>
              selectedCategory === category ? onCategorySelect(null) : onCategorySelect(category)
            }
            ariaLabel={`Filtrar por ${category}`}
            className="px-3 py-1.5 hover:opacity-90"
            style={{
              backgroundColor: isSelected
                ? `color-mix(in srgb, ${CATEGORY_COLORS[category]} 50%, transparent)`
                : `color-mix(in srgb, ${CATEGORY_COLORS[category]} 20%, transparent)`,
              outline: isSelected ? `2px solid ${CATEGORY_COLORS[category]}` : undefined,
            }}
          />
        )
      })}
    </div>
  )
}
