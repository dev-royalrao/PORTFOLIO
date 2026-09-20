// Run with: npm test  (node's built-in runner, no dependencies)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { val, profile } from './data.js'

test('a missing or blank var falls back', () => {
  assert.equal(val(undefined, 'Royal Rao'), 'Royal Rao')
  assert.equal(val('', 'Royal Rao'), 'Royal Rao') // the bug: a copied, unfilled .env
  assert.equal(val('   ', 'Royal Rao'), 'Royal Rao')
})

test('a set var wins over the fallback', () => {
  assert.equal(val('Someone Else', 'Royal Rao'), 'Someone Else')
  assert.equal(val('  padded  ', 'Royal Rao'), 'padded')
})

test('optional fields stay blank so the feature hides', () => {
  assert.equal(val(''), '')
  assert.equal(val(undefined), '')
})

test('profile still populates with no .env at all', () => {
  assert.ok(profile.name)
  assert.ok(profile.email)
  assert.ok(profile.photo)
  assert.equal(profile.phone, '') // hidden by default
})
