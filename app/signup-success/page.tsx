import Image from 'next/image'
import Link from 'next/link'

export default function SignupSuccessPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">

        <div className="relative w-20 h-20 mx-auto mb-6">
          <Image
            src="/logos/Oma-logo-rise.webp"
            alt="Calza Oma"
            fill
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-black mb-4">
          Revisa tu correo
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          Tu cuenta fue creada correctamente.
          Te enviamos un correo de confirmación.
        </p>

        <p className="text-gray-600 leading-relaxed mb-8">
          Debes abrir el enlace de verificación para activar tu cuenta y poder iniciar sesión.
        </p>

        <Link
          href="/login"
          className="inline-flex items-center justify-center w-full bg-[#c1d8f0] text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Volver al login
        </Link>

      </div>
    </main>
  )
}