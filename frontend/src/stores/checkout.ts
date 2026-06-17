import { defineStore } from 'pinia'

import { computed, ref } from 'vue'

import type { CheckoutForm, CheckoutStep } from '@/types'

import { useCartStore } from './cart'

import { apiFetch } from '@/api/client'



const DELIVERY_FEE = 250



const defaultForm = (): CheckoutForm => ({

  fullName: '',

  email: '',

  phone: '',

  orderType: 'pickup',

  address: '',

  notes: '',

  locationId: 'siwaka-plaza',

})



export const useCheckoutStore = defineStore('checkout', () => {

  const step = ref<CheckoutStep>('details')

  const form = ref<CheckoutForm>(defaultForm())

  const orderPlaced = ref(false)

  const lastOrderId = ref<number | null>(null)

  const orderReference = ref('')

  const isPlacingOrder = ref(false)

  const error = ref('')

  const promoCode = ref('')

  const promoDiscount = ref(0)

  const promoMessage = ref('')



  const deliveryFee = computed(() =>

    form.value.orderType === 'delivery' ? DELIVERY_FEE : 0,

  )



  function totalWithFees(subtotal: number) {

    return Math.max(0, subtotal - promoDiscount.value) + deliveryFee.value

  }



  async function applyPromo(subtotal: number) {

    promoMessage.value = ''

    promoDiscount.value = 0

    if (!promoCode.value.trim()) return



    try {

      const res = await apiFetch<{ data: { discount: number } }>('/api/promotions/validate', {

        method: 'POST',

        json: { code: promoCode.value.trim(), subtotal },

      })

      promoDiscount.value = res.data.discount

      promoMessage.value = `Promo applied — saved KES ${res.data.discount}`

    } catch (e: any) {

      promoDiscount.value = 0

      promoMessage.value = e?.message || 'Invalid promo code.'

      throw e

    }

  }



  function nextStep() {

    if (step.value === 'details') step.value = 'fulfillment'

    else if (step.value === 'fulfillment') step.value = 'confirm'

  }



  function prevStep() {

    if (step.value === 'confirm') step.value = 'fulfillment'

    else if (step.value === 'fulfillment') step.value = 'details'

  }



  function goToStep(target: CheckoutStep) {

    step.value = target

  }



  async function placeOrder() {

    const cart = useCartStore()

    error.value = ''

    isPlacingOrder.value = true

    try {

      if (promoCode.value.trim()) {

        await applyPromo(cart.subtotal)

      }



      const res = await apiFetch<{

        data: { orderId: number; reference: string; authorizationUrl: string }

      }>('/api/checkout/initialize', {

        method: 'POST',

        json: {

          orderType: form.value.orderType,

          dropoffLocation: form.value.orderType === 'delivery' ? form.value.address : null,

          notes: form.value.notes || null,

          promoCode: promoCode.value.trim() || null,

          items: cart.items.map((i) => ({

            id: Number.parseInt(String(i.menuItem.id), 10),

            quantity: i.quantity,

          })),

        },

      })



      orderReference.value = res.data.reference

      window.location.href = res.data.authorizationUrl

    } catch (e: any) {

      error.value = e?.message || 'Failed to place order.'

    } finally {

      isPlacingOrder.value = false

    }

  }



  async function verifyPayment(reference: string) {

    error.value = ''

    isPlacingOrder.value = true

    try {

      const cart = useCartStore()

      const res = await apiFetch<{

        data: { orderId: number; paymentStatus: string; status: string }

      }>('/api/checkout/verify', {

        method: 'POST',

        json: { reference },

      })



      orderReference.value = reference

      orderPlaced.value = res.data.paymentStatus === 'paid'

      lastOrderId.value = res.data.orderId



      if (orderPlaced.value) {

        cart.clearCart()

      }



      return res.data

    } catch (e: any) {

      error.value = e?.message || 'Payment verification failed.'

      throw e

    } finally {

      isPlacingOrder.value = false

    }

  }



  function reset() {

    step.value = 'details'

    form.value = defaultForm()

    orderPlaced.value = false

    lastOrderId.value = null

    orderReference.value = ''

    isPlacingOrder.value = false

    error.value = ''

    promoCode.value = ''

    promoDiscount.value = 0

    promoMessage.value = ''

  }



  return {

    step,

    form,

    orderPlaced,

    lastOrderId,

    orderReference,

    isPlacingOrder,

    error,

    promoCode,

    promoDiscount,

    promoMessage,

    deliveryFee,

    totalWithFees,

    applyPromo,

    nextStep,

    prevStep,

    goToStep,

    placeOrder,

    verifyPayment,

    reset,

  }

})


