import { UAParser } from 'ua-parser-js';

export default defineNuxtRouteMiddleware((to) => {
  // Check if it's iOS Safari (which messes up PDF rendering)
  if (import.meta.client) {
    const { getDevice, getEngine, getOS, getBrowser } = new UAParser();

    const isTouch = ['mobile', 'tablet'].includes(getDevice().type ?? '');
    const isWebkit = getEngine().name === 'WebKit';
    const isIOS = getOS().name === 'iOS';
    const isSafari = getBrowser().name === 'Mobile Safari';

    const messesUp = isTouch && isWebkit && isIOS && isSafari;

    // PDF routes that need special handling
    const pdfRoutes = {
      '/statuten': '/pdf/statutenindicium.pdf',
      '/hr': '/pdf/Huishoudelijk_Reglement_Studievereniging_Indicium.pdf',
      '/privacyreglement': '/pdf/privacypolicy.pdf',
    };

    if (messesUp && to.path in pdfRoutes) {
      // Use navigateTo with external option for external redirect
      window.location.href = pdfRoutes[to.path as keyof typeof pdfRoutes];
    }
  }
});
