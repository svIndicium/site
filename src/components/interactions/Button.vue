<template>
	<a v-if="url.startsWith('http')" :href="url" :class="['btn', size, center ? 'center' : '']">
		<slot />
	</a>
	<a v-else-if="url.startsWith('mailto:')" :href="url" :class="['btn', size, center ? 'center' : '']">
		<slot />
	</a>
	<n-link v-else :to="url" :class="['btn', size, center ? 'center' : '']">
		<slot />
	</n-link>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

@Component
export default class Button extends Vue {
	@Prop({ type: String, default: "m" }) size!: string
	@Prop({ type: Boolean, default: false }) center!: boolean
	@Prop({ type: String, default: "#" }) url!: string
}
</script>

<style lang="scss" scoped>
.btn {
	color: var(--text-color);
	background: var(--indi-blue-1);
	/* box-shadow: 0 0 32px rgba(181, 187, 201, 0.4); */
	border-radius: 4px;
	border: 0;
	transition: 200ms;
	display: inline-flex;
	cursor: pointer;

	&.s {
		padding: 8px;
		font-size: .6rem;
	}

	&.m {
		padding: 8px 12px;
		font-size: .8rem;
	}

	&.l {
		padding: 12px 24px;
		font-size: 1rem;
	}

	&.center {
		margin-left: auto;
		margin-right: auto;
	}

	&:hover {
		background: var(--indi-blue-green-1);
		-webkit-box-shadow: 0 0 32px rgba(181, 187, 201, 0.8);
		-moz-box-shadow: 0 0 32px rgba(181, 187, 201, 0.8);
		box-shadow: 0 0 32px rgba(181, 187, 201, 0.8);
	}
}
</style>
