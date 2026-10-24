import { withBase } from '../lib/asset'

export const offHoursAsset = (file: string) => withBase(`images/off-hours/${file}.webp`)
export const offHoursDownload = (file: string) => withBase(`downloads/off-hours/${file}`)

const figmaBase = 'https://www.figma.com/design/RoctkyFhNcQ8G35C7NfQV2/Untitled'
const prototypeBase = 'https://www.figma.com/proto/RoctkyFhNcQ8G35C7NfQV2/Untitled'

export const offHoursLinks = {
  file: `${figmaBase}?node-id=3-147`,
  perspectives: `${figmaBase}?node-id=10-384`,
  components: `${figmaBase}?node-id=3-183`,
  desktop: `${prototypeBase}?node-id=12-165&starting-point-node-id=12%3A165&page-id=0%3A1&scaling=scale-down&content-scaling=fixed`,
  mobile: `${prototypeBase}?node-id=12-213&starting-point-node-id=12%3A213&page-id=0%3A1&scaling=scale-down&content-scaling=fixed`,
}

export const offHoursViews = [
  { id: 'front', label: 'Front', title: 'Read the form.', description: 'A direct view makes the roll-top silhouette, central strap and front pocket easy to understand.', alt: 'Front view of the pine green roll-top daypack with a black strap and orange zipper pull.' },
  { id: 'side', label: 'Side', title: 'Give the object depth.', description: 'The side profile shows the pocket, bag depth and relationship between the body and shoulder straps.', alt: 'Left side profile of the daypack, showing its side pocket, depth and shoulder strap.' },
  { id: 'back', label: 'Back', title: 'Complete the carry story.', description: 'A rear concept explores shoulder straps and the back panel. This unseen construction was interpreted from the original reference.', alt: 'Conceptual back view of the daypack with two padded black shoulder straps and an olive rear panel.' },
  { id: 'detail', label: 'Detail', title: 'Move closer to the material.', description: 'The woven texture, rounded seam and orange cord create a tactile product story with a clear focal point.', alt: 'Close-up of the olive woven fabric, dark pocket zipper and orange cord pull.' },
  { id: 'lifestyle', label: 'On-body', title: 'Make scale tangible.', description: 'An on-body scene places the same product in a human context and carries the campaign into everyday use.', alt: 'An adult in an ochre shirt wears the pine daypack beside an autumn lake.' },
  { id: 'trail', label: 'Trail', title: 'Build a world around it.', description: 'The original outdoor image connects the object to the campaign idea: make a little more room for outside.', alt: 'The pine daypack sits on a rock overlooking a lake and autumn mountains.' },
] as const

export const offHoursColors = [
  { name: 'Pine', hex: '#183F32' },
  { name: 'Paper', hex: '#F1EEE5' },
  { name: 'Rust', hex: '#B6452A' },
  { name: 'Ink', hex: '#142D26' },
  { name: 'Mist', hex: '#D5DCD1' },
] as const
