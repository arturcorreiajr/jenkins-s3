<template>
    <div>
        <div class="d-content">
            <div class="box-login text-center">
                <img class="mb-3" :src="require('../assets/logo.webp')" width="200">

                <form @submit="submit" method="post">
                    <div class="form-floating text-start">
                        <input type="email" class="form-control" placeholder="name@gotchosen.com"
                               v-model="email"
                               required>
                        <label class="text-right">Email address</label>
                    </div>

                    <div class="form-floating text-start mb-3">
                        <input type="password" class="form-control form-pass" placeholder="Password" required v-model="password">
                        <label>Password</label>
                    </div>

                    <button class="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
                </form>

                <p class="mt-5 mb-3 text-muted">&copy; GotChosen 2022</p>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService';

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            errors: [],
        };
    },
    async mounted() {
    },
    methods: {
        validate() {
            if (!this.email) {
                this.$toast.error('Email is required.');
                return false;
            }

            if (!this.password) {
                this.$toast.error('Password is required.');
                return false;
            }

            return true;
        },
        async submit(e) {
            e.preventDefault();
            this.$root.$emit('gcLoading', 1);

            const validation = this.validate();

            if (!validation) {
                this.$root.$emit('gcLoading', 0);
                return;
            }

            await this.login();
        },
        async login() {
            try {
                const { data } = await AuthService.login(
                    this.email,
                    this.password
                );

                AuthService.makeSession(data);

                this.$root.$emit('gcLoading', 0);

                this.$toast.success('Logged in, wait a moment.');
            } catch (e) {
                this.$root.$emit('gcLoading', 0);

                const { status } = e.response || null;

                if (status === 401) {
                    this.$toast.error('Email or password is invalid.');
                    return;
                }

                this.$toast.error(e.message);
            }
        }
    },
};
</script>
<style scoped>
.d-content {
    background: #edf1f2;
    position: relative;
    min-height: 100vh;
    max-height: 100vh;
}

.form-pass {
    margin-top: -1px;
}

.container {
    height: 100vh;
    width: 25vw;
}


.box-login {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    background: white;
    border-radius: 10px;
}
</style>
