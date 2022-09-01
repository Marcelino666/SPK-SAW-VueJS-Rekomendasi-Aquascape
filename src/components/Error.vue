<template>
  <div class="alert alert-danger text-center" role="alert">
    {{ error }}
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["error"],
};
</script>
