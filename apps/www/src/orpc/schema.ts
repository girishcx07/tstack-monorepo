import * as v from 'valibot';

export const TodoSchema = v.object({
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  name: v.pipe(v.string(), v.minLength(1)),
});
