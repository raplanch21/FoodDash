declare const pendo: {
  initialize(options: { visitor: { id: string } }): void
  track(name: string, properties?: Record<string, unknown>): void
}
