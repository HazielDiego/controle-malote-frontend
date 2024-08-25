<template>
    <div class="layout-footer">
        <div class="grid">
            <div class="col-6">
                <a href="/" class="logo-container">
                    <img :src="logoBlackHorizontal" alt="babylon-layout" />
                </a>
            </div>
            <div class="col-6 footer-icons">
                <button class="p-link">
                    <i class="pi pi-home"></i>
                </button>
                <button class="p-link">
                    <i class="pi pi-globe"></i>
                </button>
                <button class="p-link">
                    <i class="pi pi-envelope"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const logoBlackHorizontal = import.meta.env.VITE_APP_PATH_TO_LOGO_BLACK_HORIZONTAL
</script>

<style scoped></style>
