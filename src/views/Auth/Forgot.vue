<template>
  <div class="row mt-4">
    <div class="col-md-7">
      <img src="../../assets/images/forgot.png" width="100%" />
    </div>
    <div class="col-md-5">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center mb-4">Forgot Password</h3>
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
        <Error v-if="error" :error="error" />
        <div v-if="!submited">
          <div class="form-group">
            <label><strong>Email</strong></label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="Email"
            />
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
  name: "Forgot",
  components: {
    Error,
  },
  data() {
    return {
      email: "",
      message: "",
      error: "",
      waiting: "",
      submited: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.error = "";
        this.message = "";
        this.submited = true;
        this.waiting = "Please wait a moment...";

        await axios.post("forgot", {
          email: this.email,
        });
        this.waiting = "";
        this.message = "The email has been sent, please check your email";
        setTimeout(() => this.$router.push("/"), 3000);
      } catch (e) {
        this.submited = false;
        this.waiting = "";
        this.error = e.response.data.message;
      }
    },
  },
};
</script>
