import { useState, useMemo, useCallback } from 'react'

export const usePageSelection = (
  pages: Array<{ id: string }>,
  initialSelected: string[]
) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected))

  const allSelected = useMemo(
    () => pages.length > 0 && selected.size === pages.length,
    [pages.length, selected.size]
  )

  const handleToggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleToggleAll = useCallback(() => {
    if (allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(pages.map((p) => p.id)))
    }
  }, [allSelected, pages])

  const getSelectedArray = useCallback(() => Array.from(selected), [selected])

  return {
    selected,
    allSelected,
    handleToggle,
    handleToggleAll,
    getSelectedArray,
  }
}
