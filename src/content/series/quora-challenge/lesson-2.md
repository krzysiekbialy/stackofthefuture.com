---
layout: post
title: Lesson 2
image: lesson2.png
author: Artur Czemiel
video: lesson2.mp4
draft: false
inseries:
  index: 2
  series: quora-challenge
date: 2019-03-10T10:00:00.000Z
tags:
  - quora
  - graphql
  - javascript
---

In this lesson you will learn how to create components based on data you receive from GraphQL.

#### Code used in this Lesson

##### css
```css
.Query-questions{
    background: #eee;
    padding: 20px;
}

.Question{
    margin: 20px;
    background: white;
    padding: 10px;
    box-shadow: #0001 0px 0px 3px;
    display: flex;
    flex-flow: column;
}

.Question-title{
    order:0;
    margin-bottom: 20px;
    font-weight: bolder;
}
.Question-author{
    order:1;
    margin-bottom: 20px;
}
.Question-content{
    order:2
}
.Author{
    display: flex;
    flex-flow:  row nowrap;
}

.Author-avatar{
    width: 50px;
    border-radius: 25px;
    margin-right: 10px;
}
```

##### js
```js
dryad = {
    Author:{
        avatar: v => `<img src="${v.value}" class="${v.className}" />`
    },
}
```

##### gql
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