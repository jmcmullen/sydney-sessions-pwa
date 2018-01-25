<template>
  <section>
    <UpcomingEvents />
  </section>
</template>

<script>
import UpcomingEvents from '~/components/pages/home/UpcomingEvents';

export default {
  components: {
    UpcomingEvents,
  },
  head() {
    return {
      title: 'Upcoming dance music events in Sydney, Australia',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Stay up to date with the latest underground dance music events all across Sydney, Australia.',
        },
      ],
    };
  },
};
</script>

<style>

</style>
