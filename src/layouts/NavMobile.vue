<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import { ref } from 'vue';
import { stateStore } from '@/stores/state';
import content from '@/content/menu.json';
import NavLogo from '@/components/NavLogo.vue';
import { useRouter } from 'vue-router';

const currentLevel2 = ref<string>('');
const currentLevel3 = ref<string>('');

const state = stateStore();
const items = content.items;

function toggleNavLevel() {
  if (state.state.navLevel >= 1) {
    state.state.lastNavLevel = state.state.navLevel;
    state.state.navLevel = 0;
  } else {
    state.state.navLevel = state.state.lastNavLevel;
  }
}

function setCurrentLevel(level: 0 | 1 | 2 | 3, name?: string) {
  if (name) {
    if (level == 2) {
      currentLevel2.value = name;
    }
    if (level == 3) {
      currentLevel3.value = name;
    }
  }
  if (level < 3) {
    currentLevel3.value = '';
  }
  if (level < 2) {
    currentLevel2.value = '';
  }
  state.state.navLevel = state.state.lastNavLevel = level;
}

const router = useRouter();
router.afterEach(() => {
  state.state.navLevel = 0;
});
</script>

<template>
  <nav class="mobile-nav">
    <div class="mobile-container flex">
      <NavLogo />

      <div class="nav-toggle" v-bind:class="{ rotated: state.state.navLevel }" @click="toggleNavLevel">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          stroke-width="2"
          stroke-linecap="square"
        >
          <line v-bind:class="{ green: state.state.navLevel > 2 }" x1="7.5" y1="10" x2="22.5" y2="10"></line>
          <line v-bind:class="{ bluegreen: state.state.navLevel > 1 }" x1="7.5" y1="15" x2="22.5" y2="15"></line>
          <line v-bind:class="{ blue: state.state.navLevel > 0 }" x1="7.5" y1="20" x2="22.5" y2="20"></line>
        </svg>
      </div>
    </div>

    <div class="mobile-menu" v-bind:class="{ visible: state.state.navLevel }">
      <div class="menubar blue" v-bind:class="{ visible: state.state.navLevel > 0 }" @click.self="setCurrentLevel(1)">
        <div class="menu level-1" v-bind:class="{ visible: state.state.navLevel > 0 }">
          <ul>
            <li v-for="item in items" :key="item.title + item.url + item.children">
              <a v-if="item.url.startsWith('http')" :href="item.url" target="_blank">
                {{ item.title }}
              </a>

              <RouterLink v-else :to="item.url">
                {{ item.title }}
              </RouterLink>

              <a
                v-if="item.children"
                title="Goto submenu"
                class="sub-menu-toggle"
                @click="setCurrentLevel(2, item.title)"
              >‌‌ ‌‌ ‌‌▸‌‌ ‌‌ ‌‌‌‌ ‌‌‌
              </a>

              <div
                class="menubar bluegreen"
                v-bind:class="{ visible: item.title == currentLevel2 }"
                @click.self="setCurrentLevel(2)"
              >
                <div class="menu level-2" v-bind:class="{ visible: item.title == currentLevel2 }">
                  <ul class="sub-menu">
                    <li>
                      <a @click="setCurrentLevel(1)"> .. </a>
                    </li>
                    <li
                      class="sub-menu-li"
                      v-for="child in item.children"
                      :key="child.title + child.url + child.children"
                    >
                      <a
                        v-if="child.url.startsWith('http')"
                        :href="child.url"
                        target="_blank"
                        @click="setCurrentLevel(0)"
                      >
                        {{ child.title }}
                      </a>

                      <RouterLink v-else :to="child.url">
                        {{ child.title }}
                      </RouterLink>

                      <a
                        v-if="child.children"
                        title="Goto sub-submenu"
                        class="sub-menu-toggle"
                        @click="setCurrentLevel(3, child.title)"
                      >‌‌ ‌‌ ‌‌▸‌‌ ‌‌ ‌‌‌‌ ‌‌‌
                      </a>

                      <div
                        class="menubar green"
                        v-bind:class="{ visible: child.title == currentLevel3 }"
                        @click.self="state.state.navLevel = 3"
                      >
                        <div
                          class="menu level-3"
                          v-bind:class="{
                            visible: child.title == currentLevel3,
                          }"
                        >
                          <ul class="sub-sub-menu">
                            <li>
                              <a @click="setCurrentLevel(2)"> .. </a>
                            </li>
                            <li
                              class="sub-sub-menu-li"
                              v-for="grandchild in child.children"
                              :key="grandchild.title + grandchild.url"
                            >
                              <a
                                v-if="grandchild.url.startsWith('http')"
                                :href="grandchild.url"
                                target="_blank"
                                @click="setCurrentLevel(0)"
                              >
                                {{ grandchild.title }}
                              </a>
                              <RouterLink v-else :to="grandchild.url">
                                {{ grandchild.title }}
                              </RouterLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="mobile-menu-shadow"
        v-bind:class="{ hidden: !state.state.navLevel }"
        @click="setCurrentLevel(0)"
      ></div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.mobile-nav {
  --navbar-height: 16vw;
  --navbar-max-height: 68px;
  --transition-time: 0.2s;
  --linespace: 3vw;
  --shadowspace: 6vw;

  a {
    cursor: pointer;
  }

  li {
    display: flex;
    justify-content: space-between;
  }

  .mobile-container.flex {
    background-color: var(--root-background-color);
    z-index: 100;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: var(--navbar-heigh);
    max-height: var(--navbar-max-height);
    box-shadow: inset 0 -2px 0 var(--indi-blue-1);

    // visibility: hidden;

    .logo {
      position: relative;

      img {
        transform: translateY(10%);
        position: relative;
        // padding-top: 5%;
        padding-left: 10px;
        height: 12vw;
        max-height: 51px;
      }
    }

    .nav-toggle {
      display: flex;
      cursor: pointer;
      stroke: var(--text-color);
      padding-bottom: 0;
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      margin-left: auto;
      width: auto;
      height: auto;
      transition-delay: var(--transition-time);
      transition-property: transform;

      svg {
        display: block;
        width: 16vw;
        max-width: 68px;
        height: 16vw;
        max-height: 68px;
        transition: var(--transition-time) ease-in-out;

        line {
          transition-property: stroke;

          &.blue {
            transition-delay: var(--transition-time);
            stroke: var(--indi-blue-1);
          }

          &.bluegreen {
            transition-delay: var(--transition-time);
            stroke: var(--indi-blue-green-1);
          }

          &.green {
            transition-delay: var(--transition-time);
            stroke: var(--indi-green-1);
          }
        }
      }

      &.rotated {
        transition-delay: 0s;
        transform: rotate(90deg);
      }
    }
  }

  .mobile-menu {
    visibility: hidden;
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;
    // clamp doesn't support 0 without unit.
    // compiler transfers 0px back to 0 thus rendering this broken.
    // this is a know issue in css
    top: clamp(0.01px, 16vw, 68px);
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    display: flex;

    &.visible {
      visibility: visible;
    }

    a {
      color: var(--text-color);
      font-weight: bold;
    }
    .menubar {
      cursor: pointer;
      display: flex;
      position: relative;
      z-index: 0;
      top: 0;
      left: 100%;
      height: 100%;
      width: 100vw - var(--shadowspace); // 100%
      transition: var(--transition-time) ease-in-out;
      transition-delay: var(--transition-time);

      &.blue {
        background-color: var(--indi-blue-1);

        &.visible {
          left: (var(--shadowspace));
          transition-delay: 0s;
        }
      }

      &.bluegreen {
        background-color: var(--indi-blue-green-1);
        position: absolute;
        top: 0;
        width: calc(calc(100vw - var(--shadowspace)) - var(--shadowspace));

        &.visible {
          left: 0;
          transition-delay: 0s;
        }
      }

      &.green {
        background-color: var(--indi-green-1);
        position: absolute;
        top: 0;
        width: 100%;

        &.visible {
          left: 0;
          transition-delay: 0s;
        }
      }

      .menu {
        position: relative;
        height: 100%;
        left: 100%;
        background-color: var(--root-background-color);
        transition-delay: 0s;
        transition: var(--transition-time) ease-in-out;

        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            a {
              display: inline-block;
              padding: 1em;
              width: 100%;
              text-align: left;
            }

            .sub-menu-toggle {
              cursor: pointer;
              float: right;
              width: 15vw;
              margin-right: 1em;
            }
          }
        }

        &.level-1 {
          width: calc(100vw - calc(var(--linespace) * 2));

          ul {
            li {
              border-bottom: solid 1px var(--indi-blue-1);

              .sub-menu-toggle {
                border-left: solid 1px var(--indi-blue-1);
              }
            }
          }
        }

        &.level-2 {
          position: absolute;
          width: calc(calc(100vw - var(--shadowspace)) - calc(var(--linespace) * 2));

          ul {
            li {
              border-bottom: solid 1px var(--indi-blue-green-1);

              .sub-menu-toggle {
                border-left: solid 1px var(--indi-blue-green-1);
              }
            }
          }
        }

        &.level-3 {
          position: absolute;
          width: calc(calc(100vw - var(--shadowspace)) - calc(var(--linespace) * 3));
          ul {
            li {
              border-bottom: solid 1px var(--indi-green-1);

              .sub-menu-toggle {
                border-left: solid 1px var(--indi-green-1);
              }
            }
          }
        }

        &.visible {
          left: var(--linespace);
          transition-delay: var(--transition-time);
        }

        @media screen and (min-width: #{calc($bp-tablet-lg + 1px)}) {
          display: block;
          visibility: hidden;
          width: 0;
          height: 0;
        }
      }
    }

    .mobile-menu-shadow {
      position: absolute;
      z-index: -1;
      background-color: hsla(0, 0%, 0%, 0.9);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: var(--transition-time) ease-in-out;
      opacity: 1;

      &.hidden {
        transition-delay: var(--transition-time);
        opacity: 0;
      }
    }

    @media screen and (min-width: #{calc($bp-tablet-lg + 1px)}) {
      display: block;
      visibility: hidden;
      width: 0;
      height: 0;
    }
  }

  @media screen and (min-width: #{calc($bp-tablet-lg + 1px)}) {
    display: block;
    visibility: hidden;
    width: 0;
    height: 0;
  }
}
</style>
