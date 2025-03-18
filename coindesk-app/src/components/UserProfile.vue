<template>
    <div class="profile-card">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Address:</strong> {{ user.address }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
    </div>
  </template>
  
  <script>
  import faker from 'faker';
  
  export default {
    data() {
      return {
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          phone: faker.phone.phoneNumber(),
        },
      };
    },
  };
  </script>
  
  <style scoped>
  .profile-card {
    border: 1px solid #ddd;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
  }
  </style>
  