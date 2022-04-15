<template>
  <div class="flex-1 scrollbar">
    <div class="wrap">
      <h1 class="maintitle">Vue-Store</h1>
      <h2 class="subtitle">
        更简单的 vue 状态管理插件。
        <br />如果你也觉得 Vuex 有点复杂，那么你需要 vue-store
      </h2>

      <div>
        <a
          href="https://github.com/cutting-mat/vue-store/blob/main/README_CN.md"
          target="_blank"
          class="myBtn"
        >
          <i class="el-icon-magic-stick"></i>
          快速开始
        </a>
      </div>

      <h3 class="channeltitle">演示</h3>

      <el-button
        title="$store.state.testValue++"
        @click="$store.state.testValue++"
      >
        更新
      </el-button>
      <el-button
        :disabled="loading"
        :loading="loading"
        @click="handleAsync"
        title="$store.action"
      >
        异步更新
      </el-button>
      <el-button @click="getNonExistent" title="控制台将报错">
        读取未注册的值
      </el-button>
      <el-button @click="setNonExistent" title="控制台将报错">
        设置未注册的值
      </el-button>

      <div class="log">
        <div class="_btn">
          <el-link
            target="_blank"
            title="清空日志"
            :underline="false"
            @click="log = []"
          >
            <svg
              class="icon"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-042ca774
            >
              <path
                fill="currentColor"
                d="M771.776 794.88A384 384 0 01128 512h64a320 320 0 00555.712 216.448H654.72a32 32 0 110-64h149.056a32 32 0 0132 32v148.928a32 32 0 11-64 0v-50.56zM276.288 295.616h92.992a32 32 0 010 64H220.16a32 32 0 01-32-32V178.56a32 32 0 0164 0v50.56A384 384 0 01896.128 512h-64a320 320 0 00-555.776-216.384z"
              />
            </svg>
          </el-link>

          <el-link
            href="https://github.com/cutting-mat/vue-store/blob/main/test/App.vue"
            target="_blank"
            title="查看代码"
            :underline="false"
          >
            <svg
              width="1.2em"
              height="1.2em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              data-v-d8946a48
            >
              <path
                d="M23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
                fill="currentColor"
              />
            </svg>
          </el-link>
        </div>

        <div>$store.state.testValue = {{ $store.state.testValue }}</div>

        <div v-for="(item, index) in log" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../../lib/store.js";
const $store = Store({
  state: {
    inject: 0,
  },
});

export default {
  data() {
    return {
      loading: false,
      log: [],
    };
  },
  methods: {
    setNonExistent() {
      this.$store.set("non-existent", Math.random()).catch((err) => {
        this.log.push(err);
      });
    },
    getNonExistent() {
      this.log.push(this.$store.get("non-existent"));
    },
    handleAsync() {
      this.loading = true;
      this.$store.action("testAction").then(() => {
        this.loading = false;
      });
    },
  },
  created() {
    // setInterval(() => {
    //   $store.state.inject++;
    // }, 1000);
  },
};
</script>

<style scoped>
.wrap {
  width: 1200px;
  text-align: center;
}
.maintitle {
  color: #000;
  font-size: 2.5em;
}
.subtitle {
  color: rgb(71, 101, 130);
  font-size: 1.6em;
  font-weight: normal;
  margin-bottom: 20px;
}
.channeltitle {
  font-size: 1.5em;
  color: #000;
  margin: 40px 0 20px;
  font-weight: normal;
}
.myBtn {
  display: inline-block;
  border-radius: 6px;
  padding: 0 24px;
  line-height: 52px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #f8f8f8;
  background-color: #4abf8a;
  border: 2px solid #3eaf7c;
  transition: background-color 0.1s ease;
  margin: 0 10px;
}
.log {
  position: relative;
  text-align: left;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 20px 0;
  min-height: 10em;
  background: #dedede;
  border-radius: 8px;
  padding: 20px;
}
.log ._btn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
}
._btn .el-link {
  margin-left: 10px;
}
</style>
