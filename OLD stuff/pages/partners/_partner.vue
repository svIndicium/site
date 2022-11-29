<template>
	<div class="container">
		<div class="image-container">
			<img :src="partner.logo" :alt="partner.name + 'logo'" />
		</div>
		<h2>{{ partner.name }}</h2>
		<p>{{ partner.description }}</p>
		<Button :url="partner.url" size="l">
			Bezoek website
		</Button>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import content from '../../content/content.json'
	import Button from "~/components/interactions/button.vue"

	@Component({
		components: {
			Button
		}
	})
	export default class Partner extends Vue {
		partner = {}

		validate({ params }: any) {
			return content.partners.some(partner => partner.slug === params.partner)
		}

		mounted() {
			const partnerData = content.partners.find(p => p.slug === this.$route.params.partner)
			this.$set(this, 'partner', partnerData)
		}
	}
</script>

<style lang="scss" scoped>
	.image-container {
		height: auto;
		img {
			width: 50%;
			display: block;
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
