<template>
    <div>
        <ul class="pagination float-end">
            <li class="page-item" :class="current === 1 ? 'disabled' : ''">
                <a class="page-link cursor-pointer"  @click="search(1)">«</a>
            </li>
            <li class="page-item" :class="current === 1 ? 'disabled' : ''">
                <a class="page-link cursor-pointer"  @click="search(current - 1)">‹</a>
            </li>
            <li class="page-item" v-for="(page, index) in pages" v-show="showItems(page)" :key="index">
                <a class="page-link cursor-pointer" :class="current === page ? 'active' : ''" @click="search(page)">
                    {{ page }}
                </a>
            </li>
            <li class="page-item" :class="current === pages ? 'disabled' : ''">
                <a class="page-link cursor-pointer"  @click="search(current + 1)">›</a>
            </li>
            <li class="page-item" :class="current === pages ? 'disabled' : ''">
                <a class="page-link cursor-pointer"  @click="search(pages)">»</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Pagination',
    props: {
        pages: {
            type: Number,
            default: 1,
        },
        current: {
            type: Number,
            default: 1,
        },
        limit: {
            type: Number,
            default: 18
        }
    },
    methods: {
        search(page) {
            this.$emit('search', page);
        },
        showItems(page) {
            if (this.current === 1) {
                return page <= 3;
            }

            if (this.current === this.pages) {
                return page >= (this.current - 2);
            }

            return page === this.current
                || page === (this.current - 1)
                || page === (this.current + 1);
        },
    }
}

</script>
<style scoped>
</style>
