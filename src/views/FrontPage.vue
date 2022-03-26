<template>
  <div>
    <FrontPage />
    <FrontPageGrid />
  </div>
</template>

<script>
// @ is an alias to /src
import FrontPage from "@/components/FrontPage";
import FrontPageGrid from "@/components/FrontPageGrid.vue"

export default {
  name: "front-page",
  components: {
    FrontPage,
    FrontPageGrid
  },
};
</script>
