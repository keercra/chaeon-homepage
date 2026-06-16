"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }} onClick={() => setMenuOpen(false)}>
          <img 
            src="/images/logo.png" 
            alt="(주)채온" 
            style={{ height: '45px', width: 'auto', display: 'block' }} 
            className="header-logo-img"
          />
        </Link>
        
        {/* 모바일 햄버거 토글 버튼 */}
        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/about" onClick={() => setMenuOpen(false)}>회사소개</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)}>제품안내</Link>
          <Link href="/portfolio" onClick={() => setMenuOpen(false)}>시공사례</Link>
          <Link href="/contact" style={{ color: 'var(--accent-orange)' }} onClick={() => setMenuOpen(false)}>온라인 문의</Link>
          <div className="mobile-admin-link">
            <Link href="/admin" onClick={() => setMenuOpen(false)}>관리자</Link>
          </div>
        </nav>
        
        <div className="admin-link">
          <Link href="/admin">Admin</Link>
        </div>
      </div>
      
      {/* 모바일 메뉴 열렸을 때 뒷배경 블러 처리용 오버레이 */}
      {menuOpen && (
        <div 
          className="menu-overlay" 
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
