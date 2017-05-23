export const handleImages = query => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        io.unobserve(entry.target);
      }
    });
  });
  const images = Array.prototype.slice.call(document.querySelectorAll(query));

  images.forEach(image => {
    io.observe(image);
  });

  return io;
};

export default function lazyLoad(query = '.image.large') {
  const io = handleImages(query);
  return () => {
    io.disconnect();
  };
}
