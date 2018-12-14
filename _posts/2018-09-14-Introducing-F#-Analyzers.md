---
layout: post
title: "Introducing F# Analyzers"
description: "Introducing F# Analyzers"
modified: 2018-09-14
tags: [F#, VS Code, Tooling]
banner_image: landscape_6.jpg
---


# Introducing F# Analyzers



One of the most exciting features of Roslyn (modern C# compiler) is ability to plug into it custom extensions called [Roslyn Analyzers](https://docs.microsoft.com/en-us/visualstudio/extensibility/getting-started-with-roslyn-analyzers?view=vs-2017). They are live, real-time, project based plugins that enables to diagnose source code and surface custom errors, warnings and code fixes into Visual Studio. What's really important is fact that there are project based, and distributed through NuGet which means they are easy to install, and ensure that all developers working on the project have exactly same analyzers installed. This is really useful if you want to ensure common best practices, style etc while working on the project.

Today I'd like to introduce preview of the project called F# Analyzers which adds similar capabilities to [Ionide](http://ionide.io) (F# support in VS Code). Project is still in the early days, so design and technical details can change in time, but I'm really excited to share it with users even in its current state.

<!--more-->

### Architecture overview

Before diving deeper into Analyzers themselves, it's important to understand general architecture of Ionide, and where Analyzers fits into this architecture. This has really important impact on the Analyzers capabilities and limitations.

On the one hand we have Ionide itself. It's [VS Code plugin](https://code.visualstudio.com/docs/extensions/overview) which means it's using NodeJS runtime, running as a child process of the editor, communicating with VS Code using set of APIs provided by VS Code. On the other hand we have F# compiler, or exactly speaking [FSharp.Compiler.Service](https://fsharp.github.io/FSharp.Compiler.Service/index.html) which is library version of F# compiler, exposing some additional APIs useful for creating tooling for F#. Of course, `FSharp.Compiler.Service` is .Net library which means it can't be used directly by NodeJS process.

Last important part of the architecture is [FsAutoComplete](https://github.com/fsharp/FsAutoComplete). It's a project that provides communication layer and high level API between FCS and external world. It's used by vim, emacs and Ionide as all those plugins are hosted in non .Net environments.

The F# Analyzers are using extension point provided by the FsAutoComplete which means that in current shape they can be supported only by the editors using it (and they requires some work on the plugin side of things - currently only Ionide supports them). And it means that diagnostics provided by them are visible only in the editor, not during compilation.

### Analyzers basics

Analyzer is normal F# function. As an input it takes Context object which contains current information about the file - Parse Tree, Type Abstract Syntax Tree, Symbols information, and returns list of the Diagnostics - records containing diagnostic message, type, description, and potentially list of fixes that can be used to fix the problem.

F# Analyzer contains 3 parts - first one is an extension point in FSAC which is responsible for loading and running analyzers, second one is a editor handler (part of Ionide, in this case) that displays diagnostics and fixes. Last part is [FSharp.Analayzers.SDK](https://github.com/Krzysztof-Cieslak/FSharp.Analyzers.SDK) project that's used to create analyzers.

### Building your first analyzer

From infrastructure point of view, creating analyzer is simple - you need to create normal F# project, `netstandard2.0` , add reference to `FSharp.Analyzers.SDK` (avaliable on NuGet - [https://www.nuget.org/packages/FSharp.Analyzers.SDK](https://www.nuget.org/packages/FSharp.Analyzers.SDK/)) and create analyzer functions - normal F# functions taking Context returning list of diagnostics, and marked with Analyzer attribute.

> Due to unresolved technical limitations your Analyzer must contain "Analyzer" in the name of output dll.

However, from technical point of view creating analyzer is fairly difficult task - you need to be familiar with processing typed or untyped abstract syntax tree, or accessing FSharp Symbols information. Currently SDK doesn't provide any helper functions, but we hope to add some higher level abstractions in the future. Currently, I recommend going through [FCS documentation](http://fsharp.github.io/FSharp.Compiler.Service/), to get more familiar with the concepts

Generally speaking processing Abstract Syntax Trees is usually done by recursive pattern matching on the DU representing syntax nodes. The following snippet shows how to travers Type Abstract Syntax Tree and call some function on every node that represents call of the member. While it looks bit scary, and complex if you take a look on it bit longer you will notice that it's just big recursive pattern matching. Also, similar pattern matching will be base for most analyzers, which means you can reuse the code pretty easily.

<script src="https://gist.github.com/Krzysztof-Cieslak/34c2a43c52119fde8d55315c7831244d.js"></script>

Having this bit of infrastructure code, let's now move to the analyzer itself. As I've mentioned before, analyzers are normal functions that have particular signature and are marked with attribute.

<script src="https://gist.github.com/Krzysztof-Cieslak/42829ce7b5dcc937bece698a5af9ff2b.js"></script>

In the above snippet we create analyzer that will detect any call of `x.Value` where x is an F# Option. As you probably know calling `.Value` on an `option` is not total function and can throw exception if an `option` instance is `None`, so checking for it may be good idea.

The handler function in above example is executed for every member call. In it we check if the name of the function we call, and if it's `Option.Value` we add the range of the symbol into the state. After we've processed whole tree we map all ranges into the warnings that will be displayed in the editor. There also exist possibility of providing set of code fixes, but we don't use it in this example.

> Whole code of the sample analyzer is available on GitHub - [https://github.com/Krzysztof-Cieslak/FSharp.Analyzers.Sample](https://github.com/Krzysztof-Cieslak/FSharp.Analyzers.Sample), and analyzer is published on NuGet - [https://www.nuget.org/packages/FSharp.Analyzers.Sample/](https://www.nuget.org/packages/FSharp.Analyzers.Sample/)

### Using analyzer

Analyzers are enabled by `FSharp.enableAnalyzers` setting inside VSCode. By default it's disabled, so you need to edit settings to enable analyzers support. Using analyzers is as simple as adding Analyzer NuGet package with Paket - for out of the box support in Iondie you need to use Analyzer group for it.

<script src="https://gist.github.com/Krzysztof-Cieslak/dc71359d81354129187584c502cc60e6.js"></script>

After the package is added to `paket.dependencies` and restored, Ionide will automatically detect and load analyzers. It may require editor restart as analyzers are loaded on plugin startup.

> Ionide also contains setting `FSharp.analyzersPath` that will enable you to configure paths from which Ionide loads analyzers, by default it's using `packages/Analyzers` and `analyzers` folders.

For example let's test our new analyzer on the following snippet.

<script src="https://gist.github.com/Krzysztof-Cieslak/c1962db70231ec9d2581955324f6ac82.js"></script>

This will result in underlying `x.Value` with a warning saying that Option.Value shouldn't be used

![](https://cdn-images-1.medium.com/max/2000/1*axoWiRB3EPANiOljA_PWzg.png)

> Sample project using analyzer can be found on GitHub - [https://github.com/Krzysztof-Cieslak/FSharp.Analyzers.Sample.Usage](https://github.com/Krzysztof-Cieslak/FSharp.Analyzers.Sample.Usage)

### So what's next?

Currently there are several important limitation of the F# Analyzers. First of all they're supported only by Ionide. Secondly to write analyzer you need to be familiar with F# (T)AST pretty well. And in the end writing fixes requires providing new version of code in textual form (unlike in case of Roslyn Analyzers where fixes can be provided as AST transformation), what may be difficult and error prone. Also, whole mechanism is currently in an experimental phase, relies on Reflection etc. so it can be bit unstable.

However, I treat this as an experiment and proof of concept, that may be used as a base for discussing similar functionalities being added to F# compiler or other IDEs. Also I'm super excited to see what potentially great things can F# Community create having such extension point in the editor (Evil Hint: You can use this feature to run any code inside of the language server and return some information to editor... which sounds awesome and crazy at the same time)

### Summary

In this post I've introduced preview of new tooling related project that enables users to add custom analyzers to your editor, bringing functionality similar to Roslyn Analyzers. While this is only experiment, and proof-of-concept I'm looking forward to seeing all innovative things it can enable. Analyzers support has been released in new Ionide version - `3.27.0` - so it's out there and ready for experimenting!
