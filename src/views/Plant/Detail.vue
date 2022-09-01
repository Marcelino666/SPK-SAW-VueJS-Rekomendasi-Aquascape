<template>
  <div class="plant-details">
    <!-- breadcrumb -->
    <div class="row justify-content-between mb-3">
      <div class="col-md-6 my-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:history.go(-1)" class="text-dark">Back</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Plant Details
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-4">
        <img
          v-if="!images"
          src="../../assets/images/Plants/plant-default.png"
          class="img-fluid shadow"
        />
        <!-- <img v-if="images" :src="images[0]" class="img-fluid shadow" /> -->
        <b-carousel
          v-if="images"
          id="carousel"
          indicators
          fade
          controls
          class="img-fluid shadow"
        >
          <!-- <b-carousel-slide
            img-src="https://picsum.photos/1024/480/?image=10"
          ></b-carousel-slide> -->
          <b-carousel-slide
            v-for="item in images"
            :img-src="item"
            :key="item.id"
          ></b-carousel-slide>
        </b-carousel>
      </div>
      <div class="col-md-6 px-4 text-center border">
        <h2 class="mt-2">
          <strong>{{ plant.name }}</strong>
        </h2>
        <hr />
        <h4>
          Type : <strong>{{ plant.type }}</strong>
        </h4>
        <h4>
          Origin : <strong>{{ plant.origin }}</strong>
        </h4>
        <h4>
          Family : <strong>{{ plant.family }}</strong>
        </h4>
        <h4>
          Growt Rate : <strong>{{ plant.growt_rate }}</strong>
        </h4>
        <h4>
          Placement Area : <strong>{{ plant.placement_area }}</strong>
        </h4>
        <hr />
        <h4>
          Light Demand : <strong>{{ plant.light_demand }}</strong>
        </h4>
        <h4>
          CO2 Demand : <strong>{{ plant.co2_demand }}</strong>
        </h4>
        <h4>
          Hardness Tolerance : <strong>{{ plant.hardness_tolerance }}</strong>
        </h4>
        <h4>
          pH Tolerance : <strong>{{ plant.ph_tolerance }} pH</strong>
        </h4>
        <h4>
          Temperature : <strong>{{ plant.temperature }} °C</strong>
        </h4>
        <h4>
          Growth Height : <strong>{{ plant.growth_height }} cm</strong>
        </h4>
        <h4>
          Growth Width : <strong>{{ plant.growth_width }} cm</strong>
        </h4>
        <h4>
          Demands : <strong>{{ plant.demands }}</strong>
        </h4>
        <hr />
        <h5 class="text-justify">
          <strong>Description :</strong> <br />{{ plant.description }}
        </h5>
      </div>
    </div>
    <div v-if="admin">
      <hr />
      <div v-if="plant.name" class="row">
        <div class="col text-center">
          <div class="mt-1">
            <b-button
              :to="'/plants/edit/' + plant.id"
              class="mr-2"
              variant="success"
              pill
            >
              Edit
            </b-button>
            <b-button @click="openDeleteModal" pill variant="danger">
              Delete
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <b-modal v-model="deleteModal" centered>
      <p class="my-4">Are you sure delete {{ plant.name }} ?</p>
      <template v-slot:modal-footer>
        <div class="float-right">
          <b-button
            variant="secondary"
            size="sm"
            class="mr-2"
            @click="deleteModal = false"
          >
            Close
          </b-button>
          <b-button variant="danger" size="sm" @click="handlingDelete">
            Delete
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "PlantDetails",
  // props: {
  //   plantId: Number,
  // },
  computed: {
    ...mapGetters({
      admin: "auth/admin",
    }),
  },
  data() {
    return {
      plant: {},
      deleteModal: false,
      images: [],
    };
  },
  methods: {
    setPlant(data) {
      this.plant = data.data;
      this.images = data.imageUrl;
    },
    openDeleteModal() {
      this.deleteModal = true;
    },
    handlingDelete() {
      axios
        .delete("plant/" + this.$route.params.id)
        .then((response) => {
          this.$noty.success(response.data.message);
          this.deleteModal = false;
          setTimeout(() => this.$router.push("/plants"), 1500);
        })
        .catch((e) => {
          console.log("Gagal : ", e);
        });
    },
  },
  mounted() {
    axios
      .get("plant/" + this.$route.params.id)
      .then((response) => {
        this.setPlant(response.data);
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
