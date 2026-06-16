"use client";
import { useState, useEffect } from 'react';

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

  // 저장된 사진 목록을 불러오는 함수
  const fetchImages = () => {
    fetch('/api/upload')
      .then(res => res.json())
      .then(data => {
        if (data.images) setImages(data.images);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchImages(); // 페이지가 켜지면 사진 목록 가져오기
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('파일을 먼저 선택해주세요.');
      return;
    }

    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('성공적으로 업로드되었습니다!');
        setFile(null);
        setPreview('');
        fetchImages(); // 업로드 직후 사진 갤러리 새로고침
      } else {
        setMessage('업로드 실패: ' + (data.error || '알 수 없는 오류'));
      }
    } catch (error) {
      setMessage('서버와의 통신 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 사진 삭제 처리 함수
  const handleDelete = async (url) => {
    if (!confirm('정말로 이 사진을 홈페이지에서 삭제하시겠습니까?')) return;
    
    try {
      const res = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // 삭제할 사진 경로 전송
      });
      
      if (res.ok) {
        fetchImages(); // 삭제 후 사진 갤러리 새로고침
        setMessage('사진이 성공적으로 삭제되었습니다.');
      } else {
        setMessage('삭제 실패: 서버 오류');
      }
    } catch (error) {
      setMessage('통신 오류로 삭제하지 못했습니다.');
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/admin/login';
      } else {
        alert('로그아웃 실패');
      }
    } catch {
      alert('통신 오류로 로그아웃하지 못했습니다.');
    }
  };


  return (
    <div className="container" style={{ padding: '6rem 5%', minHeight: '70vh' }}>
      {/* 문의 내역 바로가기 배너 및 로그아웃 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button 
          onClick={handleLogout} 
          style={{ padding: '1rem 2rem', background: '#e53935', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
        >
          🔒 로그아웃
        </button>
        <a href="/admin/inquiries" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'var(--primary-blue)', color: '#fff', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          📬 고객 온라인 문의 내역 확인하러 가기 &rarr;
        </a>
      </div>

      <h1 className="section-title">관리자 <span>시공사진 관리</span></h1>
      
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2.5rem',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        border: '1px solid var(--border-color)'
      }}>
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>사진 새롭게 올리기</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ 
                width: '100%', 
                padding: '0.8rem', 
                background: 'var(--background-light)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px',
                cursor: 'pointer'
              }} 
            />
          </div>

          {preview && (
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>미리보기</p>
              <img src={preview} alt="미리보기" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', objectFit: 'contain' }} />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              width: '100%',
              padding: '1.2rem',
              backgroundColor: 'var(--accent-orange)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {loading ? '업로드 하는 중...' : '확인 (사이트에 등록)'}
          </button>
          
          {message && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              textAlign: 'center', 
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: message.includes('성공') ? '#E6F4EA' : '#FCE8E6',
              color: message.includes('성공') ? '#137333' : '#C5221F' 
            }}>
              {message}
            </div>
          )}
        </form>
      </div>

      {/* 업로드된 사진 관리 섹션 */}
      <div style={{ maxWidth: '900px', margin: '5rem auto 0' }}>
        <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', fontSize: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          등록된 사진 목록 관리
        </h2>
        
        {images.length === 0 ? (
          <p style={{ color: 'var(--text-gray)' }}>아직 홈페이지에 등록된 사진이 없습니다.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {images.map((url, idx) => (
              <div key={idx} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <img src={url} alt="등록사진" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                
                {/* 삭제 버튼 */}
                <button 
                  onClick={() => handleDelete(url)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(229, 57, 53, 0.9)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  X 삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
