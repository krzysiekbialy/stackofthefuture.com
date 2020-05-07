---
layout: post
title: Lesson 1
image: lesson1.png
author: Artur Czemiel
video: lesson1.mp4
draft: false
inseries:
  index: 1
  series: quora-challenge
date: 2019-03-10T10:00:00.000Z
tags:
  - quora
  - graphql
  - nodejs
  - typescript
---

In this lesson you will learn how to create basic GraphQL schema. After that we will deploy a mock backend out of it and proceed to GraphiQL playground to learn GraphQL Query Language.

#### Code used in this Lesson

Full schema is available [here](https://app.graphqleditor.com/stack-of-the-future/quora-challenge-lesson-01).


##### Questions.gql
```graphql
{
  questions{
    author{
      avatar
      username
    }
    content
    title
  }
}
```