import React, { useEffect, useRef } from 'react'

export function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.src = src
  }, [src])

  return (
    <video ref={videoRef} controls playsInline style={{ width: '100%', height: '420px', background: '#000' }} />
  )
}
