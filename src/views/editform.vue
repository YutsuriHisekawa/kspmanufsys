<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import sidebar from "@/layouts/sidebar.vue";

const router = useRouter();
const editedUser = ref({});

// Panggil fetchUser saat komponen dimuat
const fetchUser = async () => {
  try {
    const currentRoute = router.currentRoute.value;
    if (currentRoute && currentRoute.params) {
      const userId = currentRoute.params.userId;
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      if (response.ok) {
        editedUser.value = await response.json();
      } else {
        console.error("Failed to fetch user data.");
      }
    } else {
      console.error("Current route or params not available.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// Fungsi untuk menyimpan perubahan data pengguna
const saveChanges = async () => {
  try {
    const userId = router.currentRoute.value.params.userId;
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser.value),
    });
    if (response.ok) {
      console.log("User data updated successfully.");
      // Tampilkan pesan sukses menggunakan SweetAlert
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "User data updated successfully!",
      });
      // Redirect back to user list page after successful update
      router.push("/home");
    } else {
      console.error("Failed to update user data.");
      // Tampilkan pesan kesalahan menggunakan SweetAlert
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user data.",
      });
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    // Tampilkan pesan kesalahan menggunakan SweetAlert
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while updating user data.",
    });
  }
};

onMounted(fetchUser);
</script>
<template>
  <sidebar></sidebar>
  <div class="p-4 sm:ml-64 bg-white pt-10">
    <div class="p-4 bg-white rounded-lg mt-14 h-full space-y-10">
      <div>
        <h2>Edit User</h2>
        <form @submit.prevent="saveChanges">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="editedUser.firstName" />
          <br />

          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="editedUser.lastName" />
          <br />

          <label for="maidenName">Maiden Name:</label>
          <input type="text" id="maidenName" v-model="editedUser.maidenName" />
          <br />

          <label for="age">Age:</label>
          <input type="number" id="age" v-model="editedUser.age" />
          <br />

          <label for="gender">Gender:</label>
          <select id="gender" v-model="editedUser.gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editedUser.email" />
          <br />

          <label for="phone">Phone:</label>
          <input type="text" id="phone" v-model="editedUser.phone" />
          <br />

          <label for="username">Username:</label>
          <input type="text" id="username" v-model="editedUser.username" />
          <br />

          <label for="password">Password:</label>
          <input type="password" id="password" v-model="editedUser.password" />
          <br />

          <label for="birthDate">Date of Birth:</label>
          <input type="date" id="birthDate" v-model="editedUser.birthDate" />
          <br />

          <label for="image">Image URL:</label>
          <input type="text" id="image" v-model="editedUser.image" />
          <br />

          <label for="bloodGroup">Blood Group:</label>
          <input type="text" id="bloodGroup" v-model="editedUser.bloodGroup" />
          <br />

          <label for="height">Height:</label>
          <input type="number" id="height" v-model="editedUser.height" />
          <br />

          <label for="weight">Weight:</label>
          <input type="number" id="weight" v-model="editedUser.weight" />
          <br />

          <label for="eyeColor">Eye Color:</label>
          <input type="text" id="eyeColor" v-model="editedUser.eyeColor" />
          <br />

          <!-- Tambahkan field lainnya sesuai kebutuhan -->

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>
