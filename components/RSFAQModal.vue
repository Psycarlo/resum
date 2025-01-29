<template>
  <DialogRoot>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-30 bg-black/40 data-[state=open]:animate-overlayShow"
      />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-[100] flex max-h-[85vh] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-xl bg-gradient-to-b from-[#DCF4FF] to-white p-8 font-brand shadow-md focus:outline-none data-[state=open]:animate-contentShow"
      >
        <DialogClose as-child>
          <button>
            <CloseIcon class="absolute right-3 top-3 size-7" />
          </button>
        </DialogClose>
        <DialogTitle
          class="text-center text-2xl font-black uppercase text-brand-primary"
        >
          FAQ
        </DialogTitle>
        <DialogDescription class="text-center text-brand-primary">
          Your <span class="font-medium">questions</span> answered here.
        </DialogDescription>
        <div class="mt-4 flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary"
              >Where is the event?</span
            >
            <p class="text-brand-primary">
              Italy, Milan. The exact place will remain secret until right
              before the conference. Exact place will be sent to ticket holders
              2 or 3 days before the conference.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary"
              >When is the event?</span
            >
            <p class="text-brand-primary">
              May 17th, in the afternoon. Exact time given with exact place.
            </p>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
