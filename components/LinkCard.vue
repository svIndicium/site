<script setup lang="ts">
import type { Link as socialLinks } from '../content/links';

const props = defineProps({
  link: {
    type: Object as () => socialLinks,
    required: true,
  },
});

const linkIcon = props.link.icon === '' || props.link.icon === undefined ? '/icon.svg' : props.link.icon;

const filetypes = ['png', 'svg', 'jpg', 'jpeg', 'svg', 'bmp', 'webp', 'gif', 'apng', 'avif', 'ico'];
const isImage = filetypes.some((filetype) => linkIcon?.endsWith('.' + filetype));
</script>

<template>
  <a v-if="!link.url.startsWith('/')" class="link" :href="link.url" target="_blank" rel="noopener noreferrer">
    <img v-if="linkIcon && isImage" :src="linkIcon" :alt="link.name" />
    <span v-else-if="linkIcon" class="emoji">{{ linkIcon }}</span>
    <p>{{ link.name }}</p>
  </a>
  <RouterLink v-else :to="link.url" class="link">
    <img v-if="linkIcon && isImage" :src="linkIcon" :alt="link.name" />
    <span v-else-if="linkIcon" class="emoji">{{ linkIcon }}</span>
    <p>{{ link.name }}</p>
  </RouterLink>
</template>

<style lang="scss">
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

  & > :is(img, .emoji) {
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

    & > :is(img, .emoji) {
      height: 48px;
      width: 48px;
      font-size: 32px;
      line-height: 48px;
    }
  }
}
</style>
