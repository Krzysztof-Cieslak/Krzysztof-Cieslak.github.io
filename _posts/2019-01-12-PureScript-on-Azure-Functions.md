---
layout: post
title: "PureScript on Azure Functions"
description: "PureScript on Azure Functions"
modified: 2019-01-12
tags: [PureScript, Azure, Serverless, Azure Functions]
banner_image: landscape_3.jpg
---

# PureScript on Azure Functions

Serverless architecture is one of the hottest topics in cloud computing,
allowing developers to build and run applications and services without thinking
about the servers actually running the code, providing a scalable model for
building distributed, event-driven systems, as well as significantly reducing
operational costs.

Microsoft’s take on the serverless problem is service called [Azure
Functions](https://docs.microsoft.com/en-us/azure/azure-functions/). Out of the
box, it supports .Net languages (C# and [F#](https://fsharp.org/)), Python, Java
and JavaScript. The last one is very important, as nowadays there exist a wide
variety of languages that can compile down to JS. And today, I’ll talk about one
of such languages — PureScript.

[PureScript](http://www.purescript.org/) is a strongly-typed, purely functional
programming language heavily inspired by [Haskell](https://www.haskell.org/). It
supports a set of advanced language features such as higher kinded types, type
classes, row polymorphism and many other features I don’t understand.

<!--more-->

#### Requirements

To get started with Azure Functions and PureScript you need to install several
dependencies. First of all, you need [Node.JS and NPM](http://nodejs.org/) as it
is the runtime for Azure Functions, and is used by the PureScript toolchain.
Secondly, you need PureScript itself — you can download and install it using npm
with `npm install -g purescript`. Next thing is some additional PureScript
tooling, you can get it with `npm install -g bower pulp`. In the end, you also
need to install Azure Functions tooling that will enable you to build and test
your serverless application locally. This tooling can be found on GitHub —
[https://github.com/Azure/azure-functions-core-tools](https://github.com/Azure/azure-functions-core-tools).

#### Getting Started with Azure Functions

We will start by creating a simple JS function. In the local folder run `func
init MyFunctionProj`. When prompted, use the arrow keys to select a `node`
worker runtime from the language choices. This will create a new folder and a
new NodeJS Function Application inside. Inside the new folder initialize new NPM
project in it with `npm init`. After you’re done with answering all the prompts,
we will create our first endpoint — `func new — name MyHttpTrigger — template
“HttpTrigger”`.

> Without going into details, Azure Functions is an event-driven system that
> supports multiple different types of triggers and bindings. The template we’ve
chosen will create simples possible function that is triggered by an HTTP
request and returns an HTTP response. If you want to learn more about possible
triggers and bindings visit Azure Function documentation —
[https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)

After all those operations are done you should have following folder structure:

    MyFunctionProj
     | — MyHttpTrigger
     | | — index.js
     | | — function.json
     | — node_modules
     | — host.json
     | — package.json

You can now test your first Azure Function! Run in terminal `func host start`
and wait a moment. After everything is initialized you should see (among other
things something like: `MyHttpTrigger: [GET,POST]
http://localhost:7071/api/MyHttpTrigger`. You can now visit this URL and see
some output in the browser.

#### Adding PureScript to the mix

Adding PureScript to your project is fairly simple, and just requires some small
changes to the project files. Firstly, still in the same directory, let’s create
new PureScript project — `pulp init — force`. (You need to use `— force` flag as
there already exists `.gitignore` file in the folder). Your directory should now
contain several additional elements:

* `bower.json` — contains library dependency information<br> *
`bower_components/` — a directory for installed dependencies<br> *
`src/Main.purs` — Entry point module for your project<br> * `test/Main.purs` —
An empty test suite.

At this point, you should be able to build the project — `pulp build`, by
default the compiled JS code is put into `output` folder. But it’s not yet
plugged into our HTTP trigger. Before doing that, let’s make our PureScript code
bit more interesting.

> This section is following [PureScript getting started
> guide](https://github.com/purescript/documentation/blob/master/guides/Getting-Started.md)

The first step will be installing external PureScript library — `bower install
purescript-lists — save`. Now, open the folder in your favourite editor (VSCode)
and go the `src/Main.purs` file. Let’s replace its content with solution to the
[Project Euler #1](https://projecteuler.net/problem=1)

We can now build the code with `pulp build — skip-entry-point` command. Now it’s
high time to plug our PureScript code into Azure Functions. Open
`MyHttpTrigger/index.js` file and put there following code.

As you can see, it’s fairly straightforward. The most important thing is the
`require` call that will load compiled-to-JS PureScript code. After that, we can
call any function defined in PureScript as normal JS function.

At this point, you can start your function again (`func host start`) go to the
given URL and check if the answer to the Project Euler problem is correct.

#### Deployment

There exist multiple different ways of deploying Azure Function applications —
from Continues Deployment on every push to the repository, through complex build
scripts to simple uploading `zip` file. For starters, the last method is the
simplest one. You need to zip all the necessary files — `MyHttpTrigger` folder,
`output` folder, `host.json` and `package.json` files. After you have `zip` file
you can use Azure Portal, Azure CLI or simple calls to the REST API to upload
the Function.

To learn more about deploying Azure Functions Applications visit official
documentation —
[https://docs.microsoft.com/en-us/azure/azure-functions/deployment-zip-push](https://docs.microsoft.com/en-us/azure/azure-functions/deployment-zip-push)

#### Summary

Finishing up, in this blog post I’ve shown how easy it is to use modern,
advanced, purely functional programming language — PureScript — on the
serverless platform — Azure Functions. The example repository containing all
sample code can be found on GitHub —
[https://github.com/Krzysztof-Cieslak/AzureFunctionsPureScript](https://github.com/Krzysztof-Cieslak/AzureFunctionsPureScript)
