<template>
  <div class="font-brand">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <RSSonner position="top-right" />
    </ClientOnly>
  </div>
</template>
