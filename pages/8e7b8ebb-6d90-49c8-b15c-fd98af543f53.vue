<template>
  <div class="mt-10 flex flex-col items-center justify-center gap-4">
    <NuxtImg src="logo.png" alt="Logo" class="h-full" />
    <div class="flex w-[320px] flex-col gap-4">
      <div
        class="flex flex-col gap-2 py-2"
        :class="[
          notFound
            ? 'bg-red-200'
            : used
              ? 'bg-yellow-200'
              : validated
                ? 'bg-green-300'
                : 'bg-gray-100'
        ]"
      >
        <span class="text-center font-medium">QRCode Information</span>
        <span v-if="!qrcode && !fetching" class="text-center text-sm">
          Scan to display information <br />
          ...
        </span>
        <span v-else-if="!fetching" class="text-center text-sm">
          {{ qrcode }} <br />
          <span class="font-medium">
            {{
              type
                ? type
                : notFound
                  ? '🛑 Ticket not found'
                  : used
                    ? '⚠️ Ticket already used'
                    : 'Error'
            }}
          </span>
        </span>
        <span v-else class="text-center text-sm">Loading...</span>
      </div>
      <QrcodeStream v-if="!qrcode" @detect="onDetect" class="border-2" />
      <div class="flex gap-4">
        <button
          class="w-full bg-blue-600 px-4 py-2 font-medium text-white"
          @click="newScan"
        >
          New Scan
        </button>
        <button
          class="w-full bg-green-600 px-4 py-2 font-medium text-white"
          @click="validateTicket"
        >
          {{ validating ? 'Validating...' : 'Validate' }}
        </button>
      </div>
      <span
        v-if="validated"
        class="text-center text-sm font-medium text-green-600"
        >Ticket successfully validated!</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Database } from '@/types/database'
  import { QrcodeStream } from 'vue-qrcode-reader'

  const client = useSupabaseClient<Database>()

  const fetching = ref(false)
  const validating = ref(false)
  const notFound = ref(false)
  const used = ref(false)
  const qrcode = ref('')
  type Type = 'general' | 'vip' | 'premium'
  const type = ref<Type>()
  const validated = ref(false)

  async function onDetect(codes: any) {
    await fetchQRCodeInfo(codes[0].rawValue as string)
  }

  function newScan() {
    fetching.value = false
    notFound.value = false
    used.value = false
    qrcode.value = ''
    type.value = undefined
    validated.value = false
  }

  async function fetchQRCodeInfo(code: string) {
    fetching.value = true
    qrcode.value = code
    console.log(code)

    const { data, error } = await client
      .from('tickets_resum_25')
      .select('*')
      .eq('code', code)

    if (!data?.length) {
      notFound.value = true
      fetching.value = false
      return
    }

    if (data[0].used_at) {
      used.value = true
      fetching.value = false
      return
    }

    type.value = data[0].code.split('-')[1] as Type
    fetching.value = false
  }

  async function validateTicket() {
    validating.value = true
    await client
      .from('tickets_resum_25')
      .update({ used_at: new Date().toISOString() })
      .eq('code', qrcode.value)
    validating.value = false
    validated.value = true
  }
</script>
