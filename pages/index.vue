<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';



const requestData = ref('');
const router = useRouter();
const loading = ref(false);


const submitRequest = async () => {
  try {
    loading.value = true;
    const response = await $fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBv0YLzK8kDLZKO6VbnJvkYYLFok2zZ7YQ", {
      method: "POST",
      body: JSON.stringify({
        contents: [{
          parts: [{ text: requestData.value }]
        }]
      })
    });

    console.log(response);
    const generatedArticle = response.candidates[0].content.parts[0].text;
    loading.value = false;
    localStorage.setItem('article', JSON.stringify(generatedArticle));
    await router.push({ name: 'result' });
  } catch (e) {
    console.error("error", e);
    loading.value = false;
  }
};
</script>

<template>
  <div class="main-container">
    <h1>Chat GPTT</h1>
    <form @submit.prevent="submitRequest">
      <FloatLabel >
        <InputText id="over_label" v-model="requestData" type="text" class="input"/>
        <label for="over_label">Nhập yêu cầu của bạn</label>
      </FloatLabel>
      <Button type="submit" label="Gửi yêu cầu" severity="secondary" raised :loading="loading" :disabled="!requestData" />
    </form>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.main-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.input{
  width: 800px;
  border: darkgray 1px solid !important;
  border-radius: 50px;
  padding: 20px;
  background-color: transparent;
}

.button{
  width: 150px;
  height: 50px;
  font-size: 16px;
  border: darkgray 1px solid;
  border-radius: 50px;
  background-color: darkgray;
  cursor: pointer;
}
</style>
