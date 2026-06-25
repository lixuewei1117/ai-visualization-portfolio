'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoModalProps {
  src: string
  title: string
  poster?: string
  onClose: () => void
}

export default function VideoModal({ src, title, poster, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="max-w-[90vw] max-h-[90vh] w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          className="w-full max-h-[85vh] rounded-xl bg-black"
          poster={poster}
          controls
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
            <button
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              onClick={handlePlay}
            >
              <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {title && (
          <div className="mt-4 text-center">
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
        )}
      </div>
    </div>
  )
}
