export default {
    data() {
        return {
            regions: [
                {value: 'world', label: 'World'},
                {value: 'IN', label: 'India'},
                {value: 'all', label: 'All'},
            ],
            regionsWithoutAll: [
                {value: 'world', label: 'World'},
                {value: 'IN', label: 'India'},
            ]
        }
    },
    methods: {
        makeRegion(data) {
            const country = data.country || 'world';

            return this.regions.find(el => {
                if (el.value === country) {
                    return el;
                }
            });
        }
    }
};
