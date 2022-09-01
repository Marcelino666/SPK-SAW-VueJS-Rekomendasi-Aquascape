<template>
  <div class="home">
    <!-- <h3 v-if="user">Hello, {{ user.name }}</h3> -->
    <!-- <h3 v-if="!user">You are not logged in!</h3> -->
    <div v-if="!admin">
      <Hero />
      <Plant />
    </div>
    <div v-else>
      <Plants />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hero from "../components/Hero.vue";
import Plant from "../components/Plant.vue";
import Plants from "../views/Plant/Index.vue";

export default {
  name: "Home",
  components: {
    Hero,
    Plant,
    Plants,
  },
  computed: {
    ...mapGetters({
      admin: "auth/admin",
    }),
  },
};
</script>
