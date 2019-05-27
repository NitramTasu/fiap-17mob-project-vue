<template>
  <div class="home">
    <Search/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Search from "@/components/Search.vue";

export default {
  name: "home",
  components: {
    Search,
  }
};
</script>
