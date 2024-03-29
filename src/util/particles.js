import ParticleJS from '@dschau/particles.js';
import particlesConfig from 'static/particles-config-lines.json';

export const particles = selector => {
  const instances = []
    .concat(selector)
    .map(instance => ParticleJS(instance, particlesConfig));

  return () => {
    instances.splice(0).forEach(() => {
      ParticleJS.destroy();
    });
  };
};
