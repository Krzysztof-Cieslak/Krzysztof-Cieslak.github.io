---
layout: post
title: "Reinventing MVC pattern for web programming with F#"
description: "Reinventing MVC pattern for web programming with F#"
modified: 2018-01-25
tags: [F#, Saturn, Web]
banner_image: landscape_9.jpg
---

# Introduction

Couple of weeks ago, I've posted [yet-another-controversial-tweet](https://twitter.com/k_cieslak/status/944349420937793536) - this time criticizing F# libraries for web programming and saying that "they focus on wrong problem". In this post I'd like to expand this thought a bit, describe what is, in my opinion, problem with those libraries, and introduce project that will try to fix those problems.

> DISCLAIMER: In original tweet I've mentioned three libraries - [Suave](https://suave.io/), [Giraffe](https://github.com/giraffe-fsharp/Giraffe), and [Freya](https://freya.io/). First of all, if we were to talk about all major F# web solutions we should also mention [WebSharper](https://websharper.com/). Secondly, my experience with Freya and WebSharper is fairly limited - I've never used any of them in commercial application - so in this post I won't talk about them but focus on Suave and Giraffe

> DISCLAIMER 2: I really like both Suave and Giraffe - I've been using Suave for years in multiple commercial applications and I think it's really good project. Also I've been investigating and testing Giraffe for last couple of months and I also believe it's good project with bright future.

<!--more-->

# The model

So let's start with describing a programming model that Suave and Giraffe use. Both those libraries are using really similar model of building applications from small functions that takes `HttpContext` as an input and returns modified `HttpContext` and then they use combinators functions to combine those small functions and build application with them. This model is really powerful, it provides full control over the flow of the program, and follows some FP principles (building applications as a composition of functions).

> There are some small differences between Suave and Giraffe implementation of this model, but going into such details is not in scope of this post.

# The problem

While I love the programming model I also believe that both Suave and Giraffe missed an opportunity to build on top of this model. Helper functions provided by both libraries that are main building block of the applications are really "low level" - they mostly focus on details of HTTP protocol. And I think that while this is useful level of abstraction for some use cases, my experience with building business applications with Suave / Giraffe suggests that this is not a level of abstraction that's useful for typical, boring-line-of-business applications - and that's most common use case for most software developers. If we compare Suave / Giraffe with other ecosystems it too often feels like writing ASP.Net applications with just middleware - without using MVC / WebAPI abstractions, or writing Elixir web applications with just Plugs - without [Phoenix Framework](http://phoenixframework.org/). Of course there are cases where this lower level of abstraction is good choice, but success and popularity of such libraries like [Rails](http://rubyonrails.org/), ASP.Net MVC, or Phoenix shows us that developers want to use some higher level of abstraction and focus on solving their business domain problems instead of worrying about details of HTTP protocol.

# Developer experience

Previous paragraph has focused on technical issue but let's now move to something bit different. Working on OSS tooling for last couple of years has thought me one important thing - good user experience is sometimes valuable for project than technical superiority. I also strongly believe that tooling can be great way to allow people ramp up faster and to teach users some new concepts. Great example of that is [ReSharper](https://www.jetbrains.com/resharper/) - while it's not super poplar in F# community ( ;-) ) and some of the features for C# are probably overkill, I strongly believe that ReSharper is one of the most impactful source of information about new language features for C# developers - not every developer is following all news, conferences and announcements but it's hard to miss when tool that you use starts giving warnings and have automatic refactoring introducing new language features. In web space great example for such behavior is Phoenix - everything it does in regards of tooling, from new project template through opinionated structure of the project to generators that let users to scaffold some new controllers is designed to make introduction of most important concepts used in Phoenix easier for new developer.

I strongly believe that lack of opinionated tooling and opinionated, commonly used way to build web applications is another important issue of Suave and Giraffe. Developers don't want to focus on making decisions about structuring the project, or wonder how they need to combine things together, or what are best practices - they want to focus on problems of their business. Again, frameworks like Phoenix and Rails are great example of how having such opinionated way of building web applications works great in practice.

# Introducing Saturn

For last couple of weeks I've been working on [Saturn](https://github.com/SaturnFramework/Saturn) - new F# OSS projects that will attempt to solve problems mentioned above. It's strongly inspired by some concepts from Phoenix and tries to solve both problems mentioned above. Before going into details of Saturn important thing about is that it builds on top of existing ecosystem - and to be precise on top of Giraffe - in similar fashion that Phoenix builds on top of Plugs abstraction.

### Library

Core part of Saturn is a library that can be put on top of any existing Giraffe application. This library contains set of helper functions, tries to hide some complexity of Giraffe (for example manual passing of `next` in every function), and what's most important it introduces several higher level building blocks that can be used to model web application. Those building blocs are using nice high level, declarative DSLs using computation expressions using custom keywords. Currently in Saturn there exists 4 such higher level building blocks:

 * `pipeline` - simplest building block provided by Saturn. It's used to combine multiple `HttpHandlers` in more declarative way without using custom operators. It also provides custom operations that hides some of the Giraffe complexity.

Example:

```
let browser = pipeline {
    plug acceptHtml
    plug putSecureBrowserHeaders
    fetchSession
    set_header "x-pipeline-type" "Browser"
}
```

 * `scope` - it is a DSL used to define routing and combing this routing together with the `pieplines`

Example:

```
let defaultView = scope {
    get "/" (renderHtml Index.layout)
    get "/index.html" (redirectTo false "/")
    get "/default.html" (redirectTo false "/")
}

let browserRouter = scope {
    error_handler (renderHtml NotFound.layout) //Use the default 404 webpage
    pipe_through browser //Use the default browser pipeline

    forward "" defaultView //Use the default view
}
```

* `controller` - it's and DSL for building typical HTTP controllers. It's using predefined routing inspired by Phoenix's `resource` macro. It's highest level building block provided by Saturn

Example:

```
let resource = controller {
    index indexAction
    show showAction
    add addAction
    edit editAction
    create createAction
    update updateAction
    delete deleteAction
}
```
Example:

 * `application` - it's a DSL used for defining application settings and ASP.Net configuration. It aims to replace cumbersome configuration of some ASP.Net features with declarative feature toggles.

```
let app = application {
    pipe_through endpointPipe

    error_handler (fun ex _ -> HttpHandlers.renderHtml (InternalError.layout ex))
    router Router.router
    url "http://0.0.0.0:8085/"
    memory_cache
    use_static "static"
    use_gzip
}
```

The important thing about Saturn's computation expression and those higher level building blocks - `pipeline`, `scope` and `controller` are not introducing any additional abstraction in terms of types - they are transformed to standard Giraffe's `HttpHandler` which means they are composable with each other and with other, existing `HttpHandlers` you can have.

### Tooling

The other, as important as core library, part of Saturn is additional, opinionated tooling for scaffolding new projects, generating controllers, models, database layer and migration scripts, controlling database migrations etc.

This tooling comes in 2 parts - first one is project template that creates default project structure, and set of helper files. This is normal `dotnet` project template distributed through NuGet which means you will be able to use `dotnet new saturn` to create Saturn application. The second part of the tooling is `dotnet` extension tool, again, distributed by NuGet. It's automatically referenced when creating new Saturn project using template so after creating new project you will be able to go to folder with project and run, for example, `dotnet saturn gen` command to generate new controller, views, model and database layer.

### Design choices

Some parts of Saturn library and whole tooling is really opinionated - for example there is no choice to change a way routing for `controller` is created, you can just decide not to implement some of the actions. This may seem restrictive at first, but I strongly believe that it's good design for most common use cases. And since everything is based on composable `HttpHandler` model if the default implementation of `controller` is not working for you you can easily recreate it with lower level abstraction such as `scope` DSL.

Similarly the tooling is really opinionated - default template out of the box uses [Paket](https://fsprojects.github.io/Paket/) for dependency management, [FAKE](https://fake.build/) for build script, [Dapper](https://github.com/StackExchange/Dapper) for data access, [Simple.Migrations](https://github.com/canton7/Simple.Migrations) to handle database migrations. The `dotnet saturn` tool generates code assuming certain project structure created by default template, and probably won't work in other situation.

### Resources

Both Saturn library and tooling are open-source projects that can be found on GitHub and NuGet:

  * Saturn library - https://github.com/SaturnFramework/Saturn and https://www.nuget.org/packages/Saturn/

  * Saturn template - https://github.com/SaturnFramework/Saturn.Template and https://www.nuget.org/packages/Saturn.Template/

  * Saturn `dotnet` tool - https://github.com/SaturnFramework/Saturn.Dotnet and https://www.nuget.org/packages/Saturn.Dotnet/

  * Saturn sample project - https://github.com/SaturnFramework/Saturn.Sample

# Summary

In this post I've tried to point out some problems of Suave and Giraffe and explain why I've decided to create new library for web programming with F#.