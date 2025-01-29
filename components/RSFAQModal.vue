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
        <div class="mt-4 flex flex-col gap-4 overflow-y-auto">
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              What is the Remigration Summit?
            </span>
            <p class="text-brand-primary">
              The Remigration Summit 2025 is a yearly event about Remigration
              and its political, cultural and social pursuit. It also aims at
              being an identarian reunion gathering together activists,
              influencers, political parties and movements and independent
              media.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              Do I need to register in advance?
            </span>
            <p class="text-brand-primary">
              Yes, we recommend registering in advance, as places are limited.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              Is there parking available on site?
            </span>
            <p class="text-brand-primary">
              Yes, parking is available for participants. We also encourage the
              use of public transport; all transport and location details will
              be sent to ticket buyers 48 to 72 hours before the event.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              Will there be simultaneous translation into other languages?
            </span>
            <p class="text-brand-primary">
              No, the event will be entirely in English.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              Is there merchandising or material available?
            </span>
            <p class="text-brand-primary">
              Yes, we will have a merchandising area with products related to
              the event theme.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              Will there be accommodation close to the site?
            </span>
            <p class="text-brand-primary">Yes, hotels will be close by.</p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              Is the event safe?
            </span>
            <p class="text-brand-primary">
              Yes, the event will have private security to ensure the comfort
              and well-being of all participants.
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-lg font-medium text-brand-primary">
              How can I stay up to date with the event?
            </span>
            <p class="text-brand-primary">
              Follow us on social media to receive all the updates. Links on the
              page.
            </p>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
