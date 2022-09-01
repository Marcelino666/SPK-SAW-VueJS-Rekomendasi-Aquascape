<template>
  <div>
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row">
        <div class="col-md-7">
          <div class="mt-2">
            <div>
              <h3>
                <strong style="color: #3f3d56">
                  "Decision Support System"
                </strong>
              </h3>
            </div>
            <div class="mt-3">
              <h3>
                <span style="color: #3f3d56">with </span>
                <strong style="color: #3f3d56">"</strong>
                <span style="color: #4eb883; font-weight: bold">
                  Simple Additive Weighting
                </span>
                <strong style="color: #3f3d56">"</strong>
                <span style="color: #3f3d56"> method</span>
              </h3>
            </div>
            <hr style="color: #3f3d56" />
            <div class="mt-5">
              <img
                v-if="!page"
                src="../../assets/images/weighting.png"
                width="100%"
              />
              <img
                v-if="page"
                src="../../assets/images/spek.png"
                width="100%"
              />
            </div>
          </div>
        </div>
        <div class="col-md-5 border rounded">
          <form v-if="!page" @submit.prevent="nextSubmit">
            <div class="text-center mt-3">
              <h4><strong>Define Preference Weight Value</strong></h4>
            </div>
            <hr />
            <div class="form-group mb-3">
              <label><strong>Growt Rate</strong></label>
              <b-form-select
                v-model="form.growt_rate_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Light Demand</strong></label>
              <b-form-select
                v-model="form.light_demand_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>CO2 Demand</strong></label>
              <b-form-select
                v-model="form.co2_demand_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Hardness Tolerance</strong></label>
              <b-form-select
                v-model="form.hardness_tolerance_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Demands</strong></label>
              <b-form-select
                v-model="form.demands_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Water Temperature</strong></label>
              <b-form-select
                v-model="form.temperature_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <hr />
            <div class="text-center mb-3">
              <button type="submit" class="btn btn-success">Next</button>
            </div>
          </form>
          <form v-if="page" @submit.prevent="handleSubmit">
            <div class="text-center mt-3">
              <!-- breadcrumb -->
              <div class="row justify-content-between">
                <div class="col-md-6">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <b-button
                          variant="link"
                          @click.prevent="backButton"
                          class="text-dark"
                        >
                          Back
                        </b-button>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <h4><strong>Determine Aquarium Specifications</strong></h4>
            </div>
            <hr />
            <div class="form-group mb-3">
              <label><strong>Aquarium size</strong></label>
              <div class="row">
                <div class="col-md-4">
                  <b-form-input
                    v-model="form.tank_length"
                    placeholder="Length (cm)"
                    type="number"
                  >
                  </b-form-input>
                </div>
                <div class="col-md-4">
                  <b-form-input
                    v-model="form.tank_width"
                    placeholder="Width (cm)"
                    type="number"
                  >
                  </b-form-input>
                </div>
                <div class="col-md-4">
                  <b-form-input
                    v-model="form.tank_height"
                    placeholder="Height (cm)"
                    type="number"
                  >
                  </b-form-input>
                </div>
              </div>
            </div>
            <div class="form-group mb-3">
              <label><strong>Lighting</strong></label>
              <div class="row">
                <div class="col-md-8">
                  <b-form-input
                    v-model="form.lighting"
                    placeholder="Watt"
                    type="number"
                  ></b-form-input>
                </div>
                <div class="col-md-4">
                  <strong>Watt</strong>
                </div>
              </div>
            </div>
            <div class="form-group mb-3">
              <label><strong>Dissolved CO2</strong></label>
              <b-form-select
                v-model="form.co2"
                :options="co2Levels"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Water Temperature</strong></label>
              <div class="row">
                <div class="col-md-8">
                  <b-form-input
                    v-model="form.temperature"
                    type="number"
                    placeholder="10 - 30 °C"
                  ></b-form-input>
                </div>
                <div class="col-md-4"><strong>°C</strong></div>
              </div>
            </div>
            <div class="form-group mb-3">
              <label><strong>Hardness Tolerance</strong></label>
              <b-form-select
                v-model="form.hardness_tolerance"
                :options="hardnessLevels"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>pH</strong></label>
              <div class="row">
                <div class="col-md-8">
                  <b-form-input
                    v-model="form.ph"
                    type="number"
                    placeholder="5 - 9 pH"
                  ></b-form-input>
                </div>
                <div class="col-md-2">
                  <strong>pH</strong>
                </div>
              </div>
            </div>
            <hr />
            <div
              v-if="waiting"
              class="alert alert-secondary text-center mb-3"
              role="alert"
            >
              {{ waiting }}
            </div>
            <div v-if="!waiting && !success" class="text-center mb-3">
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-7 mb-3">
          <div>
            <h3>
              <strong style="color: #3f3d56">
                "Decision Support System"
              </strong>
            </h3>
          </div>
          <div class="mt-3">
            <h3>
              <span style="color: #3f3d56">with </span>
              <strong style="color: #3f3d56">"</strong>
              <span style="color: #4eb883; font-weight: bold">
                Simple Additive Weighting
              </span>
              <strong style="color: #3f3d56">"</strong>
              <span style="color: #3f3d56"> method</span>
            </h3>
          </div>
          <hr style="color: #3f3d56" />
          <div class="mt-5">
            <img
              v-if="!page"
              src="../../assets/images/weighting.png"
              width="100%"
            />
            <img v-if="page" src="../../assets/images/spek.png" width="100%" />
          </div>
        </div>
        <div class="col-md-5 border rounded">
          <form v-if="!page" @submit.prevent="nextSubmit">
            <div class="text-center mt-4">
              <h4><strong>Define Preference Weight Value</strong></h4>
            </div>
            <hr />
            <div class="form-group mb-3">
              <label><strong>Growt Rate</strong></label>
              <b-form-select
                v-model="form.growt_rate_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Light Demand</strong></label>
              <b-form-select
                v-model="form.light_demand_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>CO2 Demand</strong></label>
              <b-form-select
                v-model="form.co2_demand_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Hardness Tolerance</strong></label>
              <b-form-select
                v-model="form.hardness_tolerance_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Demands</strong></label>
              <b-form-select
                v-model="form.demands_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Water Temperature</strong></label>
              <b-form-select
                v-model="form.temperature_weight_value"
                :options="options"
              ></b-form-select>
            </div>
            <hr />
            <div class="text-center mb-3">
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </form>
          <form v-if="page" @submit.prevent="handleSubmit">
            <div class="text-center mt-3">
              <!-- breadcrumb -->
              <div class="row justify-content-between">
                <div class="col-md-6">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <b-button
                          variant="link"
                          @click.prevent="backButton"
                          class="text-dark"
                        >
                          Back
                        </b-button>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <h4><strong>Determine Aquarium Specifications</strong></h4>
            </div>
            <hr />
            <div class="form-group mb-3">
              <label><strong>Aquarium size</strong></label>
              <div class="row">
                <div class="col-md-4">
                  <b-form-input
                    v-model="form.tank_length"
                    placeholder="Length (cm)"
                    type="number"
                  >
                  </b-form-input>
                </div>
                <div class="col-md-4">
                  <b-form-input
                    v-model="form.tank_width"
                    placeholder="Width (cm)"
                    type="number"
                  >
                  </b-form-input>
                </div>
                <div class="col-md-4">
                  <b-form-input
                    v-model="form.tank_height"
                    placeholder="Height (cm)"
                    type="number"
                  >
                  </b-form-input>
                </div>
              </div>
            </div>
            <div class="form-group mb-3">
              <label><strong>Lighting</strong></label>
              <b-form-input
                v-model="form.lighting"
                placeholder="Watt"
                type="number"
              ></b-form-input>
            </div>
            <div class="form-group mb-3">
              <label><strong>Dissolved CO2</strong></label>
              <b-form-select
                v-model="form.co2"
                :options="co2Levels"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>Water Temperature</strong></label>
              <b-form-input
                v-model="form.temperature"
                type="number"
                placeholder="10 - 30 °C"
              ></b-form-input>
            </div>
            <div class="form-group mb-3">
              <label><strong>Hardness Tolerance</strong></label>
              <b-form-select
                v-model="form.hardness_tolerance"
                :options="hardnessLevels"
              ></b-form-select>
            </div>
            <div class="form-group mb-3">
              <label><strong>pH</strong></label>
              <b-form-input
                v-model="form.ph"
                type="number"
                placeholder="5 - 9 pH"
              ></b-form-input>
            </div>
            <hr />
            <div
              v-if="waiting"
              class="alert alert-secondary text-center mb-3"
              role="alert"
            >
              {{ waiting }}
            </div>
            <div v-if="!waiting && !success" class="text-center mb-3">
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Weighting",
  data() {
    return {
      page: 0,
      success: "",
      waiting: "",
      form: {
        user_id: null,
        growt_rate_weight_value: null,
        light_demand_weight_value: null,
        co2_demand_weight_value: null,
        hardness_tolerance_weight_value: null,
        demands_weight_value: null,
        temperature_weight_value: null,
        tank_length: null,
        tank_width: null,
        tank_height: null,
        lighting: null,
        co2: null,
        temperature: null,
        ph: null,
        hardness_tolerance: null,
      },
      options: [
        { value: null, text: "-- Input Importance Weight Level --" },
        { value: 5, text: "Very Important" },
        { value: 4, text: "Important" },
        { value: 3, text: "Quite Important" },
        { value: 2, text: "Not Important" },
        { value: 1, text: "Very Unimportant" },
      ],
      co2Levels: [
        {
          value: null,
          text: "-- Input Dissolved CO2 Level (Drop Checker) --",
        },
        { value: "Low", text: "Low (Blue)" },
        { value: "Low - Medium", text: "Low - Medium (Blue-Green)" },
        { value: "Medium", text: "Medium (Green)" },
        { value: "Medium - High", text: "Medium - High (Green-Yellow)" },
        { value: "High", text: "High (Yellow)" },
      ],
      hardnessLevels: [
        { value: null, text: "-- Input Water Hardness Level (TDS Meter) --" },
        { value: "Soft", text: "Soft (0 - 70 ppm)" },
        { value: "Soft - Medium", text: "Soft - Medium (70 - 140 ppm)" },
        { value: "Medium", text: "Medium (140 - 210 ppm)" },
        { value: "Medium - Hard", text: "Medium - Hard (210 - 320 ppm)" },
        { value: "Hard", text: "Hard (320 - 530 ppm)" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    nextSubmit() {
      if (
        !this.form.growt_rate_weight_value ||
        !this.form.light_demand_weight_value ||
        !this.form.co2_demand_weight_value ||
        !this.form.hardness_tolerance_weight_value ||
        !this.form.demands_weight_value ||
        !this.form.temperature_weight_value
      ) {
        this.$noty.error("All fields must be filled !");
      } else {
        this.page = 1;
      }
    },
    backButton() {
      this.page = 0;
    },
    async handleSubmit() {
      try {
        this.waiting = "Please wait a moment...";
        this.form.user_id = this.user.id;
        const response = await axios.post("/ranking", this.form);
        this.waiting = "";
        this.success = true;
        this.$noty.success(response.data.message);
        setTimeout(() => this.$router.push("/dashboard"), 2500);
      } catch (e) {
        this.waiting = "";
        this.$noty.error(Object.values(e.response.data.errors)[0][0]);
      }
    },
  },
};
</script>

<style scoped></style>
