<script setup>
const quizData = ref([]);
const actionData = ref([]);
const modalData = ref({});

const isOpenModal = ref(false);

const getData = async () => {
  const res = await fetch("../../quizData.json");
  quizData.value = await res.json();
  actionData.value = quizData.value.filter((quiz) => quiz.status !== "pending");
};

const openModal = (data) => {
  modalData.value = data;
  isOpenModal.value = true;
};

onMounted(() => {
  getData();
});
</script>
<template>
  <div class="font-sans">
    <Navbar />
    <div class="mx-8 mt-8 grid h-screen grid-cols-5 gap-x-20">
      <div class="col-span-2">
        <h2 class="mb-5 text-center text-2xl font-bold">ACTION TIMELINE</h2>
        <ActionList
          v-for="(item, index) in actionData"
          :key="item.id"
          :data="item"
          :is-time-line="index + 1 !== actionData.length"
          @openModal="openModal"
        />
      </div>
      <div class="col-span-3 bg-green-500"></div>
    </div>
  </div>
  <Modal v-model="isOpenModal" :data="modalData" />
</template>
<style></style>
