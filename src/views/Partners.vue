<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import partners from '@/content/partners.json';

const [mainPartner, ...otherPartners] = partners;
</script>

<template>
    <ContentContainer>
        <div id="main-partner">
            <h1>Partners</h1>
            <img class="partner-logo" :src="mainPartner.imgUrl" :alt="'Logo' + mainPartner.title">
            <p class="description">{{ mainPartner.description }}</p>
            <div class="job-offers-container">
                <h2>Vacatures</h2>
                <div class="job-offers">
                    <div class="job-offer" v-for="jobOffer in mainPartner.jobOffers">
                        <h3 class="job-offer-title"><a :href="jobOffer.url" target="_blank">{{ jobOffer.title }}</a></h3>
                        <p>{{ jobOffer.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="partner" v-for="partner in otherPartners">
            <img class="partner-logo" :src="partner.imgUrl" :alt="'Logo' + partner.title">
            <p class="description">{{ partner.description }}</p>
            <div class="job-offers-container" v-if="partner.jobOffers?.length">
                <h2>Vacatures</h2>
                <div class="job-offers">
                    <div class="job-offer" v-for="jobOffer in partner.jobOffers">
                        <h3 class="job-offer-title"><a :href="jobOffer.url" target="_blank">{{ jobOffer.title }}</a></h3>
                        <p>{{ jobOffer.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </ContentContainer>
</template>

<style scoped lang="scss">
#main-partner {
    width: 80%;
    margin: 0 auto;

    .partner-logo {
        margin-top: 2em;
        width: 35%;
    }

    .description {
        margin: 1em auto;
        // width: 75%;
    }
}

.partner {
    border-top: 5px solid gray;
    width: 80%;
    margin: 0 auto;
    padding: 5em 0;

    .partner-logo {
        float: left;
        margin: 0.2em 0.8em 0.8em 0;
        width: 20%;
    }

    .description {
        text-align: left;
        margin: 0;
    }

    :after {
        content: "";
        visibility: hidden;
        display: block;
        height: 0;
        clear: both;
    }
}

.job-offers-container {
    .job-offers {
        display: flex;

        .job-offer {
            max-width: 25%;
            margin-right: 2em;
            height: 15em;

            p {
                display: -webkit-box;
                -webkit-line-clamp: 6;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }

        .job-offer-title {
            margin: 0;
            font-size: 1.7em;
            text-decoration: underline;
        }
    }
}
</style>
