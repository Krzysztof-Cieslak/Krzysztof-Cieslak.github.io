---
layout: post
title: "Ionide — A New Hope"
description: "Ionide — A New Hope"
modified: 2019-03-24
tags: [F#, VS Code, Tooling]
banner_image: landscape_7.jpg
---

# Ionide — A New Hope

You probably know that one of my [biggest
problems](http://kcieslak.io/Future-of-F-Cross-platform-editor-tooling)
with the F# ecosystem and OSS work I’ve been doing has been lack of any
sustainability strategy. I’ve attempted to change that by creating [Open
Collective page for the Ionide](https://opencollective.com/ionide),
and at the same time, I’ve started talking with existing partners about possible
ways of making work on this crucial parts of the ecosystem more sustainable.

Today, I’m really happy to announce that for the next few months I’ll be working
full time on the F# open source, cross-platform tooling focusing mainly on
[Ionide](https://github.com/ionide) and
[FsAutoComplete](https://github.com/fsharp/FsAutoComplete). This is possible
thanks to the partnership between my company — [Lambda
Factory](https://lambdafactory.io/) — and Microsoft.

<!--more-->

### Scope of the work

The contract with Microsoft will enable me to work on certain strategic goals of
the Ionide and FsAutoComplete that are important for both the F# community and
Microsoft. Our initial goals for the next few months are:

* Finishing [Language Server
Protocol](https://microsoft.github.io/language-server-protocol/) ([read more
about
LSP](https://medium.com/lambda-factory/future-of-f-cross-platform-editor-tooling-a8cf62a50053))
implementation in FSAC and plugging it into Ionide
* Fix performance reliability issues after triage and full performance
rebaselining after LSP support is in
* Work on porting all components to .Net Core/Standard and using .Net Core version
of FSAC by default in Ionide to improve the getting started experience
* A potential stretch goal is working on improvements to the scripting experience
in Ionide

These goals are trying to tackle some of the most important issues of the F#
cross-platform tooling ecosystem, and will benefit not only Ionide but will have
an impact on other tools that F# developers use every day.

### Relationship with Open Collective

I’ve been asked by some people who heard the news a few days ago if this affects
the Ionide OpenCollective effort. In short, no, but I’ll clarify some specifics.

From my point of view, this doesn’t change anything with respect to
OpenCollective. One of the reasons why we’ve decided to choose Open Collective
(over Patreon or PayPal donations) is the fact that it’s about supporting the
project, not any particular creator. Open Collective is a fund for the Ionide
project itself, with a transparent invoice system that ensures any withdrawals
are public. This allows any Ionide contributor, not just me, to spend dedicated
time on the project in the future. It is a long-term sustainability plan for
Ionide.

Contract with Microsoft is task-based — hopefully, it will result in fixing some
of the biggest issues with the Ionide and FSAC that we have right now but is not
creating long term sustainable environment — something I want to create with
Ionide as an organization and with Open Collective.

I hope that F# community will continue supporting Ionide on Open Collective as
generously as right now — and I hope that soon, I’ll be able to do some
announcements about how we will spend those funds on the project related goals
such as promotion, documentation and more. But that will come later, as I’ll be
quite busy in the coming months improving Ionide by working with Microsoft.

### But Embrace, Extend, and Extinguish…

Ionide is still and always will be MIT licensed project owned by F# community,
and FsAutoComplete is and will always be Apache 2.0 licensed project owned by F#
Software Foundation.

Microsoft is not acquiring Ionide, nor is there any additional stipulations or
attempts to re-prioritize the direction of the Ionide project. In fact, I was
asked to help define the scope of the work and I’ll be helping decide what the
most important issues are to fix. To be clear, Microsoft is not gaining control
on Ionide, and they don’t gain any decision making power different than regular
F# users. Ionide is still a community project and the maintainers continue to
decide what gets added or removed.

### Next few months will be fun…

I need to say that I’m really really happy to have this opportunity — for last
few years I’ve been saying that it would be really good for an ecosystem if
someone was working full time on F# cross-platform tooling. <br> My goal for the
last few years has been pointing out that there is huge potential in F#
cross-platform tooling, in VSCode as an IDE platform, in F# Compiler Services
that’s the common infrastructure used by all F# tooling, and that’s been fairly
unique project among Functional Programming languages. I really believe that we
can make F# tooling best-in-class (of FP languages), and I hope that the
partnership with Microsoft is a step in this direction. However, we still need
to remember that F# tooling is owned by the F# community and only together we
can make it better so… contributions are welcomed!

> Additionally, I need to thank Phillip Carter (F# PM @ Microsoft), without his
> help, and his advocating for F# inside Microsoft things like that would never be
possible. Thanks!
