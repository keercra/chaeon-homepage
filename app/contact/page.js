"use client";
import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', content: '' });
  const [honeypot, setHoneypot] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // 로컬스토리지 기반 이전 문의 전송 쿨타임 만료 확인
    const expiry = localStorage.getItem('contact_cooldown_expiry');
    if (expiry) {
      const remaining = Math.ceil((parseInt(expiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  // 1초마다 쿨타임 카운트다운 실행
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 쿨타임 제어
    if (cooldown > 0) {
      alert(`스팸 방지를 위해 아직 재전송할 수 없습니다. ${cooldown}초 후에 시도해주세요.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          honeypot
        })
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', content: '' }); // 폼 초기화
        setHoneypot('');
        
        // 1분(60초) 쿨타임 설정
        const expiryTime = Date.now() + 60 * 1000;
        localStorage.setItem('contact_cooldown_expiry', expiryTime.toString());
        setCooldown(60);
      } else {
        alert(data.error || '전송에 실패했습니다. 대표전화로 직접 문의해주세요.');
      }
    } catch {
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 5%', minHeight: '70vh' }}>
      <h1 className="section-title">온라인 <span>문의</span></h1>
      <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-gray)', fontSize: '1.2rem' }}>
        제품 단가, 시공 견적 등 궁금하신 점을 남겨주시면 <br/>담당자가 확인 후 빠르게 답변해 드리겠습니다.
      </p>

      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        background: '#fff', 
        padding: '4rem', 
        borderRadius: '16px', 
        border: '1px solid var(--border-color)', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)' 
      }}>
        {success ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💌</div>
            <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1rem', fontSize: '2rem' }}>문의가 성공적으로 접수되었습니다!</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)' }}>담당자가 내용을 꼼꼼히 확인한 후,<br/>남겨주신 연락처로 친절히 답변해 드리겠습니다.</p>
            <button 
              onClick={() => setSuccess(false)} 
              style={{ marginTop: '3rem', padding: '1rem 3rem', background: 'var(--accent-orange)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
              새로운 문의 계속하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* 허니팟 스팸 봇 방지 (눈에 보이지 않는 필드) */}
            <input 
              type="text" 
              name="email_confirm" 
              value={honeypot} 
              onChange={e => setHoneypot(e.target.value)} 
              style={{ display: 'none' }} 
              tabIndex="-1" 
              autoComplete="off" 
            />

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.8rem', color: 'var(--primary-blue)' }}>성함 (또는 기관/기업명)</label>
              <input 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="예: 홍길동 / 강남구청 / (주)건설회사"
                style={{ width: '100%', padding: '1.2rem', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '1rem' }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.8rem', color: 'var(--primary-blue)' }}>연락처</label>
              <input 
                required 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                placeholder="010-0000-0000" 
                style={{ width: '100%', padding: '1.2rem', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '1rem' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.8rem', color: 'var(--primary-blue)' }}>자세한 문의 내용</label>
              <textarea 
                required 
                rows={8} 
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})} 
                placeholder="시공 위치, 면적, 견적 의뢰 등 자세한 내용을 남겨주세요." 
                style={{ width: '100%', padding: '1.2rem', border: '1px solid var(--border-color)', borderRadius: '8px', resize: 'vertical', fontSize: '1rem', fontFamily: 'inherit' }} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || cooldown > 0} 
              style={{ 
                background: cooldown > 0 ? '#b0bec5' : 'var(--primary-blue)', 
                color: '#fff', 
                padding: '1.2rem', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                cursor: (loading || cooldown > 0) ? 'not-allowed' : 'pointer', 
                marginTop: '1rem', 
                transition: '0.3s' 
              }}>
              {loading ? '전송 중입니다...' : cooldown > 0 ? `재전송 제한 대기 (${cooldown}초 남음)` : '문의하기 접수'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
