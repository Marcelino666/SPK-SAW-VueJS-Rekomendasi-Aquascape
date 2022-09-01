<template>
  <div>
    <div class="row mb-3 mt-5">
      <div class="col">
        <h3><strong>Plant</strong> Database</h3>
      </div>
    </div>
    <h2 class="text-center" v-if="!plants.length">Plant not found</h2>
    <div class="row mb-3">
      <div class="col-md-6 mt-d mt-2" v-for="plant in plants" :key="plant.id">
        <CardPlant :plant="plant" />
      </div>
    </div>
    <div class="row text-center justify-content-center">
      <div class="col">
        <router-link to="/plants" class="mt-2 btn btn-outline-success"
          ><b-icon-eye></b-icon-eye> Show All
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CardPlant from "./CardPlant.vue";
import axios from "axios";
export default {
  name: "Plant",
  components: {
    CardPlant,
  },
  data() {
    return {
      plants: [],
    };
  },
  methods: {
    setPlant(data) {
      this.plants = data;
      // data.forEach((value) => {
      //   if (value.images) {
      //     let temp = {};
      //     temp.id = value.id;
      //     temp.images = value.images;
      //     this.getImages(temp);
      //   }
      // });
    },
    // async getImages(value) {
    //   await axios
    //     .get("dropbox/" + value.id + "/" + value.images)
    //     .then((response) => {
    //       this.setImage(response.data);
    //     })
    //     .catch((error) => {
    //       console.log("Gagal : ", error);
    //     });
    // },
    // setImage(data) {
    //   // this.images.push(data);
    //   this.plants.forEach((value) => {
    //     if (value.id == data.id) {
    //       value.imageURL = data.imageURL.toString();
    //     }
    //   });
    // },
  },
  mounted() {
    axios
      .get("plant")
      .then((response) => {
        this.setPlant(response.data.data.data);
      })
      .catch((error) => {
        console.log("Gagal : ", error);
      });
  },
};
</script>
