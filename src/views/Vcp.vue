<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { currentVCP } from '@/content/vcp.json';
</script>

<template>
  <ContentContainer>
    <h1>Vertrouwens Contact Personen</h1>
    <div class="member" v-for="member in currentVCP.vcpMembers">
      <img
        class="member-photo"
        :src="`/assets/vcpphotos/${member.photo}`"
        :alt="member.name"
      />
      <div class="member-info">
        <h3>{{ member.name }}</h3>
        <h4>{{ member.status }}</h4>
        <p>{{ member.phonenumber }}</p>
        <h4>{{ member.aboutme }}</h4>
        <h2>Feitjes over mij</h2>
        <p>{{ member.funfact1 }}</p>
        <p>{{ member.funfact2 }}</p>
        <p>{{ member.funfact3 }}</p>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';

  .content-container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    text-align: center;
  }

  .member {
    display: flex;
    gap: 3em;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1170px;
    margin: 2em auto;

   
    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  .member-info {
    text-align: center;
    p {
      margin-bottom: 1em;
    }
 
    h2 {
      margin-top: 1em;
    }

  }

  .member-photo {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
      transition: transform 0.2s;
    }
  }

  @media screen and (max-width: #{$bp-tablet-md}) {
    .member {
      gap: 1em;
      margin: 2em auto;

      &:nth-child(even) {
        h3, h4 {
          text-align: center;
        }
      }
    }
    h3, h4 {
      text-align: center;
    }
  }

  @media screen and (max-width: #{$bp-tablet-sm}) {
    .member {
      gap: 0;
    }
  }


</style>
