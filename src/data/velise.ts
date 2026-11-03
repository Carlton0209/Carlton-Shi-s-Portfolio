import { withBase } from '../lib/asset'

export const veliseAsset = (file: string) => withBase(`images/velise/${file}.webp`)
export const veliseDownload = (file: string) => withBase(`downloads/velise/${file}`)
export const veliseVideo = withBase('videos/velise-turntable.mp4')

// Each material study: the shot that shows it, and the settings that make it read correctly.
export const veliseMaterials = [
  {
    id: 'glass',
    image: 'macro',
    label: 'Glass',
    title: 'Weight you can see.',
    description: 'A 1.4 cm base and 0.45 cm walls give the flacon its heft. Two vertical strip lights draw the edges, and the thick base bends the set behind it.',
    specs: ['IOR 1.5, extra-flint tint', 'Solid volume, 16 bounces', 'Juice absorbs to amber over 4.2 cm'],
    alt: 'Close-up of the fig resin cap, gold collar and the thick glass shoulder of the VELISE bottle.',
  },
  {
    id: 'resin',
    image: 'macro',
    label: 'Resin cap',
    title: 'Lacquer, not plastic.',
    description: 'The cap is a Surlyn-style resin in fig. A clear coat over a 0.2 roughness base keeps one crisp highlight on top of a softer sheen, the way injected resin reads in hand.',
    specs: ['Ø 3.4 cm, 3.5 cm tall', 'Clear coat 1.0 over roughness 0.2', 'Brushed gold collar, roughness 0.24'],
    alt: 'Close-up of the fig resin cap and its highlight above the gold collar.',
  },
  {
    id: 'board',
    image: 'carton',
    label: 'Board',
    title: 'Foil you could touch.',
    description: 'Soft-touch board in the same fig, with a velvet sheen. The wordmark is hot-foil gold, blind-debossed into the board, lit with a grazing strip so the relief shows.',
    specs: ['7.4 × 13.6 × 5 cm rigid carton', 'Foil from metalness and roughness maps', 'Deboss from a height-derived normal map'],
    alt: 'Raking-light close-up of the fig carton with the gold-foil VELISE wordmark debossed into the board.',
  },
] as const

export const velisePasses = [
  { id: 'mask', label: 'Product mask', note: 'Locks the product pixels while the AI pass rebuilds the set.' },
  { id: 'depth', label: 'Depth', note: 'Drives a depth ControlNet so new light and props sit in the same space.' },
  { id: 'normal', label: 'Normals', note: 'Optional second control for surface direction and relighting.' },
] as const

export const veliseColors = [
  { name: 'Fig', hex: '#3A1B2B' },
  { name: 'Ambrée', hex: '#E6AD62' },
  { name: 'Foil', hex: '#D4B27A' },
  { name: 'Label', hex: '#EFE6D4' },
  { name: 'Stone', hex: '#CBBFAE' },
] as const
