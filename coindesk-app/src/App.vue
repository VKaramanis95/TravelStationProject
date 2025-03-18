<template>
  <div id="app">
    <h1>Bitcoin Tracker</h1>

    <div class="profile-container">
      <UserProfile />
    </div>
  </div>
</template>

<script>
import UserProfile from './components/UserProfile.vue';

export default {
  components: {
    UserProfile,
  },
};
</script>

<style>
#app {
  text-align: center;
}

.profile-container {
  margin: 20px;
}
</style>
