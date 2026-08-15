<script setup lang="ts">
const { preference } = useTheme();

// Query footer collection
const { data: footerData } = await useAsyncData('footer', () => queryCollection('footer').first());
const pages = ref<{ title: string; url: string }[]>(footerData.value?.items || []);
const socialPages = ref<{ title: string; url: string }[]>(footerData.value?.socialMediaItems || []);
const contact = ref<Record<string, unknown>>(footerData.value?.contactItems || {});

function changeTheme(theme: 'system' | 'light' | 'dark') {
  preference.value = theme;
}
</script>

<template>
  <footer>
    <div class="container">
      <div class="column">
        <h2>Pagina's</h2>
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
        <h2>Social media</h2>
        <ul class="footer-menu contact">
          <li v-for="(menuItem, key) in socialPages" :key="key">
            <a :href="menuItem.url">{{ menuItem.title }}</a>
          </li>
        </ul>
      </div>

      <div class="column">
        <h2>Contact</h2>
        <ul class="footer-menu contact">
          <li v-for="(value, key) in contact" :key="key">{{ value }}</li>
        </ul>
      </div>
      <div class="column">
        <h2>Options</h2>
        <ClientOnly>
          <fieldset class="footer-menu options">
            <legend>Thema</legend>
            <div class="toggle dark-mode">
              <div class="toggle-row">
                <input
                  id="auto-mode"
                  type="radio"
                  name="theme"
                  :checked="preference == 'system'"
                  @change="changeTheme('system')"
                />
                <label for="auto-mode">Systeem</label>
              </div>
              <div class="toggle-row">
                <input
                  id="light-mode"
                  type="radio"
                  name="theme"
                  :checked="preference == 'light'"
                  @change="changeTheme('light')"
                />
                <label for="light-mode">Licht</label>
              </div>
              <div class="toggle-row">
                <input
                  id="dark-mode"
                  type="radio"
                  name="theme"
                  :checked="preference == 'dark'"
                  @change="changeTheme('dark')"
                />
                <label for="dark-mode">Donker</label>
              </div>
            </div>
          </fieldset>
        </ClientOnly>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
  padding: 0;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;

  & legend {
    padding: 0;
    margin-bottom: 4px;
  }

  .toggle {
    display: flex;
    flex-direction: column;

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 32px;

      & input[type='radio'] {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        cursor: pointer;
      }

      & label {
        cursor: pointer;
        flex: 1;
      }
    }
  }
}

footer {
  background: var(--indi-blue-3);
  padding: 30px 0;
  color: var(--text-color);
  margin-top: 16px;
  border-top: 2px solid var(--indi-blue-1);

  & h2 {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 0 8px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .footer-menu {
      &.pages {
        columns: 2;
      }

      & li {
        line-height: 1.6;
      }
    }
  }

  & fieldset.options {
    margin-top: 1rem;
  }
}

@media screen and (max-width: 1120px) {
  footer {
    padding: 12px;

    .container {
      flex-direction: column;
    }
  }
}
</style>
