<script setup lang="ts">
import { CONTACT, MPESA } from '@/constants/contact'
</script>

<template>
  <section class="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="mpesa-heading">
    <div class="mx-auto max-w-3xl rounded-3xl border border-tzel-bronze/20 bg-tzel-espresso/40 p-8 sm:p-10">
      <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">In-restaurant payments</p>
      <h2 id="mpesa-heading" class="mt-3 font-serif text-2xl text-tzel-cream sm:text-3xl">Pay with M-Pesa at TZEL CAFÉ</h2>
      <p class="mt-3 text-sm text-tzel-sand/80">
        Dining in or picking up at Siwaka Plaza? Use these official TZEL CAFÉ M-Pesa options. Online orders on this website are paid securely via card (Paystack).
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <article class="rounded-2xl border border-white/5 bg-tzel-ink/30 p-6">
          <p class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">Buy Goods (Till)</p>
          <p class="mt-3 font-mono text-2xl text-tzel-gold">{{ MPESA.buyGoodsTill }}</p>
          <p class="mt-2 text-xs text-tzel-muted">M-Pesa → Lipa na M-Pesa → Buy Goods → enter till number</p>
        </article>
        <article class="rounded-2xl border border-white/5 bg-tzel-ink/30 p-6">
          <p class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">Paybill</p>
          <p class="mt-3 font-mono text-2xl text-tzel-gold">{{ MPESA.paybill }}</p>
          <p class="mt-2 text-sm text-tzel-cream">Account: <span class="font-mono text-tzel-gold">{{ MPESA.paybillAccount }}</span></p>
          <p class="mt-2 text-xs text-tzel-muted">M-Pesa → Lipa na M-Pesa → Paybill</p>
        </article>
      </div>

      <p class="mt-6 text-center text-xs text-tzel-muted">
        Questions? Call <a :href="`tel:${CONTACT.phoneTel}`" class="text-tzel-gold hover:underline">{{ CONTACT.phone }}</a>
      </p>
    </div>
  </section>
</template>
