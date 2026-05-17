// src/pages/StegoPage.jsx
import Shell from '../components/Shell';
import { BASE } from '../api/client';

export default function StegoPage() {
  return (
    <Shell title="Media Lab" subtitle="Digital asset management and analysis tools">
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Challenge Image Repository</div>
        <p style={{ fontSize:12, color:'var(--text-dim)', marginBottom:16 }}>
          Download official document images from the media server for verification
          and archival purposes.
        </p>
        <div className="stego-box">
          <div className="stego-img-preview">[ Preview unavailable ]</div>
          <p style={{
            fontSize:12, color:'var(--text-dim)', marginBottom:16,
            maxWidth:340, margin:'0 auto 16px',
          }}>
            Analyze the image file carefully. All document images may contain
            embedded metadata or watermarks for authenticity verification.
          </p>
          <a
            href={`${BASE}/challenge/7/image`}
            className="btn btn-primary"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Image File
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Analysis Notes</div>
        <div className="alert alert-info" style={{ marginBottom:0 }}>
          Images sourced from the media server may contain embedded metadata. Use
          standard forensic tools (e.g., ExifTool, strings, binwalk) to inspect
          file contents for authenticity markers.
        </div>
      </div>
    </Shell>
  );
}
