<script setup lang="ts">
// Query navigation collection
const { data: navData } = await useAsyncData('navigation', () => queryCollection('navigation').first());
const items = navData.value?.items || [];
</script>

<template>
  <nav :class="'nav flex'">
    <div class="container flex">
      <NavLogo />
      <ul>
        <MenuItem v-for="(item, index) in items" :key="index" :item="item" :first="true" />
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background: var(--root-background-color);
  border-bottom: 2px solid var(--indi-blue-1);
  /*
  * Consider using sticky so pages don't need to be padded at the top.
  * Unless if you are considering to use transparent navs on some pages,
  * then you'd need content behind it so use fixed.
  */
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: inherit;


  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(to bottom, rgba(128, 128, 128, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
  }

  * ul {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;

    & a {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }

      &:focus-within {
        outline: none;
        text-decoration: underline overline;
      }
    }

    & li {
      position: relative;
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    display: block;
    visibility: hidden;
  }
}

.container {
  height: var(--nav-height);
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
