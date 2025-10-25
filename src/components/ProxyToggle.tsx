import React from 'react'

export function ProxyToggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="card toggle">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      Enable Proxy (cross-origin streams)
    </label>
  )
}
