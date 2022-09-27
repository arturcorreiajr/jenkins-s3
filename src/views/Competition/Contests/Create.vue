<template>
    <div class="container-fluid d-content">
        <div class="title-content mb-3">
            <div class="d-flex justify-content-between">
                <div>
                    <h2><b>H</b>ashtag <b>C</b>ontest</h2>
                    <h3>Create contest</h3>
                    <a class="mt-2 cursor-pointer" @click="$router.push({name: 'competition-hashtag-contest'})">Back</a>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Form contest -->
            <div class="col-6">
                <div class="item-section p-3">
                    <contest></contest>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Contest from "../../../components/Competition/Contest/Contest";

export default {
    name: 'ReportedCommentEdit',
    components: {Contest},
    data() {
        return {
        }
    },
    mounted() {

    },
    computed: {},
    methods: {}
}
</script>
<style scoped>
</style>
