new Vue({
  el: "#app",
  data() {
    return {
      isStart: false,
      time: 60,
      yyyy: "",
      MM: "",
      dd: "",
      hh: "",
      mm: "",
      ss: "",
    };
  },
  computed: {
    currentTime() {
      return `${this.yyyy}-${this.MM}-${this.dd} ${this.hh}:${this.mm}:${this.ss}`;
    },
  },
  methods: {
    changeTime(val) {
      if (this.time === "") {
        this.time = 1;
      }
    },
    start() {
      this.isStart = true;
      window.electronAPI.start(this.time);
    },
    stop() {
      this.isStart = false;
      window.electronAPI.stop();
    },
    showTime() {
      const today = new Date();
      this.yyyy = today.getFullYear();
      this.MM = (today.getMonth() + 1 + "").padStart(2, "0");
      this.dd = (today.getDate() + "").padStart(2, "0");
      this.hh = (today.getHours() + "").padStart(2, "0");
      this.mm = (today.getMinutes() + "").padStart(2, "0");
      this.ss = (today.getSeconds() + "").padStart(2, "0");
      setTimeout(this.showTime, 1000);
    },
  },
  mounted() {
    this.showTime();
  },
});
