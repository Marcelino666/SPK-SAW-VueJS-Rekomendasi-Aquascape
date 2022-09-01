<template>
  <div>
    <div class="border rounded shadow">
      <div class="mt-3 mb-2 ml-3 mr-3">
        <h3 class="mb-3"><strong>Decision Support System</strong></h3>
        <div v-if="ranking.length == 0">
          <h4 class="mb-3 text-center">"Data is empty"</h4>
        </div>
        <div v-if="ranking.length != 0">
          <div class="row">
            <div class="col text-center">
              <b-table
                responsive
                bordered
                outlined
                no-border-collapse
                hover
                align-v="center"
                :items="ranking"
                :fields="fields"
                head-variant="light"
                table-variant="light"
                @row-clicked="rowDetails"
              >
                <template #cell(Action)="row">
                  <!-- :id="row.item.id" -->
                  <b-button size="sm" @click="rowDetails(row.item)">
                    Detail
                  </b-button>
                </template>
              </b-table>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  async mounted() {
    await axios
      .get("ranking?page=" + this.currentPage)
      .then((response) => {
        this.setRanking(response.data.data);
      })
      .catch((error) => {
        console.log("Gagal : ", error);
      });
  },
  data() {
    return {
      ranking: [],
      currentPage: 1,
      totalRows: "",
      perPage: "",
      fields: [
        // {
        //   key: "nomorUrut",
        //   label: "NO",
        //   stickyColumn: true,
        // },
        "ID",
        "Date and Time",
        "Growt Rate",
        "Light Demand",
        "CO2 Demand",
        "Hardness Tolerance",
        "Demands",
        "Water Temperature",
        "Action",
      ],
      user_id: "",
    };
  },
  methods: {
    setRanking(data) {
      this.ranking = Object.values(data.data);
      this.totalRows = data.total;
      this.perPage = data.per_page;
    },
    async onFiltered(value) {
      this.currentPage = value;
      await axios
        .get("ranking?page=" + this.currentPage)
        .then((response) => {
          this.setRanking(response.data.data);
        })
        .catch((error) => {
          console.log("Gagal : ", error);
        });
    },
    rowDetails(value) {
      this.$router.push("spk/" + value.ID);
    },
  },
};
</script>
