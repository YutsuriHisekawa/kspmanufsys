<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

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
  <div>
    <form @submit.prevent="submitForm">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="formData.firstName" /><br />

      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="formData.lastName" /><br />

      <label for="maidenName">Maiden Name:</label>
      <input type="text" id="maidenName" v-model="formData.maidenName" /><br />

      <label for="age">Age:</label>
      <input type="number" id="age" v-model.number="formData.age" /><br />

      <label for="gender">Gender:</label>
      <select id="gender" v-model="formData.gender">
        <option value="male">Male</option>
        <option value="female">Female</option></select
      ><br />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" /><br />

      <label for="phone">Phone:</label>
      <input type="tel" id="phone" v-model="formData.phone" /><br />

      <label for="birthDate">Birth Date:</label>
      <input type="date" id="birthDate" v-model="formData.birthDate" /><br />

      <label for="bloodGroup">Blood Group:</label>
      <input type="text" id="bloodGroup" v-model="formData.bloodGroup" /><br />

      <label for="height">Height:</label>
      <input type="number" id="height" v-model.number="formData.height" /><br />

      <label for="weight">Weight:</label>
      <input type="number" id="weight" v-model.number="formData.weight" /><br />

      <label for="eyeColor">Eye Color:</label>
      <input type="text" id="eyeColor" v-model="formData.eyeColor" /><br />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
