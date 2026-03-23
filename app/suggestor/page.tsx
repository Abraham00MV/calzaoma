'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function Recomendador() {
  const router = useRouter()

  const [footLength, setFootLength] = useState('')
  const [useType, setUseType] = useState('')
  const [comfort, setComfort] = useState('')

  const handleSubmit = () => {
    if (!footLength || !useType || !comfort) {
      alert('Completa todos los campos')
      return
    }

    if (Number(footLength) < 20 || Number(footLength) > 35) {
      alert('Medida inválida')
      return
    }

    router.push(
      `/Recommended?foot=${footLength}&use=${useType}&comfort=${comfort}`
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">

      {/* 🔥 CURVED IMAGE */}
      <div className="absolute inset-0 hidden md:block">
        <div
          className="absolute right-0 top-0 h-full w-[60%]"
          style={{
            clipPath: 'ellipse(70% 100% at 100% 50%)',
          }}
        >
          <Image
            src="/home/suggestor-banner.png"
            alt="Calzado deportivo"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/5 to-transparent" />
        </div>
      </div>

      {/* 🔹 FORM AREA */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        {/* limitamos el ancho del lado izquierdo */}
        <div className="w-full md:w-[50%] flex justify-center">

          <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-white/40">

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Encuentra tu calzado ideal
            </h1>

            <p className="text-slate-600 text-sm">
              Completa los datos y te recomendaremos el mejor calzado para ti
            </p>

            <input
              className="w-full border text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Medida del pie (cm)"
              value={footLength}
              onChange={(e) => setFootLength(e.target.value)}
            />

            <select
              className="w-full border text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              value={useType}
              onChange={(e) => setUseType(e.target.value)}
            >
              <option value="">¿Para qué lo necesitas?</option>
              <option value="trabajo">Trabajo</option>
              <option value="deporte">Deporte</option>
            </select>

            <select
              className="w-full border text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              value={comfort}
              onChange={(e) => setComfort(e.target.value)}
            >
              <option value="">Nivel de comodidad</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              Ver recomendaciones
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}
