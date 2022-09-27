export default {
    data() {
        return {
            influencers: []
        }
    },
    methods: {
        selectParent(item, e) {
            const checked = e.target.checked;

            if (item.parent) {
                this.influencers.map(el => {
                    if (!el.parent && el.parent_email === item.email) {
                        if (checked) {
                            const exists = this.selected.filter(filtered => filtered.email === el.email);
                            if (!exists.length) {
                                this.selected.push(el);
                            }
                        } else {
                            this.selected = this.selected.filter(filtered => filtered.email !== el.email);
                        }
                    }
                });
            }
        },
        onRemovedInfluencers() {
            this.selected = [];
            this.getItem();
        },
        makeInfluencers(data) {
            return data.map(el => {
                el.selected = false;

                if (el.parent) {
                    el._rowVariant = 'success';
                    return el;
                }

                return el;
            });
        },
        removeInfluencers() {
            this.modal.remove = true;
        },
        closeModal() {
            this.modal.remove = false;
        },
    }
};
