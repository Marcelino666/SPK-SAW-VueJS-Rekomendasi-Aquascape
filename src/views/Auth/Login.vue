<template>
  <div class="row mt-4">
    <div class="col-md-7">
      <img src="../../assets/images/login.png" width="100%" />
    </div>
    <div class="col-md-5">
      <form @submit.prevent="handleSubmit">
        <Error v-if="error" :error="error" />
        <h3 class="text-center mb-4">Login</h3>

        <div class="form-group">
          <label><strong>Email</strong></label>
          <input
            type="email"
            class="form-control"
            v-model="form.email"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <label><strong>Password</strong></label>
          <div class="input-group">
            <input
              :type="type"
              class="form-control"
              v-model="form.password"
              placeholder="Password"
            />
            <div class="input-group-append">
              <b-button
                variant="outline-secondary"
                @click.prevent="showPassword"
              >
                <b-icon :icon="iconPassword"></b-icon>
              </b-button>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block">Login</button>

        <p class="forgot-password text-right mt-2">
          <router-link to="forgot">Forgot Password?</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Error from "../../components/Error.vue";
export default {
  name: "Login",
  components: {
    Error,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      type: "password",
      iconPassword: "eye-slash",
    };
  },
  computed: {
    ...mapGetters({
      error: "auth/getError",
      authenticated: "auth/authenticated",
    }),
  },
  created() {
    if (this.authenticated) {
      this.$router.push("/plants");
    }
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
    // async handleSubmit() {
    // try {
    //   this.error = "";
    //   const response = await axios.post("login", {
    //     email: this.email,
    //     password: this.password,
    //   });
    //   // console.log(axios.defaults.headers.common["Authorization"]);
    //   localStorage.setItem("token", response.data.token);
    //   // console.log(localStorage.getItem("token"));
    //   this.$store.dispatch("user", response.data.user);
    //   this.$router.push("/").catch(() => {});
    // } catch (e) {
    //   // this.error = "Invalid username/password";
    //   if (e.response.data.error) {
    //     this.error = e.response.data.error;
    //   } else {
    //     this.error = Object.values(e.response.data.errors)[0][0];
    //   }
    // }
    async handleSubmit() {
      this.signIn(this.form)
        .then(() => {
          // this.$router.push("/");
          setTimeout(() => this.$router.push("/"), 500);
        })
        .catch((e) => {
          console.log(e);
        });
      // try{
      //   this.signIn(this.form);
      //   this.$router.push("/").catch(() => {});
      // }catch(e) {
      //   console.log(e);
      // }
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.iconPassword = "eye";
      } else {
        this.type = "password";
        this.iconPassword = "eye-slash";
      }
    },
  },
};
</script>
