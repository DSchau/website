import supportsWebP from 'supports-webp';

export default function modernizr() {
  document.documentElement.classList.add(
    supportsWebP === true ? 'webp' : 'no-webp'
  );
}
