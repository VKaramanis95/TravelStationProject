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
import faker from "faker";

export default {
  data() {
    return {
      user: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        avatar: "faker.image.avatar()"
      }
    };
  },
  created() {
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => {
        this.user.avatar = data.results[0].picture.large;
      })
      .catch(() => {
        console.warn("Failed to load random avatar. Using fallback.");
      });
  }
};
</script>
