<template>
  <div>
    <!-- breadcrumb -->
    <div class="row justify-content-between mb-3">
      <div class="col-md-6 my-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:history.go(-1)" class="text-dark"
                >Dashboard</a
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              SAW Details
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-3">
        <img src="../../assets/images/spk.png" class="img-fluid" />
      </div>
      <div class="col-md-6">
        <h2>
          <strong>Decision Support System Details </strong>
        </h2>
        <hr class="border-success" />
        <form @submit.prevent="changeForm">
          <div class="row">
            <div class="col-md-2 my-auto text-center">
              <b-button-group>
                <b-button type="submit">&lsaquo;</b-button>
              </b-button-group>
            </div>

            <div v-if="page" class="col-md-8 border-right border-left">
              <h3 class="text-center">
                <strong>Aquarium Specifications</strong>
              </h3>
              <hr />
              <h5 class="text-center mt-3">
                <strong> Aquarium size :</strong>
                <div class="row mt-1">
                  <div class="col">
                    Length : <br />
                    "
                    <span style="color: #4eb883"
                      >{{ rank.tank_length }} cm </span
                    >"
                  </div>
                  <div class="col">
                    Width : <br />
                    "
                    <span style="color: #4eb883">{{ rank.tank_width }} cm </span
                    >"
                  </div>
                  <div class="col">
                    Height : <br />
                    "
                    <span style="color: #4eb883"
                      >{{ rank.tank_height }} cm </span
                    >"
                  </div>
                </div>
              </h5>
              <h5 class="text-center mt-3">
                <strong>Lighting :</strong> <br />
                "<span style="color: #4eb883"> {{ rank.lighting }} Watt </span>"
              </h5>
              <h5 class="text-center mt-3">
                <strong> Dissolved CO2 :</strong> <br />
                "<span style="color: #4eb883"> {{ rank.co2 }} </span>"
              </h5>
              <h5 class="text-center mt-3">
                <strong>Water Temperature :</strong> <br />
                "<span style="color: #4eb883"> {{ rank.temperature }} °C </span
                >"
              </h5>
              <h5 class="text-center mt-3">
                <strong>Water Hardness :</strong> <br />
                "<span style="color: #4eb883">
                  {{ rank.hardness_tolerance }} </span
                >"
              </h5>
              <h5 class="text-center mt-3">
                <strong>Water pH :</strong> <br />
                "<span style="color: #4eb883"> {{ rank.ph }} pH </span>"
              </h5>
            </div>
            <div v-if="!page" class="col-md-8 border-right border-left">
              <h3 class="text-center">
                <strong>Preferred Weight Value</strong>
              </h3>
              <hr />
              <h5 class="text-center mt-3">
                <strong>Growt Rate :</strong> <br />
                "<span style="color: #4eb883">
                  {{ rank.growt_rate_weight_value }} </span
                >"
              </h5>
              <h5 class="text-center mt-3">
                <strong>Light Demand :</strong> <br />
                "<span style="color: #4eb883">
                  {{ rank.light_demand_weight_value }} </span
                >"
              </h5>
              <h5 class="text-center mt-3">
                <strong>CO2 Demand :</strong> <br />
                "<span style="color: #4eb883">
                  {{ rank.co2_demand_weight_value }} </span
                >"
              </h5>
              <h5 class="text-center mt-3">
                <strong>Hardness Tolerance :</strong> <br />
                "<span style="color: #4eb883">
                  {{ rank.hardness_tolerance_weight_value }} </span
                >"
              </h5>
              <h5 class="text-center mt-3">
                <strong>Demands :</strong> <br />
                "<span style="color: #4eb883">
                  {{ rank.demands_weight_value }} </span
                >"
              </h5>
              <h5 class="text-center mt-3">
                <strong>Water Temperature :</strong> <br />
                "<span style="color: #4eb883">
                  {{ rank.temperature_weight_value }} </span
                >"
              </h5>
            </div>
            <div class="col-md-2 my-auto text-center">
              <b-button-group>
                <b-button type="submit">&rsaquo;</b-button>
              </b-button-group>
            </div>
          </div>
        </form>
        <hr class="border-success" />
      </div>
    </div>

    <hr class="mb-4" />

    <div class="row">
      <h2>
        <strong>Ranking Results :</strong>
      </h2>
    </div>
    <hr class="border-success" />
    <div class="row mt-3 mb-4">
      <div
        class="col-md-6 mt-d mt-2"
        v-for="detail in details"
        :key="detail.plant_id"
      >
        <CardPlant :detail="detail" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          @change="onFiltered"
        ></b-pagination>
      </div>
    </div>
    <hr class="border-success" />
  </div>
</template>

<script>
import CardPlant from "../../components/CardPlant.vue";
import axios from "axios";
export default {
  name: "SPKDetails",
  components: {
    CardPlant,
  },
  // props: {
  //   id: {
  //     type: Number,
  //     default: null,
  //   },
  // },
  data() {
    return {
      page: false,
      rank: {},
      details: [],
      currentPage: 1,
      totalRows: "",
      perPage: "",
    };
  },
  methods: {
    setData(data) {
      this.rank = data.rank;
      this.details = data.details.data;
      this.totalRows = data.details.total;
      this.perPage = data.details.per_page;
    },
    changeForm() {
      if (this.page == false) {
        this.page = true;
      } else {
        this.page = false;
      }
    },
    async onFiltered(value) {
      this.currentPage = value;
      await axios
        .get("ranking/" + this.$route.params.id + "?page=" + this.currentPage)
        .then((response) => {
          this.setData(response.data);
        })
        .catch((error) => {
          console.log("Failed : ", error);
        });
    },
  },
  async mounted() {
    await axios
      // .get("ranking/" + this.$route.params.id)
      .get("ranking/" + this.$route.params.id + "?page=" + this.currentPage)
      .then((response) => {
        this.setData(response.data);
      })
      .catch((error) => {
        console.log("Failed : ", error);
      });
  },
};
</script>
