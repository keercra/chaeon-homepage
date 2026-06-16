"use client";
import { useState, useEffect } from 'react';

export default function Portfolio() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // 인스타그램 외부 위젯 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);

    // 자체 관리자 업로드 사진 목록 로드
    fetch('/api/upload')
      .then(res => res.json())
      .then(data => {
        if (data.images) setImages(data.images);
      })
      .catch(console.error);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거 (선택사항이나 안전을 위해)
      const existingScript = document.querySelector('script[src*="elfsight.com"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <div className="container" style={{ padding: '6rem 5%' }}>
      <h1 className="section-title">시공 <span>사례</span></h1>
      
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-blue)', fontWeight: '800' }}>공식 인스타그램 연동</h2>
          <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem' }}>채온의 생생한 최신 시공 현장을 확인하세요.</p>
        </div>
        
        {/* Elfsight 위젯 - 데모 위젯 ID 사용. 
            실제 적용 시 사용자 본인의 Elfsight ID로 변경 안내 필요 */}
        <div className="elfsight-app-6c2e39dd-a801-447b-b541-2b6fb526debf" data-elfsight-app-lazy></div>
      </section>

      <section>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-blue)', fontWeight: '800' }}>추가 시공 갤러리</h2>
          <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem' }}>관리자가 직접 업로드한 주요 현장 사진입니다.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {images.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'var(--background-light)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>아직 업로드된 사진이 없습니다.</p>
            </div>
          ) : (
            images.map((imgUrl, idx) => (
              <div key={idx} style={{
                width: '100%',
                height: '300px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: `url(${imgUrl}) center/cover no-repeat`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => setSelectedImage(imgUrl)}
              />
            ))
          )}
        </div>
      </section>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <img 
            src={selectedImage} 
            alt="시공사례 크게보기" 
            style={{ maxWidth: '90%', maxHeight: '90vh', borderRadius: '8px', objectFit: 'contain' }} 
          />
        </div>
      )}
    </div>
  );
}
