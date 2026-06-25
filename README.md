# AI Visualization Portfolio

基于 Next.js + Tailwind CSS + Three.js 的 AI 可视化设计师作品集

## 🚀 快速开始

### 1. 安装依赖

```bash
cd d:\zuopinji
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果

### 3. 构建生产版本

```bash
npm run build
```

构建后的文件将在 `out` 目录中，可直接部署到静态托管服务

## 📁 项目结构

```
d:\zuopinji
├── app/                      # Next.js App Router
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 首页
├── components/              # React 组件
│   ├── navigation.tsx      # 导航栏
│   ├── hero-section.tsx     # Hero 区域 + Shader 动效
│   ├── about-section.tsx    # 关于我
│   ├── projects-section.tsx # 项目展示
│   ├── skills-section.tsx   # 技能矩阵
│   ├── contact-section.tsx # 联系方式
│   ├── footer.tsx           # 页脚
│   └── shader-animation.tsx # Three.js Shader 背景
├── public/                  # 静态资源
│   └── assets/             # 作品图片（待补充）
│       └── works/
│           ├── jiangsu-weather/
│           ├── jiangsu-map/
│           ├── digital-earth/
│           └── ai-weather/
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **3D 渲染**: Three.js + React-Three-Fiber
- **动画**: GSAP + ScrollTrigger
- **类型**: TypeScript

## 📝 内容更新

### 1. 更新个人信息

编辑以下组件中的文案：
- `app/page.tsx` - 页面入口
- `components/about-section.tsx` - 关于我
- `components/contact-section.tsx` - 联系方式

### 2. 添加作品图片

将图片放入 `public/assets/works/` 目录：

```
public/assets/works/
├── jiangsu-weather/
│   ├── cover.jpg        # 封面图
│   ├── detail-01.jpg    # 详情图
│   └── demo.mp4        # 视频（可选）
├── jiangsu-map/
├── digital-earth/
└── ai-weather/
```

然后在 `components/projects-section.tsx` 中更新图片路径。

### 3. 自定义颜色

编辑 `tailwind.config.js` 中的颜色配置：

```javascript
colors: {
  primary: '#0ea5e9',    // 主色（蓝）
  secondary: '#8b5cf6',  // 辅助色（紫）
  accent: '#06b6d4',     // 点缀色（青）
}
```

## ✨ 功能特性

- 🎬 Hero 区域 Three.js Shader 动画（涟漪效果 + 鼠标交互）
- 📜 滚动驱动动画（GSAP ScrollTrigger）
- 🌊 毛玻璃玻璃态效果
- 🎨 渐变文字和光晕效果
- 📱 响应式设计（移动端适配）
- 🌓 深色主题
- ⚡ 静态生成（SSG），加载速度快

## 🔧 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run start

# 代码检查
npm run lint
```

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Three.js 文档](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP 文档](https://greensock.com/docs/)
- [21st.dev](https://21st.dev) - UI 组件灵感

## ⚠️ 注意事项

1. **Node.js 版本**: 需要 Node.js 18.17 或更高版本
2. **图片路径**: 目前使用占位符，添加真实图片后更新路径
3. **联系方式**: 在 `contact-section.tsx` 中更新真实的联系方式

## 🎯 下一步

1. ✅ 安装依赖并启动项目
2. ⬜ 添加个人作品图片
3. ⬜ 更新文案内容
4. ⬜ 自定义配色方案
5. ⬜ 部署到 Vercel / Netlify

---

Built with ❤️ for AI Visualization Designers
