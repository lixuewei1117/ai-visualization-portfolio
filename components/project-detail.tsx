'use client'

import { useState } from 'react'
import type { Project } from '@/data/projects'
import ImageViewer from './image-viewer'
import VideoModal from './video-modal'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string; poster?: string } | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const images = project.images || []
  const videos = project.videos || []

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleVideoClick = (video: { src: string; title: string; poster?: string }) => {
    setSelectedVideo(video)
  }

  const handleFullscreen = () => {
    setIsFullscreen(true)
  }

  const renderLayout = () => {
    switch (project.layout) {
      case 'full-cover':
        return renderFullCover()
      case 'split':
        return renderSplit()
      case 'grid':
        return renderGrid()
      case 'gallery':
        return renderGallery()
      case 'showcase':
        return renderShowcase()
      case 'carousel':
        return renderCarousel()
      case 'stack':
        return renderStack()
      default:
        return renderDefault()
    }
  }

  const renderFullCover = () => (
    <div className="space-y-8">
      <div className="relative aspect-video rounded-2xl overflow-hidden">
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300">{project.subtitle}</p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300 leading-relaxed">{project.detailDescription}</p>
      </div>

      {videos.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">视频演示</h4>
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleVideoClick(video)}
            >
              <img
                src={video.poster || project.cover.src}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white font-medium">{video.title}</div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">项目截图</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderSplit = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.subtitle}</p>
          <p className="text-gray-300 leading-relaxed">{project.detailDescription}</p>
        </div>
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            className="w-full aspect-video object-cover"
          />
        </div>
      </div>

      {videos.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleVideoClick(video)}
            >
              <img
                src={video.poster || project.cover.src}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white font-medium">{video.title}</div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">相关图片</h4>
          <div className="flex flex-col gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex gap-4 items-center"
              >
                <div
                  className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{image.caption || image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderGrid = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.subtitle}</p>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">{project.detailDescription}</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderGallery = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.subtitle}</p>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">{project.detailDescription}</p>
      </div>

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
              style={{ maxHeight: index % 3 === 0 ? '400px' : '250px' }}
            />
            {image.caption && (
              <p className="mt-2 text-sm text-gray-400">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      {videos.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">视频作品</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => handleVideoClick(video)}
              >
                <img
                  src={video.poster || project.cover.src}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderShowcase = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.subtitle}</p>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">{project.detailDescription}</p>
      </div>

      {project.demoUrl && (
        <div className="relative">
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900">
            <iframe
              src={project.demoUrl}
              className="w-full h-full border-0"
              title={project.title}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          <button
            className="absolute top-4 right-4 px-4 py-2 rounded-full glass flex items-center gap-2 text-white hover:bg-white/20 transition-colors"
            onClick={handleFullscreen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            全屏演示
          </button>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderCarousel = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.subtitle}</p>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">{project.detailDescription}</p>
      </div>

      {images.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderStack = () => (
    <div className="space-y-8">
      <div className="relative h-80 rounded-2xl overflow-hidden">
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300">{project.subtitle}</p>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300 leading-relaxed">{project.detailDescription}</p>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderDefault = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.subtitle}</p>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">{project.detailDescription}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl glass p-8">
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {renderLayout()}

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full glass text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selectedImageIndex !== null && images.length > 0 && (
        <ImageViewer
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}

      {selectedVideo && (
        <VideoModal
          src={selectedVideo.src}
          title={selectedVideo.title}
          poster={selectedVideo.poster}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {isFullscreen && project.demoUrl && (
        <div
          className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setIsFullscreen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <iframe
            src={project.demoUrl}
            className="w-full h-full"
            title={`${project.title} - 全屏演示`}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </>
  )
}
