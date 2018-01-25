<template>
  <section class="homepage" v-if="allEvents.length">
    <Event class="event" v-for="event in allEvents" :event="event" :key="event.id" />
  </section>
</template>

<script>
import EVENTS_QUERY from '~/graphql/Event/AllEvents.gql';
import Event from '~/components/common/Event';

export default {
  data() {
    return {
      allEvents: [],
    };
  },
  apollo: {
    allEvents: {
      query: EVENTS_QUERY,
      variables: {
        filter: {
          timeEnd_gte: new Date(),
        },
      },
    },
  },
  components: {
    Event,
  },
};
</script>

<style lang="scss">
.homepage {
  margin: 80px auto 0;
  max-width: 90%;

  .event {
    max-width: 800px;
    margin: 15px auto;
  }
}
</style>
