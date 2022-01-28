<template>
  <div class="demoWrap">
    <h2>{{ name }}</h2>
    <button @click="testStoreFun1">$store.set</button>
    <button :disabled="loading" @click="testStoreFun4">$store.action</button>
    <div>state.testValue = {{ testValue }}</div>

    <button @click="testStoreFun2">Set a value that does not exist and observe the console output</button>
    <button @click="testStoreFun3">Read the non-existent value and observe the console output</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Store 功能测试",
      loading: false,
    };
  },
  computed: {
     testValue(){
         return this.$store.state.testValue
     }
  },
  methods: {
    testStoreFun1() {
      this.$store.set("testValue", Math.random());
    },
    testStoreFun2() {
      this.$store.set("non-existent", Math.random());
    },
    testStoreFun3() {
      this.$store.get("non-existent");
    },
    testStoreFun4() {
      this.loading = true;
      this.$store.action("testAction").then(() => {
        this.loading = false;
      });
    },
  },
  
};
</script>

<style scoped>
.demoWrap{
    max-width:1200px;
    margin:auto
}
.demoWrap button{
    margin: .5em;
}

</style>