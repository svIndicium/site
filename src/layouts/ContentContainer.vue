<script setup lang="ts">
</script>

<template>
    <div class="content-container">
        <slot></slot>
    </div>
</template>
<style>
.content-container {
    width: calc(100% - 50px);
    padding: 100px 25px 25px 25px;
}
</style>