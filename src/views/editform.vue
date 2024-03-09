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
  <div class="p-7 lg:ml-64 pt-12 bg-blue-50">
    <h1 class="text-3xl font-bold mt-14 ml-3">Edit User</h1>
    <div class="p-3 bg-white rounded-md mt-6 h-full space-y-10">
      <form @submit.prevent="saveChanges" class="space-y-4 p-6 bg-white">
        <div class="grid grid-cols-2 gap-6">
          <div class="flex flex-row justify-between">
            <label for="firstName" class="font-semibold w-32">First Name:</label>
            <input type="text" id="firstName" v-model="editedUser.firstName" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="lastName" class="font-semibold w-32">Last Name:</label>
            <input type="text" id="lastName" v-model="editedUser.lastName" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="maidenName" class="font-semibold w-32">Maiden Name:</label>
            <input type="text" id="maidenName" v-model="editedUser.maidenName" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="age" class="font-semibold w-32">Age:</label>
            <input type="number" id="age" v-model="editedUser.age" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="gender" class="font-semibold w-32">Gender:</label>
            <select id="gender" v-model="editedUser.gender"class="ring-2 ring-gray-300 rounded-sm p-1 w-72">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="email" class="font-semibold w-32">Email:</label>
            <input type="email" id="email" v-model="editedUser.email" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="phone" class="font-semibold w-32">Phone:</label>
            <input type="text" id="phone" v-model="editedUser.phone" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="username" class="font-semibold w-32">Username:</label>
            <input type="text" id="username" v-model="editedUser.username" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="password" class="font-semibold w-32">Password:</label>
            <input type="password" id="password" v-model="editedUser.password" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="birthDate" class="font-semibold w-32">Date of Birth:</label>
            <input type="date" id="birthDate" v-model="editedUser.birthDate" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="image" class="font-semibold w-32">Image URL:</label>
            <input type="text" id="image" v-model="editedUser.image" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="bloodGroup" class="font-semibold w-32">Blood Group:</label>
            <input type="text" id="bloodGroup" v-model="editedUser.bloodGroup" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="height" class="font-semibold w-32">Height:</label>
            <input type="number" id="height" v-model="editedUser.height" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="weight" class="font-semibold w-32">Weight:</label>
            <input type="number" id="weight" v-model="editedUser.weight" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex flex-row justify-between">
            <label for="eyeColor" class="font-semibold w-32">Eye Color:</label>
            <input type="text" id="eyeColor" v-model="editedUser.eyeColor" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/>
            <br />
          </div>
          <div class="flex col-span-2 place-self-end mr-20 space-x-3 mt-5">
            <button 
              type="submit"
              class="bg-green-500 hover:bg-green-600 font-semibold p-3 rounded-md w-auto text-white"
            >
              Save Changes
            </button>
          </div>
          <!-- Tambahkan field lainnya sesuai kebutuhan -->
        </div>
      </form>
    </div>
  </div>
</template>
