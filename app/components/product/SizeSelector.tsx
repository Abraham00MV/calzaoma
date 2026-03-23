'use client'

interface SizeSelectorProps {
  selected: number | null
  onSelect: (size: number) => void
  sizes?: number[]
}

export default function SizeSelector({
  selected,
  onSelect,
  sizes = [37, 38, 39, 40, 41, 42],
}: SizeSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3 text-slate-900">
        Talla
      </h3>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => {
          const isActive = selected === size

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelect(size)}
              className={`
                w-12 h-12 rounded-lg border font-medium transition-all
                ${isActive
                  ? 'bg-[#c1d8f0] border-black text-black scale-105 shadow-md'
                  : 'bg-white text-black hover:border-black hover:shadow-sm'
                }
              `}
            >
              {size}
            </button>
          )
        })}
      </div>

      {selected === null && (
        <p className="text-sm text-gray-500 mt-2">
          Selecciona una talla
        </p>
      )}
    </div>
  )
}
