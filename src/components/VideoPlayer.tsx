import React, { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Check if the stream is an HLS stream
    if (src && src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => console.log('Autoplay was prevented.'))
        })
        // Cleanup on component unmount
        return () => {
          hls.destroy()
        }
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (e.g., Safari)
        video.src = src
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => console.log('Autoplay was prevented.'))
        })
      }
    } else {
      // For non-HLS streams (e.g., MP4)
      video.src = src
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => console.log('Autoplay was prevented.'))
      })
    }
  }, [src]) // Re-run effect when the source URL changes

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      style={{ width: '100%', height: '420px', background: '#000' }}
    />
  )
}
