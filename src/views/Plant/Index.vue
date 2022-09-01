<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <h3><strong>Plant</strong> Database</h3>
      </div>
      <div class="col">
        <form @submit.prevent="filterSubmit">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search plant name..."
              aria-label="Search plant name..."
              aria-describedby="basic-addon2"
              v-model="search"
              @keyup="filterSubmit"
            />
            <div class="input-group-append">
              <button class="btn btn-success" type="submit">
                <b-icon-search></b-icon-search>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div v-if="admin" class="row justify-content-md-center mt-3 text-center">
      <div class="col-md-auto">
        <router-link to="/plants/add" class="btn btn-success">
          Add Plant
        </router-link>
      </div>
    </div>

    <div class="row mt-3 mb-3">
      <div class="col-md-6 mt-d mt-2" v-for="plant in plants" :key="plant.id">
        <CardPlant :plant="plant" />
      </div>
    </div>
    <div v-if="rows" class="mt-4">
      <div class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
          @change="filterSubmit"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CardPlant from "../../components/CardPlant.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Plants",
  components: {
    CardPlant,
  },
  computed: {
    ...mapGetters({
      admin: "auth/admin",
    }),
  },
  data() {
    return {
      plants: [],
      search: "",
      currentPage: 1,
      rows: "",
      perPage: "",
    };
  },
  methods: {
    setPlant(data) {
      this.plants = data.data;
      this.rows = data.total;
      this.perPage = data.per_page;
    },
    async filterSubmit(value) {
      this.currentPage = value;
      await axios
        .get("plant?search=" + this.search + "&page=" + this.currentPage)
        .then((response) => {
          this.setPlant(response.data.data);
        })
        .catch((error) => {
          console.log("Gagal : ", error);
        });
    },
  },
  async mounted() {
    await axios
      .get("plant?page=" + this.currentPage)
      .then((response) => {
        this.setPlant(response.data.data);
      })
      .catch((error) => {
        console.log("Gagal : ", error);
      });
  },
};
</script>

<style scoped>
/*  */
</style>
