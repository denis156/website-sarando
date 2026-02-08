<script setup lang="ts">
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-vue-next'
import { FAQ_ITEMS } from '@/constants'
import { Sparkles } from '@/components/ui/sparkles'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

useHead({
  title: 'Hubungi Kami',
  meta: [
    {
      name: 'description',
      content:
        'Hubungi tim Sarando untuk diskusi proyek, konsultasi IT, atau pertanyaan lainnya. Kami siap membantu mewujudkan solusi digital Anda.',
    },
  ],
})

// Data API: Kontak & Layanan
const { data: contact } = await useContact()
const { data: services } = await useServices()
const { formatRupiah } = useCurrency()
const route = useRoute()
// State Form
const contactMethod = ref<string>('whatsapp')
const selectedServiceId = ref<string>(route.query.service?.toString() || '')
const selectedPackageId = ref<string>(route.query.package?.toString() || '')

const form = reactive({
  name: '',
  email: '',
  message: '',
})

// Computed: Paket berdasarkan Layanan yang dipilih
const availablePackages = computed(() => {
  if (!services.value || !selectedServiceId.value) return []
  const service = services.value.find(
    s => s.id.toString() === selectedServiceId.value,
  )
  return service?.prices || []
})

// Reset Paket jika Layanan berubah
watch(selectedServiceId, () => {
  selectedPackageId.value = ''
})

const isLoading = ref(false)

// Function Submit
const handleSubmit = async () => {
  isLoading.value = true

  // Construct Message
  let messageBody = `Halo Sarando, perkenalkan saya ${form.name}.`

  if (selectedServiceId.value && services.value) {
    const serviceName = services.value.find(
      s => s.id.toString() === selectedServiceId.value,
    )?.name
    messageBody += `\n\nSaya tertarik dengan layanan: *${serviceName}*`

    if (selectedPackageId.value && availablePackages.value) {
      const pkg = availablePackages.value.find(
        p => p.id.toString() === selectedPackageId.value,
      )
      if (pkg) {
        messageBody += `\nPaket: *${pkg.package_name} - ${formatRupiah(pkg.price)}*`
      }
    }
  }

  messageBody += `\n\n${form.message}`

  // 1. Logic WhatsApp
  if (contactMethod.value === 'whatsapp') {
    const phone = contact.value?.phone ?? ''
    // Format: remove non-digit, ensure starts with 62
    let formattedPhone = phone.replace(/\D/g, '')
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1)
    }

    // Add email to message if provided
    if (form.email) {
      messageBody += `\n\nEmail saya: ${form.email}`
    }

    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageBody)}`

    window.open(url, '_blank')
    isLoading.value = false
    return
  }

  // 2. Logic Email (mailto)
  const email = contact.value?.email ?? ''
  const subject = encodeURIComponent(`Pesan dari ${form.name}`)
  const body = encodeURIComponent(messageBody)
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank')
  isLoading.value = false
}

const faqItems = FAQ_ITEMS
</script>

<template>
  <main class="min-h-screen bg-background relative overflow-hidden">
    <!-- ============================================ -->
    <!-- HERO SECTION: Consistent with Layanan & Portofolio -->
    <!-- ============================================ -->
    <section
      class="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      <!-- Background Sparkles -->
      <div class="absolute inset-0 w-full h-full">
        <ClientOnly>
          <Sparkles
            :key="$colorMode.value"
            background="transparent"
            :min-size="0.6"
            :max-size="1.4"
            :particle-density="100"
            class="w-full h-full"
            :particle-color="
              $colorMode.value === 'dark' ? '#FFFFFF' : '#000000'
            "
          />
        </ClientOnly>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-6">
        <h1
          class="text-3xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 mb-6"
        >
          HUBUNGI <span class="text-primary">KAMI</span>
        </h1>
        <div class="max-w-2xl mx-auto">
          <TextGenerateEffect
            words="Punya ide brilian atau masalah bisnis yang butuh solusi digital? Diskusikan dengan kami. Kami tidak hanya membuat kode, kami membangun solusi."
            class="text-base md:text-xl text-muted-foreground font-light leading-relaxed"
            :duration="0.3"
          />
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- CONTENT GRID (Info & Form) -->
    <!-- ============================================ -->
    <section class="container max-w-7xl mx-auto px-6 pb-32 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <!-- LEFT COLUMN: CONTACT INFO & FAQ -->
        <div class="space-y-10">
          <div class="space-y-6">
            <h2 class="text-3xl font-bold tracking-tight">
              Informasi Kontak
            </h2>
            <p class="text-muted-foreground">
              Jangan ragu untuk menghubungi kami melalui saluran di bawah ini
              atau kunjungi kantor kami.
            </p>
          </div>

          <div class="grid gap-6">
            <!-- Address Card -->
            <div
              class="group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-muted/50 border border-transparent hover:border-border/50"
            >
              <div
                class="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <MapPin class="w-6 h-6" />
              </div>
              <div class="space-y-1">
                <h3 class="font-semibold text-foreground">
                  Kantor Kami
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  {{ contact?.address }}
                </p>
              </div>
            </div>

            <!-- Email Card -->
            <a
              :href="`mailto:${contact?.email}`"
              class="group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-muted/50 border border-transparent hover:border-border/50"
            >
              <div
                class="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <Mail class="w-6 h-6" />
              </div>
              <div class="space-y-1">
                <h3 class="font-semibold text-foreground">Email</h3>
                <p
                  class="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                >
                  {{ contact?.email }}
                </p>
              </div>
            </a>

            <!-- Phone Card -->
            <a
              :href="contact?.phone ? `https://wa.me/${contact.phone.replace(/\D/g, '').replace(/^0/, '62')}` : '#'"
              target="_blank"
              class="group flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-muted/50 border border-transparent hover:border-border/50"
            >
              <div
                class="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <Phone class="w-6 h-6" />
              </div>
              <div class="space-y-1">
                <h3 class="font-semibold text-foreground">
                  Telepon / WhatsApp
                </h3>
                <p
                  class="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                >
                  {{ contact?.phone }}
                </p>
              </div>
            </a>
          </div>

          <!-- FAQ Section -->
          <div class="pt-8 border-t border-border/50">
            <h3 class="text-xl font-bold mb-6">
              Pertanyaan Umum (FAQ)
            </h3>
            <Accordion
              type="single"
              collapsible
              class="w-full"
            >
              <AccordionItem
                v-for="item in faqItems"
                :key="item.value"
                :value="item.value"
              >
                <AccordionTrigger class="text-left font-medium">
                  {{
                    item.title
                  }}
                </AccordionTrigger>
                <AccordionContent class="text-muted-foreground leading-relaxed">
                  {{ item.content }}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <!-- RIGHT COLUMN: CONTACT FORM -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 20 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500 } }"
        >
          <Card class="border-border/50 shadow-2xl bg-card/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda
                kembali.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                class="space-y-4"
                @submit.prevent="handleSubmit"
              >
                <!-- 1. Contact Method -->
                <div class="grid gap-2">
                  <Label for="method">Metode Kontak</Label>
                  <Select v-model="contactMethod">
                    <SelectTrigger
                      class="w-full bg-background/50 h-10 md:h-12 border-muted focus:ring-primary"
                    >
                      <SelectValue placeholder="Pilih metode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="whatsapp">
                          WhatsApp (Fast Response)
                        </SelectItem>
                        <SelectItem value="email">
                          Email
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <!-- 2. Services Selection (Optional) -->
                <div class="grid gap-2">
                  <div class="flex items-center justify-between">
                    <Label for="service">Tertarik Layanan Apa?
                      <span
                        class="text-muted-foreground font-normal text-xs ml-1"
                      >(Opsional)</span></Label>
                    <Button
                      v-if="selectedServiceId"
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
                      @click="selectedServiceId = ''"
                    >
                      Reset
                    </Button>
                  </div>
                  <Select v-model="selectedServiceId">
                    <SelectTrigger
                      class="w-full bg-background/50 h-10 md:h-12 border-muted focus:ring-primary"
                    >
                      <SelectValue placeholder="Pilih Layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="service in services"
                          :key="service.id"
                          :value="service.id.toString()"
                        >
                          {{ service.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <!-- 3. Package Selection (Conditional & Optional) -->
                <div
                  v-if="selectedServiceId && availablePackages.length > 0"
                  class="grid gap-2 animate-in fade-in slide-in-from-top-2"
                >
                  <div class="flex items-center justify-between">
                    <Label for="package">Pilih Paket
                      <span
                        class="text-muted-foreground font-normal text-xs ml-1"
                      >(Opsional)</span></Label>
                    <Button
                      v-if="selectedPackageId"
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
                      @click="selectedPackageId = ''"
                    >
                      Reset
                    </Button>
                  </div>
                  <Select v-model="selectedPackageId">
                    <SelectTrigger
                      class="w-full bg-background/50 h-10 md:h-12 border-muted focus:ring-primary"
                    >
                      <SelectValue placeholder="Pilih Paket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="pkg in availablePackages"
                          :key="pkg.id"
                          :value="pkg.id.toString()"
                        >
                          {{ pkg.package_name }} - {{ formatRupiah(pkg.price) }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <!-- 4. Name -->
                <div class="grid gap-2">
                  <Label for="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    v-model="form.name"
                    placeholder="Masukkan nama Anda"
                    required
                    class="bg-background/50 h-10 md:h-12 border-muted focus-visible:ring-primary"
                  />
                </div>

                <!-- 5. Email (Conditional) -->
                <div
                  v-if="contactMethod === 'email'"
                  class="grid gap-2 animate-in fade-in slide-in-from-top-2"
                >
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    required
                    class="bg-background/50 h-10 md:h-12 border-muted focus-visible:ring-primary"
                  />
                </div>

                <!-- 6. Message -->
                <div class="grid gap-2">
                  <Label for="message">Pesan</Label>
                  <Textarea
                    id="message"
                    v-model="form.message"
                    placeholder="Ceritakan sedikit tentang kebutuhan Anda..."
                    class="min-h-37.5 bg-background/50 resize-none p-4 border-muted focus-visible:ring-primary"
                    required
                  />
                </div>

                <!-- Submit -->
                <Button
                  type="submit"
                  class="w-full h-10 md:h-12 text-base font-medium"
                  :disabled="isLoading"
                >
                  <Loader2
                    v-if="isLoading"
                    class="mr-2 h-4 w-4 animate-spin"
                  />
                  <template v-else>
                    {{
                      contactMethod === "whatsapp"
                        ? "Kirim via WhatsApp"
                        : "Kirim Pesan"
                    }}
                    <Send class="ml-2 h-4 w-4" />
                  </template>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </main>
</template>
