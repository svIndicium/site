<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { currentVCP } from '@/content/vcp.json';
</script>

<!-- &#8203; is een zero-width-space, is nodig voor overflow op mobieltjes -->
<template>
  <ContentContainer>
    <h1>Vertrouwens&#8203;contact&#8203;personen</h1>
    <p class="vcp-blerb">
      Heb je vragen, problemen of wil je gewoon even praten? Neem dan contact op met een van onze
      vertrouwenscontactpersonen. Zij zijn er voor jou!
    </p>

    <div v-for="member in currentVCP.vcpMembers" :key="member.name" class="member">
      <img class="member-photo" :src="`/assets/vcpphotos/${member.photo}`" :alt="member.name" width="300" />
      <div class="member-entry">
        <div class="member-contact-info">
          <div class="member-name-status">
            <h3>{{ member.name }}</h3>
            <span class="member-status">{{ member.status }}</span>
          </div>
          <p>{{ member.phonenumber }}</p>
        </div>
        <div>
          <h4>Over mij</h4>
          <p>{{ member.aboutme }}</p>
          <h4>Feitjes over mij</h4>
          <ul>
            <li>{{ member.funfact1 }}</li>
            <li>{{ member.funfact2 }}</li>
            <li>{{ member.funfact3 }}</li>
          </ul>
        </div>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.content-container {
  display: flex;
  flex-direction: column;
}

.vcp-blerb {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  text-align: center;
  word-wrap: break-word;
}

.member {
  display: flex;
  gap: 3em;
  justify-content: center;
  flex-wrap: nowrap;
  max-width: 1200px;
  margin: 2em auto;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
}

.member-entry {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  padding: 1em 2em;
  background-color: var(--secondary-background-color);
  p {
    margin-bottom: 1em;
  }

  h2 {
    margin-top: 1em;
  }

  ul {
    margin-top: 0.5em;
    margin-left: 1em;
  }
}

.member-contact-info,
h3 {
  line-height: 0;
}

.member-contact-info,
h3::after {
  content: ' |';
}

.member-name-status {
  display: flex;
  gap: 0.5em;
  align-items: center;
}

.member-photo {
  flex-shrink: 0;
  border-radius: 10px;
  transition: transform 0.2s;
  object-fit: cover;
  height: auto;
  aspect-ratio: 4/5;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
  }
}

@media (max-width: 1000px) {
  .member {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;
  }

  .member-entry {
    gap: 2rem;
  }

  .member-name-status {
    flex-direction: column;
    gap: 0;
  }

  .member-contact-info,
  h3::after {
    content: none;
  }
}
</style>
