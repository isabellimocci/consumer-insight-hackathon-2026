interface Props {
  onOpen: () => void
}

export function FAB({ onOpen }: Props) {
  return (
    <button
      aria-label="Nova transação"
      onClick={onOpen}
      className="bg-text text-bg fixed right-6 bottom-6 z-50 flex items-center gap-2 px-4 py-3 shadow-lg transition-transform hover:scale-105 active:scale-95 sm:px-5"
    >
      <span className="text-xl leading-none font-bold">+</span>
      <span className="hidden text-sm font-semibold sm:inline">Nova Despesa</span>
    </button>
  )
}
