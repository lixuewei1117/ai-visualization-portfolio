'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import ProjectDetail from './project-detail'
import BorderGlow from './BorderGlow'
import type { Project } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
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
      id="projects"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#0a0a0f] to-[#0f172a]"
      style={{ paddingLeft: '150px', paddingRight: '150px' }}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          从 UI 设计到 AI 可视化的探索之路
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={cardRef}
      className="project-card cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BorderGlow
        backgroundColor="#0a0a0f"
        borderRadius={16}
        glowRadius={20}
        glowIntensity={0.8}
        colors={['#0ea5e9', '#8b5cf6', '#06b6d4']}
        edgeSensitivity={20}
        coneSpread={20}
        className="overflow-hidden"
      >
        <div className="relative aspect-video">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 opacity-50">🗺️</div>
              <div className="text-sm text-gray-500">图片待补充</div>
              <div className="text-xs text-gray-600 mt-2">{project.title}</div>
            </div>
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-80'
            }`}
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-xs text-primary font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="transform transition-transform duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-secondary mb-3">{project.subtitle}</p>
              <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
            </div>

            <div
              className={`mt-4 transform transition-all duration-300 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary rounded-full text-white font-medium hover:bg-primary/90 transition-colors">
                查看详情
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </BorderGlow>
    </div>
  )
}
