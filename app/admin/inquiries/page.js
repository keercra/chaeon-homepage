"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InquiriesList() {
  const [inquiries, setInquiries] = useState([]);

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

  const fetchInquiries = () => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.inquiries) setInquiries(data.inquiries);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('이 문의 내역을 정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchInquiries();
      } else {
        alert('삭제 실패');
      }
    } catch {
      alert('오류 발생');
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 5%', minHeight: '70vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="section-title" style={{ marginBottom: 0 }}>받은 <span>고객 문의 내역</span></h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleLogout} 
            style={{ padding: '0.8rem 1.5rem', background: '#e53935', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🔒 로그아웃
          </button>
          <Link href="/admin" style={{ padding: '0.8rem 1.5rem', background: 'var(--border-color)', color: '#333', borderRadius: '8px', fontWeight: 'bold' }}>&larr; 사진 관리로 돌아가기</Link>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--background-light)', borderRadius: '12px', color: 'var(--text-gray)' }}>
            아직 접수된 새로운 온라인 문의가 없습니다.
          </div>
        ) : (
          inquiries.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ color: 'var(--primary-blue)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-gray)', fontWeight: 'bold' }}>📞 {item.phone}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {new Date(item.date).toLocaleString('ko-KR')} 접수됨
                  </p>
                  <button onClick={() => handleDelete(item.id)} style={{ background: 'red', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>내역 삭제</button>
                </div>
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
