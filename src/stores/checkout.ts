import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CheckoutForm, CheckoutStep } from '@/types'
import { useCartStore } from './cart'

const DELIVERY_FEE = 250

const defaultForm = (): CheckoutForm => ({
  fullName: '',
  email: '',
  phone: '',
  orderType: 'pickup',
  address: '',
  notes: '',
  locationId: 'westlands',
})

export const useCheckoutStore = defineStore('checkout', () => {
  const step = ref<CheckoutStep>('details')
  const form = ref<CheckoutForm>(defaultForm())
  const orderPlaced = ref(false)
  const orderReference = ref('')

  const deliveryFee = computed(() =>
    form.value.orderType === 'delivery' ? DELIVERY_FEE : 0,
  )

  function totalWithFees(subtotal: number) {
    return subtotal + deliveryFee.value
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

  function placeOrder() {
    const cart = useCartStore()
    orderReference.value = `TZEL-${Date.now().toString(36).toUpperCase()}`
    orderPlaced.value = true
    cart.clearCart()
  }

  function reset() {
    step.value = 'details'
    form.value = defaultForm()
    orderPlaced.value = false
    orderReference.value = ''
  }

  return {
    step,
    form,
    orderPlaced,
    orderReference,
    deliveryFee,
    totalWithFees,
    nextStep,
    prevStep,
    goToStep,
    placeOrder,
    reset,
  }
})
