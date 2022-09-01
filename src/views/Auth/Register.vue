<template>
  <div class="row mt-4">
    <div class="col-md-7">
      <img src="../../assets/images/sign.png" width="100%" />
    </div>
    <div class="col-md-5">
      <form @submit.prevent="handleSubmit">
        <div
          v-if="success"
          class="alert alert-success text-center"
          role="alert"
        >
          {{ success }}
        </div>
        <div
          v-if="waiting"
          class="alert alert-secondary text-center"
          role="alert"
        >
          {{ waiting }}
        </div>
        <Error v-if="error" :error="error" />
        <h3 class="text-center mb-4">Sign Up</h3>

        <div class="form-group">
          <label><strong>Name</strong></label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            placeholder="Name"
          />
        </div>

        <div class="form-group">
          <label><strong>Username</strong></label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Username"
          />
        </div>

        <div class="form-group">
          <label><strong>Email</strong></label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>

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

        <button v-if="!waiting && !success" class="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "../../components/Error.vue";
export default {
  name: "Register",
  components: {
    Error,
  },
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      error: "",
      success: "",
      waiting: "",
      type: "password",
      iconPassword: "eye-slash",
      typeConfirm: "password",
      iconConfirmPassword: "eye-slash",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.error = "";
        this.waiting = "Please wait a moment...";
        const response = await axios.post("register", {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirm: this.password_confirm,
        });
        this.waiting = "";
        this.success = response.data.message;
        setTimeout(() => this.$router.push("/login"), 3000);
      } catch (e) {
        this.waiting = "";
        this.error = Object.values(e.response.data.errors)[0][0];
      }
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
    showConfirmPassword() {
      if (this.typeConfirm === "password") {
        this.typeConfirm = "text";
        this.iconConfirmPassword = "eye";
      } else {
        this.typeConfirm = "password";
        this.iconConfirmPassword = "eye-slash";
      }
    },
  },
};
</script>
