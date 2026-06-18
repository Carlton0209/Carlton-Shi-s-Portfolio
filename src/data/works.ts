import { withBase } from '../lib/asset'

export type WorkCategory = 'All' | 'Film' | 'AI Visuals' | 'Web Products' | '3D & Post'
export type WorkCategoryValue = Exclude<WorkCategory, 'All'>

export type WorkGalleryItem = {
  src: string
  alt: string
  caption: string
}

export type WorkProject = {
  slug: string
  title: string
  category: WorkCategoryValue
  summary: string
  image: string
  year: string
  externalUrl?: string
  externalLabel?: string
  intro: string
  notes: string[]
  tools: string[]
  deliverables: string[]
  gallery: WorkGalleryItem[]
}

export const categories: WorkCategory[] = ['All', 'Film', 'AI Visuals', 'Web Products', '3D & Post']

export const works: WorkProject[] = [
  {
    slug: 'one-day-migration',
    title: 'One-day Migration',
    category: 'Film',
    summary: 'Narrative short film about movement, belonging, and urban rhythm.',
    image:
      'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/009/340/504/original/56.jpg?1746511266',
    externalUrl: 'https://filmfreeway.com/One-dayMigration',
    externalLabel: 'View FilmFreeway page',
    year: '2026',
    intro:
      'A narrative short shaped around movement, belonging, and the rhythm of an unfamiliar city. The work sits in the Film section as a story-first piece with a cinematic visual system.',
    notes: [
      'Built around restrained character observation and location texture.',
      'Uses atmospheric pacing and urban detail to make migration feel immediate rather than abstract.',
      'Presented as a festival-ready short film entry with a clear public-facing project page.',
    ],
    tools: ['Directing', 'Editing', 'Color', 'Festival materials'],
    deliverables: ['Narrative short film', 'Project presentation', 'Festival listing'],
    gallery: [
      {
        src:
          'https://filmfreeway-production-storage-01-connector.filmfreeway.com/attachments/files/009/340/504/original/56.jpg?1746511266',
        alt: 'Still from One-day Migration',
        caption: 'Primary still from the narrative short film.',
      },
    ],
  },
  {
    slug: 'ai-generated-images',
    title: 'AI Generated Images',
    category: 'AI Visuals',
    summary: 'Commercial image-generation workflow for consistent visual direction.',
    image: withBase('images/clearcat-processed-image-2.png'),
    externalUrl: 'https://carltonshi0209.my.canva.site/aigc',
    externalLabel: 'Original Canva portfolio',
    year: '2026',
    intro:
      'A still-image generation workflow focused on cinematic realism, controlled texture, and consistent visual direction.',
    notes: [
      'Explores identity, gaze, skin texture, lighting, and fine surface detail.',
      'Designed for commercial-style image generation where mood and finish need to stay coherent.',
      'Organized as a focused AI Visuals study with a clear mood, image finish, and production direction.',
    ],
    tools: ['Midjourney', 'Stable Diffusion', 'ComfyUI', 'Photoshop', 'Prompt direction'],
    deliverables: ['Generated key visual', 'Look-development study', 'Portfolio presentation'],
    gallery: [
      {
        src: withBase('images/clearcat-processed-image-2.png'),
        alt: 'AI generated cinematic portrait close-up',
        caption: 'Cinematic close-up study with controlled skin texture and eye detail.',
      },
    ],
  },
  {
    slug: 'ai-generated-videos',
    title: 'AI Generated Videos',
    category: 'AI Visuals',
    summary: 'Generated video pipeline shaped with restoration, upscaling, and post.',
    image: withBase('images/uiaosdyhulaksjhd.jpg'),
    externalUrl: 'https://carltonshi0209.my.canva.site/aigc',
    externalLabel: 'Original Canva portfolio',
    year: '2026',
    intro:
      'A generated-video pipeline built around stylized motion, image-to-video development, and post-production refinement.',
    notes: [
      'Uses a highly detailed generated still as the visual anchor for motion exploration.',
      'Focuses on restoration, upscale, and edit-ready image quality for generated media.',
      'Presented alongside the still-image work as a related but separate AI Visuals project with its own motion language.',
    ],
    tools: ['Runway', 'Luma', 'Kling', 'ComfyUI', 'DaVinci Resolve'],
    deliverables: ['Generated motion study', 'Upscaled visual asset', 'Post-production pass'],
    gallery: [
      {
        src: withBase('images/uiaosdyhulaksjhd.jpg'),
        alt: 'AI generated eye with petals and glowing iris',
        caption: 'Stylized generated frame used as a motion and post-production source.',
      },
    ],
  },
  {
    slug: 'reallife-ai',
    title: 'REALLIFE AI',
    category: 'Web Products',
    summary: 'A cinematic portrait enhancer built around realism and a clean flow.',
    image: withBase('images/reallife-ai-preview.jpg'),
    externalUrl: 'https://reallife-ai-eib5.vercel.app/',
    externalLabel: 'Open live product',
    year: '2026',
    intro:
      'A web product for cinematic portrait enhancement, built around a clean user flow and a realism-first visual direction.',
    notes: [
      'Frames AI enhancement as a simple product experience rather than a technical demo.',
      'Uses clear upload, preview, and result expectations for a direct user workflow.',
      'Belongs in Web Products because the interface and conversion path are part of the work.',
    ],
    tools: ['React', 'Vercel', 'ComfyUI', 'LoRA workflow', 'Product design'],
    deliverables: ['Responsive web product', 'Portrait enhancement flow', 'Landing and preview UI'],
    gallery: [
      {
        src: withBase('images/reallife-ai-preview.jpg'),
        alt: 'REALLIFE AI product preview',
        caption: 'Product preview for the cinematic portrait enhancement workflow.',
      },
    ],
  },
  {
    slug: 'lineage',
    title: 'LINEAGE',
    category: 'Web Products',
    summary: 'The homepage for LINEAGE, designed as a direct first screen for the project.',
    image: withBase('images/lineage-homepage.png'),
    externalUrl: 'https://web-oj1ikahn5-carlton0209s-projects.vercel.app/',
    externalLabel: 'Open live homepage',
    year: '2026',
    intro:
      'A homepage concept for LINEAGE with a direct first-screen product signal, clean navigation, and a restrained interface language.',
    notes: [
      'Prioritizes immediate brand and product clarity on first load.',
      'Uses a compact layout system for scanning rather than a long marketing wrapper.',
      'Fits the Web Products section as a shipped homepage and interface design exercise.',
    ],
    tools: ['React', 'Vite', 'Responsive UI', 'Product layout', 'Visual direction'],
    deliverables: ['Homepage build', 'Responsive layout', 'Product-first landing screen'],
    gallery: [
      {
        src: withBase('images/lineage-homepage.png'),
        alt: 'LINEAGE homepage screenshot',
        caption: 'Homepage screenshot showing the LINEAGE first-screen product experience.',
      },
    ],
  },
  {
    slug: 'films-and-3d-modeling',
    title: 'Films and 3D Modeling',
    category: '3D & Post',
    summary: 'Film craft, CG, post-production, and 3D work across production tools.',
    image: withBase('images/img.png'),
    externalUrl: 'https://carltonshi0209.my.canva.site',
    externalLabel: 'Original Canva portfolio',
    year: '2026',
    intro:
      'A collection of film, CG, post-production, and 3D modeling work shaped around craft, atmosphere, and production fluency.',
    notes: [
      'Connects film language with technical image-making and post-production craft.',
      'Covers visual development, CG presentation, and production-facing creative assets.',
      'Lives in 3D & Post so it can sit beside film and AI work while keeping a distinct craft focus.',
    ],
    tools: ['Blender', 'Maya', 'Unreal Engine', 'After Effects', 'DaVinci Resolve'],
    deliverables: ['Creative portfolio page', '3D and post-production showcase', 'Film craft presentation'],
    gallery: [
      {
        src: withBase('images/img.png'),
        alt: 'Films and 3D modeling portfolio preview',
        caption: 'Portfolio preview image for film craft, CG, and post-production work.',
      },
    ],
  },
]

export function getWorkBySlug(slug?: string) {
  return works.find(work => work.slug === slug)
}
