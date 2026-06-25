export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface ProjectVideo {
  src: string
  title: string
  poster?: string
}

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  detailDescription: string
  tags: string[]
  cover: ProjectImage
  images?: ProjectImage[]
  videos?: ProjectVideo[]
  demoUrl?: string
  type: 'video' | 'demo' | 'images' | 'mixed' | 'collection'
  layout: 'full-cover' | 'split' | 'grid' | 'gallery' | 'showcase' | 'carousel' | 'stack'
}

export const projects: Project[] = [
  {
    id: 1,
    title: '江苏气象数字孪生平台',
    subtitle: 'Jiangsu Meteorological Digital Twin Platform',
    description: '基于真实 DEM 地形数据，整合气象层、数据层与 AI 辅助开发的综合可视化平台。',
    detailDescription: '本项目通过 QGIS 处理真实地形数据，Blender 构建三维模型，Three.js 实现 Web 端实时渲染。整合了云层、风场、降雨、台风等气象要素的实时可视化，同时接入气象站监测数据与告警信息，实现了完整的气象数字孪生解决方案。',
    tags: ['Three.js', 'QGIS', 'Blender', '气象', '数字孪生'],
    cover: { src: '/assets/works/01-jiangsu-weather/cover.jpg', alt: '江苏气象数字孪生平台' },
    images: [
      { src: '/assets/works/01-jiangsu-weather/screen-01.jpg', alt: '云层效果', caption: '动态云层渲染效果' },
      { src: '/assets/works/01-jiangsu-weather/screen-02.jpg', alt: '风场可视化', caption: '风场粒子系统' },
      { src: '/assets/works/01-jiangsu-weather/screen-03.jpg', alt: '降雨效果', caption: '实时降雨模拟' },
      { src: '/assets/works/01-jiangsu-weather/screen-04.jpg', alt: '台风追踪', caption: '台风路径追踪' },
    ],
    videos: [
      { src: '/assets/works/01-jiangsu-weather/demo.mp4', title: '平台演示视频', poster: '/assets/works/01-jiangsu-weather/cover.jpg' },
    ],
    type: 'mixed',
    layout: 'full-cover',
  },
  {
    id: 2,
    title: 'Three.js 数字地球试验 DEMO',
    subtitle: 'Digital Earth Experimental Demo',
    description: '基于 WebGL 的实时渲染数字地球，支持多图层叠加、数据标注与交互式探索。',
    detailDescription: '这是一个探索性项目，使用 Three.js 构建了一个可交互的数字地球。支持地球自转、缩放、倾斜等操作，可叠加显示云层、地形、城市标注等图层。项目展示了 WebGL 在地理信息可视化领域的强大能力。',
    tags: ['Three.js', 'WebGL', 'GIS', 'Data Viz'],
    cover: { src: '/assets/works/02-digital-earth/cover.jpg', alt: '数字地球' },
    demoUrl: 'https://your-demo-url.com/digital-earth',
    type: 'demo',
    layout: 'showcase',
  },
  {
    id: 3,
    title: '江苏三维地图演示',
    subtitle: 'Jiangsu 3D Map Demo',
    description: '利用 QGIS 处理 GIS 数据，Blender 构建三维模型，Three.js 实现 Web 端实时渲染的交互式地理信息系统。',
    detailDescription: '本项目将江苏省的地理数据转换为三维模型，实现了真实感地形渲染、建筑物三维建模、道路网络可视化等功能。用户可以自由旋转、缩放查看江苏全省的三维地理信息。',
    tags: ['GIS', 'Three.js', 'QGIS', 'Blender'],
    cover: { src: '/assets/works/03-jiangsu-map/cover.jpg', alt: '江苏三维地图' },
    demoUrl: 'https://your-demo-url.com/jiangsu-map',
    type: 'demo',
    layout: 'showcase',
  },
  {
    id: 4,
    title: '崇川经济开发区驾驶舱',
    subtitle: 'Chongchuan Economic Development Zone Dashboard',
    description: '为经济开发区打造的智能决策驾驶舱，整合多维度数据进行可视化展示。',
    detailDescription: '驾驶舱整合了园区经济数据、产业分布、人才流动、基础设施等多维度信息，通过大屏可视化方式呈现，帮助管理者快速掌握园区运营状况，支持科学决策。',
    tags: ['数据可视化', '大屏', 'Dashboard', 'B端'],
    cover: { src: '/assets/works/04-dashboard/cover.jpg', alt: '崇川驾驶舱' },
    images: [
      { src: '/assets/works/04-dashboard/screen-01.jpg', alt: '总览大屏', caption: '园区总览大屏' },
      { src: '/assets/works/04-dashboard/screen-02.jpg', alt: '产业分析', caption: '产业分布分析' },
      { src: '/assets/works/04-dashboard/screen-03.jpg', alt: '数据监控', caption: '实时数据监控' },
    ],
    type: 'images',
    layout: 'grid',
  },
  {
    id: 5,
    title: '智慧能源管理大屏',
    subtitle: 'Smart Energy Management Dashboard',
    description: '整合能源生产、传输、消耗全链路数据的智能可视化管理平台。',
    detailDescription: '本项目通过三维建模技术构建了能源设施的数字化模型，实时展示能源生产与消耗数据。同时提供了详细的建模过程展示，包括 Blender 建模、材质设置、纹理烘焙等环节。',
    tags: ['能源', '数据可视化', 'Blender', '大屏'],
    cover: { src: '/assets/works/05-energy/cover.jpg', alt: '智慧能源管理' },
    images: [
      { src: '/assets/works/05-energy/model-01.jpg', alt: '能源设施建模', caption: '设施三维建模' },
      { src: '/assets/works/05-energy/model-02.jpg', alt: '材质设置', caption: 'PBR材质设置' },
      { src: '/assets/works/05-energy/model-03.jpg', alt: '场景渲染', caption: '场景渲染效果' },
    ],
    type: 'images',
    layout: 'full-cover',
  },
  {
    id: 6,
    title: '可视化 Demo 视频合集',
    subtitle: 'Visualization Demo Videos',
    description: '两个可视化效果演示视频，展示数据可视化与三维渲染的技术能力。',
    detailDescription: '这两个 Demo 视频分别展示了实时数据可视化效果和三维场景渲染能力，是探索可视化技术边界的试验性作品。',
    tags: ['可视化', 'Demo', '视频'],
    cover: { src: '/assets/works/06-videos/cover.jpg', alt: '可视化Demo' },
    videos: [
      { src: '/assets/works/06-videos/demo-01.mp4', title: '数据可视化演示', poster: '/assets/works/06-videos/thumb-01.jpg' },
      { src: '/assets/works/06-videos/demo-02.mp4', title: '三维渲染演示', poster: '/assets/works/06-videos/thumb-02.jpg' },
    ],
    type: 'video',
    layout: 'split',
  },
  {
    id: 7,
    title: 'AI 文生视频能力展示',
    subtitle: 'AI Text-to-Video Capabilities',
    description: '展示 AI 文生视频技术在创意内容生成领域的应用与探索。',
    detailDescription: '通过自然语言描述生成视频内容，探索 AI 在创意设计流程中的应用可能性。展示了从文本描述到视觉内容的完整生成链路，以及生成结果的多样化表现形式。',
    tags: ['AI', '文生视频', '创意生成'],
    cover: { src: '/assets/works/07-ai-video/cover.jpg', alt: 'AI文生视频' },
    images: [
      { src: '/assets/works/07-ai-video/image-01.jpg', alt: '生成效果1', caption: '文本生成视频示例1' },
      { src: '/assets/works/07-ai-video/image-02.jpg', alt: '生成效果2', caption: '文本生成视频示例2' },
    ],
    videos: [
      { src: '/assets/works/07-ai-video/demo.mp4', title: 'AI文生视频演示', poster: '/assets/works/07-ai-video/cover.jpg' },
    ],
    type: 'mixed',
    layout: 'split',
  },
  {
    id: 8,
    title: '海报设计与视频剪辑',
    subtitle: 'Poster Design & Video Editing',
    description: '展示平面设计与视频剪辑的创意能力。',
    detailDescription: '包含3张竖版海报设计作品和4个手机短视频作品，展示了从视觉设计到动态内容制作的完整创意流程。视频需要手动播放，便于讲解者演示。',
    tags: ['海报设计', '视频剪辑', '创意'],
    cover: { src: '/assets/works/08-design/cover.jpg', alt: '海报设计' },
    images: [
      { src: '/assets/works/08-design/poster-01.jpg', alt: '海报1', caption: '竖版海报设计1' },
      { src: '/assets/works/08-design/poster-02.jpg', alt: '海报2', caption: '竖版海报设计2' },
      { src: '/assets/works/08-design/poster-03.jpg', alt: '海报3', caption: '竖版海报设计3' },
    ],
    videos: [
      { src: '/assets/works/08-design/video-01.mp4', title: '短视频1', poster: '/assets/works/08-design/thumb-01.jpg' },
      { src: '/assets/works/08-design/video-02.mp4', title: '短视频2', poster: '/assets/works/08-design/thumb-02.jpg' },
      { src: '/assets/works/08-design/video-03.mp4', title: '短视频3', poster: '/assets/works/08-design/thumb-03.jpg' },
      { src: '/assets/works/08-design/video-04.mp4', title: '短视频4', poster: '/assets/works/08-design/thumb-04.jpg' },
    ],
    type: 'mixed',
    layout: 'gallery',
  },
  {
    id: 9,
    title: '无人机控制台 UI',
    subtitle: 'Drone Control Console UI',
    description: '为无人机控制系统设计的专业操作界面。',
    detailDescription: '基于无人机飞行控制场景设计的专业控制台界面，包含实时视频监控、飞行参数显示、航线规划、云台控制等核心功能模块。采用深色主题设计，符合专业设备操作习惯。',
    tags: ['UI设计', '无人机', '控制台', 'B端'],
    cover: { src: '/assets/works/09-drone/cover.jpg', alt: '无人机控制台' },
    images: [
      { src: '/assets/works/09-drone/screen-01.jpg', alt: '主界面', caption: '飞行控制主界面' },
      { src: '/assets/works/09-drone/screen-02.jpg', alt: '航线规划', caption: '航线规划界面' },
      { src: '/assets/works/09-drone/screen-03.jpg', alt: '参数监控', caption: '实时参数监控' },
    ],
    type: 'images',
    layout: 'stack',
  },
  {
    id: 10,
    title: 'AI 辅助开发探索',
    subtitle: 'AI-Assisted Development Exploration',
    description: '展示利用 AI 辅助进行技术探索的两个 Demo 项目。',
    detailDescription: '这两个项目展示了我利用 AI 工具辅助进行技术探索的能力。风场可视化 Demo 使用 AI 生成的算法实现了实时风场粒子效果；卫星轨道演示展示了三维空间中的卫星运动模拟。这些都是出于个人兴趣的探索性项目。',
    tags: ['AI', 'Three.js', '数据可视化', '技术探索'],
    cover: { src: '/assets/works/10-ai-dev/cover.jpg', alt: 'AI辅助开发' },
    images: [
      { src: '/assets/works/10-ai-dev/wind-field.jpg', alt: '风场可视化', caption: 'AI辅助风场可视化Demo' },
      { src: '/assets/works/10-ai-dev/satellite.jpg', alt: '卫星轨道', caption: '三维卫星轨道演示' },
    ],
    demoUrl: 'https://your-demo-url.com/ai-exploration',
    type: 'demo',
    layout: 'showcase',
  },
  {
    id: 11,
    title: '展厅设计',
    subtitle: 'Exhibition Hall Design',
    description: '展示空间设计与数字展示技术的融合应用。',
    detailDescription: '将传统展厅设计与数字展示技术相结合，创造沉浸式的展示体验。包含空间布局设计、交互装置设计、多媒体展示方案等多个维度。',
    tags: ['展厅设计', '空间设计', '多媒体'],
    cover: { src: '/assets/works/11-exhibition/cover.jpg', alt: '展厅设计' },
    images: [
      { src: '/assets/works/11-exhibition/view-01.jpg', alt: '展厅全景', caption: '展厅空间全景' },
      { src: '/assets/works/11-exhibition/view-02.jpg', alt: '交互装置', caption: '数字交互装置' },
      { src: '/assets/works/11-exhibition/view-03.jpg', alt: '多媒体展示', caption: '多媒体展示区' },
      { src: '/assets/works/11-exhibition/view-04.jpg', alt: '细节设计', caption: '空间细节设计' },
    ],
    type: 'images',
    layout: 'gallery',
  },
  {
    id: 12,
    title: 'APP 设计合集',
    subtitle: 'Mobile App Design Collection',
    description: '三个移动应用的界面设计展示。',
    detailDescription: '展示了三个不同类型移动应用的设计方案，涵盖了从用户研究、信息架构到视觉设计的完整设计流程。每个项目包含首页设计及核心功能页面展示。',
    tags: ['APP设计', 'UI/UX', '移动端'],
    cover: { src: '/assets/works/12-apps/cover.jpg', alt: 'APP设计' },
    images: [
      { src: '/assets/works/12-apps/app-01-home.jpg', alt: 'APP1首页', caption: '生活服务类APP' },
      { src: '/assets/works/12-apps/app-01-detail.jpg', alt: 'APP1详情', caption: '核心功能页面' },
      { src: '/assets/works/12-apps/app-02-home.jpg', alt: 'APP2首页', caption: '电商类APP' },
      { src: '/assets/works/12-apps/app-03-home.jpg', alt: 'APP3首页', caption: '工具类APP' },
    ],
    type: 'images',
    layout: 'carousel',
  },
  {
    id: 13,
    title: '网页端设计合集',
    subtitle: 'Web Design Collection',
    description: '五个网页端项目的设计展示。',
    detailDescription: '涵盖企业官网、产品页、营销页等多种类型的网页设计，展示了响应式设计、交互设计、视觉层次等方面的能力。每个项目包含首页设计及多个核心页面展示。',
    tags: ['网页设计', '响应式', 'UI/UX'],
    cover: { src: '/assets/works/13-web/cover.jpg', alt: '网页设计' },
    images: [
      { src: '/assets/works/13-web/web-01-home.jpg', alt: '网站1首页', caption: '企业官网' },
      { src: '/assets/works/13-web/web-01-inner.jpg', alt: '网站1内页', caption: '产品详情页' },
      { src: '/assets/works/13-web/web-02-home.jpg', alt: '网站2首页', caption: '产品发布页' },
      { src: '/assets/works/13-web/web-03-home.jpg', alt: '网站3首页', caption: '营销活动页' },
      { src: '/assets/works/13-web/web-04-home.jpg', alt: '网站4首页', caption: '品牌官网' },
      { src: '/assets/works/13-web/web-05-home.jpg', alt: '网站5首页', caption: 'SaaS产品页' },
    ],
    type: 'images',
    layout: 'grid',
  },
  {
    id: 14,
    title: '插画作品集',
    subtitle: 'Illustration Collection',
    description: '展示创意插画与视觉表达能力。',
    detailDescription: '包含多种风格的插画作品，展示了从概念构思到视觉表现的创意过程。采用有趣的互动排版方式，让浏览体验更加生动有趣。',
    tags: ['插画', '创意', '视觉设计'],
    cover: { src: '/assets/works/14-illustration/cover.jpg', alt: '插画作品' },
    images: [
      { src: '/assets/works/14-illustration/illustration-01.jpg', alt: '插画1', caption: '数字插画' },
      { src: '/assets/works/14-illustration/illustration-02.jpg', alt: '插画2', caption: '扁平插画' },
      { src: '/assets/works/14-illustration/illustration-03.jpg', alt: '插画3', caption: '风格化插画' },
      { src: '/assets/works/14-illustration/illustration-04.jpg', alt: '插画4', caption: '商业插画' },
      { src: '/assets/works/14-illustration/illustration-05.jpg', alt: '插画5', caption: '概念插画' },
    ],
    type: 'images',
    layout: 'gallery',
  },
]
