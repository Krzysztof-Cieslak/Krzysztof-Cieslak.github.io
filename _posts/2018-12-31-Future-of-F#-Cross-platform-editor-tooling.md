---
layout: post
title: "Future of F# cross-platform editor tooling"
description: "Future of F# cross-platform editor tooling"
modified: 2018-12-31
tags: [F#, VS Code, Tooling]
banner_image: landscape_14.jpg
---

# Future of F# cross-platform editor tooling

Currently we have this beautiful moment in the year when everyone writes,
tweets, and instagrams about their achievements in past year, and plans for the
next one. I’ve also done [this](http://kcieslak.io/2016)
[before](http://kcieslak.io/OSS-The-Story) (often being week…or month late),
however this year I decided to write about something else. So let’s talk about
F# cross-platform, community driven editor tooling.

<!--more-->

### Language Server Protocol

Before diving into F# specific things, I need to mention project that has
changed how editor tooling is built over the past two years - [Language Server
Protocol](https://microsoft.github.io/language-server-protocol/) (LSP). LSP is
specification of the communication between a client (editor) and a server that
provides language tooling capabilities such as autocomplete, tooltips, etc. It
reduces the* m-times-n* problem to the *m-plus-n* problem —similar to how
Virtual Machines solve the same problem for deploying code to many platforms
(great example here is[ Z-machine](https://en.wikipedia.org/wiki/Z-machine)).

![](https://cdn-images-1.medium.com/max/1600/1*jzJVMrcgfqUJ8YTGDpE0ZA.png)

For example, instead of creating a Python VSCode plugin, a Python vim plugin, a
Python Atom plugin, and Python plugins for any other potential clients, it
allows developers to focus on single implementation of language server, this
will be automatically supported by all clients that implement LSP.

Of course idea of language server is not new — it’s been fairly common way to
create language tooling. In fact, the F# language already has a language service
called the [F# Compiler
Service](https://fsharp.github.io/FSharp.Compiler.Service/). It’s an F# API into
the internals of the F# compiler, which does all of the heavy lifting in
determining things that are useful for editor tooling. However, it is ultimately
just an F# (i.e., .NET) API and cannot be consumed in every environment without
an additional interface. An additional layer that can interface between the F#
Compiler Service and any editor (i.e., not just Visual Studio) is needed to
allow for F# tooling to be used everywhere.

### FsAutoComplete

As I’ve mentioned — the idea of a language server is not new. And F# has been
having one for years. Initially created in 2011 (as far as I know, that was way
before I’ve joined F# community), [FsAutoComplete (FSAC)
](https://github.com/fsharp/FsAutoComplete)has been used by all editors that
aren’t Visual Studio, such as Atom, Emacs, Vim, and VSCode. The project provides
a high level API over the F# Compiler Services, and communication layer
(standard I/O, and HTTP web server) that enables using it from non -.Net
platforms. It’s been long standing project, with many past iterations — in fact,
prior to the F# Compiler Service API being made available, it used reflection
over the F# compiler to access internal APIs! It has had many great maintainers
and contributors over the years (I especially need to mention here [Dave
Thomas](https://github.com/7sharp9), [Robin
Neatherway,](https://github.com/rneatherway) [Tomas
Petricek,](https://github.com/tpetricek) and [Enrico
Sada](https://github.com/enricosada)) and it has been the magic that powers
[Ionide ](http://ionide.io/)since day-0.

### Current status

When I started [Ionide ](http://ionide.io/)4 years ago, FSAC was in pretty good
shape, providing many crucial APIs and one communication layer (stdio). Over the
years, I started to contribute more and more to the project, and with help of
all awesome people involved, new contributors and community support we’ve
managed to transform FSAC into one of the best language servers I know
(especially considering it is not a commercial language service, such as those
authored by Microsoft or JetBrains), and I feel that it has been one of the most
important tools created by the .NET OSS community.

![](https://cdn-images-1.medium.com/max/1600/1*g7fQGoPulhg0zk1oZQxHOw.png)

Also, what is important personally for me is the level of innovation that we’ve
managed to achieve in FSAC and Ionide. Additional diagnostics such as unused
opens or unused bindings, integration with a third party linter, features
powering Ionide’s CodeLenses, background caching that enables very fast use of
any feature that requires symbols (such as Find References, CodeLens showing
number of references, etc.), and even custom [F#
Analyzers](https://medium.com/lambda-factory/introducing-f-analyzers-772487889429).
These are not the features that you typically see in the editor tooling created
by independent vendors, nor especially in editor tooling for FP languages (yes,
some of those features have been present in powerful IDEs for particular
languages — CodeLenses for C# in VS, or famous background caches in JetBrains
IDEs — but never for FP languages, and never provided by community driven tools)

### Bright Future?

![](https://cdn-images-1.medium.com/max/1600/0*8AbD6eEC3MzyHHVb)

So the title of the post promised talking about the future… but the future is
now. Today, I’d like to show you the thing I’ve been working on over the Xmas
break for last 2 weeks — [the LSP communication layer for the
FSAC](https://github.com/fsharp/FsAutoComplete/pull/320).

> Huge thanks goes to [Julien Roncaglia](https://github.com/vbfox) for his initial
> work on LSP + FSAC proof of concept few months ago, and his F# LSP server
abstraction implementation that has been used as a base for my current work.

Being active maintainer for editor tooling for 2
[different](https://marketplace.visualstudio.com/items?itemName=sbrink.elm)
[languages](https://marketplace.visualstudio.com/items?itemName=Ionide.Ionide-fsharp),
a developer that created plugins for multiple editors, and someone that is
generally interested in editor tooling, it has become obvious for me that LSP
has won (at least in the niche of cross platform tooling provided by
community/independent vendors). There are more and more client implementations
(including really interesting online IDEs like
[GitPod](https://www.gitpod.io/)), more and more server implementations (which
means there are more and more investments into clients) and the protocol itself
is becoming more powerful and feature-ful. I strongly believe that it is the
future of the F# cross platform tooling. From the F# point of view there is
couple of important advantages:

* It moves lot of code from Ionide code base to the FSAC code base — it means that
other editors than VSCode can use some of the improvements that has been
“hacked” in Ionide itself
* It makes the contribution process easier — Ionide is a VSCode plugin written in
F# compiled to JS with [Fable](https://fable.io/) using FSAC (totally separate
code base). This makes the process of contribution a bit awkward — if you want
to contribute you need to know which code base to work in, if it’s Ionide you
need to have the Fable toolchain set up. The idea behind using F# for Ionide was
lowering the bar for contributors (“people interested in making F# tooling
better are F# developers so the code should be F#”). As lot of Ionide code is
moved to the FSAC, it makes contributions even easier by moving a lot of code to
a normal F#/.NET Core project
* It’s good news for anyone wanting to use Atom or Vim or Emacs (or maybe ST3?) —
some of those plugins have not been maintained very actively (or have been
deprecated like Ionide-Atom), but moving to LSP will mean that getting all new
fancy features should be way easier or “free”.
* I’ll soon start to work on Ionide 4.0 release that will be based on LSP. Lot of
Ionide code will be removed, since Ionide provides more functionalities than
just language features — things like solution explorer, creating new projects,
right click -> debug, and many features focused on developer experience are
implementations specific to VSCode (and that will probably never change).As FSAC
will take over lot of responsibilities, I hope to focus more on the UX in Ionide
itself, which is also a very interesting problem on its own.

> As a side note — we are looking for new maintainers for FSAC. [We would love
> your help](https://github.com/fsharp/FsAutoComplete/issues/321)!

### Grim Future?

![](https://cdn-images-1.medium.com/max/1600/1*JLKpCZqiDfA80q3O7eH38w.jpeg)

Of course, every real life story have also bad parts. And there are couple of
the dark clouds on the horizon. First of all, [some
](https://github.com/ionide/ionide-vscode-fsharp/issues/948)[of
](https://github.com/ionide/ionide-vscode-fsharp/issues/938)[the
](https://github.com/ionide/ionide-vscode-fsharp/issues/914)[problems
](https://twitter.com/TeaDrivenDev/status/1077622983383007233)with Ionide/FSAC
won’t go away with moving to LSP— they are connected to the complexity of build
and require more knowledge and time than I have (if someone from MSFT is reading
it — I would love to get, for late Xmas gift, open source, cross platform
language server for the .Net project system). But that’s just a technical
problem. The bigger one is that nothing has changed for last year and I can
repeat my words from last years’ post. While I believe that F# ecosystem is in
its best shape ever, it’s still building a castle on the sand — not enough
contributors, depending on same handful of people that overproduce, no
commercial support for OSS projects, no companies interested in investing into
F# OSS ecosystem. Ionide and FSAC are both in unsustainable state — crucial
projects for F# community, with thousands of users, that are used by a huge part
of the community every day — they get no commercial support and there are not
enough contributors to make up for this.

### So… 2019?

![](https://cdn-images-1.medium.com/max/1600/1*8KAxxVKVlP_CDXvAXWkrRw.jpeg)

So, how will 2019 will look like? Only time will tell. But in general I believe
that there are more bright sides to the story than dark clouds. F# ecosystem is
in fairly OK place — tooling is really OK, .NET Core adoption is rising which is
a good sign, there are more and more interesting projects, community is active,
and projects like the [SAFE](https://safe-stack.github.io/) stack are becoming
mature and are getting decent adoption.

However, as a community we still haven’t solved the problem of OSS
maintainability. One one hand, it’s nothing unusual — most communities struggle
with those problems. On the other hand, it’s obvious that F# commercial adoption
is very often driven by the few people building awesome OSS things, and maybe we
should help them somehow?

Anyway, I hope **you** will build great things with F# in 2019!