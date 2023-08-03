<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import { defineProps } from 'vue';
import { Link as socialLinks } from '../content/links';
import logo from '@/assets/logo/indicium-logo-icon.svg';

const props = defineProps({
  link: {
    type: Object as () => socialLinks,
    required: true,
  },
});

// if the icon is "", set it to undefined
if (props.link.icon === '') {
  props.link.icon = undefined;
}
</script>

<template>
  <a v-if="!link.url.startsWith('/')" class="link" :href="link.url" target="_blank" rel="noopener noreferrer">
    <!-- if the link.icon is an image, display the image -->
    <img v-if="link.icon && link.icon.endsWith('.png')" :src="link.icon" :alt="link.name" class="img" />
    <!-- if the link.icon is an emoji, display the emoji -->
    <span v-else-if="link.icon" class="emoji img">{{ link.icon }}</span>
    <!-- if the link.icon is not defined, display the default icon -->
    <logo v-else class="img" />
    <p>{{ link.name }}</p>
  </a>
  <RouterLink v-else :to="link.url" class="link">
    <!-- if the link.icon is an image, display the image -->
    <img v-if="link.icon && link.icon.endsWith('.png')" :src="link.icon" :alt="link.name" class="img" />
    <!-- if the link.icon is an emoji, display the emoji -->
    <span v-else-if="link.icon" class="emoji img">{{ link.icon }}</span>
    <!-- if the link.icon is not defined, display the default icon -->
    <logo v-else class="img" />
    <p>{{ link.name }}</p>
  </RouterLink>
</template>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.link {
  font-family: var(--text-font);
  color: var(--text-color);
  text-decoration: none;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 1rem;

  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: rgba(var(--secondary-background-color-raw), 0.5);
  backdrop-filter: blur(8px) saturate(200%) brightness(96%);

  &:active,
  &:hover {
    background-color: rgba(var(--secondary-background-color-raw), 0.75);
  }

  & .img {
    height: 64px;
    width: 64px;
    object-fit: contain;
    margin: auto 0;
  }

  & .emoji {
    font-family: var(--indicium-font);
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    font-size: 48px;
    overflow: hidden;
    line-height: 64px;
    user-select: none;
  }

  & p {
    margin: auto 0 auto 1rem;
    font-size: 1.5rem;
    font-weight: 500;
  }
}

@media screen and (max-width: #{$bp-tablet-sm}) {
  .link {
    grid-template-columns: 48px 1fr;
    padding: 0.5rem 1rem;

    & img {
      height: 48px;
    }
  }
}
</style>
