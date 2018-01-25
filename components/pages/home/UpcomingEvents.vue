<template>
  <section class="homepage" v-if="allEvents.length">
    <el-row>
      <el-col :span="8">
        <Filters />
      </el-col>
      <el-col :span="16">
        <div v-for="day in currentDays" :key="day">
          <h2>{{day}}</h2>
          <div v-for="event in allEvents" :key="event.id">
            <div v-if="day === formatDate(event.timeStart)">
              <Event class="event" :event="event" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import moment from 'moment';
import EVENTS_QUERY from '~/graphql/Event/AllEvents.gql';
import Filters from '~/components/common/Filters';
import Event from '~/components/common/Event';

export default {
  data() {
    return {
      allEvents: [],
      currentDays: [],
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('dddd, Do MMM YYYY');
    },
  },
  apollo: {
    allEvents: {
      query: EVENTS_QUERY,
      variables: {
        filter: {
          timeEnd_gte: new Date(),
          approved: true,
        },
      },
      result() {
        this.allEvents.map(event => {
          console.log(event);
          const result = moment(event.timeStart).format('dddd, Do MMM YYYY');
          if (!this.currentDays.includes(result)) {
            this.currentDays.push(result);
          }
        });
      },
    },
  },
  components: {
    Event,
    Filters,
  },
};
</script>

<style lang="scss">
.homepage {
  margin: 80px auto 0;
  max-width: 980px;

  .event {
    max-width: 800px;
    margin: 15px auto;
  }
}
</style>
