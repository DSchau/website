import ParticleJS from 'particles.js';
import particlesConfig from './config/config.json';

export default (selector) => {
  ParticleJS(selector, particlesConfig);

  return ParticleJS.destroy;
};
