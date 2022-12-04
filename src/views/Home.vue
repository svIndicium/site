<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import Hero from "@/components/Hero.vue"
</script>

<template>
    <Hero />

    <div class="container" data-v-4413e4a8="">
        <div class="text-block text-center contained" data-v-4413e4a8="">
            <h2>
                Over Indicium
            </h2>
            <p>Wij zijn dé studievereniging voor HBO-ICT van Hogeschool Utrecht. We organiseren het hele jaar door
                activiteiten zoals bedrijfsbezoeken, kroegcolleges, gastcolleges, lunchlezingen, en nog veel meer
                over allerlei verschillende onderwerpen. Maar we organiseren natuurlijk ook activiteiten voor
                gezelligheid! Kom eens langs op onze borrels, LAN-party's of iets anders dat we organiseren!</p>

        </div>
    </div>

    <div class="container" data-v-4413e4a8="">
        <div class="text-block text-center contained" data-v-4413e4a8="">
            <h2>
                Lid zijn is meedoen!
            </h2>
            <p>Een hoop activiteiten organiseren we voor iedereen. Maar als lid krijg je natuurlijk veel meer
                voordelen! Je krijgt dan korting bij activiteiten of je wordt uitgenodigd voor activiteiten die
                exclusief voor leden zijn. Ook kunnen we je helpen met het zoeken van een stage en kan je er altijd
                terecht als je ergens niet uitkomt. Interesse?</p>
        </div>
        <div class="text-block text-center contained" data-v-4413e4a8="">
            <h2>
                Commissies?
            </h2>
            <p>Lijkt je het leuk om de vereniging te helpen door het meeorganiseren van activiteiten, zoals borrels,
                feestjes, gastcolleges, lunchlezingen, reizen, of wil je je programmeerskills verbeteren? Neem eens
                een kijkje bij onze commissies, deze commissies bestaan uit enthousiaste leden die helpen om de
                vereniging draaiende te houden. Wil je meer informatie of wil je weten wat voor commissies er
                allemaal zijn?</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
svg {
    width: 300px;
    height: 300px;
}

.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
