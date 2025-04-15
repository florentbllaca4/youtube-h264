import { useState } from 'react';
import axios from 'axios';

export default function DownloaderForm() {
  const [url, setUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setDownloadUrl('');
    try {
      const res = await axios.post('http://localhost:5000/download', { url });
      if (res.data.success) {
        setDownloadUrl(`http://localhost:5000${res.data.download_url}`);
      }
    } catch (err) {
      alert("Gabim gjatë shkarkimit!");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Vendos URL-në e YouTube..."
      />
      <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Duke shkarkuar..." : "Shkarko"}
      </button>
      {downloadUrl && (
        <div className="mt-4">
          <a href={downloadUrl} className="text-green-600 underline" download>
            Kliko për të shkarkuar videon
          </a>
        </div>
      )}
    </div>
  );
}