import { useState, useEffect, useMemo } from 'react';

const PHOTOS = [
  { url: 'https://i.ibb.co.com/rfs5L97M/IMG-20260502-WA0016.jpg', cap: 'Yang ini saya simpan paling lama' },
  { url: 'https://i.ibb.co.com/5g469gHh/IMG-20260507-WA0024.jpg', cap: 'Merah favorit Sayang' },
  { url: 'https://i.ibb.co.com/PGrSzm8x/IMG-20260526-213346-538.jpg', cap: 'Mirror selfie yang bikin saya tanya: ini beneran?' },
  { url: 'https://i.ibb.co.com/v4FyxrBM/IMG-20260525-WA0045.jpg', cap: 'Roll di kepala, tetap cantik. Absurd.' },
  { url: 'https://i.ibb.co.com/vxk06hSv/IMG-20260525-WA0055.jpg', cap: 'Versi santai waktu teleponan' },
  { url: 'https://i.ibb.co.com/C3BfbCfF/IMG-20260525-WA0032.jpg', cap: 'Ada yang menemani Sayang' },
  { url: 'https://i.ibb.co.com/whcqdZ3S/IMG-20260525-WA0024.jpg', cap: 'Pintu maaf tetap terbuka' },
];

const SONGS = ['O4_WQTvI7YQ','pO3SgjYo90s','D-VytLhH-KE','JmCLgJ7VTGc','qZIQAk-BUEc','IqGQ2mBn4BY'];
const WA = '6281346386824';

export default function App() {
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [idx, setIdx] = useState(0);
  const [song, setSong] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [sIdx, setSIdx] = useState(0);
  const [no, setNo] = useState({x:0,y:0});

  useEffect(()=>{
    if(localStorage.getItem('unlock')==='1'){
      setOpen(true);
      const s = localStorage.getItem('song') || SONGS[Math.floor(Math.random()*6)];
      setSong(s); setSIdx(SONGS.indexOf(s)); setPlaying(true);
    }
  },[]);

  useEffect(()=>{ if(!open) return; const id=setInterval(()=>setIdx(i=>(i+1)%PHOTOS.length),5200); return()=>clearInterval(id)},[open]);
  useEffect(()=>{ if(!open||!playing) return; const t=setTimeout(()=>{const n=(sIdx+1)%6; setSIdx(n); setSong(SONGS[n]); localStorage.setItem('song',SONGS[n])}, 200000); return()=>clearTimeout(t)},[song,sIdx,open,playing]);

  const hearts = useMemo(()=>Array.from({length:24},(_,i)=>({id:i,l:Math.random()*100,d:Math.random()*5,dr:8+Math.random()*7})),[]);

  const submit = (e:React.FormEvent)=>{
    e.preventDefault();
    if(pw.replace(/\D/g,'')==='10101995'){
      const i=Math.floor(Math.random()*6);
      setSong(SONGS[i]); setSIdx(i); setPlaying(true); setOpen(true);
      localStorage.setItem('unlock','1'); localStorage.setItem('song',SONGS[i]);
    } else { setErr(true); setPw(''); setTimeout(()=>setErr(false),1800); }
  };

  const moveNo = () => {
    const m = window.innerWidth < 640;
    const max = m ? 80 : 140;
    setNo({x:(Math.random()-0.5)*max*2, y:(Math.random()-0.5)*max});
  };

  return (
    <div className="bg-[#0a0a0a] text-[#f0ebe5] min-h-screen selection:bg-[#c0392b]/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Space+Mono&display=swap');
        html{scroll-behavior:smooth}
        body{font-family:'Cormorant Garamond',serif;-webkit-font-smoothing:antialiased}
        .mono{font-family:'Space Mono',monospace}
        @keyframes fall{0%{transform:translateY(-20px) rotate(0);opacity:0}10%{opacity:.7}90%{opacity:.6}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        ::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:#0a0a0a}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#922b21,#1a0e0c);border-radius:4px}
      `}</style>

      {!open && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] grid place-items-center px-4">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {hearts.map(h=>(
              <div key={h.id} className="absolute text-[#c0392b]/50 select-none" style={{left:`${h.l}%`,top:'-20px',animation:`fall ${h.dr}s linear ${h.d}s infinite`,fontSize:'14px'}}>❤</div>
            ))}
          </div>
          <div className="relative w-full max-w-[340px] text-center" style={{animation:'up .8s ease'}}>
            <div className="text-[40px] mb-5">🔒</div>
            <h1 className="text-[28px] tracking-[0.14em] font-light mb-1" style={{
              background:'linear-gradient(90deg,#f0ebe5 0%,#f0ebe5 35%,#f5c9c3 50%,#f0ebe5 65%,#f0ebe5 100%)',
              WebkitBackgroundClip:'text', color:'transparent', backgroundSize:'200% auto', animation:'shimmer 3s linear infinite'
            }}>Hanya Untukmu</h1>
            <p className="mono text-[10px] tracking-[0.26em] text-[#6b5f5d] uppercase mb-10">masukkan tanggal lahir</p>
            <form onSubmit={submit} className="space-y-5">
              <input type="password" value={pw} onChange={e=>setPw(e.target.value.replace(/\D/g,'').replace(/(\d{2})(\d{2})(\d{0,4})/,'$1-$2-$3').slice(0,10))} placeholder="••-••-••••" className="w-full bg-transparent border-b border-[#2a1a18] focus:border-[#922b21] outline-none text-center py-3 tracking-[0.28em] mono text-[15px] placeholder-[#3a2e2b]" autoFocus />
              <div className={`h-4 text-[11px] mono transition-opacity ${err?'opacity-100 text-[#c0392b]':'opacity-0'}`}>salah, coba lagi</div>
              <button className="w-full py-2.5 border border-[#2a1c1a] hover:bg-[#140a09] hover:border-[#5a2a24] mono text-[11px] tracking-[0.18em] uppercase transition-colors">buka</button>
            </form>
          </div>
        </div>
      )}

      {song && playing && (
        <div className="fixed -left-[9999px]"><iframe key={song} width="1" height="1" src={`https://www.youtube.com/embed/${song}?autoplay=1&controls=0`} allow="autoplay" title="m"/></div>
      )}
      <button onClick={()=>setPlaying(!playing)} className="fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-[#111]/90 backdrop-blur border border-[#222] hover:border-[#5a2a24] grid place-items-center transition-colors" aria-label="musik">
        <span className={`w-2 h-2 rounded-full ${playing?'bg-[#c0392b] animate-pulse shadow-[0_0_10px_rgba(192,57,43,.5)]':'bg-[#555]'}`} />
      </button>

      <main className={open?'':'pointer-events-none blur-sm'}>
        {/* Hero */}
        <section className="min-h-[92vh] flex items-center justify-center text-center px-4 relative">
          <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(600px circle at 50% 45%, rgba(192,57,43,0.08), transparent 70%)'}} />
          <div className="relative max-w-[900px]" style={{animation:'up .9s ease'}}>
            <p className="mono text-[10px] tracking-[0.32em] text-[#7a2e26] uppercase mb-8">untuk seseorang yang nyata</p>
            <h1 style={{fontSize:'clamp(48px,11vw,116px)',lineHeight:.88,fontWeight:300,letterSpacing:'-0.015em'}}>
              Rezka<br/><span className="italic text-[#c97a6f]">Regina.</span>
            </h1>
            <p className="mt-8 text-[18px] md:text-[20px] italic text-[#9a8f8b] max-w-[600px] mx-auto leading-relaxed font-light">Ini bukan puisi. Bukan film. Ini cuma saya, yang tidak tahu harus bilang apa selain — saya serius.</p>
          </div>
        </section>

        <div className="w-[64px] h-px bg-[#7a2e26]/70 mx-auto my-8" />

        {/* 01 */}
        <section className="px-4 sm:px-6 py-20 md:py-24 max-w-[700px] mx-auto">
          <p className="mono text-[10px] tracking-[0.3em] text-[#7a2e26] uppercase mb-6">01 — awal mula</p>
          <h2 className="text-[30px] sm:text-[40px] leading-[1.15] mb-8 font-light">Dimulai dari <em className="italic text-[#d26a5f]">gangguan kecil</em></h2>
          <div className="space-y-6 text-[17px] leading-[2.05] text-[#c9c1bc] font-light">
            <p>Jujur — awalnya saya yang tidak tahu malu. Chat terus di Messenger, padahal Sayang mungkin hanya balas karena sedang jualan. Saya tidak beli. Saya makin intens.</p>
            <p>Sayang sempat batasi. Wajar. Tapi di antara semua yang datang dan pergi — pintu itu perlahan dibuka. Bukan karena saya istimewa. Mungkin karena saya terlalu keras kepala untuk pergi.</p>
            <div className="border-l-2 border-[#7a2e26] pl-6 py-3 my-8 bg-[#0f0d0c]">
              <p className="text-[19px] leading-[1.7] italic text-[#e8ddd9]">“Dan ternyata itu cukup. Bertahan ketika orang lain memilih mundur.”</p>
            </div>
          </div>
        </section>

        {/* 02 */}
        <section className="px-4 sm:px-6 py-24 md:py-28 max-w-[700px] mx-auto">
          <p className="mono text-[10px] tracking-[0.3em] text-[#7a2e26] uppercase mb-6">02 — tentang sayang</p>
          <h2 className="text-[30px] sm:text-[40px] leading-[1.15] mb-8 font-light">Hal-hal yang <em className="italic text-[#d26a5f]">membuat saya diam</em></h2>
          <div className="space-y-6 text-[17px] leading-[2.05] text-[#c9c1bc] font-light">
            <p>Sayang lucu. Bukan dibuat-buat — lucu yang keluar begitu saja, absurd, dan selalu membuat hal serius jadi ringan. Itu kekuatan.</p>
            <p>Kalau sudah nyaman, bicara panjang pun tidak habis. Buktinya saya sering tertidur di tengah telepon. Bukan bosan. Suara Sayang tenang. Seperti rumah.</p>
            <div className="my-8 p-5 bg-[#111] border border-[#1c1513] border-l-[3px] border-l-[#7a2e26]">
              <p className="mono text-[10px] uppercase tracking-wider text-[#6a5a56] mb-2">// catatan</p>
              <p className="mono text-[12px] leading-relaxed text-[#a89e9a]">Sayang pernah bilang sedang “mengerjain penipu sampai kena mental”. Dari situ saya tahu: Sayang kuat.</p>
            </div>
            <p>Yang membuat saya kagum: Sayang pernah menanggung hal tidak ringan. Orang tua berpisah, kehilangan Ibu, Ayah memilih jalan lain. Tapi pintu maaf tetap terbuka.</p>
          </div>
        </section>

        {/* Photos */}
        <section className="py-20 bg-[#080707] border-y border-[#141211]">
          <div className="px-4 sm:px-6 max-w-[1100px] mx-auto">
            <div className="text-center mb-10">
              <p className="mono text-[10px] tracking-[0.3em] text-[#7a2e26] uppercase mb-3">03 — foto sayang</p>
              <h2 className="text-[26px] sm:text-[32px] font-light">Yang membuat <em className="italic text-[#d26a5f]">layar terasa hidup</em></h2>
            </div>
            <div className="max-w-[420px] mx-auto">
              <div className="overflow-hidden ring-1 ring-[#1c1513] shadow-[0_25px_70px_rgba(0,0,0,.7)] bg-black">
                <div className="flex transition-transform duration-500" style={{transform:`translateX(-${idx*100}%)`}}>
                  {PHOTOS.map((ph,i)=>(
                    <div key={i} className="min-w-full">
                      <div className="aspect-[4/5] sm:aspect-[3/4] relative">
                        <img src={ph.url} alt="" className="w-full h-full object-cover" style={{filter:'grayscale(8%) contrast(1.04)'}} loading={i<2?'eager':'lazy'} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 h-[40px] grid place-items-center">
                <p key={idx} className="text-[14px] italic text-[#d4cbc6] text-center px-2" style={{animation:'up .3s ease'}}>{PHOTOS[idx].cap}</p>
              </div>
              <div className="flex justify-center gap-1.5 mt-3">
                {PHOTOS.map((_,i)=>(<button key={i} onClick={()=>setIdx(i)} className={`h-[3px] rounded-full transition-all ${i===idx?'w-5 bg-[#a24a40]':'w-3 bg-[#2a1e1c]'}`} />))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 */}
        <section className="px-4 sm:px-6 py-24 max-w-[700px] mx-auto">
          <p className="mono text-[10px] tracking-[0.3em] text-[#7a2e26] uppercase mb-6">04 — saya</p>
          <h2 className="text-[30px] sm:text-[40px] leading-[1.15] mb-8 font-light">Saya sedang <em className="italic text-[#d26a5f]">mengusahakan</em></h2>
          <div className="space-y-6 text-[17px] leading-[2.05] text-[#c9c1bc] font-light">
            <p>Saya kerja di Untad, P3K 2025, pagi sampai malam. Sisa waktu saya merintis foto, website, editing. Masih kecil.</p>
            <p>Saya juga tumpuan orang tua. Jadi kalau belum cepat, bukan tidak mau. Saya sedang menanggung banyak hal sekaligus.</p>
            <p>Sigma ke Silae dekat. Satu kota. Kadang itu terasa lebih berat dari LDR, karena tidak ada alasan geografis. Hanya waktu yang belum berpihak.</p>
          </div>
        </section>

        {/* 05 Gift */}
        <section className="px-4 sm:px-6 py-28 md:py-36 text-center">
          <div className="max-w-[720px] mx-auto">
            <p className="mono text-[10px] tracking-[0.3em] text-[#7a2e26] uppercase mb-8">05 — penutup</p>
            <h2 className="mb-6 font-light" style={{fontSize:'clamp(36px,7vw,68px)',lineHeight:.92}}>Sayang adalah<br/><em className="italic text-[#d26a5f]">yang terakhir.</em></h2>
            <p className="text-[16px] italic text-[#9a8f8b] max-w-[580px] mx-auto leading-[1.8] font-light mb-14">Bukan karena tidak ada pilihan. Tapi karena setelah mengenal Sayang — saya tidak mau ada pilihan lain.</p>
            
            <div className="inline-block p-8 md:p-10 bg-[#0f0d0c]/70 border border-[#1c1513] backdrop-blur-sm">
              <div className="text-[64px] leading-none mb-4" style={{filter:'drop-shadow(0 0 24px rgba(160,42,32,.3))'}}>♥</div>
              <h3 className="text-[20px] mb-2 font-light">Boleh saya kirim hadiah?</h3>
              <p className="text-[13px] text-[#8a7f7b] mb-7 max-w-[340px] mx-auto">Bukan karena harus. Karena saya mau. Via ojek ke Silae.</p>
              <div className="relative h-[48px] flex items-center justify-center gap-3">
                <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Saya sudah membaca semuanya. Saya ingin menerima hadiahnya — Rezka')}`} target="_blank" className="px-7 h-11 grid place-items-center bg-[#1a0f0e] border border-[#3a2220] text-[#e8ddd9] hover:bg-[#231412] hover:border-[#5a2f28] mono text-[11px] tracking-[0.16em] uppercase transition-colors relative overflow-hidden group">
                  <span className="relative z-10">Ya, boleh</span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-[#c0392b]/20 to-transparent" />
                </a>
                <button onClick={moveNo} onMouseEnter={moveNo} style={{transform:`translate(${Math.max(-90,Math.min(90,no.x))}px,${Math.max(-40,Math.min(40,no.y))}px)`}} className="px-7 h-11 grid place-items-center border border-[#241917] text-[#6b5d59] hover:border-[#3a2a27] mono text-[11px] tracking-[0.16em] uppercase transition-all duration-200 absolute left-[calc(50%+70px)]">
                  tidak
                </button>
              </div>
            </div>

            <div className="mt-20">
              <p className="mono text-[10px] tracking-[0.18em] text-[#5a4e4b] uppercase">ditulis dengan tangan gemetar</p>
              <p className="mono text-[12px] tracking-[0.12em] text-[#8a5a54] mt-1.5">MOH. RIFQI S. LAMADANG</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#141211]">
        <div className="h-px w-full" style={{background:'linear-gradient(90deg,transparent,#3a1f1c,transparent)'}} />
        <div className="py-6 text-center px-4">
          <p className="mono text-[10px] tracking-[0.18em] text-[#2a1f1d] uppercase">dibuat khusus · hanya untuk satu orang</p>
          <p className="mt-1.5 italic text-[15px] text-[#4a3633]" style={{fontFamily:'Cormorant Garamond, serif'}}>MRS ❤ RR</p>
        </div>
      </footer>
    </div>
  );
}