<template>
  <section>
    <EmailAuth />
  </section>
</template>

<script>
import EmailAuth from '~/components/pages/admin/EmailAuth';

export default {
  components: {
    EmailAuth,
  },
  head() {
    return {
      title: 'Sydney Sessions: Authentication Required',
    };
  },
};
</script>
