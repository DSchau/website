import autosize from 'autosize';

export default function autosizeTextareas(textAreas = ['message']) {
  const areas = [].concat(textAreas || []).map(id => {
    const el = document.getElementById(id);
    autosize(el);
    return () => autosize.destroy(el);
  });

  return function destroyAutosize() {
    areas.slice(0).forEach(destroy => destroy());
  };
}
