<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-6">
          <h3 v-show="$route.name === 'AddPlant'">Add Plant</h3>
          <h3 v-show="$route.name === 'EditPlant'">Edit Plant</h3>

          <hr />

          <div class="form-group">
            <label><strong>Name</strong></label>
            <input
              type="text"
              class="form-control"
              v-model="form.name"
              placeholder="Name"
            />
          </div>

          <div class="form-group">
            <label><strong>Type</strong></label>
            <b-form-select v-model="form.type" :options="types"></b-form-select>
          </div>

          <div class="form-group">
            <label><strong>Origin</strong></label>
            <input
              type="text"
              class="form-control"
              v-model="form.origin"
              placeholder="Origin"
            />
          </div>

          <div class="form-group">
            <label><strong>Family</strong></label>
            <input
              type="text"
              class="form-control"
              v-model="form.family"
              placeholder="Family"
            />
          </div>

          <div class="form-group">
            <label><strong>Placement Area</strong></label>
            <b-form-select
              v-model="form.placement_area"
              :options="placement_area"
            ></b-form-select>
          </div>

          <div class="form-group">
            <label><strong>Growt Rate</strong></label>
            <b-form-radio-group
              v-model="form.growt_rate"
              :options="growt_rate"
            ></b-form-radio-group>
          </div>

          <div class="form-group">
            <label><strong>Light Demand</strong></label>
            <b-form-radio-group
              v-model="form.light_demand"
              :options="light_co2_demand"
            >
            </b-form-radio-group>
          </div>

          <div class="form-group">
            <label><strong>CO2 Demand</strong></label>
            <b-form-radio-group
              v-model="form.co2_demand"
              :options="light_co2_demand"
            ></b-form-radio-group>
          </div>

          <div class="form-group">
            <label><strong>Hardness Tolerance</strong></label>
            <b-form-radio-group
              v-model="form.hardness_tolerance"
              :options="hardness_tolerance"
            ></b-form-radio-group>
          </div>

          <div class="form-group">
            <label><strong>Demands</strong></label>
            <b-form-radio-group
              v-model="form.demands"
              :options="demands"
            ></b-form-radio-group>
          </div>

          <div class="form-group">
            <label><strong>pH Tolerance</strong></label>
            <div class="row">
              <div class="col-md-5">
                <b-form-input
                  v-model="min_ph"
                  placeholder="min"
                  type="number"
                  step="any"
                ></b-form-input>
              </div>
              <div class="col-md-5">
                <b-form-input
                  v-model="max_ph"
                  placeholder="max"
                  type="number"
                  step="any"
                ></b-form-input>
                <!-- <b-form-input
                  v-model="max_ph"
                  :state="rangeState"
                  placeholder="max"
                  type="number"
                  trim
                ></b-form-input> -->
                <!-- <b-form-invalid-feedback>
                  Must be higher or equal to the minimum value
                </b-form-invalid-feedback> -->
              </div>
              <div class="col-md-2">pH</div>
            </div>
          </div>

          <div class="form-group">
            <label><strong>Temperature</strong></label>
            <div class="row">
              <div class="col-md-5">
                <b-form-input
                  v-model="min_tmp"
                  placeholder="min"
                  type="number"
                  step="any"
                ></b-form-input>
              </div>
              <div class="col-md-5">
                <b-form-input
                  v-model="max_tmp"
                  placeholder="max"
                  type="number"
                  step="any"
                ></b-form-input>
              </div>
              <div class="col-md-2">°C</div>
            </div>
          </div>

          <div class="form-group">
            <label><strong>Growth Height</strong></label>
            <div class="row">
              <div class="col-md-5">
                <b-form-input
                  v-model="min_hg"
                  placeholder="min"
                  type="number"
                  step="any"
                ></b-form-input>
              </div>
              <div class="col-md-5">
                <b-form-input
                  v-model="max_hg"
                  placeholder="max"
                  type="number"
                  step="any"
                ></b-form-input>
              </div>
              <div class="col-md-2">cm</div>
            </div>
          </div>

          <div class="form-group">
            <label><strong>Growth Width</strong></label>
            <div class="row">
              <div class="col-md-5">
                <b-form-input
                  v-model="min_wd"
                  placeholder="min"
                  type="number"
                  step="any"
                ></b-form-input>
              </div>
              <div class="col-md-5">
                <b-form-input
                  v-model="max_wd"
                  placeholder="max"
                  type="number"
                  step="any"
                ></b-form-input>
              </div>
              <div class="col-md-2">cm</div>
            </div>
          </div>

          <div class="form-group">
            <label><strong>Description</strong></label>
            <div class="row">
              <div class="col">
                <b-form-textarea
                  v-model="form.description"
                  placeholder="description..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <h3>Upload Image</h3>
          <hr />
          <!-- <UploadFile /> -->
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            @vdropzone-sending-multiple="sendDataAndImage"
            @vdropzone-success-multiple="afterUploadFiles"
            @vdropzone-error-multiple="failedUploadFiles"
          ></vue-dropzone>
          <!-- @vdropzone-mounted="dropzoneMounted" -->
          <!-- @vdropzone-error="errorTest" -->
        </div>
      </div>
      <hr />
      <!-- <div v-if="success" class="alert alert-success text-center" role="alert">
        {{ success }}
      </div> -->
      <div
        v-if="waiting"
        class="alert alert-secondary text-center"
        role="alert"
      >
        {{ waiting }}
      </div>
      <!-- <Error v-if="error" :error="error" /> -->
      <div
        v-if="!waiting && !success"
        class="row justify-content-md-center mt-3 text-center"
      >
        <div v-if="$route.name === 'AddPlant'">
          <div class="col-md-auto">
            <button type="submit" class="btn btn-success">Submit</button>
          </div>
        </div>
        <div v-if="$route.name === 'EditPlant'">
          <div v-if="images.length == 0 && selected.images" class="text-center">
            <b-spinner label="Large Spinner" variant="success"> </b-spinner>
          </div>
          <div
            v-if="images.length != 0 || !selected.images"
            class="col-md-auto"
          >
            <button type="submit" class="btn btn-success">Submit</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
// import UploadFile from "./UploadFile.vue";
export default {
  name: "PlantForm",
  components: {
    //   UploadFile,
    vueDropzone: vue2Dropzone,
  },
  created() {
    if (this.selected) {
      this.form = {
        name: this.selected.name,
        type: this.selected.type,
        origin: this.selected.origin,
        family: this.selected.family,
        growt_rate: this.selected.growt_rate,
        light_demand: this.selected.light_demand,
        co2_demand: this.selected.co2_demand,
        hardness_tolerance: this.selected.hardness_tolerance,
        placement_area: this.selected.placement_area,
        ph_tolerance: this.selected.ph_tolerance,
        temperature: this.selected.temperature,
        growth_height: this.selected.growth_height,
        growth_width: this.selected.growth_width,
        demands: this.selected.demands,
        description: this.selected.description,
      };
      [this.min_ph, this.max_ph] = this.form.ph_tolerance.split(" - ");
      [this.min_tmp, this.max_tmp] = this.form.temperature.split(" - ");
      [this.min_hg, this.max_hg] = this.form.growth_height.split(" - ");
      [this.min_wd, this.max_wd] = this.form.growth_width.split(" - ");
    }
  },
  data() {
    return {
      images: [],
      min_ph: null,
      max_ph: null,
      min_tmp: null,
      max_tmp: null,
      min_hg: null,
      max_hg: null,
      min_wd: null,
      max_wd: null,
      form: {
        name: "",
        type: null,
        origin: "",
        family: "",
        growt_rate: null,
        light_demand: "",
        co2_demand: null,
        hardness_tolerance: null,
        placement_area: null,
        ph_tolerance: null,
        temperature: null,
        growth_height: null,
        growth_width: null,
        demands: null,
        description: "",
        oldImage: null,
      },
      // error: "",
      success: "",
      waiting: "",
      types: [
        { value: null, text: "-- Please select an option --" },
        { value: "Moss", text: "Moss" },
        { value: "Stem", text: "Stem" },
        { value: "Rhizome", text: "Rhizome" },
        { value: "Fern", text: "Fern" },
        { value: "Carperting Plant", text: "Carperting Plant" },
        { value: "Floating Plant", text: "Floating Plant" },
        { value: "Rosulate", text: "Rosulate" },
        { value: "Stolon", text: "Stolon" },
        { value: "Bulb / Onion", text: "Bulb / Onion" },
      ],
      growt_rate: [
        // { value: null, text: "-- Please select an option --" },
        { value: "Slow", text: "Slow" },
        { value: "Medium", text: "Medium" },
        { value: "Fast", text: "Fast" },
      ],
      placement_area: [
        { value: null, text: "-- Please select an option --" },
        { value: "Foreground", text: "Foreground" },
        { value: "Midground", text: "Midground" },
        { value: "Background", text: "Background" },
        { value: "Floating", text: "Floating" },
        { value: "On Root or On Rock", text: "On Root or On Rock" },
        { value: "Foreground - Midground", text: "Foreground - Midground" },
        { value: "Midground - Background", text: "Midground - Background" },
        { value: "Foreground - Background", text: "Foreground - Background" },
      ],
      light_co2_demand: [
        // { value: null, text: "-- Please select an option --" },
        { value: "Low", text: "Low" },
        { value: "Medium", text: "Medium" },
        { value: "High", text: "High" },
        { value: "Low - Medium", text: "Low - Medium" },
        { value: "Medium - High", text: "Medium - High" },
        { value: "Low - High", text: "Low - High" },
      ],
      hardness_tolerance: [
        // { value: null, text: "-- Please select an option --" },
        { value: "Soft", text: "Soft (0 - 70 ppm)" },
        { value: "Medium", text: "Medium (140 - 210 ppm)" },
        { value: "Hard", text: "Hard (320 - 530 ppm)" },
        { value: "Soft - Medium", text: "Soft - Medium (70 - 140 ppm)" },
        { value: "Medium - Hard", text: "Medium - Hard (210 - 320 ppm)" },
        { value: "Soft - Hard", text: "Soft - Hard (0 - 530 ppm)" },
      ],
      demands: [
        // { value: null, text: "-- Please select an option --" },
        { value: "Easy", text: "Easy" },
        { value: "Medium", text: "Medium" },
        { value: "Difficult", text: "Difficult" },
      ],
      dropzoneOptions: {
        url: "http://127.0.0.1:8000/api/plant",
        method: "post",
        // thumbnailWidth: ,
        maxFilesize: 1,
        maxFiles: 6,
        parallelUploads: 6,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          // "Content-Type": "multipart/form-data",
          // 'accept': 'application/json'
        },
        addRemoveLinks: true,
        dictDefaultMessage:
          "<i class='fa fa-cloud-upload'></i> <div class='dropzone-custom-title'>Upload Image (Max.1 mb)",
        autoProcessQueue: false,
        uploadMultiple: true,
        acceptedFiles: ".jpg, .jpeg, .png",
        thumbnailWidth: 160,
        thumbnailHeight: 160,
      },
    };
  },
  props: {
    selected: {
      type: Object,
      default: null,
    },
  },
  async mounted() {
    if (this.selected && this.selected.images) {
      this.dropzoneMounted();
    }
  },
  methods: {
    addFile(key) {
      let mockFile = {
        size: this.images[key].size,
        name: this.images[key].imageName,
        type: this.images[key].extension,
      };
      let img =
        "http://127.0.0.1:8000/storage/plants/" + this.images[key].imageName;
      this.$refs.myVueDropzone.manuallyAddFile(mockFile, img);
    },
    async dropzoneMounted() {
      // this.$nextTick(function () {
      // if (this.selected.images) {
      axios
        .get(
          "dropbox/" +
            this.selected.id +
            "/" +
            this.selected.images +
            "/" +
            true
        )
        .then((response) => {
          this.images = response.data.data;
          let keys = Object.keys(response.data.data);
          keys.forEach((key) => {
            this.addFile(key);
          });
        })
        .catch((error) => {
          console.log("Gagal : ", error);
        });
      // }
      // });
    },
    setValueRange(min, max) {
      return min + " - " + max;
    },
    handleSubmit() {
      if (this.selected) {
        this.$refs.myVueDropzone.setOption(
          "url",
          "http://127.0.0.1:8000/api/plant/" + this.$route.params.id
        );
      }

      this.waiting = "Please wait a moment...";
      this.form.ph_tolerance = this.setValueRange(this.min_ph, this.max_ph);
      this.form.temperature = this.setValueRange(this.min_tmp, this.max_tmp);
      this.form.growth_height = this.setValueRange(this.min_hg, this.max_hg);
      this.form.growth_width = this.setValueRange(this.min_wd, this.max_wd);

      if (this.selected) {
        let checkImage = true;
        if (this.selected.images) {
          let oldImage = this.selected.images.split("||");
          this.$refs.myVueDropzone.getRejectedFiles().forEach((value) => {
            if (!oldImage.includes(value.name)) {
              this.$noty.error("Image failed to upload");
              this.$refs.myVueDropzone.removeFile(value);
              this.waiting = "";
              checkImage = false;
            }
          });
        }

        if (checkImage) {
          if (this.$refs.myVueDropzone.getAcceptedFiles().length != 0) {
            // console.log(this.$refs.myVueDropzone.getQueuedFiles());
            // console.log(this.$refs.myVueDropzone.getRejectedFiles());
            // console.log(this.$refs.myVueDropzone.getAcceptedFiles());
            // console.log(this.$refs.myVueDropzone.getUploadingFiles());
            this.$refs.myVueDropzone.processQueue();
          } else {
            this.sendEdit();
          }
        }
      } else {
        if (this.$refs.myVueDropzone.getRejectedFiles().length != 0) {
          this.$noty.error("Image failed to upload");
          this.$refs.myVueDropzone.removeAllFiles();
          this.waiting = "";
        } else if (this.$refs.myVueDropzone.getAcceptedFiles().length == 0) {
          this.sendData();
        } else {
          this.$refs.myVueDropzone.processQueue();
        }
      }
    },
    async sendEdit() {
      try {
        if (this.$refs.myVueDropzone.getRejectedFiles()) {
          let oldImage = [];
          this.$refs.myVueDropzone.getRejectedFiles().forEach((value) => {
            oldImage.push(value.name);
          });
          oldImage = oldImage.join("||");
          this.form.oldImage = oldImage;
        }
  
        const response = await axios.put(
          "plant/" + this.$route.params.id,
          this.form
        );
        this.waiting = "";
        this.success = true;
        this.$noty.success(response.data.message);
        setTimeout(
          () => this.$router.push("/plants/" + this.$route.params.id),
          3000
        );
      } catch (e) {
        this.waiting = "";
        this.$noty.error(Object.values(e.response.data.errors)[0][0]);
      }
    },
    async sendData() {
      try {
        const response = await axios.post("plant", this.form);
        this.waiting = "";
        this.success = true;
        this.$noty.success(response.data.message);
        setTimeout(() => this.$router.push("/plants"), 2500);
      } catch (e) {
        this.waiting = "";
        this.$noty.error(Object.values(e.response.data.errors)[0][0]);
      }
    },
    sendDataAndImage(file, xhr, formData) {
      formData.append("name", this.form.name);
      formData.append("type", this.form.type);
      formData.append("origin", this.form.origin);
      formData.append("family", this.form.family);
      formData.append("placement_area", this.form.placement_area);
      formData.append("growt_rate", this.form.growt_rate);
      formData.append("light_demand", this.form.light_demand);
      formData.append("co2_demand", this.form.co2_demand);
      formData.append("hardness_tolerance", this.form.hardness_tolerance);
      formData.append("demands", this.form.demands);
      formData.append("ph_tolerance", this.form.ph_tolerance);
      formData.append("temperature", this.form.temperature);
      formData.append("growth_height", this.form.growth_height);
      formData.append("growth_width", this.form.growth_width);
      formData.append("description", this.form.description);
      if (this.selected) {
        formData.append("_method", "PUT");
        let oldImage = [];
        if (this.$refs.myVueDropzone.getRejectedFiles()) {
          this.$refs.myVueDropzone.getRejectedFiles().forEach((value) => {
            oldImage.push(value.name);
          });
          oldImage = oldImage.join("||");
          formData.append("oldImage", oldImage);
        }
      }
    },
    afterUploadFiles(files, response) {
      this.$noty.success(JSON.stringify(response.message));
      this.waiting = "";
      this.success = true;
      if (this.$route.name == "EditPlant") {
        setTimeout(
          () => this.$router.push("/plants/" + this.$route.params.id),
          2500
        );
      } else {
        setTimeout(() => this.$router.push("/plants"), 2500);
      }
    },
    failedUploadFiles(message) {
      this.$noty.error(Object.values(message.errors)[0][0]);
      this.waiting = "";
      this.$refs.myVueDropzone.removeAllFiles();
    },
  },
};
</script>

<style scoped>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
.dropzone-custom-title {
  color: #00b782;
}
/* strong {
  color: #00b782;
} */
/* .vue-dropzone > .dz-preview .dz-remove {
  position: relative;
  margin-left: 0;
}
.dz-remove {
  position: relative;
  margin-left: 0;
} */
</style>
