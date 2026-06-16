"use client";
import { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (res.ok) {
        window.location.href = '/admin'; // 로그인 성공 시 관리자 페이지 메인으로 이동
      } else {
        setError(data.error || '비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('서버와 통신하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ 
      padding: '8rem 5%', 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        background: '#fff',
        padding: '3.5rem 2.5rem',
        borderRadius: '16px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: 'var(--primary-blue)', 
          marginBottom: '1rem',
          letterSpacing: '-0.5px'
        }}>
          (주)채온 <span>관리자 로그인</span>
        </h1>
        <p style={{ 
          color: 'var(--text-gray)', 
          fontSize: '0.95rem', 
          marginBottom: '2.5rem' 
        }}>
          시공사진 등록 및 고객 문의 관리를 위한 인증이 필요합니다.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호 입력"
              style={{
                width: '100%',
                padding: '1.2rem',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '1.1rem',
                textAlign: 'center',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s',
                outline: 'none'
              }}
            />
          </div>

          {error && (
            <div style={{ 
              color: '#C5221F', 
              backgroundColor: '#FCE8E6', 
              padding: '0.8rem', 
              borderRadius: '8px', 
              fontSize: '0.95rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.2rem',
              background: 'var(--primary-blue)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {loading ? '로그인 중...' : '인증 및 로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
