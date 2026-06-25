'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MagicRings from './MagicRings'

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      )
      .fromTo(
        tagsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  return (
    <section id="hero" className="relative flex w-full h-screen flex-col items-center justify-center overflow-hidden">
      {/* MagicRings 背景 - 全屏铺满 */}
      <div className="absolute inset-0">
        <MagicRings
          color="#2af0d8"
          colorTwo="#5054f4"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={1}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={21}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 w-full mx-auto max-w-3xl">
        <main className="relative py-10 overflow-hidden">
          {/* 首页标签 */}
          <div
            ref={labelRef}
            className="flex items-center justify-center gap-1 mb-6"
          >
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs text-green-500">首页</p>
          </div>

          {/* 标题 */}
          <h1
            ref={titleRef}
            className="mb-3 text-white text-center text-6xl font-extrabold tracking-tighter md:text-[clamp(1.8rem,7.2vw,6.3rem)]"
          >
            <span className="block" style={{ fontFamily: 'DengXian, 等线, sans-serif', fontWeight: 400, fontSize: '50px' }}>从 UI 设计</span>
            <span className="block" style={{ fontFamily: 'DengXian, 等线, sans-serif', fontSize: '60px', background: 'linear-gradient(to right, #2E5BFF, #5DF6A9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>到 AI 可视化</span>
          </h1>

          {/* 副标题 */}
          <p
            ref={subtitleRef}
            className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg max-w-2xl mx-auto"
          >
            利用 AI、地理信息系统、三维引擎与实时渲染技术，
            <br />
            构建更真实、更具空间感的数据可视化体验。
          </p>

          {/* 标签 */}
          <div
            ref={tagsRef}
            className="my-8 flex flex-wrap justify-center gap-4"
          >
            {['UI', 'UX', 'AI Design', 'GIS', 'Data Visualization', 'Digital Twin', 'Vibe Coding'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-white/20 text-white/70 text-xs hover:border-white/40 hover:text-white transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA 按钮 */}
          <div ref={scrollIndicatorRef} className="flex justify-center mt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm font-medium"
            >
              查看项目
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </main>
      </div>
    </section>
  )
}
