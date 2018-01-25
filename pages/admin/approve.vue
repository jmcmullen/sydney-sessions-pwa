<template>
  <section>
    <EventManagement />
  </section>
</template>

<script>
import EventManagement from '~/components/pages/admin/EventManagement';

export default {
  components: {
    EventManagement,
  },
  head() {
    return {
      title: 'Sydney Sessions: Admin Area',
    };
  },
};
</script>
