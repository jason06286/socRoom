<script setup>
const quizData = ref([]);
const actionData = ref([]);
const modalData = ref({});

const isOpenModal = ref(false);

const currentTicketStatus = ref("all");

const getData = async () => {
  const url =
    "https://script.google.com/macros/s/AKfycbyWx5Ur53x2aKCNA512OxRO6S7ycK8J2UTgPXOohpcp7QUe15hvRKQztOIPoZ91hqLu/exec";
  const res = await fetch(url);
  quizData.value = await res.json();
  actionData.value = quizData.value.filter((quiz) => quiz.status !== "pending");
};

const tickets = computed(() => {
  return [
    {
      name: "all",
      qty: quizData.value.length,
    },
    {
      name: "queued",
      qty: quizData.value.filter(
        (item) => item.status !== "resolved" && item.status !== "rejected"
      ).length,
    },
    {
      name: "resolved",
      qty: quizData.value.filter((item) => item.status === "resolved").length,
    },
    {
      name: "rejected",
      qty: quizData.value.filter((item) => item.status === "rejected").length,
    },
  ];
});

const tableData = computed(() => {
  if (currentTicketStatus.value === "all") {
    return quizData.value;
  }
  if (currentTicketStatus.value === "queued") {
    return quizData.value.filter(
      (item) => item.status !== "resolved" && item.status !== "rejected"
    );
  }
  if (currentTicketStatus.value === "resolved") {
    return quizData.value.filter((item) => item.status === "resolved");
  }
  if (currentTicketStatus.value === "rejected") {
    return quizData.value.filter((item) => item.status === "rejected");
  }
});

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
    <div
      class="mx-4 mt-24 grid h-screen grid-cols-3 gap-x-10 xl:grid-cols-5 2xl:mx-8 2xl:gap-x-20"
    >
      <div class="col-auto xl:col-span-2">
        <h2 class="mb-5 text-center text-2xl font-bold">ACTION TIMELINE</h2>
        <ActionList
          v-for="(item, index) in actionData"
          :key="item.id"
          :data="item"
          :is-time-line="index + 1 !== actionData.length"
          @openModal="openModal"
        />
      </div>
      <div class="col-span-2 xl:col-span-3">
        <div class="rounded-md bg-white p-3 pb-12 shadow-md">
          <h2 class="mb-8 font-bold">Tickets</h2>
          <div class="mb-5 flex gap-x-1">
            <div
              class="flex cursor-pointer select-none border-b-2 border-transparent px-2 pb-2 font-bold capitalize text-gray-400"
              @click="currentTicketStatus = item.name"
              :class="
                item.name === currentTicketStatus &&
                'border-blue-300 text-blue-400'
              "
              v-for="item in tickets"
              :key="item.name"
            >
              <h4>{{ item.name }}</h4>
              <div
                class="ml-2 flex items-center justify-center rounded-full px-3 text-sm"
                :class="
                  item.name === currentTicketStatus
                    ? 'bg-blue-200'
                    : 'bg-gray-200'
                "
              >
                {{ item.qty }}
              </div>
            </div>
          </div>
          <table class="w-full">
            <TicketTable
              v-for="item in tableData"
              :key="item.id"
              :data="item"
            />
          </table>
        </div>
      </div>
    </div>
  </div>
  <Modal v-model="isOpenModal" :data="modalData" />
</template>
<style></style>
