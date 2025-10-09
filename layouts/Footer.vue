<script setup lang="ts">
import { ref } from 'vue';
import { stateStore } from '@/stores/state';
import footerContent from '@/content/footer.json';

const state = stateStore();
const pages = ref<{ title: string; url: string }[]>(footerContent.items);
const socialPages = ref<{ title: string; url: string }[]>(footerContent.socialMediaItems);
const contact = ref<{}>(footerContent.contactItems);

function changeTheme(theme: string) {
  state.settings.theme = theme;
  state.refreshTheme();
}
</script>

<template>
  <footer>
    <div class="container">
      <div class="column">
        <h4>Pagina's</h4>
        <ul class="footer-menu pages">
          <li v-for="(menuItem, idx) in pages" :key="idx" ref="menuItemsRefs">
            <RouterLink :to="menuItem.url">{{ menuItem.title }}</RouterLink>
          </li>
          <li>
            <a href="/docx/Declaratieformulier_Indicium.docx">Declaratieformulier</a>
          </li>
        </ul>
      </div>

      <div class="column">
        <h4>Social media</h4>
        <ul class="footer-menu contact">
          <li v-for="(menuItem, key) in socialPages" :key="key">
            <a :href="menuItem.url">{{ menuItem.title }}</a>
          </li>
        </ul>
      </div>

      <div class="column">
        <h4>Contact</h4>
        <ul class="footer-menu contact">
          <li v-for="(value, key) in contact" :key="key">{{ value }}</li>
        </ul>
      </div>
      <div class="colum">
        <h4>Options</h4>
        <ul class="footer-menu options">
          <p>Select theme</p>
          <div class="toggle dark-mode">
            <input
              id="auto-mode"
              type="radio"
              @change="changeTheme('auto')"
              :checked="state.settings.theme == 'auto'"
            />
            <label for="auto-mode">Auto</label>
            <br />
            <input
              id="light-mode"
              type="radio"
              @change="changeTheme('light')"
              :checked="state.settings.theme == 'light'"
            />
            <label for="light-mode">Light</label>
            <br />
            <input
              id="dark-mode"
              type="radio"
              @change="changeTheme('dark')"
              :checked="state.settings.theme == 'dark'"
            />
            <label for="dark-mode">Dark</label>
          </div>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
  padding: 0;
}

footer {
  background: var(--indi-blue-3);
  padding: 30px 0;
  color: var(--text-color);
  margin-top: 16px;
  border-top: 2px solid var(--indi-blue-1);

  .container {
    max-width: 1084px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .footer-menu {
      &.pages {
        columns: 2;
      }

      li {
        line-height: 1.6;
      }
    }
  }
}

@media screen and (max-width: #{$bp-desktop-sm}) {
  footer {
    padding: 12px;

    .container {
      flex-direction: column;
    }
  }
}
</style>
