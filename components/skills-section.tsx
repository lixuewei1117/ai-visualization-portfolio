'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-item',
        { opacity: 0, scale: 0.8, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#0f172a] via-[#0a0a0f] to-[#0a0a0f]"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">核心能力</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            UI × UX × Vibe Coding × GIS × Blender × QGIS × Data Visualization
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'UI', icon: '🎨', category: '设计', color: '#F24E1E' },
            { name: 'UX', icon: '🧩', category: '设计', color: '#7C3AED' },
            { name: 'Figma', icon: '✏️', category: '设计', color: '#A259FF' },
            { name: 'MasterGo', icon: '🎲', category: '设计', color: '#6366F1' },
            { name: 'Vibe Coding', icon: '💻', category: 'Coding', color: '#92D050' },
            { name: 'QGIS', icon: '🗺️', category: 'GIS', color: '#4CAF50' },
            { name: 'Blender', icon: '🍊', category: '3D', color: '#F47920' },
            { name: 'AI Tools', icon: '🤖', category: 'AI', color: '#9333EA' },
            { name: 'Data Viz', icon: '📊', category: '可视化', color: '#0EA5E9' },
            { name: 'Digital Twin', icon: '🌍', category: '孪生', color: '#10B981' },
          ].map((tool, index) => (
            <div
              key={index}
              className="skill-item group relative p-6 rounded-2xl glass hover-lift cursor-default"
              style={{
                borderColor: `${tool.color}30`,
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 30px ${tool.color}30`,
                }}
              />

              <div className="relative text-center">
                <div
                  className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                >
                  {tool.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {tool.name}
                </h3>
                <p
                  className="text-xs font-medium"
                  style={{ color: tool.color }}
                >
                  {tool.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              关键词
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['UI', 'UX', 'AI Design', 'GIS', 'Data Visualization', 'Digital Twin', 'Vibe Coding', '3D Model', 'Blender', 'QGIS', 'Figma', 'MasterGo'].map(
                (keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-gray-200 hover-lift"
                  >
                    {keyword}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
