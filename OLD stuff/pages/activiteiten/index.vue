<template>
	<div class="activiteiten">
		<div class="container">
			<h2>{{ page.title }}</h2>
			<no-ssr>
				<FullCalendar />
			</no-ssr>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import { getPageData } from "~/utils"

	@Component
	export default class Index extends Vue {
		page = getPageData("activiteiten")
	}
</script>

<style lang="scss" scoped>
	.activiteiten {
		padding: 0 0 64px 0;
	}
</style>
