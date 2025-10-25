import React, { useState } from 'react'
import { parseM3U } from '../utils/parseM3u'

export function Uploader({ onLoaded }: { onLoaded: (list: any[]) => void }) {
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const channels = parseM3U(text)
      onLoaded(channels)
    } catch (err: any) {
      setError(err?.message || 'Failed to parse playlist')
    }
  }

  return (
    <div className="card uploader">
      <label>Upload Playlist (.m3u/.m3u8)</label>
      <input type="file" accept=".m3u,.m3u8" onChange={handleFile} />
      {error && <div className="error">{error}</div>}
      <div className="note">Or paste a URL after uploading a local file, if supported.</div>
    </div>
  )
}
