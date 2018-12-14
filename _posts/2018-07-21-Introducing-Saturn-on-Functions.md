---
layout: post
title: "Introducing Saturn on Functions"
description: "Introducing Saturn on Functions"
modified: 2018-07-21
tags: [F#, Saturn, Web, Azure Functions]
banner_image: landscape_3.jpg
---

# Introduction

Azure Functions is a service that provides serverless execution model while running code in the cloud. Serverless model is getting more and more popular nowadays, being great solution for building distributed, scalable, event-driven applications. However, those are not the only use cases - compute-on-demand story, automatic, low friction scalability and great pricing model means that Azure Functions can be used to host normal (REST-ish) APIs.

On the other hand, Saturn is new F# web framework that provides flexible, high level model of creating web applications using principles of functional programming and MVC architectural pattern. Main design goals of Saturn includes high level abstractions that lets developers focus on creating business code , and general developer experience.

<!--more-->

# Saturn on Functions

Today I want to introduce new extension to Saturn that adds ability to easily host Saturn controllers and routers inside Azure Functions HTTP triggers. Saturn is a library built on top of Giraffe and ASP.NET Core which means it can easily integrate with existing .Net ecosystem. HTTP triggers in Azure Functions as one of the input parameters are getting standard `HttpRequest` object that can be passed into Saturn's `controller` or `router` (and any other `HttpHandler`).

# Computation Expression

To reduce amount of boilerplate required to call any `HttpHandler` and provide, in Saturn's spirit, opinionated way of hosting your controllers in Azure Functions we've created `Saturn.AzureFunctions` project that adds new computation expression  - ` azureFunction`

Example:

```
let testCntl = controller {
    index (fun ctx -> Controller.text ctx "Hello world")
    show (fun ctx id -> id |> sprintf "Hello world, %s" |> Controller.text ctx)
}
let func log = azureFunction {
    host_prefix "/api"
    use_router testCntl
    logger log
    error_handler customErrorHandler
    not_found_handler customNotFoundHandler
}
```

`azureFunction` CE provides set of custom operations that can be used to configure Azure Functions adapter:
* `host_prefix`  -  prefix of the routes used by Azure Functions. By default Functions are using `/api` prefix.
* `use_router`  -  plugs `HttpHandler` that will be used. Setting it is required.
* `logger ` -  enables passing `TraceWriter` into your `HttpHandler` . It's passed into your functions by `ctx.Items.["TraceWriter"]` property. It's also used for logging error in default error handler.
* `error_handler`  -  enables plugging custom error handler for unhandled exceptions.
* `not_found_handler`  -  enables plugging custom handler for not matched requests.

# Using it together

`azureFunction` CE is transformed into a function that accepts `HttpRequest` as an input and returns `Task<HttpResponse> ` -  something that is understood by Functions runtime, and as such can be easily used in normal Azure Functions endpoint.

For example using `azureFunction` defined above would look like this:

```
[<FunctionName("HelloWorld")>]
let helloWorld ([<HttpTrigger(Extensions.Http.AuthorizationLevel.Anonymous, Route = "{route?}")>]req: HttpRequest, log: TraceWriter) =
    func log req
```

# Summary

In this post I've presented new way of hosting your Saturn applications - using Azure Functions. As you can see Saturn will provide easy to use, opinionated way to embed Saturn controllers or routers in Azure Functions providing great, alternative way of hosting your web applications. 

`Saturn.AzureFunctions` is currently still developed - if you'd like to check out current implementation, test it, or provide some feedback feel free to check this PR -  https://github.com/SaturnFramework/Saturn/pull/121