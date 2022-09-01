<template>
  <div>
    <!-- Destop -->
    <div class="card card-plant shadow d-none d-md-block">
      <div class="row">
        <!-- For Plants -->
        <div v-if="plant" class="col-md-6">
          <img
            v-if="!plant.images"
            src="../assets/images/Plants/plant-default.png"
            class="card-img img-fluid"
          />
          <img
            v-if="plant.images && imageURL"
            :src="imageURL"
            class="card-img img-fluid"
          />

          <div v-if="plant.images && !imageURL" class="text-center mt-5">
            <b-spinner label="Large Spinner" variant="success"> </b-spinner>
          </div>
        </div>

        <!-- For Details SPK -->
        <div
          v-if="detail"
          class="col-md-6 text-center my-auto mx-auto pr-0 pl-5"
        >
          <h2>
            <strong>Rank "{{ detail.rank }}"</strong>
          </h2>
          <h4 class="mb-2">{{ detail.plant_name }}</h4>
          <p>
            <b-button
              @click="modalShow = !modalShow"
              pill
              variant="outline-success shadow-sm"
              >Alternative Details</b-button
            >
            <b-button
              :plantId="detail.plant_id"
              pill
              variant="outline-success shadow mt-2"
              @click="plantDetails(detail.plant_id)"
              >Plant Details</b-button
            >
          </p>
          <!-- </div> -->
        </div>

        <!-- For Plants -->
        <div
          v-if="plant"
          class="col-md-6 text-center my-auto mx-auto pr-5 pl-0"
        >
          <h5 class="card-title">
            <strong>{{ plant.name }}</strong>
          </h5>
          <p class="card-text">
            Type : {{ plant.type }}
            <br />
            Origin : {{ plant.origin }}
            <br />
            Family : {{ plant.family }}
          </p>
          <router-link :to="'/plants/' + plant.id" class="btn btn-success">
            Detail
          </router-link>
        </div>

        <!-- For Details SPK -->
        <div v-if="detail" class="col-md-6">
          <img
            v-if="!detail.images"
            src="../assets/images/Plants/plant-default.png"
            class="card-img img-fluid"
          />
          <img
            v-if="detail.images && imageURL"
            :src="imageURL"
            class="card-img img-fluid"
          />
          <div v-if="detail.images && !imageURL" class="text-center mt-5">
            <b-spinner label="Large Spinner" variant="success"> </b-spinner>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="card card-plant d-sm-block shadow d-md-none">
      <!-- For Plants -->
      <div v-if="plant" class="row text-center justify-content-center">
        <div class="col-md-6 mt-4 ml-4 mr-4">
          <img
            v-if="!plant.images"
            src="../assets/images/Plants/plant-default.png"
            class="card-img-mobile"
            style="max-width: 100%"
          />
          <img
            v-if="plant.images && imageURL"
            :src="imageURL"
            class="card-img-mobile"
            style="max-width: 100%"
          />

          <div v-if="plant.images && !imageURL" class="text-center mt-5">
            <b-spinner label="Large Spinner" variant="success"> </b-spinner>
          </div>
        </div>
        <div class="col-md">
          <div class="card-body my-auto mx-auto">
            <h5 class="card-title">
              <strong>{{ plant.name }}</strong>
            </h5>
            <p class="card-text">
              Type :<strong> {{ plant.type }}</strong>
              <br />
              Origin :<strong> {{ plant.origin }}</strong>
              <br />
              Family :<strong> {{ plant.family }}</strong>
            </p>
            <router-link :to="'/plants/' + plant.id" class="btn btn-success">
              Detail
            </router-link>
          </div>
        </div>
      </div>

      <!-- For Details SPK -->
      <div v-if="detail" class="row text-center justify-content-center">
        <div class="col-md-6 mt-4 ml-4 mr-4">
          <img
            v-if="!detail.images"
            src="../assets/images/Plants/plant-default.png"
            class="card-img-mobile"
            style="max-width: 100%"
          />
          <img
            v-if="detail.images && imageURL"
            :src="imageURL"
            class="card-img-mobile"
            style="max-width: 100%"
          />

          <div v-if="detail.images && !imageURL" class="text-center mt-5">
            <b-spinner label="Large Spinner" variant="success"> </b-spinner>
          </div>
        </div>
        <div class="col-md">
          <div class="card-body my-auto mx-auto">
            <h2>
              <strong>Rank "{{ detail.rank }}"</strong>
            </h2>
            <h4 class="mb-2">{{ detail.plant_name }}</h4>
            <div class="row">
              <div class="col-md-6">
                <b-button
                  @click="modalShow = !modalShow"
                  pill
                  variant="outline-success shadow-sm"
                  >Alternative Details</b-button
                >
              </div>
              <div class="col-md-6 mt-2">
                <b-button
                  :plantId="detail.plant_id"
                  pill
                  variant="outline-success shadow-sm"
                  @click="plantDetails(detail.plant_id)"
                  >Plant Details</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <b-modal
      v-if="detail"
      v-model="modalShow"
      title="Alternative Details"
      ok-only
      centered
    >
      <div class="text-center">
        <h2>
          <strong>Rank "{{ detail.rank }}"</strong>
        </h2>
        <h3 class="mb-3">{{ detail.plant_name }}</h3>
      </div>
      <hr class="border-success" />
      <div class="text-center">
        <h5 class="mb-2"><strong>"Weight"</strong></h5>
        <h5 class="mb-2">
          Growt Rate :
          <strong> {{ detail.growt_rate_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          Light Demand :
          <strong> {{ detail.light_demand_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          CO2 Demand :
          <strong> {{ detail.co2_demand_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          Water Hardness Tolerance :
          <strong> {{ detail.hardness_tolerance_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          Demands :
          <strong> {{ detail.demands_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          Temperature : <strong> {{ detail.temperature_weight }} </strong>
        </h5>
        <hr class="border-success" />
        <h5 class="mb-2"><strong>"Weight Normalization"</strong></h5>
        <h5 class="mb-2">
          Growt Rate :
          <strong> {{ detail.growt_rate_normalization_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          Light Demand :
          <strong> {{ detail.light_demand_normalization_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          CO2 Demand :
          <strong> {{ detail.co2_demand_normalization_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          Water Hardness Tolerance :
          <strong>
            {{ detail.hardness_tolerance_normalization_weight }}
          </strong>
        </h5>
        <h5 class="mb-2">
          Demands :
          <strong> {{ detail.demands_normalization_weight }} </strong>
        </h5>
        <h5 class="mb-2">
          Temperature :
          <strong> {{ detail.temperature_normalization_weight }} </strong>
        </h5>
      </div>
      <div class="text-center">
        <hr class="border-success" />
        <h5 class="mb-2">
          Total Normalization : <strong> {{ detail.total }} </strong>
        </h5>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CardPlant",
  props: ["detail", "plant"],
  data() {
    return {
      modalShow: false,
      imageURL: "",
      // images: this.detail.images,
    };
  },
  methods: {
    plantDetails(value) {
      this.$router.push("/plants/" + value);
    },
    // async getImagesURL() {
    //   console.log(this.plant.imageURL);
    //   return this.plant.imageURL;
    // },
    async getImages() {
      if (this.plant && this.plant.images) {
        await axios
          .get(
            "dropbox/" + this.plant.id + "/" + this.plant.images + "/" + false
          )
          .then((response) => {
            this.setImage(response.data);
          })
          .catch((error) => {
            console.log("Gagal : ", error);
          });
      } else if (this.detail && this.detail.images) {
        await axios
          .get(
            "dropbox/" +
              this.detail.plant_id +
              "/" +
              this.detail.images +
              "/" +
              false
          )
          .then((response) => {
            this.setImage(response.data);
          })
          .catch((error) => {
            console.log("Gagal : ", error);
          });
      }
    },
    setImage(data) {
      this.imageURL = data.imageURL;
    },
  },
  created() {
    this.getImages();
  },
};
</script>

<style scoped>
.card-plant {
  border-radius: 15px;
}
/* .card-img {
  border-radius: 15px;
  height: 18vh;
  object-fit: cover;
} */
.card-img {
  border-radius: 15px;
  padding: 5px;
  display: block;
  max-width: 300px;
  height: 250px;
  object-fit: cover;
}
.card-img-mobile {
  border-radius: 15px;
  height: 250px;
  max-width: 250px;
  object-fit: cover;
}
/* img {
  vertical-align: middle;
} */
</style>
