---
layout: post
title: "Working with F# projects in VSCode"
description: "Working with F# projects in VSCode using Ionide extension"
modified: 2016-05-16
tags: [F#, VS Code, Tooling]
banner_image: landscape_5.jpg
---

# Introduction

Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, OS X and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (C++, C#, Python, PHP) and runtimes. The F# support for VSCode is provided by [Ionide](http://ionide.io) - set of extensions adding F# support, as well as Paket and FAKE.

> If you're new VSCode user installing extensions is pretty easy - press extensions button on left panel, search for Ionide, press install for all Ionide extensions, wait untill all are installed and restart VSCode.

Ionide-FSharp provides wide set of features useful for F# developer - from simple autocomplete and tooltips, through F# Interactive integration, to navigating to symbols or finding all usages of symbol.

It also comes with decent support for F# projects (defined using `.fsproj` file).

<!--more-->

# Working with existing projects

Working with existing projects (created using Visual Studio or other IDE) should be pretty straightforward - opening root of your repository / solution will start Ionide. Plugin should find all project files in repository and parse them.

> Warning - this process can take some time, especially on huge solutions. You can still edit files without any problem, but it make take a while before are features are started - the priority is put on providing features like tooltips, autocomplete or error highlighting for currently opened files. Solution level features (finding all errors in solution, navigating to any symbol in solution, rename, etc ) take bit longer to start.

# Creating new projects

Ionide thanks to [Forge](https://github.com/fsprojects/Forge) integration provides ability to create new F# projects without using full IDE. Creating new project is as simple as running `F#: New Project` command.

> All VSCode commands can be run using command palette, it can be started using `Ctrl(Cmd)+Shift+P` keybord shortcut.

Ionide will ask about project name, directory where place new project, and project template. Currently there are about 15 different project templates, hopefully more will come in the future thanks to Community contributions to Forge.

> Warning - even if you just create new project, you should have VS Code open in empty directory. It does not create "solution" directory, and assumes that is run from repository root.

Creating new project will also initialize Paket and FAKE, and create sample build script in repository root. This won't happen if you're just adding new project to existing solution with Paket and FAKE.

# Handling files in project

As you probably know, `fsproj` files contain list of F# (`.fs`) files which will be compiled during build process. What's important is that ordering of those files matters... and it's huge F# feature. But this topic was already covered in amazing [Scott Wlaschin's blog](https://fsharpforfunandprofit.com/series/dependency-cycles.html). So, back to the topic.

> Warning - Forge tends to do some additional changes to project file, so for first few times (unless you're already comfortable with usual Forge changes) I recommend doing git commit before running Forge commands - it will make easier for you to check what changes Forge makes.

There are few commands which makes handling files easier. First of all, you can add or remove currently open file from project using `F#: Add Current File To Project` and `F#: Remove Current File To Project`. Forge will try to find appropriate project file and add or remove file there.

Another important operation is file ordering - to control it `F#: Move File Up` and `F#: Move File Down` commands exist.

# Handling references

`fsproj` files contain also list of used references. Generally there are 3 types of those - external references from NuGet (this type is handled by Paket), project references and GAC references. To handle 2 later cases Ionide provides two commands.

`F#: Add Project Reference` command will ask you which project you want to edit (there will be list of all projects found in current workspace), and after which project you want to reference. For GAC references Ionide provides `F#: Add Reference` command which works in very similar way.

# Solution-wide editor features

Ionide's editor features are probably good topic for another post, but let's quickly go through some features which works on solution level:

* On file save, Ionide parse all projects and find all error in solution. They can be viewed in error panel (`Ctrl(Cmd) + Shift + M`).
* Go-to-Definition (`F12`), Find all references (`Shift+F12`), Peek definition (`Alt + F12`) works across all projects in solution
* Rename (`F2`) works across all projects in solution
* Same for navigating to symbol (`Ctrl(Cmd)+T`)

# Summary

In this post, I've presented some Ionide's features which makes supporting and handling F# projects in Visual Studio Code. There are still not as many project editing features as in Visual Studio or Xamarin Studio, but I belive that it's good start point, and nice set of features for lightweight editor.