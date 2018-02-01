<template>
  <section>
    <div class="clearfix">
      <a :href="fbLink" target="_blank" rel="noopener" @click="trackLink(fbLink)" class="event-link">{{event.name}}</a>
    </div>
    <div class="event-details">
      <p><span class="date">{{date}}</span></p>
      <div class="tags">
        <div class="flag" v-for="flag in event.flags" :key="flag" type="primary" size="small">{{formatDetail(flag)}}</div>
        <div class="genre" v-for="genre in event.genres" :key="genre" type="info" size="small">{{formatDetail(genre)}}</div>
      </div>
    </div>
  </section>
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
    trackLink(url) {
      if (process.browser) {
        ga('send', 'event', 'outbound', 'click', url, {
          transport: 'beacon',
          hitCallback: function() {
            document.location = url;
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.event {
  .tags {
    display: inline;
    font-size: 0.8rem;
  }
  .flag {
    color: #ff5abd;
    margin-right: 5px;
    margin-bottom: 5px;
    display: inline-block;
  }
  .genre {
    color: #66ff5a;
    margin-right: 5px;
    margin-bottom: 5px;
    display: inline-block;
  }
  .event-link {
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: bold;
    color: #409eff;
  }
  .event-details {
    p {
      font-size: 14px;
      text-transform: uppercase;
      color: #888;
      margin: 0;
    }
  }
}
</style>
