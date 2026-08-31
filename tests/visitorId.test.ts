import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { getVisitorId } from '../src/lib/visitorId.ts'

const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, 'crypto')
const originalLocalStorage = Object.getOwnPropertyDescriptor(
  globalThis,
  'localStorage',
)

function setBrowserGlobal(name, value) {
  Object.defineProperty(globalThis, name, {
    configurable: true,
    value,
  })
}

function restoreBrowserGlobal(name, descriptor) {
  if (descriptor) {
    Object.defineProperty(globalThis, name, descriptor)
  } else {
    delete globalThis[name]
  }
}

afterEach(() => {
  restoreBrowserGlobal('crypto', originalCrypto)
  restoreBrowserGlobal('localStorage', originalLocalStorage)
})

test('creates and stores an anonymous visitor ID', () => {
  const stored = new Map()
  setBrowserGlobal('crypto', {
    randomUUID: () => 'generated-id',
  })
  setBrowserGlobal('localStorage', {
    getItem: (key) => stored.get(key) ?? null,
    setItem: (key, value) => stored.set(key, value),
  })

  assert.equal(getVisitorId(), 'anon-generated-id')
  assert.equal(stored.get('_anon_vid'), 'anon-generated-id')
})

test('returns the stored visitor ID on later visits', () => {
  let generated = false
  setBrowserGlobal('crypto', {
    randomUUID: () => {
      generated = true
      return 'unused-id'
    },
  })
  setBrowserGlobal('localStorage', {
    getItem: () => 'anon-returning-visitor',
    setItem: () => undefined,
  })

  assert.equal(getVisitorId(), 'anon-returning-visitor')
  assert.equal(generated, false)
})

test('creates an ID when randomUUID is unavailable', () => {
  const stored = new Map()
  setBrowserGlobal('crypto', {})
  setBrowserGlobal('localStorage', {
    getItem: (key) => stored.get(key) ?? null,
    setItem: (key, value) => stored.set(key, value),
  })

  const visitorId = getVisitorId()

  assert.match(visitorId, /^anon-[a-z0-9]+$/)
  assert.equal(stored.get('_anon_vid'), visitorId)
})

test('returns an ID when localStorage is unavailable', () => {
  setBrowserGlobal('crypto', {
    randomUUID: () => 'session-id',
  })
  setBrowserGlobal('localStorage', {
    getItem: () => {
      throw new Error('Storage is blocked')
    },
  })

  assert.equal(getVisitorId(), 'anon-session-id')
})
