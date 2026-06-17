<template>
  <section class="relative px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="impact-heading">
    <div class="mx-auto max-w-7xl">
      <p class="text-xs font-medium tracking-[0.4em] text-tzel-bronze uppercase">OUR COMMUNITY IMPACT PROGRAMMES</p>
      <h2 id="impact-heading" class="mt-3 font-serif text-3xl text-tzel-cream sm:text-4xl">Doing well by doing good</h2>
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="p in programmes" :key="p.title" class="rounded-3xl border border-white/5 bg-tzel-espresso/40 p-6">
          <p class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">{{ p.title }}</p>
          <p class="mt-3 text-sm leading-relaxed text-tzel-sand/85">{{ p.body }}</p>
        </article>
      </div>
      <div class="mt-10 rounded-3xl border border-white/5 bg-tzel-ink/30 p-8">
        <p class="text-xs font-medium tracking-[0.35em] text-tzel-bronze uppercase">Vision &amp; Mission</p>
        <div class="mt-4 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 class="font-serif text-2xl text-tzel-cream">Our Vision</h3>
            <p class="mt-3 text-sm text-tzel-sand/85">To become Africa's most loved café brand where people Eat, Sip and Connect.</p>
          </div>
          <div>
            <h3 class="font-serif text-2xl text-tzel-cream">Our Mission</h3>
            <p class="mt-3 text-sm text-tzel-sand/85">
              To provide exceptional food, beverages and experiences while creating positive impact in communities and
              promoting sustainable development.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const programmes = [
  { title: 'A Plate, A Smile', body: 'Meals and support for vulnerable families — everyone deserves dignity and hope.' },
  { title: 'Green Communities', body: 'Clean-ups, waste management, and tree-growing — Reduce. Reuse. Recycle.' },
  { title: 'Youth Rise', body: 'Mentorship, entrepreneurship, digital skills, and employability for young people.' },
  { title: 'Her Future, His Future', body: 'Girl and boy child empowerment through education and life skills.' },
  { title: 'Women in Business', body: 'Mentorship and enterprise development for women entrepreneurs.' },
  { title: 'Circular Economy', body: 'Sustainable consumption, recycling, and responsible production.' },
  { title: 'Save Our Planet', body: 'Tree planting, environmental awareness, and climate action.' },
  { title: 'Community Impact Days', body: 'Fundraising, volunteerism, food donations, and community service.' },
]
</script>
