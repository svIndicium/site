export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.afterEach((to) => {
    if (to.name) {
      document.title = 'Indicium - ' + to.name.toString();
    }
  });
});
