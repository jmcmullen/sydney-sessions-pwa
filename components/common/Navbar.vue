<template>
  <div class="main-header">
    <div class="header-container">
      <div class="nav-left">
        <nav class="branding">
          <nuxt-link :to="{ path: '/' }">
            <h1>sessions.sydney</h1>
          </nuxt-link>
        </nav>
        <nav class="main-menu">
          <nuxt-link v-for="(link, i) in mainMenu" :key="i" :to="{ path: link.path }">
            {{ link.name }}
          </nuxt-link>
        </nav>
      </div>
      <nav class="user-menu">
        <nuxt-link v-for="(link, i) in userMenu" :key="i" :to="{ path: link.path }">
          {{ link.name }}
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
import logo from '~/assets/images/logo.svg';

export default {
  data() {
    return {
      logo,
      mainMenu: [
        { name: 'Events', path: '/' },
        // { name: 'Mixes', path: '/mixes' },
      ],
      userMenu: [
        { name: '+ Add Event', path: '/promotor/import' },
        // { name: '+ Add Mix', path: '/dj/import' },
      ],
    };
  },
};
</script>

<style lang="scss">
.main-header {
  background-color: #111;
  height: 40px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 5;

  .header-container {
    max-width: 980px;
    margin: auto;
    display: flex;
    justify-content: space-between;

    @include av-mq(pocket) {
      max-width: 90%;
      .main-menu {
        display: none;
      }
    }
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    margin: 10px 0;
  }

  a {
    text-decoration: none;
  }

  .nav-left {
    display: flex;
    justify-content: space-between;
  }

  .main-menu,
  .user-menu {
    height: 70px;
    margin-top: 10px;

    a {
      text-decoration: none;
      text-transform: uppercase;
      color: #999;
      font-size: 13px;
      font-weight: bold;
      padding: 0 10px;
    }
  }
}
</style>
