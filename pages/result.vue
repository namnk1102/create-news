<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Editor from 'primevue/editor';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const route = useRoute();
const router = useRouter();
const article = ref(''); // Dùng để lưu bài viết
const thumbnail = ref(''); // Dùng để lưu link ảnh thumbnail
const description = ref(''); // Dùng để lưu mô tả
const headtitle = ref(''); // Dùng để lưu tiêu đề

// Hàm gửi thông tin thumbnail, description và title
const submitThumbnail = () => {
  console.log('Thumbnail:', thumbnail.value);
  console.log('Description:', description.value);
  console.log('Title:', headtitle.value);

  // Bạn có thể thêm logic lưu trữ hoặc gửi dữ liệu này tới server nếu cần
  // Ví dụ: gửi API POST để lưu trữ các thông tin này
};

const goBack = () => {
  router.go(-1);
};

// Lấy bài viết từ localStorage sau khi gọi API Gemini
onMounted(() => {
  const storedArticle = localStorage.getItem('article');
  if (storedArticle) {
    article.value = JSON.parse(storedArticle); // Gán bài viết vào editor
  } else {
    console.warn("Không tìm thấy bài viết trong localStorage.");
    article.value = 'Không có bài viết nào được tạo.';
  }
});
</script>

<template>
  <div class="result-container">
    <Button label="Quay lại" severity="danger" class="back-button" @click="goBack"/>
    <h1>Bài viết của bạn</h1>

    <!-- Editor hiển thị bài viết -->
    <Editor v-model="article" editorStyle="height: 320px; width: 800px" />

    <h2>Thêm thông tin</h2>
    <form @submit.prevent="submitThumbnail" style="display: flex; direction: column; gap: 30px">
      <FloatLabel >
        <InputText id="over_label" v-model="headtitle" type="text" class="input"/>
        <label for="over_label">Nhập tiêu đề bài báo</label>
      </FloatLabel>
      <FloatLabel >
        <InputText id="over_label" v-model="description" type="text" class="input"/>
        <label for="over_label">Nhập mô tả ngắn gọn</label>
      </FloatLabel>
      <FloatLabel >
        <InputText id="over_label" v-model="thumbnail" type="text" class="input"/>
        <label for="over_label">Nhập link ảnh thumbnail</label>
      </FloatLabel>
      <Button type="submit" label="Gửi thông tin" severity="secondary" raised :disabled="!(headtitle && description && thumbnail)" />
    </form>
  </div>
</template>


<style scoped>
.result-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>