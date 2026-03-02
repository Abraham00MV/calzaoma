'use client'

import { useState } from 'react'

interface QuantitySelectorProps {
  initialQuantity?: number
  quantity?:number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
}

export default function QuantitySelector({
  initialQuantity = 1,
  min = 1,
  max = 10,
  onChange
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const increase = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const decrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleManualChange = (value: number) => {
    if (value >= min && value <= max) {
      setQuantity(value)
      onChange?.(value)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={decrease}
        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
      >
        -
      </button>

      <input
        type="number"
        value={quantity}
        min={min}
        max={max}
        onChange={(e) => handleManualChange(Number(e.target.value))}
        className="w-16 text-center border border-gray-300 rounded-md py-1"
      />

      <button
        onClick={increase}
        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
      >
        +
      </button>
    </div>
  )
}
