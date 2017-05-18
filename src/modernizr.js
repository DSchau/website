import supportsWebP from 'supports-webp';

export default function modernizr() {
  document.documentElement.classList.add(supportsWebP ? 'webp' : 'no-webp');
}
