---
layout: post
title: "Building an MVP with F# and Saturn"
description: "Building an MVP with F# and Saturn"
modified: 2018-08-16
tags: [F#, Saturn, Web, MVP]
banner_image: landscape_13.jpg
---


# Building an MVP with F# and Saturn

Creating an MVP (minimum viable product) is one of the best way of bootstrapping your startup. As a new company getting a quick feedback from the application users, bringing an application to users as fast as possible, being able to adapt as quickly as possible to the market changes, and providing frequent application updates is crucial for the initial success of the product. But it's also important to understand that an MVP software development is not synonymous with unfinished or a primitive product that was created in a hurry.

<!--more-->

### What is an MVP?

Minimum Viable Product (MVP) is the smallest, most concise version of your product you can initially release for feedback. It enables a full turn of the feedback loop with the least amount of development time and effort. This allows the targeted users to try a product and evaluate it to make the complete version better. It is a frequently updated environment with the new features that could be seen and tested by clients. New registration page, an admin management panel, as well as email notifications, and any other new features you can imagine.

MVP development allows early adopters to understand the vision or promise of the final product and provide valuable feedback to guide developers moving forward. The main advantages of the MVP software development are:

* MVP has enough value that people can already use or buy it

* It demonstrates enough features to hook and retain early users

* It provides feedback loop to guide future development

* It shows enough future potential to start marketing around the project

What's important - MVP development is not only the strategy for startups. When you already have well-established company and customers, you also need to have some way to experiment with new potential products or features. In a lot of cases, the minimum viable product really is just a way to do that.

### Few words about F#

[F# is a functional-first programming language](https://fsharp.org) running on the .Net platform. Paired with [.Net Core](https://www.microsoft.com/net) - modern, cross platform implementation of the .Net Framework - it is fantastic tool for writing modern applications. .Net Core provides industrial level of the performance, security, huge ecosystem of the libraries, and always growing open source community. F#, itself an open source language with fantastic community , thanks to expressiveness, functional-first approach, great developers tooling and advanced language features provides unmatched developer experience and fast development speed, so important for building MVPs. It can also be your secret weapon that makes you stand out from many different companies, and that let you hire more talented people that just want to work with more niche technology.

### Introducing Saturn

F# due to its functional nature is perfect fit for the web applications. In the end HTTP web server may be treated as a function that takes Request and returns Response.

[Saturn](https://saturnframework.org) is a modern web framework for the F# focusing on high level abstractions and great developer experience, allowing developers focus on the things that matters for your business. Influenced by the popular frameworks such as Rails or Phoenix it comes with all the batteries included. Its ecosystem includes development tools that allows developers to quickly create new applications, add new features to existing applications, and test new features; it integrates with existing [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.1) ecosystem that provides huge set of existing modules that you can use in your application; it provides pre-defined configurations that limits the number of decisions that developers need to make. And all this while using highly expressive and modern programming language.

### Typical difficulties

While MVP development is really powerful technique, just like every other methodology it has its own drawbacks. First of all you need to understand it's not about delivering product as fast as possible so customers can try it out. MVP development is about refined and validated learning. This simple fact must be understood by everyone - stakeholders, developers, customers. You have to understand that final product may drastically change due to user's feedback. And this is something that must be embraced by the development team, and should impact the way in which they work. Developers needs to have regular feedback session, learn from them, prioritise features.

As a result, this should have an impact on the technologies chosen for developing MVP:

* refactoring plays the key roles, when you see that some part of the product is not scalable or flexible enough, or that it just need changes based on the user's feedback you need to be able to quickly change an existing code base

* correctness is important, especially the one you can get for free. Using static type checking, code linting, and code quality tools is crucial to provide product that's working well enough, without spending much development time on it

* flexible but simple design - design of your product must be flexible enough to provide ability to change the product based on the feedback, but at the same time it must be relatively simple - for MVP development you want to get to the market as fast as possible, and you don't want to spend time building sophisticated architecture that may not work after all changes that will happen in the future

Fortunately, F# and .Net Core are great solutions for all those problems - functional first approach naturally pushes you toward pit of success, and simple, flexible architecture, static typing with powerful type inference enables you to create correct software without much overhead, best in class editor tooling helps you to quickly refactor existing code.

### Commercial support

The last important factor in choosing right technology is having an ability to hire someone to develop the product, or just get help. F# ecosystem is including wide range of the options for getting commercial support - starting from the established companies providing support for [SAFE Stack](https://safe-stack.github.io) through multiple independent consultants to [Lambda Factory](https://lambdafactory.io). Lambda Factory specialises in creating web applications, F# training and consulting, MVP development, and developer relationships. We provide everything you need to transform your startup into prospecting business - help with creating MVP, iterating over the feedback loop, hiring talented developers, and DevRel marketing.
