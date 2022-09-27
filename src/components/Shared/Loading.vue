<template>
    <div class="box-loader" v-show="loading">
        <div class="spin"></div>
    </div>
</template>
<script>
export default {
    name: 'Loading',
    props: {
        loading: {
            type: Number,
            default: 0
        }
    }
}
</script>
<style scoped>
/** start loader **/
.box-loader {
    background: rgb(255, 255, 255, .8);
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    top: 0;
    left: 0;
}

.box-loader .spin {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    box-sizing: border-box;
    border: solid 8px var(--color-primary);
    border-top-color: #ccc;
    animation: spin 1s infinite linear;
    left: 50%;
    top: 50%;
    position: relative;
    margin-left: -40px; /* -1/2 width */
    margin-top: -40px; /* -1/2 height */
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

/** end loader **/
</style>
