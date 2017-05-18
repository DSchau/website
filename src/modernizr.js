import supportsWebP from 'supports-webp';

export default function modernizr() {
  if (supportsWebP) {
    document.documentElement.classList.remove('no-webp');
    document.documentElement.classList.add('webp');
  }
}
