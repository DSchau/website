import autosize from 'autosize';

export default function autosizeTextareas(textAreas = ['message']) {
  let areas = [].concat(textAreas || [])
    .map(id => {
      const el = document.getElementById(id);
      autosize(el);
      return () => {
        return autosize.destroy(el);
      };
    });

  return function destroy() {
    areas
      .slice(0)
      .forEach(destroy => destroy());
  };
}
