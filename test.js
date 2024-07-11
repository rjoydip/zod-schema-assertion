const { test } = require('uvu');
const assert = require('uvu/assert');
const { z } = require('zod');

const exampleSchema = z.object({
  name: z.string(20),
  age: z.number(),
  address: z.string(1000),
});

test('validate data', () => {
  const safe = exampleSchema.safeParse({
    name: 'John',
    age: 11,
    address: '4203 Hewes Avenue',
  });
  assert.equal(safe.success, true);
  assert.equal(safe.data, {
    name: 'John',
    age: 11,
    address: '4203 Hewes Avenue',
  });
});

test('validate age', () => {
  const safe = exampleSchema.safeParse({
    name: 'John',
    age: 11,
    address: '4203 Hewes Avenue',
  });
  assert.equal(safe.success, true);
  assert.equal(safe.data.age, 11);
});

test('validate invalid age', () => {
  try {
    exampleSchema.parse({
      name: 'John',
      age: '11',
      address: '4203 Hewes Avenue',
    });
  } catch (err) {
    assert.instance(err, Error);
    assert.equal(err.issues.length, 1);
    assert.match(err.issues[0].message, 'Expected number, received string');
  }
});

test('validate missing address data', () => {
  assert.throws(() =>
    stringSchema
      .refine((data) => {
        throw new Error(data);
      })
      .safeParse({
        name: 'John',
        age: 11,
      })
  );
});

test.run();
