// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      title: 'Remigration Summit 2025',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        {
          name: 'description',
          content:
            'We unite Europe behind the vision of Remigration | Buy your tickets now!'
        },
        { name: 'keywords', content: 'Remigration, Europe' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Remigration Summit' },
        { property: 'og:title', content: 'Remigration Summit 2025' },
        {
          property: 'og:description',
          content:
            'We unite Europe behind the vision of Remigration | Buy your tickets now!'
        },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:url', content: 'https://remigrationsummit.com' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en' },
        { name: 'twitter:card', content: 'summary_large_image' }, // Can be 'summary' or 'summary_large_image'
        { name: 'twitter:title', content: 'Remigration Summit 2025' },
        {
          name: 'twitter:description',
          content:
            'We unite Europe behind the vision of Remigration | Buy your tickets now!'
        },
        { name: 'twitter:image', content: '/og.png' },
        { name: 'twitter:site', content: '@resum25' }, // Your Twitter handle
        { name: 'twitter:creator', content: '@resum25' } // Author's Twitter handle
      ]
    }
  },
  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss'],
  fonts: {
    defaults: {
      weights: [400, 500, 700, 900]
    }
  },
  devtools: { enabled: true }
})
