<template>
  <article>
    <div slot="header" class="clearfix">
      <a :href="fbLink" target="_blank" class="event-link">{{event.name}}</a>
    </div>
    <div class="event-details">
      <p>{{event.place}} <span class="date">{{date}}</span></p>
      <el-tag v-for="flag in event.flags" :key="flag" type="primary" size="small">{{formatDetail(flag)}}</el-tag>
      <el-tag v-for="genre in event.genres" :key="genre" type="info" size="small">{{formatDetail(genre)}}</el-tag>
    </div>
  </article>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fbLink() {
      return `https://www.facebook.com/events/${this.event.facebookId}/`;
    },
    date() {
      const start = moment(this.event.timeStart).format('MMMM Do LT');
      const end = moment(this.event.timeEnd).format('MMMM Do LT');
      return `${start} - ${end}`;
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format('MMMM Do, h:mm:ss a');
    },
    formatDetail(detail) {
      return detail.replace('_', ' ');
    },
  },
};
</script>

<style lang="scss">
.event {
  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .event-link {
    text-decoration: none;
    color: #409eff;
  }
  .event-details {
    p {
      font-size: 14px;
      color: #888;
      margin: 0 0 15px;
    }
  }
}
</style>
