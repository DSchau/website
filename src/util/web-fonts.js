/*
 * https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/
 */
export function webFonts(families = ['Montserrat:100,400,700', 'Bitter:700']) {
  if (sessionStorage.fonts === families.join(' ')) {
    document.documentElement.classList.add('wf-active');
  }

  import('webfontloader').then(WebFonts => {
    WebFonts.load({
      active() {
        sessionStorage.fonts = families.join(' ');
      },
      google: {
        families
      },
      timeout: 2000
    });
  });
}
