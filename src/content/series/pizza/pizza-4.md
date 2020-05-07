---
layout: post
title: Pizza 4 - Playing with backend
image: pizza-4.png
author: Artur Czemiel
video: pizza-4.mp4
draft: false
inseries:
  index: 4
  series: pizza
date: 2019-04-30T10:00:00.000Z
tags:
  - graphql
  - nodejs
  - typescript
---

In this lesson you will finally "eat your pizza" through playing with pizza menu backend.

#### Code used in this Lesson

##### Menu.gql
```graphql
{
  pizzas{
    name
    desciption
    price
    id
  }
}
```
##### AddPizza.gql
```graphql
mutation {
  addPizza({
    pizza:{
      price: 2000,
      name: "Capriciosa",
      description: "dough, cheese, mushrooms, ham, tomatoes"
    }
  })
}
```
##### UpdatePizza.gql
```graphql
mutation {
  updatePizza({
    pizza:{
      id: "Id returned from menu",
      price: 3000
    }
  })
}
```
##### RemovePizza.gql
```graphql
mutation {
  removePizza({
    pizza:{
      id: "Id returned from menu"
    }
  })
}
```