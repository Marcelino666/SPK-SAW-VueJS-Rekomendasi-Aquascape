<template>
  <div>
    <h2 class="text-center" style="color: #4eb883">
      <strong>"Simple Additive Weighting"</strong>
    </h2>
    <hr />
    <h3 class="text-center">Criteria</h3>
    <hr class="border-success mt-3 mb-4" />
    <b-table :items="criteria"></b-table>
    <hr class="border-success" />
    <hr class="mt-5" />
    <h3 class="text-center">SubCriteria</h3>
    <hr class="border-success mb-4" />
    <div class="row mb-4">
      <div class="col-md-6">
        <h4 class="text-center" style="color: #3f3d56">Growt Rate</h4>
        <hr class="border-success" />
        <div class="text-center border-right border-bottom border-left">
          <b-table hover :items="subcriteria1"></b-table>
        </div>
      </div>
      <div class="col-md-6">
        <h4 class="text-center" style="color: #3f3d56">Light Demand</h4>
        <hr class="border-success" />
        <div class="text-center border-right border-bottom border-left">
          <b-table hover :items="subcriteria2"></b-table>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-6">
        <h4 class="text-center" style="color: #3f3d56">CO2 Demand</h4>
        <hr class="border-success" />
        <div class="text-center border-right border-bottom border-left">
          <b-table hover :items="subcriteria3"></b-table>
        </div>
      </div>
      <div class="col-md-6">
        <h4 class="text-center" style="color: #3f3d56">
          Water Hardness Tolerance
        </h4>
        <hr class="border-success" />
        <div class="text-center border-right border-bottom border-left">
          <b-table hover :items="subcriteria4"></b-table>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-6">
        <h4 class="text-center" style="color: #3f3d56">Demands</h4>
        <hr class="border-success" />
        <div class="text-center border-right border-bottom border-left">
          <b-table hover :items="subcriteria5"></b-table>
        </div>
      </div>
      <div class="col-md-6">
        <h4 class="text-center" style="color: #3f3d56">Temperature</h4>
        <hr class="border-success" />
        <div class="text-center border-right border-bottom border-left">
          <b-table hover :items="subcriteria6"></b-table>
        </div>
      </div>
    </div>
    <hr class="border-success" />
    <!-- <div class="row mb-4">
      <div class="col-md-6">
        <h4 class="text-center">Growt Rate</h4>
        <div class="border-right border-bottom border-left">
          <b-table hover :items="subcriteria3" :fields="fields"></b-table>
        </div>
      </div>
      <div class="col-md-6">
        <h4 class="text-center">Light Demand</h4>
        <div class="border-right border-bottom border-left">
          <b-table hover :items="subcriteria4" :fields="fields"></b-table>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Criteria",
  async mounted() {
    // this.$store.dispatch("criteria/getCriteria");
    await axios
      .get("criteria")
      .then((response) => {
        this.setCriteria(response.data);
      })
      .catch((error) => {
        console.log("Gagal : ", error);
      });
  },
  // computed: {
  //   ...mapGetters({
  //     criteria: "criteria/criteria",
  //   }),
  // },
  data() {
    return {
      criteria: [],
      subcriteria1: [],
      subcriteria2: [],
      subcriteria3: [],
      subcriteria4: [],
      subcriteria5: [],
      subcriteria6: [],
      fields: [
        {
          key: "subcriterianame",
          label: "Subcriteria Name",
        },
        {
          key: "weight_value",
          label: "Weight Value",
        },
      ],
    };
  },
  methods: {
    setCriteria(data) {
      this.criteria = data.criteria;
      this.subcriteria1 = Object.values(data.subcriteria_1);
      this.subcriteria2 = Object.values(data.subcriteria_2);
      this.subcriteria3 = Object.values(data.subcriteria_3);
      this.subcriteria4 = Object.values(data.subcriteria_4);
      this.subcriteria5 = Object.values(data.subcriteria_5);
      this.subcriteria6 = Object.values(data.subcriteria_6);
    },
  },
};
</script>
