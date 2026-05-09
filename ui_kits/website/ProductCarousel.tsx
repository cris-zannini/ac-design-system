'use client'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'

interface Props {
  images: string[]
  alt: string
}

export default function ProductCarousel({ images, alt }: Props) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [dragging, setDragging] = useState(false)

  const goNext = useCallback(() => {
    setCurrent(i => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  const goPrev = useCallback(() => {
    setCurrent(i => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(goNext, 3500)
  }, [goNext])

  useEffect(() => {
    startAutoplay()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startAutoplay])

  const handlePrev = () => { goPrev(); startAutoplay() }
  const handleNext = () => { goNext(); startAutoplay() }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    setDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }

  const handleTouchEnd = () => {
    setDragging(false)
    if (touchDeltaX.current < -40) handleNext()
    else if (touchDeltaX.current > 40) handlePrev()
    touchStartX.current = null
    touchDeltaX.current = 0
  }

  return (
    <div className="w-full max-w-[600px] mx-auto mb-7 select-none relative group">
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* faixa com todas as imagens lado a lado */}
        <div
          className={`flex ${dragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${alt} — imagem ${i + 1}`}
              className="w-full h-auto flex-shrink-0 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)] rounded-2xl"
              width={600}
              height={400}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="hidden sm:block absolute left-3 top-[45%] -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button 
        onClick={handleNext}
        className="hidden sm:block absolute right-3 top-[45%] -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
        aria-label="Próximo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="flex items-center justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); startAutoplay() }}
            aria-label={`Imagem ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  )
}
