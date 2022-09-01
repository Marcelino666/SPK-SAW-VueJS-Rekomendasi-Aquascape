<template>
  <div class="row mt-4">
    <div class="col-md-7">
      <img src="../../assets/images/reset.png" width="100%" />
    </div>
    <div class="col-md-5">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center mb-4">Reset Password</h3>
        <Error v-if="error" :error="error" />
        <div
          v-if="message"
          class="alert alert-success text-center"
          role="alert"
        >
          {{ message }}
        </div>
        <div
          v-if="waiting"
          class="alert alert-secondary text-center"
          role="alert"
        >
          {{ waiting }}
        </div>
        <div v-if="!submited">
          <div class="form-group">
            <label><strong>Password</strong></label>
            <div class="input-group">
              <input
                :type="type"
                class="form-control"
                v-model="password"
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

          <div class="form-group">
            <label><strong>Confirm Password</strong></label>
            <div class="input-group">
              <input
                :type="typeConfirm"
                class="form-control"
                v-model="password_confirm"
                placeholder="Confirm Password"
              />
              <div class="input-group-append">
                <b-button
                  variant="outline-secondary"
                  @click.prevent="showConfirmPassword"
                >
                  <b-icon :icon="iconConfirmPassword"></b-icon>
                </b-button>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-block">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "../../components/Error.vue";
export default {
  name: "Reset",
  components: {
    Error,
  },
  data() {
    return {
      password: "",
      password_confirm: "",
      error: "",
      message: "",
      submited: false,
      waiting: "",
      type: "password",
      iconPassword: "eye-slash",
      typeConfirm: "password",
      iconConfirmPassword: "eye-slash",
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.iconPassword = "eye";
      } else {
        this.type = "password";
        this.iconPassword = "eye-slash";
      }
    },
    showConfirmPassword() {
      if (this.typeConfirm === "password") {
        this.typeConfirm = "text";
        this.iconConfirmPassword = "eye";
      } else {
        this.typeConfirm = "password";
        this.iconConfirmPassword = "eye-slash";
      }
    },
    async handleSubmit() {
      try {
        this.submited = true;
        this.waiting = "Please wait a moment...";
        const response = await axios.post("reset", {
          password: this.password,
          password_confirm: this.password_confirm,
          token: this.$route.params.token,
        });
        this.waiting = "";
        this.error = "";
        this.message = response.data.message;
        setTimeout(() => this.$router.push("/login"), 3000);
      } catch (e) {
        this.submited = false;
        this.waiting = "";
        if (e.response.data.errors) {
          this.error = Object.values(e.response.data.errors)[0][0];
        } else {
          this.error = e.response.data.message;
        }
      }
    },
  },
};
</script>
