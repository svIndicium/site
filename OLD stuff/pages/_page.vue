<template>
	<div :class="['page', $route.params.page]">
		<div class="container">
			<div v-for="(contentObj, idx) in page.content" :key="idx">
				<div v-if="contentObj.type.startsWith('text')">
					<TextBlock
						:type="contentObj.type"
						:title="contentObj.title"
						:sub-title="contentObj.subTitle"
						:text="contentObj.description"
						:button="contentObj.button"
						:card="contentObj.card"
						:text-link="contentObj.textLink"
					/>
				</div>

				<div v-if="contentObj.type.startsWith('image')">
					<ImageBlock
						:type="contentObj.type"
						:title="contentObj.title"
						:sub-title="contentObj.subTitle"
						:text="contentObj.description"
						:image="contentObj.imgUrl"
						:button="contentObj.button"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"

	import content from "../content/content.json"
	import TextBlock from "../components/TextBlock.vue"
	import ImageBlock from "../components/ImageBlock.vue"

	@Component({
		components: {
			TextBlock,
			ImageBlock
		}
	})
	export default class Page extends Vue {
		page = {}
		mounted() {
			const pageData = content.pages.find(
				p => p.slug === this.$route.params.page
			)
			this.$set(this, "page", pageData)
		}

		validate({ params: { page: pageParam } }: any) {
			return content.pages.some(page => page.slug === pageParam && page.render)
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 24px 0 64px 0;
	}
</style>
