<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import { ref } from 'vue';
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
          <RouterLink v-if="item.url == '/intro'" :to="item.url" class="intro">
            {{ item.title }}
          </RouterLink>
          <RouterLink v-else-if="item.url == '/lid-worden'" :to="item.url" class="wordt-lid">
            {{ item.title }}
          </RouterLink>
          <a v-else-if="item.url.startsWith('http')" :href="item.url" target="_blank">
            {{ item.title }}
          </a>

          <RouterLink v-else :to="item.url">
            {{ item.title }}
          </RouterLink>

          <span v-if="item.children" prefetch class="drop-icon-desktop-header">▾</span>

          <ul class="sub-menu">
            <li class="sub-menu-li" v-for="child in item.children" :key="child.title + child.url + child.grandchildren">
              <label
                v-if="child.grandchildren && child.grandchildren.place == 'left'"
                title="Toggle Drop-down"
                class="drop-icon"
                >◂</label
              >

              <a v-if="child.url.startsWith('http')" :href="child.url" target="_blank">
                {{ child.title }}
              </a>

              <RouterLink v-else :to="child.url">
                {{ child.title }}
              </RouterLink>

              <label
                v-if="child.grandchildren && child.grandchildren.place == 'right'"
                title="Toggle Drop-down"
                class="drop-icon"
                >▸</label
              >

              <ul v-if="child.grandchildren && child.grandchildren.place == 'right'" class="sub-sub-menu">
                <li
                  class="sub-sub-menu-li"
                  v-for="grandchild in child.grandchildren.items"
                  :key="grandchild.title + grandchild.url"
                >
                  <a v-if="grandchild.url.startsWith('http')" :href="grandchild.url" target="_blank">
                    {{ grandchild.title }}
                  </a>

                  <RouterLink v-else :to="grandchild.url">
                    {{ grandchild.title }}
                  </RouterLink>
                </li>
              </ul>

              <ul v-if="child.grandchildren && child.grandchildren.place == 'left'" class="sub-sub-menu-left">
                <li
                  class="sub-sub-menu-li"
                  v-for="grandchild in child.grandchildren.items"
                  :key="grandchild.title + grandchild.url"
                >
                  <a v-if="grandchild.url.startsWith('http')" :href="grandchild.url" target="_blank">
                    {{ grandchild.title }}
                  </a>

                  <RouterLink v-else :to="grandchild.url">
                    {{ grandchild.title }}
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.nav {
  display: block;
  z-index: 1000;
  background: var(--root-background-color);
  box-shadow: inset 0 -2px 0 var(--indi-blue-1);
  position: fixed;
  top: 0;
  left: 0;
  width: inherit;

  .container.flex {
    position: relative;
    /* center the menu if made bigger
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    */
    padding: 0 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
    justify-content: space-between;
    align-items: center;
    overflow: auto;

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
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 150px;
      padding-top: 15px;
      padding-bottom: 15px;

      a {
        display: flex;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-color);
        text-align: center;
        text-decoration: none;

        &.intro {
          border: 2px solid var(--indi-blue-1);
          padding: 8px;
          border-radius: 8px;
        }

        &.wordt-lid {
          background-color: var(--indi-blue-1);
          padding: 8px;
          border-radius: 8px;
        }
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
          height: auto;

          .a {
            text-decoration: none;
            width: 100%;
          }
        }
      }
    }

    .sub-menu {
      display: list-item;
      position: absolute;
      align-items: center;
      flex-direction: column;
      background: var(--root-background-color);
      top: 100%;
      box-shadow: inset 0 0 0 2px var(--indi-blue-green-1);
      opacity: 1;
      visibility: hidden;
      /*hidden   inset 0 -2px 0 var(--indi-blue-1);*/
      z-index: 1;
      overflow: visible;

      a {
        padding-left: 15px;
        padding-right: 15px;
      }

      li:hover,
      li:focus-within {
        .sub-sub-menu {
          opacity: 1;
          visibility: visible;
          width: 200px;

          .sub-sub-menu-li {
            width: 100%;
            height: auto;

            .a {
              text-decoration: none;
              width: 100%;
            }
          }
        }

        .sub-sub-menu-left {
          opacity: 1;
          visibility: visible;
          width: 200px;

          .sub-sub-menu-li {
            width: 100%;
            height: auto;

            .a {
              text-decoration: none;
              width: 100%;
            }
          }
        }
      }
    }

    .sub-sub-menu {
      /*display: none;*/
      position: absolute;
      flex-direction: column;
      background: var(--root-background-color);
      left: 100%;
      margin-top: 48px;
      /* // todo put it better nex to eachther*/
      box-shadow: inset 0 0 0 2px var(--indi-green-1);
      opacity: 1;
      visibility: hidden;
      /*hidden   inset 0 -2px 0 var(--indi-blue-1);*/
      z-index: 2;

      a {
        padding-left: 15px;
        padding-right: 15px;
      }

      li {
        width: 200px;
      }
    }

    .sub-sub-menu-left {
      /*display: none;*/
      position: absolute;
      flex-direction: column;
      background: var(--root-background-color);
      left: -100%;
      margin-top: 48px;
      /* // todo put it better nex to eachther*/
      box-shadow: inset 0 0 0 2px var(--indi-green-1);
      opacity: 1;
      visibility: hidden;
      /*hidden   inset 0 -2px 0 var(--indi-blue-1);*/
      z-index: 2;

      a {
        padding-left: 15px;
        padding-right: 15px;
      }

      li {
        width: 200px;
      }
    }
  }

  .close {
    cursor: pointer;
    display: none;
  }

  @media screen and (max-width: var(--bp-tablet-md)) {
    display: block;
    visibility: hidden;
  }
}
</style>
