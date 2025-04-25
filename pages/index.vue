<template>
  <header class="flex h-20 bg-[#DCF4FF] px-4 py-4 lg:px-16 xs:px-8">
    <nav
      class="mx-auto flex w-full max-w-screen-lg items-center justify-between"
    >
      <NuxtImg src="logo.png" alt="Logo" class="h-full" />
      <ul class="flex items-center gap-2.5">
        <li>
          <button
            class="font-medium text-brand-primary transition-colors duration-200 hover:text-brand-secondary"
            @click="faqModalOpen = true"
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
    class="relative flex min-h-[calc(100vh-5rem)] flex-col items-center bg-gradient-to-b from-[#DCF4FF] to-white px-4 lg:items-start lg:px-16 xs:px-8"
  >
    <div class="mx-auto flex w-full max-w-screen-lg flex-col xl:items-start">
      <NuxtImg
        src="background.png"
        alt="Mountain Background"
        class="pointer-events-none absolute bottom-0 left-0 z-10 h-[480px] w-full object-cover xl:object-bottom 2xl:object-center"
      />
      <div
        class="z-20 flex flex-col items-center gap-3 py-10 sm:gap-6 lg:items-start"
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
            Finally <span class="font-medium">the term</span> that shaped the
            political debate around <br />
            <span class="font-medium">immigration</span> in 2024 the last few
            years will be explained along with the <br />
            concept it brings with it.
          </p>
          <p class="text-center font-medium text-brand-primary lg:text-left">
            May 17th, 2025
          </p>
          <p class="text-center text-sm text-brand-primary lg:text-left">
            2PM - 7:30PM
          </p>
        </div>
        <!-- <div class="flex items-center gap-2">
          <NuxtImg
            src="italy.png"
            alt="Italy"
            class="size-10 rounded-full lg:size-14"
          />
          <div class="flex flex-col">
            <span
              class="font-medium leading-none text-brand-primary lg:text-lg lg:font-bold"
            >
              Italy, Milan
            </span>
            <span class="text-sm font-medium text-brand-secondary lg:text-base">
              May 17th
            </span>
          </div>
        </div> -->
        <NuxtLink
          to="https://www.givesendgo.com/resum25"
          target="_blank"
          class="group inline-flex items-center gap-0.5 text-sm font-medium text-brand-primary"
        >
          Donate here
          <AnimatedChevron />
        </NuxtLink>
      </div>
      <NuxtImg
        src="plane.png"
        alt="Plane"
        class="pointer-events-none absolute right-[calc((100vw-1024px)/2)] top-32 hidden w-2/3 max-w-[460px] lg:block h-xl:hidden"
      />
      <div
        class="z-50 mb-4 flex w-full flex-col items-center lg:rounded-xl lg:bg-brand-secondary/5 lg:px-8 lg:py-6"
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
              <span class="text-xl font-bold text-brand-primary">40€</span>
            </div>
            <div class="flex flex-col items-start gap-1">
              <span class="text-brand-primary">- Admission to the event</span>
              <span class="text-brand-primary">
                - Access to the coffee break
              </span>
            </div>
          </button>
          <div
            class="flex w-full flex-col gap-2 rounded-lg border-[3px] bg-red-200 bg-opacity-90 px-4 py-3"
            :class="[
              selectedTicket === 'vip'
                ? 'border-brand-primary'
                : 'border-brand-primary/20'
            ]"
          >
            <div class="flex w-full items-center justify-between">
              <div
                class="inline-flex items-center gap-1.5 text-xl font-bold text-brand-primary"
              >
                <span class="whitespace-nowrap">VIP Ticket</span>
                <VipIcon class="!h-6 !w-6" />
              </div>
              <span class="text-sm font-bold uppercase text-red-600">
                SOLD OUT
              </span>
              <span class="text-xl font-bold text-brand-primary">100€</span>
            </div>
            <div class="flex flex-col items-start gap-1">
              <span class="text-brand-primary">- Admission to the event</span>
              <span class="text-brand-primary"
                >- Access to the coffee break</span
              >
              <span class="text-left text-brand-primary">
                - Access to dinner & after party
              </span>
            </div>
          </div>
          <div
            class="flex w-full flex-col gap-2 rounded-lg border-[3px] bg-red-200 bg-opacity-90 px-4 py-3"
            :class="[
              selectedTicket === 'premium'
                ? 'border-brand-primary'
                : 'border-brand-primary/20'
            ]"
          >
            <div class="flex w-full items-center justify-between">
              <div
                class="inline-flex items-center gap-1.5 text-xl font-bold text-brand-primary"
              >
                <span class="whitespace-nowrap">PREMIUM Ticket</span>
                <PremiumIcon class="!h-6 !w-6" />
              </div>
              <span class="text-sm font-bold uppercase text-red-600">
                SOLD OUT
              </span>
              <span class="text-xl font-bold text-brand-primary">250€</span>
            </div>
            <div class="flex flex-col items-start gap-1">
              <span class="text-brand-primary">- Admission to the event</span>
              <span class="text-brand-primary">
                - Access to the coffee break
              </span>
              <span class="text-left text-brand-primary">
                - Access to dinner & after party
              </span>
              <span class="text-left text-brand-primary"> - Hotel room </span>
            </div>
          </div>
          <input
            type="text"
            v-model="fullName"
            class="rounded-xl border-[3px] bg-[#E6F1F8] bg-opacity-90 px-4 py-3 text-brand-primary outline-none"
            :class="[
              isFullNameValid
                ? 'border-brand-primary'
                : 'border-brand-primary/20 hover:border-brand-primary/50'
            ]"
            placeholder="Your full name..."
          />
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
            :disabled="
              !selectedTicket ||
              !fullName ||
              !isFullNameValid ||
              !email ||
              !isEmailValid
            "
            :loading="loadingCheckout"
            @click="handleCheckout"
            class="mb-4 sm:mb-0"
          >
            Buy Now
          </RSButton>
        </div>
      </div>
    </div>
  </main>
  <RSCheckoutSuccessModal v-model:open="checkoutSuccessModalOpen" />
  <RSFAQModal v-model:open="faqModalOpen" />
</template>

<script lang="ts" setup>
  import type { Database } from '@/types/database'
  import { loadStripe } from '@stripe/stripe-js'

  const client = useSupabaseClient<Database>()
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  const { $toast } = useNuxtApp()

  const selectedTicket = ref<'general' | 'vip' | 'premium'>('general')
  const email = ref('')
  const fullName = ref('')

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isEmailValid = computed(() => emailPattern.test(email.value))

  const isFullNameValid = computed(
    () =>
      fullName.value &&
      fullName.value.length >= 2 &&
      fullName.value.trim().split(/\s+/).length >= 1
  )

  const faqModalOpen = ref(false)
  const checkoutSuccessModalOpen = ref(route.query.s === 'success')

  const loadingCheckout = ref(false)

  async function handleCheckout() {
    if (!selectedTicket.value || !email.value) return

    loadingCheckout.value = true

    const { data, error } = await client.functions.invoke('stripe-checkout', {
      body: JSON.stringify({
        type: selectedTicket.value,
        email: email.value,
        fullName: fullName.value
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
