<script setup>
const quizData = ref([]);
const actionData = ref([]);
const getData = async () => {
  const res = await fetch("../../quizData.json");
  quizData.value = await res.json();
  actionData.value = quizData.value.filter((quiz) => quiz.status !== "Pending");
  console.log("quizData :>> ", quizData.value);
  console.log("actionData.value :>> ", actionData.value);
};

onMounted(() => {
  getData();
});
</script>
<template>
  <div class="font-serif">
    <Navbar />
  </div>
</template>
<style></style>
