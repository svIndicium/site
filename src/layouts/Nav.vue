<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import { stateStore } from '@/stores/state';
import content from '@/content/menu.json';
import NavLogo from '@/components/NavLogo.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const state = stateStore();
const items = content.items;
</script>

<template>
  <nav :class="'nav'">
    <div class="container flex">
      <NavLogo />
      <ul>
        <li v-for="item in items" :key="item.title + item.url + item.children">
          <template v-if="item.url == '/intro'">
            <RouterLink :to="item.url" class="button secondary rounded">{{ item.title }}</RouterLink>
          </template>
          <template v-else-if="item.url == '/lid-worden'">
            <RouterLink :to="item.url" class="button primary rounded">{{ item.title }}</RouterLink>
          </template>
          <template v-else-if="item.url.startsWith('http')">
            <a :href="item.url" target="_blank">{{ item.title }}</a>
          </template>
          <template v-else>
            <RouterLink :to="item.url">{{ item.title }}</RouterLink>
          </template>

          <span v-if="item.children" prefetch class="drop-icon-desktop-header">▾</span>

          <template v-if="item.children">
            <ul class="sub-menu">
              <li class="sub-menu-li" v-for="child in item.children" :key="child.title + child.url">
                <template v-if="child.url.startsWith('http')">
                  <a :href="child.url" target="_blank">{{ child.title }}</a>
                </template>
                <template v-else>
                  <RouterLink :to="child.url">{{ child.title }}</RouterLink>
                </template>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.nav {
  z-index: 1000;
  background: rgb(var(--root-background-color));
  // box-shadow: 0 -2px 8px 7px rgba(darkgrey, 0.25);
  border-bottom: 2px solid rgb(var(--indi-blue-1));
  /*
  * Consider using sticky so pages don't need to be padded at the top.
  * Unless if you are considering to use transparent navs on some pages,
  * then you'd need content behind it so use fixed.
  */
  position: fixed;
  top: 0;
  left: 0;
  width: inherit;

  // consistent style as on the home page
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(to bottom, rgba(grey, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
  }

  .container {
    position: relative;
    height: var(--nav-height);
  }

  ul {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;

    a {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }

      &:focus-within {
        outline: none;
        text-decoration: underline overline;
      }
    }

    li {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 100%;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: 500;
        color: rgb(var(--text-color));
        text-align: center;
        text-decoration: none;
        width: 100%;
        height: 100%;
      }
    }

    li:has(.button) {
      height: unset;

      .button {
        max-width: max-content;
      }
    }

    li:hover,
    li:focus-within {
      .sub-menu {
        display: list-item;
        opacity: 1;
        visibility: visible;
        width: 200px;

        .sub-menu-li {
          width: 100%;
          height: 50px;

          a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            color: rgb(var(--text-color));
          }

          a:hover,
          a:focus-within {
            background-color: rgb(var(--indi-blue-green-1));
            color: white;
            text-decoration: none;
          }
        }
      }
    }

    :is(li:hover, li:focus-within):has(.button) {
      background-color: transparent;
    }

    .sub-menu {
      display: list-item;
      position: absolute;
      align-items: center;
      flex-direction: column;
      background: rgb(var(--root-background-color));
      top: 100%;
      height: fit-content;
      box-shadow: inset 0 0 0 2px rgb(var(--indi-blue-green-1));
      opacity: 1;
      visibility: hidden;
      z-index: 1;
      overflow: visible;
    }
  }

  @media screen and (max-width: #{$bp-tablet-lg}) {
    display: block;
    visibility: hidden;
  }
}
</style>
