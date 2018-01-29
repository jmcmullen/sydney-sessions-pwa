<template>
  <section class="homepage" v-if="allEvents.length">
    <el-row>
      <el-col :md="8" :lg="8">
        <Filters />
      </el-col>
      <el-col :md="16" :lg="16">
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
      variables() {
        const date = new Date();
        const week = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        return {
          filter: {
            timeEnd_gte: date,
            timeStart_lte: week,
            approved: true,
          },
        };
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

  @media (min-height: 480px) {
    max-width: 90%;
  }

  .event {
    margin: 15px auto;
  }
}
</style>
