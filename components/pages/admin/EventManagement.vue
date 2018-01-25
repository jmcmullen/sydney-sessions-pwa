<template>
  <section class="manage">
    <el-card class="">
      <div class="event" v-for="event in allEvents" :key="event.id">
        {{event.name}}
      </div>
    </el-card>
  </section>
</template>

<script>
import EVENTS_QUERY from '~/graphql/Event/AllEvents.gql';

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
          approved: false,
        },
      },
    },
  },
};
</script>
