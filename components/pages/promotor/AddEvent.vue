<template>
  <section>
    <el-card class="box-card import-event">
      <section v-if="step === 1">
        <p>Search for a Facebook event to import</p>
        <el-autocomplete
          class="inline-input"
          placeholder="Enter an event name..."
          v-model="query"
          :fetch-suggestions="searchEvent"
          :trigger-on-focus="false"
          @select="selectEvent"
        />
        <div class="details" v-if="selectedEvent.value">
          <p><strong>Name:</strong> {{selectedEvent.name}}</p>
          <p><strong>Place:</strong> {{selectedEvent.place.name}}</p>
          <p><strong>Starts:</strong> {{startDate}}</p>
          <p><strong>Ends:</strong> {{endDate}}</p>

          <el-button round @click="step = 2">Yes, this is correct</el-button>
        </div>
      </section>

      <section v-if="step === 2">
        <img :src="picture.source" class="event-pic" alt="" />
        <h3>{{selectedEvent.name}}</h3>
        <p>Check the boxes that apply:</p>

        <el-form ref="form" :model="details" label-width="120px" label-position="top">
          <el-form-item label="Music Genres">
            <el-checkbox-group v-model="details.genres">
              <el-checkbox v-for="genre in genres" :key="genre" :label="genre" name="genre" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Event Details">
            <el-checkbox-group v-model="details.flags">
              <el-checkbox v-for="flag in flags" :key="flag" :label="flag" name="flag" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">Submit for approval</el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-card>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      step: 1,
      query: '',
      events: [],
      selectedEvent: {
        name: '',
        place: {
          name: '',
        },
      },
      picture: {
        url: '',
      },
      details: {
        genres: [],
        flags: [],
      },
      genres: [
        'HOUSE',
        'PROG HOUSE',
        'DEEP HOUSE',
        'TECH HOUSE',
        'ACID HOUSE',
        'TECHNO',
        'DISCO',
        'COMMERCIAL HOUSE',
        'DNB/BREAKS',
        'MISC',
      ],
      flags: [
        'INTERNATIONAL ARTIST',
        'BYO ALCOHOL',
        'FREE ENTRY',
        'CASH ONLY',
        'DAY',
        'FESTIVAL',
        'BUSH DOOF',
        'CRUISE',
        'WAREHOUSE',
      ],
      error: false,
    };
  },
  computed: {
    ...mapState(['user']),

    startDate() {
      return moment(this.selectedEvent.start_time).format(
        'MMMM Do YYYY, h:mm:ss a'
      );
    },
    endDate() {
      return moment(this.selectedEvent.end_time).format(
        'MMMM Do YYYY, h:mm:ss a'
      );
    },
  },
  methods: {
    searchEvent(query, done) {
      const params = {
        access_token: this.user.accessToken,
      };
      window.FB.api(`search?q=${this.query}&type=event`, params, response => {
        if (response.data) {
          this.error = false;
          const events = response.data.map(event => {
            event.value = event.name;
            event.label = event.name;
            if (event.place) {
              event.sublabel = event.place.name;
            }
            return event;
          });
          done(events);
        } else if (response.error) {
          this.error = response.error;
          if (this.error.code === 104) {
            localStorage.clear();
            this.$router.push({ path: '/promotor/login' });
            this.$message({
              type: 'error',
              message: 'Your session has expired. Please login again.',
            });
          }
        }
      });
    },
    selectEvent(event) {
      console.log(event);
      this.selectedEvent = event;
      this.getPicture();
    },
    getPicture() {
      window.FB.api('/276588012864846?fields=cover', 'GET', {}, response => {
        this.picture = response.cover;
        console.log(this.picture, response);
      });
    },
    submit() {
      const event = {
        facebookId: this.selectedEvent.id,
        name: this.selectedEvent.name,
        description: this.selectedEvent.description,
        timeStart: this.selectedEvent.start_time,
        timeEnd: this.selectedEvent.time_end,
        genres: this.details.genres,
        flags: this.details.flags,
        place: this.selectedEvent.place.name,
      };
      console.log(event);
    },
  },
};
</script>

<style lang="scss">
.import-event {
  &.el-card {
    max-width: 500px;
    min-height: 60vh;
    margin: 80px auto;
  }

  .el-autocomplete {
    width: 400px;
  }

  .details {
    margin-top: 50px;
  }

  .el-button {
    display: block;
    margin: 60px auto 0;
  }

  .el-checkbox {
    width: 49%;
    &:nth-of-type(odd) {
      margin-right: 5px;
    }
  }

  .event-pic {
    width: 100%;
  }
}

.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
</style>
