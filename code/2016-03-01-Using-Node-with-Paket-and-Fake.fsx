(*** raw ***)
---
layout: post
title: "Using Node.js and NPM with Paket and FAKE"
description: "Using Node.js and NPM with Paket and FAKE"
modified: 2016-03-01
tags: [F#, Paket, FAKE]
image:
  feature: abstract-3.jpg
---
(**
# Introduction

Web development is great fit for F# and Functional Programming . Libraries like [Suave](http://suave.io) or [Freya](http://docs.freya.io/en/latest/) makes it easy to create well-architectures, composable web applications. But that's backend part of story. Nowadays most web applications are required to have lot of user interactions and logic on the front-end side - in the browser.

Two important tools for front-end JavaScript development are [Node.js](https://nodejs.org/en/) (JS backend server, used for running many JS development tools) and [npm](npmjs.com) - package manager for Node.js. Those 2 tools are often installed globally on developer PC, are used to define dependencies for front-end application, and define build pipeline for it.

But, using different build tools for backend and front-end development in one application can get annoying and tiresome for developer, so it would be nice to use one build pipeline for all tasks. And it is possible with Paket and FAKE.

# Installing Node and npm using Paket

> In case you haven't heard about Paket - it is alternative dependency management tool built by F# community, supporting NuGet, GitHub and git. For more information please visit : [http://fsprojects.github.io/Paket/](http://fsprojects.github.io/Paket/)


Installing Node.js and npm using Paket is as easy as installing any .Net package - luckily there exist up-to-date NuGet packages for both tools.

Installing Node:
```
paket add nuget Node.js
```

Installing npm:
```
paket add nuget Npm.js
```

Tools executable are respectively `.\packages\Node.js\node.exe` and `.\packages\Npm.js\tools\npm.cmd`.

# Using package.json file

> `package.json` is npm file defining project, its dependencies and build scripts we can run. For more information about it, please visit [npm documentation on this topic](https://docs.npmjs.com/files/package.json)

`Package.json` file looks as in every normal project using npm. We define our project name, repository, dependencies and we create build scripts. There is one small difference - instead of just calling `node` or `npm` we have to give relative installation path to those tools.

Example `scripts` section of `package.json`:
```
"scripts": {
"build:js": "packages\\Node.js\\node.exe node_modules/uglifyjs-folder/cli.js web/content/app/ -eo web/content/dist/",
"build": "packages\\Npm.js\\tools\\npm.cmd run build:js"
}
```

# Running npm scripts using FAKE

> FAKE - F# Make - is a build automation system with capabilities which are similar to make and rake. It is using an easy domain-specific language (DSL) so that you can start using it without learning F#. For more details visit: [http://fsharp.github.io/FAKE/](http://fsharp.github.io/FAKE/)

FAKE is fantastic build system, that allows to create complex build scripts using F#. One of its big advantage is having built-in helpers for different tools from .Net space ... and not only .Net. Fortunately, there exist FAKE helper for npm.

Using npm helper is as simple as creating normal FAKE target and running `Npm` function.

Running `npm install` - command downloading all dependencies specified in `package.json` file:
*)

Target "NpmInstall" (fun _ ->
    Npm (fun p ->
            { p with
                Command = Install Standard
                WorkingDirectory = "./src/FAKESimple.Web/"
            })
 )

(**
Running build script defined in `package.json` file is not different:
*)

Target "NpmInstall" (fun _ ->
    Npm (fun p ->
            { p with
                Command = (Run "build")
                WorkingDirectory = "./src/FAKESimple.Web/"
            })
 )

(**

# Summary

In the post we've shortly moved through all steps necessery to create build pipeline combingin our known F# tools - Paket and FAKE, with JavaScript tooling used for front-end development - Node and npm. This post was based on FsSnippet web page implementation where this technique is used - for more details, and "real world" usage feel free to check [FsSnippet source code on GitHub](https://github.com/fssnippets/fssnip-website)

*)