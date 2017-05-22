import ParticleJS from 'particles.js';
import particlesConfig from 'static/config.json';

export default selector => {
  const instances = [].concat(selector).map(instance => {
    return ParticleJS(instance, particlesConfig);
  });

  return () => {
    instances.splice(0).forEach(() => {
      ParticleJS.destroy();
    });
  };
};
