<template>
  <DialogRoot>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-30 bg-black/40 data-[state=open]:animate-overlayShow"
      />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-[100] flex max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-xl bg-gradient-to-b from-[#DCF4FF] to-white p-8 font-brand shadow-md focus:outline-none data-[state=open]:animate-contentShow"
      >
        <DialogClose as-child>
          <button>
            <CloseIcon class="absolute right-3 top-3 size-7" />
          </button>
        </DialogClose>
        <DialogTitle
          class="text-center text-xl font-black uppercase text-brand-primary"
        >
          Purchase completed!
        </DialogTitle>
        <DialogDescription class="text-center text-brand-primary">
          You will receive an <span class="font-medium">email</span> <br />
          in your inbox shortly. Check your
          <span class="font-medium">spam</span> folder. If you don't receive an
          email, contact
          <span class="font-medium">remigrationsummit@gmail.com</span>
        </DialogDescription>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
