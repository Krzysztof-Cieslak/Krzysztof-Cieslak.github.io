---
layout: post
title: "Ionide — Introducing Info Panel"
description: "Ionide — Introducing Info Panel"
modified: 2019-05-06
tags: [F#, VS Code, Tooling]
banner_image: landscape_8.jpg
---

# Ionide — Introducing Info Panel

Today, I’d like to talk about a new feature called the Info Panel that has been
released in Ionide 3.36. For me personally, it’s one of the most exciting
features we’ve introduced in Ionide so far. Hopefully, it will help F#
developers as nicely as placing function signatures in CodeLenses or fast
cross-project navigation powered by background symbol caches.

<!--more-->

#### The problem of API exploration

One of the biggest problems some software developers have is remembering all the
functions, classes, and namespaces that are available in a vast set of
dependencies they use, or even that are present in their code bases. Some IDEs
try to help with that problem via tooltips or IntelliSense.

However, these solutions suffer from two problems. First, the visual help they
have is temporary. Second, tooltips can sometimes feel intrusive. It’s sometimes
quite common to have something pop up and hide code below it, and if you move
your cursor the information changes are disappears.. Also, tooltips or
additional IntelliSense popups are typically small — the IDE has to play a
tricky game of tightrope where it needs to display useful information, but do so
subtly enough not to feel intrusive.

One alternative to an Info Panel exists in Visual Studio today, called the
Object Browser. It’s a separate window that presents a tree view of references
to a project where you can dive into constructs as-represented in their compiled
form. Although this is helpful for exploring references, it’s conceptually
detached from your codebase. Imagine a situation when you’re reading your code
and notice a function call that you don’t understand — it’s not as easy to use
Object Browser as just hover over the symbol — you need to click through library
content, to find appropriate class or function. And if you want to move to
another function next line, you need to do the same.

#### Rich API exploration

> The Info Panel is inspired by [XCode’s Quick Info
> Inspector](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/LookingupObjectDocumentation.html).
Thanks a lot to Dave Thomas for familiarizing me with this feature. BTW, you can
support Dave — one of the best F# OSS hackers — on his [new Patron
page](https://www.patreon.com/7sharp9)!

![](https://cdn-images-1.medium.com/max/1000/1*G5A8JkkI0bIa4iK4M49CEA.gif)

Info Panel is an attempt to bridge those two ways of presenting information. It
combines the interactivity of tooltips with the less intrusive UI of a separate
display panel. The panel auto-updates as you navigate through your code, but you
can also navigate information via the panel, independently of the code you’re
looking at.

By opening the Info Panel in VSCode, you can display rich information about the
current symbol under your caret, such as its signature, nicely formatted XML
documentation, its members, properties or functions, used attributes,
implemented interfaces. Because it’s a separate panel, the information is
persisted and doesn’t overlap with your code window. There is enough space to
provide quite a lot of nicely formatted information. It also supports link
navigation. For example, if somewhere in the documentation `DateTime `is
present, you can click on it, and move to the documentation about the `DateTime
`type. The Info Panel uses a combination of data from the compiler service and
XML documentation, so it works for both external dependencies and your own code.

![](https://cdn-images-1.medium.com/max/1000/1*_R6bkfNHTGVXVqAK01lHbg.gif)

Info Panel may update its content on the cursor move or on the hover (it’s
configurable) but also supports locking — the state in which the content won’t
be updated by normal action but only by click link or forcing update with a
command. This means that you can keep information that is interesting for you
while moving through a code base.

One of the additional options is complete replacing tooltips — when it’s
activated you won’t see normal tooltips when you put the mouse over the symbol,
only Info Panel will be updated (feature [suggested by Brian
Mitchell](https://twitter.com/strmpnk/status/1123042142694383617)).

> Check all possible options for Info Panel in VSCode — they all start with
> `FSharp.infoPanel` prefix

#### What’s next?

Info Panel is in pretty good shape today however there are still a couple more
features that I want to add in a future:

* Handling namespaces — currently we don’t display any information for namespaces.
* Navigation history — I think it would be nice if go back/forward commands were
implemented
* Navigation breadcrumb — breadcrumb UX in VSCode is pretty nice for navigating
through the code base, I can imagine having something like that for the
documentation exploration. (suggested by Nino Floris)
* More information for the symbols — we could potentially add even more
information such as inheritance hierarchies, declaring entities etc.
* Investigate how Info Panel can be used for replacing/enhancing IntelliSense

If you’d be interested in helping there are two places where you can start:

* If you’d want to improve generated documentation take a look
[here](https://github.com/fsharp/FsAutoComplete/blob/master/src/FsAutoComplete.Core/DocumentationFormatter.fs)
* If you’d want to improve UX around the feature take a look
[here](https://github.com/ionide/ionide-vscode-fsharp/blob/master/src/Components/InfoPanel.fs)

#### Summing up

I really hope you will like this feature — from my point of view, it fits into
Ionide design of finding good ways to provide as much useful information as
possible to the users — such as Code Lenses or rich tooltips we have right now.
Try it out, and let us know what you think!

*****

*You can support Ionide development on *[Open
Collective](https://opencollective.com/ionide)*.*

![https://opencollective.com/ionide](https://cdn-images-1.medium.com/max/1000/1*Qp7ewxpBdpWJjHVtRHEEPw@2x.png)
