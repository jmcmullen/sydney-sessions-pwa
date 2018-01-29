<template>
  <section class="manage">
    <el-card class="">
      <el-collapse v-model="activeEvents">
        <el-collapse-item v-for="event in allEvents" :key="event.id" :name="event.id">
          <template slot="title">
            <div class="title-template">
              <div class="title-main">
                <strong>{{event.name}}</strong><span class="place-title"> @ {{event.place}}</span>
              </div>
              <div class="title-details">
                <el-tag v-for="flag in event.flags" :key="flag" type="info" size="small">
                  <img :src="icons[flag]" :alt="flag">
                </el-tag>
              </div>
            </div>
          </template>
          <a :href="`https://www.facebook.com/events/${event.facebookId}/`" target="_blank">
            https://www.facebook.com/events/{{event.facebookId}}/
          </a>
          <p class="event-time">Starts: {{formatDate(event.timeStart)}}, Ends: {{formatDate(event.timeEnd)}}</p>
          <div class="event-details">
            <el-tag v-for="genre in event.genres" :key="genre" type="primary" size="small">{{formatDetail(genre)}}</el-tag>
          </div>
          <div class="actions">
            <el-button type="primary" @click="approve(event.id)">Approve</el-button>
            <el-button type="danger" @click="reject(event.id)">Reject</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </section>
</template>

<script>
import moment from 'moment';
import EVENTS_QUERY from '~/graphql/Event/AllEvents.gql';
import EVENT_APPROVE from '~/graphql/Event/EventApprove.gql';
import DAY from '~/assets/icons/DAY.svg';
import FESTIVAL from '~/assets/icons/FESTIVAL.svg';
import CRUISE from '~/assets/icons/CRUISE.svg';
import INTERNATIONAL_ARTIST from '~/assets/icons/INTERNATIONAL_ARTIST.svg';
import FREE_ENTRY from '~/assets/icons/FREE_ENTRY.svg';
import BYO_ALCOHOL from '~/assets/icons/BYO_ALCOHOL.svg';
import WAREHOUSE from '~/assets/icons/WAREHOUSE.svg';
import BUSH_DOOF from '~/assets/icons/BUSH_DOOF.svg';
import CASH_ONLY from '~/assets/icons/CASH_ONLY.svg';

export default {
  data() {
    return {
      allEvents: [],
      activeEvents: [],
      icons: {
        DAY,
        FESTIVAL,
        CRUISE,
        INTERNATIONAL_ARTIST,
        FREE_ENTRY,
        BYO_ALCOHOL,
        WAREHOUSE,
        BUSH_DOOF,
        CASH_ONLY,
      },
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    formatDetail(detail) {
      return detail.replace('_', ' ');
    },
    async approve(id) {
      try {
        await this.$apollo.mutate({
          mutation: EVENT_APPROVE,
          variables: {
            id,
            approved: true,
          },
        });
        this.$message({
          type: 'success',
          message: `Event has been approved!`,
        });
        this.allEvents = this.allEvents.filter(i => i.id !== id);
      } catch (error) {
        console.log(error);
        this.$message({
          type: 'error',
          message: error.message,
        });
      }
    },
    async reject(id) {},
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
  // mounted() {
  //   if (!localStorage.getItem('ADMIN_TOKEN')) {
  //     this.$router.push('/admin/login');
  //   }
  // },
};
</script>

<style lang="scss">
.manage {
  .el-card {
    max-width: 800px;
    min-height: 60vh;
    margin: 80px auto;
  }

  .place-title {
    color: #888;
  }

  .title-template {
    display: flex;

    .title-main {
      margin-right: 30px;
    }

    .el-tag {
      margin-top: 10px;
      margin-right: 5px;
      padding: 5px 8px 22px;

      img {
        height: 16px;
        width: 16px;
      }
    }
  }

  .event-time {
    margin-top: 0;
  }

  .event-details {
    .el-tag {
      margin-right: 5px;
    }
  }

  .actions {
    margin-top: 50px;
  }
}
</style>
