---
layout: post
title: Pizza 3 - Coding Backend in TS
image: pizza-3.png
author: Artur Czemiel
video: pizza-3.mp4
draft: false
inseries:
  index: 3
  series: pizza
date: 2019-04-30T10:00:00.000Z
tags:
  - graphql
  - nodejs
  - typescript
---

In this lesson you will learn how to code resolvers to repair generated ones to fit our needs. 

#### Code used in this Lesson


##### Query/pizzas.ts
```ts
import { FieldResolveInput, FieldResolveOutput } from 'stucco-js';
import { PizzaCollection } from '../db/collections';
import { DB } from '../db/mongo';
import { Utils } from '../Utils';
import { Pizza } from '../graphql-zeus';

export const handler = async (input: FieldResolveInput): Promise<FieldResolveOutput> => {
  const db = await DB();
  const col = await db.collection(PizzaCollection);
  return Utils.CursorToGraphQLArray<Pizza>(await col.find({}));
}
```

##### Mutation/addPizza.ts
```ts
import { FieldResolveInput, FieldResolveOutput } from 'stucco-js';
import { PizzaCollection } from '../db/collections';
import { DB } from '../db/mongo';
import { Pizza, ResolverType, ValueTypes } from '../graphql-zeus';
import { Utils } from '../Utils';

export const handler = async (input: FieldResolveInput): Promise<FieldResolveOutput> => {
  const args = input.arguments as ResolverType<ValueTypes['Mutation']['addPizza']>;
  const db = await DB();
  const col = await db.collection(PizzaCollection);
  const inserted = await col.insertOne(args.pizza);
  return Utils.mongoToGraphQL<Pizza>({
    ...args.pizza,
    id: inserted.insertedId,
  });
};
```
##### Mutation/removePizza.ts
```ts
import { FieldResolveInput, FieldResolveOutput } from 'stucco-js';
import { PizzaCollection } from '../db/collections';
import { DB } from '../db/mongo';
import { ResolverType, ValueTypes } from '../graphql-zeus';
import { ObjectID } from 'bson';

export const handler = async (input: FieldResolveInput): Promise<FieldResolveOutput> => {
  const {
    pizza: { id },
  } = input.arguments as ResolverType<ValueTypes['Mutation']['removePizza']>;
  const db = await DB();
  const col = await db.collection(PizzaCollection);
  await col.deleteOne({ _id: new ObjectID(id) });
  return true;
};
```
##### Mutation/updatePizza.ts
```ts
import { FieldResolveInput, FieldResolveOutput } from 'stucco-js';
import { PizzaCollection } from '../db/collections';
import { DB } from '../db/mongo';
import { ResolverType, ValueTypes } from '../graphql-zeus';
import { Utils } from '../Utils';
import { ObjectID } from 'bson';

export const handler = async (input: FieldResolveInput): Promise<FieldResolveOutput> => {
  const {
    pizza: { id, ...args },
  } = input.arguments as ResolverType<ValueTypes['Mutation']['updatePizza']>;
  const db = await DB();
  const col = await db.collection(PizzaCollection);
  const o = await col.findOneAndUpdate(
    { _id: new ObjectID(id) },
    { $set: args },
    { upsert: true, returnOriginal: false },
  );
  return Utils.mongoToGraphQL(o.value);
};
```
