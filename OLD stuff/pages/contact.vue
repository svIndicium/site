<template>
	<div class="container contact">
		<h2>{{ page.title }}</h2>

		<v-row>
			<v-col cols="12" sm="6">
				<ul>
					<li v-for="(obj, idx) in getBlockContentByTitle('Info', page.content).list" :key="idx">
						<span class="medium">{{ obj.label }}</span>: {{ obj.value }}
					</li>
				</ul>

				<p>Of stuur direct een e-mail naar het bestuur:</p>
				<Button size="l" url="mailto:bestuur@indicium.hu">
					Mail direct
				</Button>
			</v-col>
			<v-col cols="12" sm="6">
				<Map />
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import Button from "../components/interactions/button.vue"
	import Map from "../components/Map.vue"
	import { getBlockContentByTitle, getPageData } from "~/utils"

	@Component({
		components: {
			Button,
			Map
		}
	})
	export default class Contact extends Vue {
		page = getPageData("contact")

		readonly getBlockContentByTitle = getBlockContentByTitle
	}
</script>

<style lang="scss" scoped>
	@import '../assets/scss/variables.scss';
	.contact {
		padding-bottom: 64px;

		.flex {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}

	}
</style>
