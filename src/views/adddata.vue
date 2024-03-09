<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import sidebar from "@/layouts/sidebar.vue";

const formData = ref({
  firstName: "",
  lastName: "",
  maidenName: "",
  age: null,
  gender: "",
  email: "",
  phone: "",
  birthDate: "",
  bloodGroup: "",
  height: null,
  weight: null,
  eyeColor: "",
});

const submitForm = async () => {
  if (Object.values(formData.value).some((value) => !value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out all fields!",
    });
    return;
  }

  try {
    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Data successfully submitted!",
      });
      // Reset form data after submission
      Object.keys(formData.value).forEach((key) => {
        formData.value[key] = "";
      });
    } else {
      throw new Error("Harap Lengkapi Data Terlebih dahulu");
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Harap Lengkapi Data Terlebih dahulu!",
    });
  }
};
</script>

<template>
  <sidebar></sidebar>
  <div class="p-7 lg:ml-64 pt-12 bg-blue-50">
    <h1 class="text-3xl font-bold mt-14 ml-3">Add Data</h1>
    <div class="p-3 bg-white rounded-md mt-6 h-full space-y-10">
        <form @submit.prevent="submitForm" class="space-y-4 p-6 bg-white">
          <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-row justify-between">
              <label for="firstName" class="font-semibold w-32">First Name:</label>
              <input type="text" id="firstName" v-model="formData.firstName" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>  
            <div class="flex flex-row justify-between">
              <label for="lastName" class="font-semibold w-32">Last Name:</label>
              <input type="text" id="lastName" v-model="formData.lastName" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="maidenName" class="font-semibold w-32">Maiden Name:</label>
              <input type="text" id="maidenName" v-model="formData.maidenName" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="age" class="font-semibold w-32">Age:</label>
              <input type="text" id="age" v-model="formData.age" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="gender" class="font-semibold w-32">Gender:</label>
              <select id="gender" v-model="formData.gender" class="ring-2 ring-gray-300 rounded-sm p-1 w-72">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="birthDate" class="font-semibold w-32">Birth Date:</label>
              <input type="date" id="birthDate" v-model="formData.birthDate" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="email" class="font-semibold w-32">Email:</label>
              <input type="email" id="email" v-model="formData.email" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="phone" class="font-semibold w-32">Phone:</label>
              <input type="tel" id="phone" v-model="formData.phone" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="weight" class="font-semibold w-32">Weight:</label>
              <input type="number" id="weight" v-model.number="formData.weight" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="height" class="font-semibold w-32">Height:</label>
              <input type="number" id="height" v-model.number="formData.height" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="bloodGroup" class="font-semibold w-32">Blood Group:</label>
              <input type="text" id="bloodGroup" v-model="formData.bloodGroup" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex flex-row justify-between">
              <label for="eyeColor" class="font-semibold w-32">Eye Color:</label>
              <input type="text" id="eyeColor" v-model="formData.eyeColor" class="ring-2 ring-gray-300 rounded-sm p-1 w-72"/><br />
            </div>
            <div class="flex col-span-2 place-self-end mr-20 space-x-3 mt-9">
              <button 
                type="submit" 
                class="bg-green-500 hover:bg-green-600 font-semibold p-3 rounded-md w-auto text-white"
              >
                Submit
              </button>
              <button 
                type="submit" 
                class="bg-gray-200 font-semibold p-3 rounded-md w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
    </div>
  </div>
</template>
