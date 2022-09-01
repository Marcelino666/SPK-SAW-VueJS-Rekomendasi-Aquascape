<template>
  <div>
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row">
        <div class="col-md-7">
          <div class="mt-2">
            <img src="../assets/images/profile.png" width="100%" />
          </div>
        </div>
        <div class="col-md-5 border rounded">
          <form @submit.prevent="handleSubmit">
            <div class="text-center mt-3">
              <h3>Profile</h3>
            </div>
            <hr />
            <div
              v-if="waiting"
              class="alert alert-secondary text-center"
              role="alert"
            >
              {{ waiting }}
            </div>
            <Error v-if="error" :error="error" />
            <div class="row">
              <div class="col-md-5">
                <div class="form-group mt-3">
                  <label><strong>Name</strong></label>
                </div>
                <div class="form-group mt-3">
                  <label><strong>Username</strong></label>
                </div>
                <div class="form-group mt-3">
                  <label><strong>Email</strong></label>
                </div>
              </div>
              <div class="col-md-7">
                <!-- Show Profile -->
                <div v-if="!pageEdit">
                  <div class="form-group mt-3">
                    <label>{{ user.name }}</label>
                  </div>
                  <div class="form-group mt-3">
                    <label>{{ user.username }}</label>
                  </div>
                  <div class="form-group mt-3">
                    <label>{{ user.email }}</label>
                  </div>
                </div>
                <!-- Edit Profile -->
                <div v-if="pageEdit" class="form-group">
                  <b-form-input
                    class="form-control mt-1"
                    type="text"
                    v-model="user.name"
                    placeholder="Name"
                  ></b-form-input>
                  <b-form-input
                    class="form-control mt-3"
                    type="text"
                    v-model="user.username"
                    placeholder="Username"
                  ></b-form-input>
                  <b-form-input
                    class="form-control mt-3"
                    type="email"
                    v-model="user.email"
                    placeholder="Email"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <hr />
            <div v-if="pageEdit">
              <div class="row">
                <div class="col-md-5">
                  <!-- Edit Password -->
                  <div class="form-group mt-3" v-if="!changePassword">
                    <label><strong>Password</strong></label>
                  </div>
                  <div class="form-group mt-3" v-if="changePassword">
                    <label><strong>Old Password</strong></label>
                  </div>
                  <div class="form-group mt-3" v-if="changePassword">
                    <label><strong>New Password</strong></label>
                  </div>
                  <div class="form-group mt-3" v-if="changePassword">
                    <label><strong>Confirm New Password</strong></label>
                  </div>
                </div>
                <div class="col-md-7">
                  <b-button
                    pill
                    class="mt-2"
                    block
                    variant="outline-info"
                    :pressed.sync="changePassword"
                    type="button"
                    v-if="!changePassword"
                    >Change Password</b-button
                  >
                  <div v-if="changePassword">
                    <div class="input-group mt-2">
                      <input
                        :type="typeOldPassword"
                        class="form-control"
                        v-model="oldPassword"
                        placeholder="Old Password"
                      />
                      <div class="input-group-append">
                        <b-button
                          variant="outline-secondary"
                          @click.prevent="showOldPassword"
                        >
                          <b-icon :icon="iconOldPassword"></b-icon>
                        </b-button>
                      </div>
                    </div>
                    <div class="input-group mt-3">
                      <input
                        :type="typeNewPassword"
                        class="form-control"
                        v-model="newPassword"
                        placeholder="New Password"
                      />
                      <div class="input-group-append">
                        <b-button
                          variant="outline-secondary"
                          @click.prevent="showNewPassword"
                        >
                          <b-icon :icon="iconNewPassword"></b-icon>
                        </b-button>
                      </div>
                    </div>
                    <div class="input-group mt-3">
                      <input
                        :type="typeConfirmNewPassword"
                        class="form-control"
                        v-model="confirmNewPassword"
                        placeholder="Confirm New Password"
                      />
                      <div class="input-group-append">
                        <b-button
                          variant="outline-secondary"
                          @click.prevent="showConfirmNewPassword"
                        >
                          <b-icon :icon="iconConfirmNewPassword"></b-icon>
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <b-button
                  pill
                  variant="outline-info"
                  :pressed.sync="changePassword"
                  v-if="changePassword"
                  type="button"
                  >Cancel</b-button
                >
              </div>
              <hr />
            </div>
            <b-button
              class="text-center"
              type="submit"
              v-if="pageEdit && !waiting"
              block
              variant="outline-success"
              pill
              @click.prevent="handleSubmit"
            >
              Submit
            </b-button>
          </form>
          <div class="text-center">
            <b-button
              type="button"
              v-if="!pageEdit"
              variant="outline-success"
              :pressed.sync="pageEdit"
              pill
            >
              Edit Profile
            </b-button>
            <b-button
              class="mt-2"
              type="button"
              v-if="pageEdit && !waiting"
              block
              variant="outline-danger"
              pill
              @click="handleBack"
            >
              Cancel
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <img src="../assets/images/profile.png" width="100%" />
        </div>
        <div class="col-md-6 border rounded">
          <form @submit.prevent="handleSubmit">
            <div class="text-center mt-3">
              <h3>Profile</h3>
            </div>
            <hr />
            <div
              v-if="waiting"
              class="alert alert-secondary text-center"
              role="alert"
            >
              {{ waiting }}
            </div>
            <Error v-if="error" :error="error" />
            <div class="form-group mt-3">
              <label><strong>Name</strong></label>
              <div v-if="!pageEdit">
                <label>{{ user.name }}</label>
              </div>
              <b-form-input
                v-if="pageEdit"
                class="form-control"
                type="text"
                v-model="user.name"
                placeholder="Name"
              ></b-form-input>
            </div>
            <div class="form-group mt-3">
              <label><strong>Username</strong></label>
              <div v-if="!pageEdit">
                <label>{{ user.username }}</label>
              </div>
              <b-form-input
                v-if="pageEdit"
                class="form-control"
                type="text"
                v-model="user.username"
                placeholder="Username"
              ></b-form-input>
            </div>
            <div class="form-group mt-3">
              <label><strong>Email</strong></label>
              <div v-if="!pageEdit">
                <label>{{ user.email }}</label>
              </div>
              <b-form-input
                v-if="pageEdit"
                class="form-control"
                type="email"
                v-model="user.email"
                placeholder="Email"
              ></b-form-input>
            </div>

            <hr />
            <div v-if="pageEdit">
              <div class="form-group mt-3" v-if="!changePassword">
                <label><strong>Password</strong></label>
              </div>
              <div class="form-group mt-3" v-if="changePassword">
                <label><strong>Old Password</strong></label>
                <div v-if="changePassword" class="input-group">
                  <input
                    :type="typeOldPassword"
                    class="form-control"
                    v-model="oldPassword"
                    placeholder="Old Password"
                  />
                  <div class="input-group-append">
                    <b-button
                      variant="outline-secondary"
                      @click.prevent="showOldPassword"
                    >
                      <b-icon :icon="iconOldPassword"></b-icon>
                    </b-button>
                  </div>
                </div>
              </div>
              <div class="form-group mt-3" v-if="changePassword">
                <label><strong>New Password</strong></label>
                <div v-if="changePassword" class="input-group">
                  <input
                    :type="typeNewPassword"
                    class="form-control"
                    v-model="newPassword"
                    placeholder="New Password"
                  />
                  <div class="input-group-append">
                    <b-button
                      variant="outline-secondary"
                      @click.prevent="showNewPassword"
                    >
                      <b-icon :icon="iconNewPassword"></b-icon>
                    </b-button>
                  </div>
                </div>
              </div>
              <div class="form-group mt-3" v-if="changePassword">
                <label><strong>Confirm New Password</strong></label>
                <div v-if="changePassword" class="input-group">
                  <input
                    :type="typeConfirmNewPassword"
                    class="form-control"
                    v-model="confirmNewPassword"
                    placeholder="Confirm New Password"
                  />
                  <div class="input-group-append">
                    <b-button
                      variant="outline-secondary"
                      @click.prevent="showConfirmNewPassword"
                    >
                      <b-icon :icon="iconConfirmNewPassword"></b-icon>
                    </b-button>
                  </div>
                </div>
              </div>

              <b-button
                pill
                class="mt-2"
                block
                variant="outline-info"
                :pressed.sync="changePassword"
                type="button"
                v-if="!changePassword"
                >Change Password</b-button
              >

              <div class="text-right">
                <b-button
                  pill
                  variant="outline-info"
                  :pressed.sync="changePassword"
                  v-if="changePassword"
                  type="button"
                  >Cancel</b-button
                >
              </div>
              <hr />
            </div>
            <b-button
              class="text-center"
              type="submit"
              v-if="pageEdit && !waiting"
              block
              variant="outline-success"
              pill
              @click.prevent="handleSubmit"
            >
              Submit
            </b-button>
          </form>
          <div class="text-center mb-3">
            <b-button
              type="button"
              v-if="!pageEdit"
              variant="outline-success"
              :pressed.sync="pageEdit"
              pill
            >
              Edit Profile
            </b-button>
            <b-button
              class="mt-2"
              type="button"
              v-if="pageEdit && !waiting"
              block
              variant="outline-danger"
              pill
              @click="handleBack"
            >
              Cancel
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Error from "../components/Error.vue";
export default {
  name: "Profile",
  components: {
    Error,
  },
  data() {
    return {
      error: "",
      waiting: "",
      pageEdit: false,
      changePassword: false,
      newPassword: "",
      confirmNewPassword: "",
      oldPassword: "",
      typeNewPassword: "password",
      iconNewPassword: "eye-slash",
      typeConfirmNewPassword: "password",
      iconConfirmNewPassword: "eye-slash",
      typeOldPassword: "password",
      iconOldPassword: "eye-slash",
    };
  },
  methods: {
    showNewPassword() {
      if (this.typeNewPassword === "password") {
        this.typeNewPassword = "text";
        this.iconNewPassword = "eye";
      } else {
        this.typeNewPassword = "password";
        this.iconNewPassword = "eye-slash";
      }
    },
    showOldPassword() {
      if (this.typeOldPassword === "password") {
        this.typeOldPassword = "text";
        this.iconOldPassword = "eye";
      } else {
        this.typeOldPassword = "password";
        this.iconOldPassword = "eye-slash";
      }
    },
    showConfirmNewPassword() {
      if (this.typeConfirmNewPassword === "password") {
        this.typeConfirmNewPassword = "text";
        this.iconConfirmNewPassword = "eye";
      } else {
        this.typeConfirmNewPassword = "password";
        this.iconConfirmNewPassword = "eye-slash";
      }
    },
    handleBack() {
      this.changePassword = false;
      this.pageEdit = false;
    },
    async handleSubmit() {
      try {
        this.error = "";
        this.waiting = "Please wait a moment...";
        if (!this.changePassword) {
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmNewPassword = "";
        }
        const response = await axios.put("/profile", {
          name: this.user.name,
          username: this.user.username,
          email: this.user.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword,
        });

        this.pageEdit = false;
        this.changePassword = false;
        this.waiting = "";
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmNewPassword = "";
        this.$noty.success(response.data.message);
      } catch (e) {
        this.waiting = "";
        if (e.response.data.errors) {
          this.error = Object.values(e.response.data.errors)[0][0];
        } else {
          this.error = e.response.data.error;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>

<style scoped></style>
