<script setup lang="ts">
definePageMeta({ layout: 'minimal' });

useSeoMeta({
  title: 'Links',
});

import logo from '@/assets/logo/indicium-logo-icon.svg?component';
import LinkCard from '@/components/LinkCard.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

// Query links collection
const { data: linksData } = await useAsyncData('links', () => queryCollection('links').first());
const content = linksData.value?.links || [];

// Nuxt Studio resolves the document to edit from a `[data-content-id]` marker in the
// DOM — that is how it links a URL to a collection (studio host: `detectActives()` and
// the dblclick handler walk up to the nearest `data-content-id`). @nuxt/content's
// ContentRenderer emits it, but only for documents it renders itself; this page queries
// the YAML collection directly, so it tags the list with the document id itself. Dev/
// preview only, like ContentRenderer (`debug ? value.id : undefined`).
const contentId = import.meta.dev ? linksData.value?.id : undefined;
</script>

<template>
  <div id="link-page">
    <div id="logo-container" @click="router.push('/')">
      <span>
        <logo class="logo-icon" />
        <div class="logo">
          <p class="logo-text">INDICIUM</p>
          <p class="logo-text small">ICT STUDIEVERENIGING</p>
        </div>
      </span>
    </div>
    <div id="links" :data-content-id="contentId">
      <LinkCard v-for="link in content" :key="link.url" :link="link" />
    </div>
  </div>
</template>

<style scoped>
#link-page {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding: 1rem 2rem;

  @media screen and (max-width: 321px) {
    padding: 1rem 0.5rem;
  }

  & > * {
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;
  }
}

#links {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 2rem;

  @media screen and (max-width: 562px) {
    padding: 1rem 0.5rem;
  }
}

#logo-container {
  cursor: pointer;
  padding: 1rem 2rem;
  background-color: color-mix(in srgb, var(--secondary-background-color) 50%, transparent);
  backdrop-filter: blur(8px) saturate(200%) brightness(96%);
  border-radius: 32px;
  margin: 1rem;
  position: sticky;
  top: 1.5rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 562px) {
    padding: 1rem 0;
    border-radius: 16px;
    margin: 0.5rem;
  }

  & > span {
    display: flex;
    align-items: center;
    & > .logo-icon {
      height: 96px;
      padding-right: 10px;
    }

    & > .logo > .logo-text {
      font-size: 68px;
      width: max-content;

      &.small {
        font-size: 26px;
      }
    }

    @media screen and (max-width: 944px) {
      & > .logo-icon {
        height: 64px;
      }

      & > .logo > .logo-text {
        font-size: 45.3px;

        &.small {
          font-size: 17.3px;
        }
      }
    }

    @media screen and (max-width: 562px) {
      & > .logo-icon {
        height: 48px;
      }

      & > .logo > .logo-text {
        font-size: 34px;

        &.small {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
