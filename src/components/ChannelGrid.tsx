import React from ''

type Channel = {
  id: string
  name: string
  url: string
  logo?: string
  group?: string
  tvgId?: string
  tvgName?: string
  attrs?: Record<string, string>
}

export function ChannelGrid({ channels, onSelect }: { channels: Channel[]; onSelect: (c: Channel) => void }) {
  if (!channels.length) return <div className="card empty">No channels loaded. Upload a playlist to begin.</div>

  return (
    <div className="grid">
      {channels.map((c) => (
        <div key={c.id} className="channel-card" onClick={() => onSelect(c)}>
          <img src={c.logo || 'https://via.placeholder.com/120x70?text=Channel'} alt={c.name} />
          <div className="channel-name">{c.name}</div>
          <div className="channel-meta">{c.group || ''}</div>
        </div>
      ))}
    </div>
  )
}
