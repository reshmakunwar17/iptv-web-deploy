import React from 'react'

export function XmltvImporter({ onUrlChange }: { onUrlChange: (u: string | null) => void }) {
  const [url, setUrl] = React.useState('')

  return (
    <div className="card xmltv">
      <label>EPG XMLTV URL (optional)</label>
      <input
        type="url"
        placeholder="https://example.com/epg.xml"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => onUrlChange(url || null)}>Load EPG</button>
      <div className="hint">XMLTV is optional but enhances guide information.</div>
    </div>
  )
}
