/**
 * The order tracking timeline.
 *
 * Stages are keyed off elapsed time since `placedAt`, so progress is a pure
 * function of the clock. Demo speed is deliberately compressed: an order goes
 * from confirmed to delivered in well under a minute.
 */

import type { Fulfillment, Order } from './store'

export type StageId = 'confirmed' | 'preparing' | 'moving' | 'done'

export type Stage = {
  id: StageId
  /** Elapsed ms at which this stage begins. */
  startsAt: number
  label: Record<Fulfillment, string>
  detail: Record<Fulfillment, string>
}

export const STAGES: Stage[] = [
  {
    id: 'confirmed',
    startsAt: 0,
    label: { delivery: 'Order confirmed', pickup: 'Order confirmed' },
    detail: {
      delivery: 'The restaurant has your order.',
      pickup: 'The restaurant has your order.',
    },
  },
  {
    id: 'preparing',
    startsAt: 8_000,
    label: { delivery: 'In the kitchen', pickup: 'In the kitchen' },
    detail: {
      delivery: 'Your food is being cooked to order.',
      pickup: 'Your food is being cooked to order.',
    },
  },
  {
    id: 'moving',
    startsAt: 20_000,
    label: { delivery: 'On the way', pickup: 'Almost ready' },
    detail: {
      delivery: 'Your courier picked up the bag and is heading over.',
      pickup: 'Packing your bag for the counter.',
    },
  },
  {
    id: 'done',
    startsAt: 36_000,
    label: { delivery: 'Delivered', pickup: 'Ready for pickup' },
    detail: {
      delivery: 'Left at your door. Enjoy.',
      pickup: 'Waiting for you at the counter. Enjoy.',
    },
  },
]

export const TOTAL_DURATION = STAGES[STAGES.length - 1].startsAt

export function stageIndexAt(order: Order, now: number): number {
  const elapsed = now - order.placedAt
  let index = 0
  for (let i = 0; i < STAGES.length; i += 1) {
    if (elapsed >= STAGES[i].startsAt) index = i
  }
  return index
}

export function isDelivered(order: Order, now: number): boolean {
  return stageIndexAt(order, now) === STAGES.length - 1
}

/** 0–1 progress across the whole timeline, for the progress bar. */
export function progressAt(order: Order, now: number): number {
  const elapsed = now - order.placedAt
  return Math.min(1, Math.max(0, elapsed / TOTAL_DURATION))
}

/** Remaining minutes, scaled from demo seconds to the quoted ETA. */
export function minutesRemaining(order: Order, now: number): number {
  const remaining = 1 - progressAt(order, now)
  return Math.max(0, Math.round(order.etaMinutes * remaining))
}

const COURIERS = [
  'Maya R.',
  'Devin O.',
  'Priya S.',
  'Luca B.',
  'Noor A.',
  'Sam T.',
]

export function pickCourier(): string {
  return COURIERS[Math.floor(Math.random() * COURIERS.length)]
}
