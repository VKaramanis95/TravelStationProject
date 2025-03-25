<template>
  <div class="profile-card">
    <h2>User Profile</h2>
    <img :src="user.avatar" alt="User Avatar" class="avatar" />
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Address:</strong> {{ user.address }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
  </div>
</template>

<script>
import { faker } from "@faker-js/faker";

export default {
  data() {
    return {
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        avatar: faker.image.avatar()
      }
    };
  },
  async created() {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      this.user.avatar = data.results[0].picture.large;
    } catch (error) {
      console.warn("Failed to load random avatar. Using fallback.");
    }
  }
};
</script>