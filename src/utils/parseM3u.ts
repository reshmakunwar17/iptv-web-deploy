export type Channel = {
  id: string
  name: string
  url: string
  logo?: string
  group?: string
  tvgId?: string
  tvgName?: string
  attrs?: Record<string, string>
}

export function parseM3U(text: string): Channel[] {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (!lines[0]?.startsWith('#EXTM3U')) throw new Error('Invalid M3U')
  const channels: Channel[] = []
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith('#EXTINF')) {
      const info = lines[i]
      const url = lines[++i]
      if (!url || url.startsWith('#')) continue
      const attrs: Record<string, string> = {}
      const attrRegex = /([a-zA-Z0-9-]+)="([^"]*)"/g
      let m
      while ((m = attrRegex.exec(info))) attrs[m[1]] = m[2]
      const name = info.split(',').pop()?.trim() || attrs['tvg-name'] || url
      channels.push({
        id: `${attrs['tvg-id'] || name}-${i}`,
        name,
        url,
        logo: attrs['tvg-logo'],
        group: attrs['group-title'],
        tvgId: attrs['tvg-id'],
        tvgName: attrs['tvg-name'],
        attrs
      })
    }
  }
  // Deduplicate
  const seen = new Map<string, Channel>()
  for (const c of channels) {
    const key = `${c.name}|${c.url}`
    if (!seen.has(key)) seen.set(key, c)
  }
  return Array.from(seen.values())
}
