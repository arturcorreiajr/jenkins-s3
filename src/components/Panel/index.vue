<template>
    <div>
        <div class="general-content d-flex p-0">
            <sidebar></sidebar>
            <div class="useful-content">
                <navbar></navbar>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default {
    name: 'Panel',
    components: {Sidebar, Navbar},
    data() {
        return {}
    },
}
</script>
<style scoped>
.general-content {
    position: relative;
    min-width: 100vw;
    min-height: 100vh;
    background-color: #fff;
}

.useful-content {
    width: 88vw;
    min-height: 100vh;
}
</style>
