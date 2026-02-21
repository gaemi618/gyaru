import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Heart, Skull, Zap, MapPin, Cigarette, ShoppingBag, Users, Cat, Star, Moon, Sun } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "./lib/utils";

function Intro({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000);
    const timer2 = setTimeout(() => setStep(2), 4000);
    const timer3 = setTimeout(onComplete, 6500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.p
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-light text-zinc-400 font-serif"
          >
            죽음을 꿈꾸는 밤...
          </motion.p>
        )}
        {step === 1 && (
          <motion.p
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-light text-orange-200 font-serif"
          >
            당신을 만나다
          </motion.p>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-500 mb-4">
              설지온
            </h1>
            <p className="text-sm text-zinc-500 tracking-[0.5em] uppercase">Seol Jion</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("min-h-screen flex flex-col justify-center px-6 py-20 relative overflow-hidden", className)}>
      {children}
    </section>
  );
}

function Badge({ children, className, icon: Icon }: { children: React.ReactNode; className?: string; icon?: any }) {
  return (
    <span className={cn("px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border backdrop-blur-md flex items-center gap-2 shadow-lg", className)}>
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}

function FloatingParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-60"
      initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
      animate={{ 
        y: "-10vh", 
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0]
      }}
      transition={{ 
        duration: Math.random() * 5 + 5, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear"
      }}
    />
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-slate-950 font-sans selection:bg-orange-500/30 selection:text-orange-200 relative">
      <AnimatePresence>
        {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        {/* Sunset Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-orange-700" />
        
        {/* Animated Overlay Gradients */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-rose-900/40 via-transparent to-blue-900/40 mix-blend-overlay"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Stars/Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
        
        {/* City Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="font-black text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-purple-200 hover:opacity-80 transition-opacity cursor-pointer">
          SEOL JION
        </div>
        <div className="flex gap-4 text-sm font-medium text-white/80">
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-300 transition-colors">소개</button>
          <button onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-300 transition-colors">스토리</button>
          <button onClick={() => document.getElementById('relationships')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-300 transition-colors">인물관계</button>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <Section className="items-center text-center min-h-[100vh]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 max-w-5xl mx-auto"
          >
            <div className="flex justify-center gap-3 mb-6">
              <Badge className="bg-rose-500/20 text-rose-200 border-rose-500/30" icon={Heart}>로맨스</Badge>
              <Badge className="bg-orange-500/20 text-orange-200 border-orange-500/30" icon={Zap}>개그</Badge>
              <Badge className="bg-indigo-500/20 text-indigo-200 border-indigo-500/30" icon={Moon}>약간의 피폐</Badge>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-300 drop-shadow-2xl filter">
              설지온
            </h1>
            
            <p className="text-xl md:text-3xl text-orange-100/90 font-light max-w-3xl mx-auto leading-relaxed text-shadow-lg break-keep">
              "죽음을 꿈꾸던 여자, <span className="text-yellow-300 font-medium border-b border-yellow-300/50">당신</span>을 만나 성장하다."
            </p>

            <div className="pt-20 flex justify-center">
              <motion.div 
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowDown className="text-orange-200/70 w-8 h-8" />
              </motion.div>
            </div>
          </motion.div>
        </Section>

        {/* Identity / About Section */}
        <Section id="about" className="bg-black/30 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Character Image Card */}
            <motion.div 
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img 
                src="https://i.postimg.cc/d3pSSwbq/54.png" 
                alt="Seol Jion" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Info Cards on Image */}
              <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-right">
                <p className="text-xs text-orange-300 font-bold uppercase tracking-widest mb-1">나이</p>
                <p className="text-2xl font-black text-white">25세</p>
              </div>
              
              <div className="absolute bottom-8 left-8 z-20 max-w-xs">
                <h2 className="text-5xl font-bold text-white mb-2 text-shadow">설지온</h2>
              </div>
            </motion.div>

            {/* Info Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-orange-300 flex items-center gap-3">
                  <Zap className="fill-orange-300 text-orange-300" /> 스타일 & 외형
                </h3>
                <p className="text-lg text-orange-50/80 leading-relaxed break-keep">
                  170cm의 키, 살짝 태닝된 피부, 탈색된 금발. 보라색 눈동자와 회색 네일, 화려한 피어싱은 기세에 눌릴 정도로 날카로운 인상을 주지만, 웃을 때는 아이처럼 순해 보입니다. 호피무늬 후드와 짧은 반바지, 늘 화려한 화장을 고수합니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="text-rose-300 font-bold mb-3 flex items-center gap-2">
                    <Heart size={18} /> 좋아하는 것
                  </h4>
                  <ul className="space-y-2 text-sm text-rose-100/70">
                    <li>• 호피무늬</li>
                    <li>• 돈 (Money)</li>
                    <li>• 에쎄센스 애플민트</li>
                    <li>• 초코케이크</li>
                    <li>• 자유 & 쇼핑</li>
                  </ul>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="text-indigo-300 font-bold mb-3 flex items-center gap-2">
                    <Skull size={18} /> 싫어하는 것
                  </h4>
                  <ul className="space-y-2 text-sm text-indigo-100/70">
                    <li>• 완벽주의</li>
                    <li>• 조용한 분위기</li>
                    <li>• 억압과 통제</li>
                    <li>• 규칙</li>
                    <li>• 공부</li>
                  </ul>
                </div>
              </div>

              {/* Personality Dualism */}
              <div className="bg-gradient-to-r from-orange-900/40 to-purple-900/40 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Sun size={80} className="text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">성격의 이면 (The Mask vs. Truth)</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">표면적 성격 (가면)</span>
                    <p className="text-orange-100/80 mt-1 break-keep">
                      쾌활하고 긍정적인 갸루. '하하-!' 호탕하게 웃으며 일을 가볍게 넘깁니다. 자신을 꾸미는 걸 좋아하며, 사람은 조금 망가진 모습이 있어야 인간적이라 생각합니다.
                    </p>
                  </div>
                  <div className="h-px bg-white/10 w-full" />
                  <div>
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">내면의 본성 (진심)</span>
                    <p className="text-purple-100/80 mt-1 break-keep">
                      사실은 도전이 두려워 핑계를 대며 회피합니다. 지나친 긍정은 고통을 피하기 위한 방패. 한때 죽음을 꿈꿨으나, 오토바이를 타며 맞은 바람에 눈물 흘리며 억지로 살아갑니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Story Section */}
        <Section id="story" className="relative">
          <div className="max-w-4xl mx-auto w-full relative z-10">
            <div className="text-center mb-16">
              <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30 mx-auto mb-6" icon={MapPin}>
                서울 마포구 신수동
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-purple-200">
                해질녘의 옥탑방
              </h2>
              <p className="text-xl text-indigo-200/60 font-light italic">
                "달동네 3층 주택, 11평의 나의 집."
              </p>
            </div>
            
            <div className="space-y-12 relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/50 to-transparent hidden md:block" />

              <StoryCard 
                year="고등학교 시절" 
                title="가출과 상처"
                content="폭력적인 아버지와 무관심한 어머니로부터 도망쳤습니다. 학교에서도 따돌림당하던 그녀에게 손을 내밀어준 유일한 사람마저 다치자, 세상에 깊은 회의감을 느꼈습니다."
                alignment="left"
              />
              
              <StoryCard 
                year="23세" 
                title="가출팸 생활"
                content="가출팸에서 지내며 꾸미는 법, 소매치기, 몸을 파는 법을 배웠습니다. 불법으로 돈을 벌며 지낸, 지우고 싶은 어두운 과거입니다."
                alignment="right"
              />
              
              <StoryCard 
                year="현재 (25세)" 
                title="후회와 동경"
                content="가출팸을 떠나 옥탑방과 오토바이(혼다 MSX 그롬)를 샀습니다. 갸루로 살아가지만, 평범한 삶을 사는 이들을 동경하며 지난날을 후회하고 자책합니다."
                alignment="left"
              />
            </div>
          </div>
        </Section>

        {/* Relationships Section */}
        <Section id="relationships" className="bg-black/40 backdrop-blur-md border-t border-white/5">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl font-bold mb-16 text-center text-white">
              주변 인물들
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <CharacterCard 
                name="배매희" 
                role="가출팸 소속"
                age="22세"
                traits={["ENFP", "귀여운 외모", "가출팸"]}
                icon={Heart}
                color="pink"
                image="https://i.postimg.cc/mZ5qryPf/56.png"
              />
              <CharacterCard 
                name="한주오" 
                role="가출팸 대장"
                age="28세"
                traits={["INTP", "189cm 거구", "폭력적"]}
                icon={Skull}
                color="red"
                image="https://i.postimg.cc/L4b7s3J8/57.png"
              />
              <CharacterCard 
                name="들레" 
                role="반려묘(?)"
                age="나이 미상"
                traits={["길고양이", "삼색이", "개냥이"]}
                icon={Cat}
                color="yellow"
                image="https://i.postimg.cc/jqF9j4Dj/58.png"
              />
            </div>
          </div>
        </Section>

        {/* Footer / CTA */}
        <footer className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-8">지온의 이야기를 시작하시겠습니까?</h2>
            
            <a 
              href="https://share.crack.wrtn.ai/uxz8bhw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-orange-500/25 mb-12"
            >
              설지온과 대화하기
              <ArrowDown className="-rotate-90" size={18} />
            </a>
            <p className="text-xs text-white/20 uppercase tracking-widest">
              © 2026 Seol Jion Character Project
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StoryCard({ year, title, content, alignment }: { year: string, title: string, content: string, alignment: "left" | "right" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "relative md:w-1/2 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors",
        alignment === "left" ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
      )}
    >
      <div className={cn(
        "absolute top-8 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] hidden md:block",
        alignment === "left" ? "-right-2 translate-x-1/2" : "-left-2 -translate-x-1/2"
      )} />
      
      <span className="text-orange-400 font-mono text-sm font-bold mb-2 block">{year}</span>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-indigo-100/70 leading-relaxed break-keep">{content}</p>
    </motion.div>
  );
}

function CharacterCard({ name, role, age, traits, icon: Icon, color, image }: any) {
  const colorClasses = {
    pink: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
    yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-black/40 p-8 rounded-3xl border border-white/5 relative group overflow-hidden"
    >
      <div className={cn("absolute top-0 right-0 p-32 rounded-full blur-3xl opacity-10 -mr-16 -mt-16 transition-opacity group-hover:opacity-20", colorClasses[color as keyof typeof colorClasses].split(" ")[0])} />
      
      {image ? (
        <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white/10 shadow-lg">
          <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      ) : (
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", colorClasses[color as keyof typeof colorClasses])}>
          <Icon size={28} />
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
      <p className="text-sm text-white/40 font-mono mb-6">{role} • {age}</p>
      
      <div className="flex flex-wrap gap-2">
        {traits.map((trait: string) => (
          <span key={trait} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-white/70 border border-white/5">
            {trait}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
