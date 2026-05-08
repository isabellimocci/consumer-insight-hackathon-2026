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
  console.log(categories.length)
  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="gap-sm pb-xs flex flex-col justify-between overflow-x-auto"
    >
      <Chip
        label="Todas"
        isActive={selectedCategory === null}
        onClick={() => onCategorySelect(null)}
        ariaLabel="Mostrar todas as categorias"
        className="bg-[#1F2A1E] text-(--color-primary) hover:bg-[#486147]"
      />
      {categories.map((category) => {
        const IconComponent = CATEGORY_ICONS_BOLD_PI[category]
        return (
          <Chip
            key={category}
            label={category}
            icon={<IconComponent size={14} style={{ color: CATEGORY_COLORS[category] }} />}
            isActive={selectedCategory === category}
            onClick={() =>
              selectedCategory === category ? onCategorySelect(null) : onCategorySelect(category)
            }
            ariaLabel={`Filtrar por ${category}`}
            className="bg-transparent hover:bg-[#486147]"
            style={{
              backgroundColor: ` color-mix(in srgb, ${CATEGORY_COLORS[category]} 20%, transparent`,
            }}
          />
        )
      })}
    </div>
  )
}
