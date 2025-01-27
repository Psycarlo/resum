<template>
  <header class="flex h-20 bg-[#DCF4FF] px-8 py-4 lg:px-16">
    <nav
      class="mx-auto flex w-full max-w-screen-lg items-center justify-between"
    >
      <NuxtImg src="logo.png" alt="Logo" class="h-full" />
      <ul class="flex items-center gap-2.5">
        <li>
          <button
            class="font-medium text-brand-primary transition-colors duration-200 hover:text-brand-secondary"
          >
            FAQ
          </button>
        </li>
        <li>
          <NuxtLink
            to="https://www.instagram.com/remigrationsummit/profilecard/?igsh=angxdXMxZDVhbTFu"
            target="_blank"
          >
            <InstagramIcon />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://x.com/resum25" target="_blank">
            <XIcon />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://t.me/Resum25" target="_blank">
            <TelegramIcon />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
  <main
    class="relative flex min-h-[calc(100vh-5rem)] flex-col items-center bg-gradient-to-b from-[#DCF4FF] to-white px-8 lg:items-start lg:px-16"
  >
    <div
      class="flex w-full flex-col xl:mx-auto xl:max-w-screen-lg xl:items-start"
    >
      <NuxtImg
        src="background.png"
        alt="Mountain Background"
        class="pointer-events-none absolute bottom-0 left-0 z-10 h-[480px] w-full object-cover xl:object-bottom 2xl:object-center"
      />
      <div
        class="flex flex-col items-center gap-3 py-10 sm:gap-6 lg:items-start"
      >
        <h1
          class="text-center text-4xl font-black uppercase leading-none text-brand-secondary sm:text-5xl lg:text-left lg:text-8xl lg:leading-[0.8] lg:h-mg:text-7xl"
        >
          Remigration <br />
          <span
            class="text-3xl font-black uppercase text-brand-primary sm:text-4xl lg:text-7xl"
          >
            Starts now!
          </span>
        </h1>
        <div class="flex flex-col lg:gap-2.5">
          <p class="text-center text-brand-primary lg:text-left">
            The first <span class="font-medium">Remigration Summit</span> is
            here.
          </p>
          <p class="hidden text-brand-primary lg:inline-block">
            Finally <span class="font-medium">the word</span> that shaped the
            political arena around <br />
            <span class="font-medium">immigration</span> in 2024 will be
            explained along with the <br />
            concept it brings with it.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <NuxtImg
            src="italy.png"
            alt="Italy"
            class="size-10 rounded-full lg:size-14"
          />
          <div class="flex flex-col">
            <span
              class="font-medium leading-none text-brand-primary lg:text-lg lg:font-bold"
            >
              Italy
            </span>
            <span class="text-sm font-medium text-brand-secondary lg:text-base">
              May 17th
            </span>
          </div>
        </div>
        <NuxtLink
          to="https://www.givesendgo.com/resum25"
          target="_blank"
          class="group inline-flex items-center gap-0.5 text-sm font-medium text-brand-primary lg:hidden"
        >
          Donate here
          <AnimatedChevron />
        </NuxtLink>
      </div>
      <NuxtImg
        src="plane.png"
        alt="Plane"
        class="pointer-events-none hidden w-2/3 max-w-[640px] lg:block h-xl:hidden"
      />
      <div
        class="z-50 flex w-full flex-col items-center lg:absolute lg:right-[calc((100vw-960px)/2)] lg:top-1/2 lg:w-[424px] lg:-translate-y-[70%] lg:rounded-xl lg:bg-brand-secondary/10 lg:px-8 lg:py-6 xl:-translate-y-[80%] h-xl:lg:-translate-y-[50%]"
      >
        <h2 class="text-3xl font-black text-brand-primary">Get your ticket</h2>
        <p class="text-sm text-brand-primary">
          Please select the ticket of your choice
        </p>
        <div class="z-20 mt-4 flex w-full max-w-[480px] flex-col gap-3">
          <button
            class="flex w-full flex-col gap-2 rounded-lg border-[3px] bg-[#E6F1F8] bg-opacity-90 px-4 py-3"
            :class="[
              selectedTicket === 'general'
                ? 'border-brand-primary'
                : 'border-brand-primary/20 hover:border-brand-primary/50'
            ]"
            @click="selectedTicket = 'general'"
          >
            <div class="flex w-full items-center justify-between">
              <span class="text-xl font-bold text-brand-primary">
                General Ticket
              </span>
              <span class="text-xl font-bold text-brand-primary">25€</span>
            </div>
            <div class="flex flex-col items-start gap-1">
              <span class="text-brand-primary">- Admission to the event</span>
              <span class="text-brand-primary"
                >- Access to the coffee break</span
              >
            </div>
          </button>
          <button
            class="flex w-full flex-col gap-2 rounded-lg border-[3px] bg-[#E6F1F8] bg-opacity-90 px-4 py-3"
            :class="[
              selectedTicket === 'vip'
                ? 'border-brand-primary'
                : 'border-brand-primary/20 hover:border-brand-primary/50'
            ]"
            @click="selectedTicket = 'vip'"
          >
            <div class="flex w-full items-center justify-between">
              <div
                class="inline-flex items-center gap-2 text-xl font-bold text-brand-primary"
              >
                <span class="whitespace-nowrap">VIP Ticket</span>
                <VipIcon class="!h-6 !w-6" />
              </div>
              <span class="text-xl font-bold text-brand-primary">100€</span>
            </div>
            <div class="flex flex-col items-start gap-1">
              <span class="text-brand-primary">- Admission to the event</span>
              <span class="text-brand-primary"
                >- Access to the coffee break</span
              >
              <span class="text-brand-primary">- Exclusive seating</span>
              <span class="text-left text-brand-primary">
                - Access to dinner & after party
              </span>
            </div>
          </button>
          <input
            type="email"
            v-model="email"
            class="rounded-xl border-[3px] bg-[#E6F1F8] bg-opacity-90 px-4 py-3 text-brand-primary outline-none"
            :class="[
              isEmailValid
                ? 'border-brand-primary'
                : 'border-brand-primary/20 hover:border-brand-primary/50'
            ]"
            placeholder="Your email..."
          />
          <RSButton
            :disabled="!selectedTicket || !email || !isEmailValid"
            :loading="loadingCheckout"
            @click="handleCheckout"
            class="mb-4 sm:mb-0"
          >
            Buy Now
          </RSButton>
          <NuxtLink
            to="https://www.givesendgo.com/resum25"
            target="_blank"
            class="group mt-2 hidden items-center gap-0.5 self-center text-sm font-medium text-brand-primary lg:inline-flex"
          >
            Donate here
            <AnimatedChevron />
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
  <RSCheckoutSuccessModal v-model:open="checkoutSuccessModalOpen" />
</template>

<script lang="ts" setup>
  import type { Database } from '@/types/database'
  import { loadStripe } from '@stripe/stripe-js'

  const client = useSupabaseClient<Database>()
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  const { $toast } = useNuxtApp()

  const selectedTicket = ref<'general' | 'vip'>()
  const email = ref('')

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isEmailValid = computed(() => emailPattern.test(email.value))

  const faqModalOpen = ref(false)
  const checkoutSuccessModalOpen = ref(route.query.s === 'success')

  const loadingCheckout = ref(false)

  async function handleCheckout() {
    if (!selectedTicket.value || !email.value) return

    loadingCheckout.value = true

    const { data, error } = await client.functions.invoke('stripe-checkout', {
      body: JSON.stringify({
        type: selectedTicket.value,
        email: email.value
      })
    })

    if (error) {
      console.log(error)
      $toast.error('Error loading. Try again later.')
      loadingCheckout.value = false
      return
    }

    try {
      const stripe = await loadStripe(
        runtimeConfig.public.STRIPE_PUBLISHABLE_KEY
      )

      stripe?.redirectToCheckout({ sessionId: data.session })
    } catch {
      console.log(error)
      $toast.error('Error loading. Try again later.')
    } finally {
      loadingCheckout.value = false
    }
  }
</script>
