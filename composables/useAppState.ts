/**
 * Composables for application-wide state management
 * Using Nuxt's built-in useState and VueUse utilities
 */

/**
 * Theme management using @nuxtjs/color-mode
 * Automatically handles SSR, persistence, and system preference detection
 */
export const useTheme = () => {
  const colorMode = useColorMode();

  return {
    // Current theme preference: 'light', 'dark', or 'system'
    preference: computed({
      get: () => colorMode.preference,
      set: (value: 'light' | 'dark' | 'system') => {
        colorMode.preference = value;
      },
    }),
    // Resolved theme value (what's actually shown): 'light' or 'dark'
    value: computed(() => colorMode.value),
    // Check if dark mode is active
    isDark: computed(() => colorMode.value === 'dark'),
  };
};

/**
 * Partner logo utility - handles light/dark logo switching
 * @param partner - Partner object with imgUrl and optional imgUrlDark
 * @returns The correct logo path for current theme
 */
export const usePartnerLogo = (partner: { imgUrl: string; imgUrlDark?: string }) => {
  const { isDark } = useTheme();

  return computed(() => {
    const logoFile = isDark.value && partner.imgUrlDark ? partner.imgUrlDark : partner.imgUrl;
    return `/assets/partners/${logoFile}`;
  });
};

/**
 * Navigation state for mobile menu
 * 0 = closed, 1-3 = different menu levels
 */
export const useNavState = () => {
  const navLevel = useState<0 | 1 | 2 | 3>('navLevel', () => 0);

  const toggleNav = () => {
    navLevel.value = navLevel.value ? 0 : 1;
  };

  const setNavLevel = (level: 0 | 1 | 2 | 3) => {
    navLevel.value = level;
  };

  const closeNav = () => {
    navLevel.value = 0;
  };

  return {
    navLevel: readonly(navLevel),
    toggleNav,
    setNavLevel,
    closeNav,
  };
};

/**
 * Authentication state with persistence
 * Using VueUse's useLocalStorage for automatic localStorage sync
 */
export const useAuth = () => {
  const auth = useLocalStorage('indicium-auth', {
    loggedin: false,
  });

  const login = () => {
    auth.value.loggedin = true;
  };

  const logout = () => {
    auth.value.loggedin = false;
  };

  return {
    isLoggedIn: computed(() => auth.value.loggedin),
    login,
    logout,
  };
};
