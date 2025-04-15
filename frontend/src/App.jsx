import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [error, setError] = useState('')

  const handleDownload = async () => {
    setLoading(true)
    setError('')
    setDownloadUrl('')

    try {
      const res = await fetch('https://backend-youtubeh264.onrender.com/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      if (data.success) {
        setDownloadUrl(`https://backend-youtubeh264.onrender.com${data.download_url}`)
      } else {
        setError(data.error || 'Gabim gjatë shkarkimit.')
      }
    } catch (err) {
      setError('Nuk u lidh me serverin.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">YouTube H.264 Downloader</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Vendos URL-në e videos..."
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring"
        />
        <button
          onClick={handleDownload}
          disabled={loading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Duke shkarkuar...' : 'Shkarko Video'}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {downloadUrl && (
          <div className="mt-4">
            <p className="mb-2 text-green-600">Videoja është gati për shkarkim:</p>
            <a
              href={downloadUrl}
              className="text-blue-600 underline font-medium"
              download
            >
              Shkarko këtu
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

