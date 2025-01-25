<template>
  <main class="flex flex-col items-center px-8">
    <h1
      class="text-brand-secondary text-center text-4xl font-black uppercase leading-none"
    >
      Remigration <br />
      <span class="text-brand-primary text-3xl font-black uppercase">
        Starts now!
      </span>
    </h1>
    <p class="text-brand-primary">
      The first <span class="font-medium">Remigration Summit</span> is here.
    </p>
    <div class="flex items-center gap-2">
      <div class="h-10 w-10 rounded-full bg-blue-500" />
      <div class="flex flex-col">
        <span class="text-brand-primary font-medium">Italy</span>
        <span class="text-brand-secondary text-sm font-medium">May 17th</span>
      </div>
    </div>
    <NuxtLink
      to="https://www.givesendgo.com/resum25"
      target="_blank"
      class="text-brand-primary group inline-flex items-center gap-0.5 text-sm font-medium"
    >
      Donate here
      <AnimatedChevron />
    </NuxtLink>
    <h2 class="text-brand-primary text-3xl font-black">Get your ticket</h2>
    <p class="text-brand-primary text-sm">
      Please select the ticket of your choice
    </p>
    <div class="flex w-full flex-col gap-3">
      <button
        class="flex w-full flex-col gap-2 rounded-lg border-[3px] bg-[#E6F1F8] px-4 py-3"
        :class="[
          selectedTicket === 'general'
            ? 'border-brand-primary'
            : 'border-brand-primary/20 hover:border-brand-primary/50'
        ]"
        @click="selectedTicket = 'general'"
      >
        <div class="flex w-full items-center justify-between">
          <span class="text-brand-primary text-xl font-bold">
            General Ticket
          </span>
          <span class="text-brand-primary text-xl font-bold">25€</span>
        </div>
        <div class="flex flex-col items-start gap-1">
          <span class="text-brand-primary">- Admission to the event</span>
          <span class="text-brand-primary">- Access to the coffee break</span>
        </div>
      </button>
      <button
        class="flex w-full flex-col gap-2 rounded-lg border-[3px] bg-[#E6F1F8] px-4 py-3"
        :class="[
          selectedTicket === 'vip'
            ? 'border-brand-primary'
            : 'border-brand-primary/20 hover:border-brand-primary/50'
        ]"
        @click="selectedTicket = 'vip'"
      >
        <div class="flex w-full items-center justify-between">
          <div
            class="text-brand-primary inline-flex items-center gap-2 text-xl font-bold"
          >
            <span class="whitespace-nowrap">VIP Ticket</span>
            <VipIcon class="!h-6 !w-6" />
          </div>
          <span class="text-brand-primary text-xl font-bold">100€</span>
        </div>
        <div class="flex flex-col items-start gap-1">
          <span class="text-brand-primary">- Admission to the event</span>
          <span class="text-brand-primary">- Access to the coffee break</span>
          <span class="text-brand-primary">- Exclusive seating</span>
          <span class="text-brand-primary">
            - Access to dinner & after party
          </span>
        </div>
      </button>
      <RSButton :disabled="!selectedTicket">Buy Now</RSButton>
    </div>
  </main>
</template>

<script lang="ts" setup>
  const selectedTicket = ref<'general' | 'vip'>()
</script>
