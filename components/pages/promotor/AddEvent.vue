<template>
  <section class="import-event">
      <section v-if="step === 1">
        <h2>Find your event</h2>
        <p>We download your event information directly from Facebook. Search for it below to get started.</p>
        <el-autocomplete
          class="inline-input"
          placeholder="Enter your event name..."
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
            <el-button type="primary" @click="submit" :loading="sending">Submit for approval</el-button>
          </el-form-item>
        </el-form>
      </section>

      <section class="thanks" v-if="step === 3">
        <i class="el-icon-circle-check"></i>
        <h2>Thank you! Your event will be reviewed shortly.</h2>
        <el-button @click="addAnother" round>Import another event</el-button>
        <nuxt-link :to="{ path: '/'}">
          Back to the homepage
        </nuxt-link>
      </section>
  </section>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import EVENT_CREATE from '~/graphql/Event/EventCreate.gql';

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
        source: '',
      },
      details: {
        genres: [],
        flags: [],
      },
      genres: [
        'HOUSE',
        'PROG_HOUSE',
        'DEEP_HOUSE',
        'TECH_HOUSE',
        'ACID_HOUSE',
        'TECHNO',
        'DISCO',
        'COMMERCIAL_HOUSE',
        'DNB/BREAKS',
        'MISC',
      ],
      flags: [
        'INTERNATIONAL_ARTIST',
        'BYO_ALCOHOL',
        'FREE_ENTRY',
        'CASH_ONLY',
        'CRUISE',
        'DAY',
        'FESTIVAL',
        'BUSH_DOOF',
        'WAREHOUSE',
      ],
      error: false,
      sending: false,
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
      this.selectedEvent = event;
      this.getPicture();
    },
    getPicture() {
      window.FB.api(
        `/${this.selectedEvent.id}?fields=cover`,
        'GET',
        {},
        response => {
          this.picture = response.cover;
        }
      );
    },
    async submit() {
      try {
        this.sending = true;
        await this.$apollo.mutate({
          mutation: EVENT_CREATE,
          variables: {
            facebookId: this.selectedEvent.id,
            name: this.selectedEvent.name,
            description: this.selectedEvent.description,
            timeStart: this.selectedEvent.start_time,
            timeEnd: this.selectedEvent.end_time,
            genres: this.details.genres,
            flags: this.details.flags,
            place: this.selectedEvent.place.name,
            promotor: this.user.id,
          },
        });
        this.$message({
          type: 'success',
          message: `Your event has been sent for approval!`,
        });
        this.sending = false;
        this.step = 3;
      } catch (error) {
        // We don't allow duplicate events.
        if (JSON.stringify(error).indexOf('Field name = facebookId') > 0) {
          this.$message({
            type: 'error',
            message: `This event is already pending approval.`,
          });
        } else {
          this.$message({
            type: 'error',
            message: `Failed to add event! ${error}`,
          });
        }
        this.addAnother();
      }
    },
    addAnother() {
      this.step = 1;
      this.query = '';
      this.events = [];
      this.selectedEvent = {
        name: '',
        place: {
          name: '',
        },
      };
      this.picture = {
        source: '',
      };
      this.details = {
        genres: [],
        flags: [],
      };
    },
  },
};
</script>

<style lang="scss">
.import-event {
  max-width: 700px;
  min-height: 500px;
  margin: 0 auto;

  .el-autocomplete {
    width: 400px;
    max-width: 100%;
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

  .thanks {
    text-align: center;

    i {
      color: lightgreen;
      font-size: 80px;
      margin-top: 50px;
    }

    .el-button {
      margin-bottom: 35px;
    }
  }
}

.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
</style>
