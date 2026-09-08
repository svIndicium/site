<script setup lang="ts">
useSeoMeta({
  title: 'Contact',
  description: 'Contactgegevens van Studievereniging Indicium',
});

const { data: contactData } = await useAsyncData('contact', () => queryCollection('contact').first());

const contact = computed(() => contactData.value || {});
</script>

<template>
  <ContentContainer>
    <div class="two-columns">
      <div class="contact-info">
        <h1>Contact</h1>
        <ul>
          <li>
            <span class="medium">Adres</span>:
            <a :href="contact.mapsUrl">{{ contact.address }}</a>
          </li>
          <li><span class="medium">Lokaal</span>: {{ contact.room }}</li>
          <li><span class="medium">KVK</span>: {{ contact.kvk }}</li>
        </ul>
        <p>Of stuur een e-mail aan onze secretaris. De secretaris is het eerste contactpersoon voor leden:</p>
        <a href="mailto:secretaris@indicium.hu" class="button primary rounded contact-btn">secretaris@indicium.hu</a>
        <p>Voor e-mails gericht aan het hele bestuur kun je mailen naar:</p>
        <a href="mailto:bestuur@indicium.hu" class="button primary rounded contact-btn">bestuur@indicium.hu</a>
        <div id="contact-external">
          <p>Bedrijven en/of potentiële partners kunnen contact opnemen via:</p>
          <a href="mailto:secretaris-extern@indicium.hu" class="button primary rounded contact-btn">secretaris-extern@indicium.hu</a>
        </div>
      </div>
      <div class="map">
        <iframe
          title="Locatie Studievereniging Indicium"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.7310543306226!2d5.173675415856721!3d52.08462557973417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6693e9a2d0c9f%3A0xa9867c6558813da4!2sHogeschool%20Utrecht%2C%20Heidelberglaan%2015%2C%203584%20CS%20Utrecht!5e0!3m2!1sen!2snl!4v1568892960255!5m2!1sen!2snl"
          allowfullscreen
        />
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped>
.two-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  margin: 24px 30px;
}

.map {
  background-color: var(--secondary-background-color);
  background-image: url('/assets/misc/map-loading.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-width: 400px;
  min-height: 400px;
  flex-grow: 1;
  border-radius: 10px;
  overflow: hidden;

  & iframe {
    border: 0;
    width: 100%;
    height: 100%;
  }
}

.contact-info {
  background-color: var(--secondary-background-color);
  border-radius: 10px;
  padding: 16px 14px;
  flex-grow: 1;
  max-width: 400px;
  text-align: left;

  & p {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  & h1 {
    margin-top: 0;
  }

  #contact-external {
    margin-top: 2.5rem;
    & p,
    & a {
      font-size: 16px;
    }
  }
}

.contact-btn {
  display: inline-block;
  margin: 4px 0;
}
</style>
