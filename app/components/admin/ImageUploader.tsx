'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'

type Props = {
  onChange?: (file: File | null) => void
}

export default function ImageUploader({
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')

  const handleFile = (file: File | null) => {
    if (!file) return

    setFileName(file.name)
    setPreview(URL.createObjectURL(file))

    onChange?.(file)
  }

  return (
    <div className="space-y-4">

      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl h-80 flex items-center justify-center overflow-hidden bg-gray-50"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={500}
            height={500}
            className="object-contain h-full w-full"
          />
        ) : (
          <div className="text-center text-gray-400">

            <Upload
              size={42}
              className="mx-auto mb-3"
            />

            <p>
              Sin imagen seleccionada
            </p>

          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) =>
          handleFile(e.target.files?.[0] ?? null)
        }
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="px-5 py-2.5 rounded-xl bg-[#c1d8f0] font-medium hover:opacity-90 transition"
      >
        {preview
          ? 'Cambiar imagen'
          : 'Seleccionar imagen'}
      </button>

      {fileName && (
        <p className="text-sm text-gray-500">
          {fileName}
        </p>
      )}

    </div>
  )
}