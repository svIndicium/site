<template>
	<div>
		<Hero />

		<no-ssr>
			<Sponsoren />
		</no-ssr>

		<div class="container">
			<TextBlock :type="getBlockContentByTitle('Over Indicium', page.content).type"
				:title="getBlockContentByTitle('Over Indicium', page.content).title"
				:text="getBlockContentByTitle('Over Indicium', page.content).description" :contained="true" />
		</div>

		<Events />

		<div class="container">
			<TextBlock :type="getBlockContentByTitle('Lid zijn is meedoen!', page.content).type"
				:title="getBlockContentByTitle('Lid zijn is meedoen!', page.content).title"
				:text="getBlockContentByTitle('Lid zijn is meedoen!', page.content).description"
				:button="getBlockContentByTitle('Lid zijn is meedoen!', page.content).button" :contained="true" />
			<TextBlock :type="getBlockContentByTitle('Commissies?', page.content).type"
				:title="getBlockContentByTitle('Commissies?', page.content).title"
				:text="getBlockContentByTitle('Commissies?', page.content).description"
				:button="getBlockContentByTitle('Commissies?', page.content).button" :contained="true" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import Hero from "../components/Hero.vue"
import Sponsoren from "../components/Sponsoren.vue"
import TextBlock from "../components/TextBlock.vue"
import Events from "../components/Events.vue"
import { getBlockContentByTitle, getPageData } from "~/utils"

@Component({
	components: {
		Hero,
		Sponsoren,
		TextBlock,
		Events
	}
})
export default class Index extends Vue {
	page = getPageData("")

	getBlockContentByTitle(title: string, contentBlocks: any): any {
		return getBlockContentByTitle(title, contentBlocks)
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

* {
	box-sizing: border-box;
}

.text-block,
.image-block {
	padding: 80px 0;

	@media screen and (max-width: var(--bp-tablet-sm)) {
		padding: 12px 0;
	}
}
</style>
