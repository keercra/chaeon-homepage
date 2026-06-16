import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const dataFile = path.join(process.cwd(), 'public', 'inquiries.json');

// Supabase 클라이언트 초기화 및 검증
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
                            !supabaseUrl.includes('project_url') && 
                            !supabaseAnonKey.includes('anon_key');

const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// 서버 메모리 쿨타임 맵 (IP별 마지막 전송 시각 보관)
const ipCooldownMap = new Map();
const COOLDOWN_MS = 60 * 1000; // 1분

export async function GET() {
  // 1. Supabase 연동 시 클라우드 데이터베이스에서 조회
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return NextResponse.json({ inquiries: data });
    } catch (error) {
      console.error('Supabase GET Error:', error);
      return NextResponse.json({ error: '데이터베이스 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }

  // 2. Supabase 미세팅 시 로컬 파일 시스템에서 조회 (개발 폴백)
  if (!fs.existsSync(dataFile)) {
    return NextResponse.json({ inquiries: [] });
  }
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    return NextResponse.json({ inquiries: data.reverse() });
  } catch (error) {
    return NextResponse.json({ error: '문의 내역을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // ==========================================
    // [보안 1] 허니팟(Honeypot) 스팸 차단 검증
    // ==========================================
    if (body.honeypot) {
      console.log('스팸 차단됨: Honeypot 필드가 채워짐.');
      return NextResponse.json({ error: '정상적인 요청이 아닙니다. (봇/스팸 차단)' }, { status: 400 });
    }

    // ==========================================
    // [보안 2] IP 기반 1분 쿨타임 (Rate Limiting) 검증
    // ==========================================
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    
    const now = Date.now();
    if (ipCooldownMap.has(ip)) {
      const lastTime = ipCooldownMap.get(ip);
      if (now - lastTime < COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((COOLDOWN_MS - (now - lastTime)) / 1000);
        return NextResponse.json(
          { error: `스팸 전송 방지를 위해 1분간 재전송이 차단됩니다. ${remainingSeconds}초 후에 다시 시도해주세요.` },
          { status: 429 }
        );
      }
    }
    
    // 검증 완료 후 쿨타임 갱신
    ipCooldownMap.set(ip, now);

    // ==========================================
    // 문의 데이터 저장 처리 (Supabase 우선, 로컬 폴백)
    // ==========================================
    const inquiryDate = new Date().toISOString();

    if (supabase) {
      // Supabase 테이블에 데이터 삽입
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          name: body.name,
          phone: body.phone,
          content: body.content,
          date: inquiryDate
        }]);

      if (error) {
        console.error('Supabase Insert Error:', error);
        throw error;
      }
      console.log('Supabase DB에 문의 저장 성공');
    } else {
      // 로컬 JSON 파일에 임시 저장 (개발용 폴백)
      const newInquiry = {
        id: Date.now(),
        name: body.name,
        phone: body.phone,
        content: body.content,
        date: inquiryDate
      };
      let inquiries = [];
      if (fs.existsSync(dataFile)) {
        const fileData = fs.readFileSync(dataFile, 'utf8');
        if (fileData) inquiries = JSON.parse(fileData);
      }
      inquiries.push(newInquiry);
      fs.writeFileSync(dataFile, JSON.stringify(inquiries, null, 2));
      console.log('Supabase가 설정되지 않아 로컬 inquiries.json 파일에 백업 저장했습니다.');
    }

    // ==========================================
    // [이메일 발송] Nodemailer를 통한 관리자 알림 메일 발송
    // ==========================================
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.RECEIVER_EMAIL;

    const isSmtpConfigured = host && port && user && pass && receiver &&
                            !user.includes('발송용계정') && !receiver.includes('관리자개인이메일');

    if (isSmtpConfigured) {
      try {
        const transporter = nodemailer.createTransport({
          host: host,
          port: parseInt(port),
          secure: port === '465',
          auth: { user, pass },
          timeout: 10000
        });

        const safeContent = body.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const mailOptions = {
          from: user,
          to: receiver,
          subject: `[채온 홈페이지] 새로운 온라인 문의가 접수되었습니다. (${body.name}님)`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #0d47a1; border-bottom: 2px solid #0d47a1; padding-bottom: 10px; margin-top: 0;">새로운 온라인 문의 접수</h2>
              <p style="font-size: 1rem; color: #333;">채온 홈페이지 온라인 문의 게시판을 통해 고객 문의가 접수되었습니다.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 0.95rem;">
                <tr>
                  <td style="padding: 10px; font-weight: bold; background: #f9f9f9; width: 30%; border: 1px solid #ddd; color: #333;">성함/기관명</td>
                  <td style="padding: 10px; border: 1px solid #ddd; color: #555;">${body.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; background: #f9f9f9; border: 1px solid #ddd; color: #333;">연락처</td>
                  <td style="padding: 10px; border: 1px solid #ddd; color: #555;">${body.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; background: #f9f9f9; border: 1px solid #ddd; color: #333;">접수 시각</td>
                  <td style="padding: 10px; border: 1px solid #ddd; color: #555;">${new Date().toLocaleString('ko-KR')}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background: #fafafa; border: 1px solid #eee; border-radius: 6px; white-space: pre-wrap; line-height: 1.7; font-size: 1rem; color: #333;">
                <strong style="color: #0d47a1;">[상세 문의 내용]</strong><br/><br/>
                ${safeContent}
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('이메일 발송 성공:', body.name);
      } catch (emailErr) {
        console.error('Nodemailer 메일 발송 오류:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST Contact API Error:', err);
    return NextResponse.json({ error: '문의 저장 실패' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // 1. Supabase 연동 시 데이터베이스에서 삭제
    if (supabase) {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    // 2. Supabase 미세팅 시 로컬 파일 시스템에서 삭제 (개발 폴백)
    if (fs.existsSync(dataFile)) {
       let inquiries = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
       inquiries = inquiries.filter(q => q.id !== id);
       fs.writeFileSync(dataFile, JSON.stringify(inquiries, null, 2));
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE Contact Error:', err);
    return NextResponse.json({ error: '삭제 실패' }, { status: 500 });
  }
}
