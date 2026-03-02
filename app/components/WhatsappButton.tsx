'use client'

import { useState } from 'react'

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  
  // Número de WhatsApp del negocio (reemplaza con el número real)
  const phoneNumber = '5215512345678' // Formato: código país + número sin espacios ni guiones
  const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus productos de CalzaOma')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-3 transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-4 whitespace-nowrap bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
            isHovered 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          <span className="text-sm font-medium">Contáctanos directamente</span>
          {/* Flecha del tooltip */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900" />
        </div>

        {/* Botón de WhatsApp */}
        <div className="relative">
          {/* Anillo de pulso animado */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75" />
          
          {/* Botón principal con logo real de WhatsApp */}
          <div className="relative bg-[#25D366] hover:bg-[#128C7E] text-white w-16 h-16 rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110">
            <svg 
              viewBox="0 0 32 32" 
              className="w-9 h-9"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 0C7.164 0 0 7.163 0 16c0 2.826.74 5.477 2.032 7.77L0 32l8.447-2.016A15.936 15.936 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.548 0-4.964-.708-7.006-1.945l-.502-.302-5.21 1.244 1.262-5.034-.333-.52A13.268 13.268 0 0 1 2.667 16c0-7.364 5.97-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333z"/>
              <path d="M23.404 19.48c-.397-.198-2.348-1.157-2.712-1.29-.363-.132-.628-.198-.892.199-.264.397-1.023 1.29-1.254 1.555-.231.264-.463.298-.86.099-.397-.198-1.676-.618-3.192-1.97-1.18-1.052-1.977-2.35-2.208-2.748-.231-.397-.025-.612.174-.81.179-.178.397-.463.595-.694.198-.231.264-.397.397-.661.132-.264.066-.496-.033-.694-.099-.198-.892-2.15-1.222-2.945-.322-.775-.649-.67-.892-.682-.231-.012-.496-.015-.76-.015s-.694.099-1.057.496c-.363.397-1.387 1.355-1.387 3.306s1.42 3.835 1.618 4.099c.198.264 2.795 4.267 6.772 5.983.946.409 1.686.653 2.262.835.95.302 1.815.259 2.497.157.762-.114 2.348-.96 2.678-1.887.331-.927.331-1.722.231-1.887-.099-.165-.363-.264-.76-.463z"/>
            </svg>
          </div>
        </div>
      </a>
    </div>
  )
}