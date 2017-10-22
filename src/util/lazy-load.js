const imagesContext = require.context('static/images');

export const idleCallback = callback => {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(callback);
  }
  return setTimeout(callback);
};

export const getImageName = classList => {
  for (let i = 0; i < classList.length; i++) {
    if (classList[i].match(/image-/)) {
      return `./${classList[i].replace('image-', '')}.jpeg`;
    }
  }
  return '';
};

export const lazyLoadImage = imagePath =>
  new Promise(resolve => {
    const image = new Image();

    image.src = imagesContext(imagePath);

    image.onload = () => resolve();
  });

export const handleImages = query => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const { target } = entry;
      idleCallback(() => {
        const imagePath = getImageName(target.classList);
        if (entry.isIntersecting) {
          io.unobserve(target);
          lazyLoadImage(imagePath).then(() => {
            target.classList.add('loaded');
          });
        }
      });
    });
  });
  const images = Array.prototype.slice.call(document.querySelectorAll(query));

  images.forEach(image => {
    io.observe(image);
  });

  return io;
};

export function lazyLoad(query = '[lazy-load]') {
  const io = handleImages(query);
  return () => {
    io.disconnect();
  };
}
