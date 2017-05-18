import ParticleJS from 'particles.js';
import particlesConfig from 'static/config.json';

export default selector => {
  ParticleJS(selector, particlesConfig);

  return ParticleJS.destroy;
};
