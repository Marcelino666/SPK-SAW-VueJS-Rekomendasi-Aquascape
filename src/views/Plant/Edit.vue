<template>
  <div>
    <PlantForm v-if="plant" :selected="plant" />
  </div>
</template>

<script>
import PlantForm from "../../components/form/Plant.vue";
import axios from "axios";
export default {
  name: "EditPlant",
  components: {
    PlantForm,
  },
  data() {
    return {
      plant: null,
    };
  },
  methods: {
    setPlant(data) {
      this.plant = data;
    },
  },
  mounted() {
    axios
      .get("plant/" + this.$route.params.id)
      .then((response) => {
        this.setPlant(response.data.data);
      })
      .catch((error) => {
        console.log("Gagal : ", error);
      });
  },
};
</script>
