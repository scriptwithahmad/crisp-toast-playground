import { useState } from 'react'

const useClipboard = () => {
  const [copied, setCopied] = useState(false)
  const copy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return [copied, copy]
}

export default useClipboard
