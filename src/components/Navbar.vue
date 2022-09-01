<template>
  <!-- Tempelate!! -->
  <!-- <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Sign Up</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="user">
          <li class="nav-item">
            <a
              href="javascript:void(0)"
              @click.prevent="handleClick"
              class="nav-link"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->

  <b-navbar toggleable="lg" type="light" class="mb-4">
    <div class="container">
      <router-link to="/" class="navbar-brand">MyPlants</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Template!! -->
        <!-- <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" class="nav-link">SPK</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/" class="nav-link">Plants</router-link>
          </b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->

        <!-- <ul class="nav justify-content-end mr-2">
            <li class="nav-item">
              <router-link class="nav-link" to="">Link</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="">SPK</router-link>
            </li>
          </ul> -->

        <b-navbar-nav class="ml-auto">
          <!-- <router-link v-if="user && !admin" to="/" class="nav-link" right
            >Home</router-link
          > -->
          <router-link v-if="user && !admin" to="/plants" class="nav-link" right
            >Plants</router-link
          >
          <router-link
            v-if="user && !admin"
            to="/dashboard"
            class="nav-link"
            right
            >Dashboard</router-link
          >
          <router-link
            v-if="user && !admin"
            to="/criteria"
            class="nav-link"
            right
            >Criteria</router-link
          >
          <router-link
            v-if="user && !admin"
            to="/weighting"
            class="nav-link"
            right
            >Recommendation</router-link
          >
          <router-link
            v-if="!user && $route.name !== 'Login'"
            to="/login"
            class="nav-link"
            right
            >Login</router-link
          >
          <router-link
            v-if="!user && $route.name !== 'Register'"
            to="/register"
            class="nav-link"
            right
            >Sign Up</router-link
          >

          <!-- Template!! -->
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->
          <!-- 
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown v-if="user" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.name }}</em>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="handleClick()"
              >Sign Out</b-dropdown-item
            >
            <!-- <b-dropdown-item
              href="javascript:void(0)"
              @click.prevent="handleClick"
              >Sign Out</b-dropdown-item
            > -->
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import axios from "axios";
export default {
  name: "Navbar",
  methods: {
    // async handleClick() {
    //   try {
    //     axios.defaults.headers.common["Authorization"] =
    //       "Bearer " + localStorage.getItem("token");
    //     await axios.post("logout");
    //     localStorage.removeItem("token");
    //     this.$store.dispatch("user", null);
    //     this.$router.push("/").catch(() => {});
    //   } catch (e) {
    //     this.error = e.response.data.error;
    //   }
    // },
    ...mapActions({
      signOutAction: "auth/signOut",
    }),
    handleClick() {
      this.signOutAction()
        .then(() => {
          this.$router.push("/").catch(() => {});
          // this.$router.go();
        })
        .catch(() => {});
    },
  },
  computed: {
    // ...mapGetters(["user"]),
    ...mapGetters({
      user: "auth/user",
      admin: "auth/admin",
    }),
  },
};
</script>

<style scoped>
em {
  font-style: normal;
}
</style>
