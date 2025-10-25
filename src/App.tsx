import React, { useState, useEffect } from 'react'
import { Uploader } from './components/PlaylistUploader'
import { ChannelGrid } from './components/ChannelGrid'
import { PlayerWrapper } from './components/PlayerWrapper'
import { ProxyToggle } from './components/ProxyToggle'
import { parseM3U } from './utils/parseM3u'
import { XmltvImporter } from './components/XmltvImporter'

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

export default function App() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [selected, setSelected] = useState<Channel | null>(null)
  const [proxyEnabled, setProxyEnabled] = useState(true)
  const [epgUrl, setEpgUrl] = useState<string | null>(null)

  function onLoaded(list: any[]) {
    // Basic normalization
    const normalized = list.map((c: any) => ({
      id: c.id,
      name: c.name,
      url: c.url,
      logo: c.logo,
      group: c.group,
      tvgId: c.tvgId,
      tvgName: c.tvgName,
      attrs: c.attrs,
    })) as Channel[]
    setChannels(normalized)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>IPTV Web Player</h1>
        <p>Upload your playlist and start watching in your browser</p>
      </header>

      <section className="controls">
        <Uploader onLoaded={onLoaded} />
        <div className="row">
          <ProxyToggle enabled={proxyEnabled} onChange={setProxyEnabled} />
          <XmltvImporter onUrlChange={setEpgUrl} />
        </div>
      </section>

      <main className="content">
        <ChannelGrid channels={channels} onSelect={setSelected} />
        <PlayerWrapper channel={selected} proxyEnabled={proxyEnabled} />
      </main>

      <footer className="footer">
        <small>Disclaimer: Use only legally authorized streams.</small>
      </footer>
    </div>
  )
}
