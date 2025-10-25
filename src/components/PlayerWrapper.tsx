import React from 'react'
import { VideoPlayer } from './VideoPlayer'

export function PlayerWrapper({ channel, proxyEnabled }: { channel: any; proxyEnabled: boolean }) {
  if (!channel) return null
  const src = channel.url
  // Proxy integration can be added later. For now, use direct URL.
  return (
    <div className="card player">
      <VideoPlayer src={src} />
    </div>
  )
}
