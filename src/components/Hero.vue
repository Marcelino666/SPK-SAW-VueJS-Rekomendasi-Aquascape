<template>
  <div class="hero">
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row">
        <div class="col-md-5">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                Best plant <strong>recommendation</strong><br />
                for your beloved <strong>aquascape</strong>
              </h2>
              <hr />
              <h5 class="mb-3">Click on the below button :</h5>
              <b-link to="/weighting" class="btn btn-success"
                ><b-icon-arrow-right></b-icon-arrow-right> GO !
              </b-link>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <img src="../assets/images/hero.png" width="100%" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-7 mb-3">
          <img src="../assets/images/hero.png" width="100%" />
        </div>
        <div class="col-md-5">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                Best plant <strong>recommendation</strong><br />
                for your beloved <strong>aquascape</strong>
              </h2>
              <hr />
              <h5 class="mb-3">Click on the below button :</h5>
              <b-link to="/weighting" class="btn btn-success"
                ><b-icon-arrow-right></b-icon-arrow-right> GO !
              </b-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style scoped>
.router-link-exact-active {
  font-weight: 50;
}
</style>
