<script setup lang="ts">
import IndiciumMap from "@/components/Map.vue"

import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
    <ContentContainer>
        <div class="two-columns">
            <div class="contact-info">
                <h1>Contact</h1>
                <ul data-v-22481b25="">
                    <li data-v-22481b25=""><span data-v-22481b25="" class="medium">Adres</span>: Heidelberglaan 15, 3584
                        CS Utrecht
                    </li>
                    <li data-v-22481b25=""><span data-v-22481b25="" class="medium">Lokaal</span>: HL15-4.092
                    </li>
                    <li data-v-22481b25=""><span data-v-22481b25="" class="medium">E-mailadres</span>:
                        bestuur@indicium.hu
                    </li>
                    <li data-v-22481b25=""><span data-v-22481b25="" class="medium">KVK</span>: 68788878
                    </li>
                </ul>
                <p data-v-22481b25="">Of stuur direct een e-mail naar het bestuur:</p> <a data-v-f77bb2e0=""
                    data-v-22481b25="" href="mailto:bestuur@indicium.hu" class="btn l">
                    Mail direct
                </a>
            </div>
            <IndiciumMap class="map" />
        </div>
    </ContentContainer>
</template>

<style scoped lang="scss">
.two-columns {
    margin: 10px 0;
    display: flex;
    width: 100%;
    justify-content: space-around;

    .map {
        flex-grow: 1;
        margin: 0 30px;
    }

    .contact-info {
        text-align: left;
        margin: 0 30px;
    }
}
</style>
