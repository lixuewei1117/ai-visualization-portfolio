'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.skill-card',
        { opacity: 0, scale: 0.9, rotate: -5 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const skillsGroups = [
    {
      title: 'Coding 能力',
      icon: '💻',
      skills: [
        { name: 'React / Next.js', icon: '⚛️', level: 92 },
        { name: 'Three.js', icon: '🌐', level: 95 },
        { name: 'TypeScript', icon: '📘', level: 88 },
        { name: 'HTML / CSS', icon: '🎨', level: 95 },
      ],
    },
    {
      title: '设计工具',
      icon: '🎯',
      skills: [
        { name: 'Figma', icon: '✏️', level: 98 },
        { name: 'MasterGo', icon: '🎲', level: 90 },
        { name: 'Adobe Suite', icon: '🖥️', level: 85 },
        { name: 'Blender', icon: '🍊', level: 85 },
      ],
    },
    {
      title: '可视化技术',
      icon: '📊',
      skills: [
        { name: 'QGIS / GIS', icon: '🗺️', level: 90 },
        { name: 'Data Visualization', icon: '📈', level: 90 },
        { name: 'Unreal Engine', icon: '🎮', level: 75 },
        { name: 'AI Tools', icon: '🤖', level: 88 },
      ],
    },
  ]

  const stats = [
    { value: 15, label: '年设计经验', suffix: '+' },
    { value: 50, label: '完成项目', suffix: '+' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#0a0a0f] via-[#0f172a] to-[#0a0a0f]"
    >
      <div className="container mx-auto px-6">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-gradient">关于我</span>
            </h2>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              我拥有 <span className="text-primary font-semibold">15 年 UI 设计经验</span>，
              目前专注于 <span className="text-secondary font-semibold">AI 辅助设计</span>、
              <span className="text-accent font-semibold"> GIS 可视化</span>、
              数字孪生与实时三维展示方向。
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              我正在探索 AI × GIS × Realtime Visualization 的交叉领域，
              将人工智能、地理信息系统与实时渲染技术深度融合，
              创造更具空间感和沉浸感的数据可视化体验。
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center glass rounded-xl p-6">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border border-primary/20 rounded-full animate-pulse-slow" />
                <div className="absolute w-3/4 h-3/4 border border-secondary/20 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                <div className="absolute w-1/2 h-1/2 border border-accent/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass rounded-2xl p-8 text-center glow-primary">
                  <div className="text-6xl mb-4">🌍</div>
                  <div className="text-xl font-bold text-white mb-2">Digital Twin</div>
                  <div className="text-sm text-gray-400">Visualization Expert</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24" style={{ paddingLeft: '150px', paddingRight: '150px' }}>
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            技能矩阵
          </h3>

          <div className="skills-grid grid md:grid-cols-3 gap-8">
            {skillsGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="skill-card glass rounded-2xl p-6 hover-lift"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                    {group.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {group.title}
                  </h4>
                </div>

                <div className="space-y-4">
                  {group.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">{skill.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-200">
                            {skill.name}
                          </span>
                          <span className="text-xs text-primary">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
