---
layout: post
title: "OSS and Community. The Story"
description: "OSS and Community. The Story"
modified: 2018-02-23
tags: [Open Source, Community, F#]
banner_image: landscape_4.jpg
---

# Disclaimer

Before, we even start - this blog post will be different than others on the page. I usually write about some technical things, sometimes about open source and community based software, but I always try to be rather objective. And this post will be different. It's totally subjective and personal... because it's about me, and my story with F# Community. 

<!--more-->

# Now

[Lambda Days](http://www.lambdadays.org/lambdadays2018) has ended yet again. It was my 4th times here and as always it delivered - great content, fantastic speakers, interesting conversations, perfect organization. It's definitely my favorite conference in Europe. And as always I could hang out with some great friends from Community - Evelina and Tomas, Felienne, John, Tomasz, Bartosz and others from polish F# community. The contrast between meeting real people, building cool stuff with F# and fighting random Twitter haters couldn't be bigger. 

So, I guess you wonder now why I even mention that. "You speak at the many conferences, don't you? Who cares about this particular one? And you wasn't even a speaker on this.". Fair enough. But Lambda Days is special for one small reason - it's a place where this story has started. 

# Beginning    

So yeah, it was 3 years ago. Second edition of Lambda Days, first one I've attended. I was super excited - it was first FP conference I've attended and what's more there were lot of F# talks happening - Tomas and Evelina were there, as well as Andrea, Tomasz Jaskula and others. And back then I was pretty unknown - I've been doing F# for some time already but as a hobby - I've been working in some small C# shop, I haven't been doing any open source stuff, and if anyone heard about me on Twitter... well, let's just say that I was much harsher in my criticism of MSFT and C# than I'm now :)

So I was at this conference, ready to watch some talks of people I only knew from online world that were way better developers than me, and were way smarter then me, expecting not to understand too much and maybe learn something interesting... And yeah, they were all that, done great talks, that I totally didn't understand (I still doesn't understand their talks, but at least I learnt how to pretend). But it turned out that those F# heroes are not only great developers and super intelligent people, but they are also normal, cool, sometimes wierd people that you can do silly jokes with and you can spend time with them having lot of fun and interesting conversations... not only about F#. So we had lot of fun (as proved by [fhash.org](fhash.org)), drunk a lot... and that's when I've fallen in love with F# Community.  

# The Project

Soo... 1 month later I've started the project, which is now known as Ionide. Of course, Tomas helped me a lot - he suggested to use F# to JS compiler (FunScript) [my initial hack was written in CoffeScript - as it was language suggested for Atom plugins], he's done some magic to make sure that JS produced by FunScript was working in Atom (FunScript, unlike Fable, was not really producing good JS code). So I started to write this plugin on rather bad platform (Atom extension system sounds cool in theory... but well, it's just a theory) and at some point of time wierd thing, I still don't really understand happened - people started to use the project. What's more shocking - they seemed to like it. A lot. In September I've released version 1.0, with new, nice name, webpage and some reddit announcements. What's even more interesting - people were rather vocal about the fact they're using Ionide, it got quite a lot of traction in the general F# community. And it resulted in MSFT noticing it. In October 2015 I was invited by VSCode Team to private preview of extension API, and for next month I've been working (well... "working") on the new plugin - Ionide-VSCode - that was publicly released on day 0, during Connect(); conference in November.

# Side effects

Interestingly enough there has been some side effects of making Ionide and getting some users. Firstly, I've started my company - [Lambda Factory](http://lambdafactory.io) in January 2016 and I've started to use F# for commercial work. I've also been invited to multiple conferences in 2016 - NDC London, F# eXchange, .Net Fringe (<3), F# Creators Workshop. I've been 2 times in Vancouver in 2016 for one of my clients. All those things has been great fun, and are clear result of Ionide - I got my first client thanks to it, my first, really terrible conference talks were about Ionide. In general 2016 was great year - Ionide was getting lot of new features, Fable was released, I've ported Ionide to Fable while flying over the Atlantic. And Ionide got lot of users, it was "Featured extension" for a while in VSCode marketplace, it was highest rated extension in VSCode marketplace for a while, and the userbase slowly moved from Atom version to VSCode.

But it was also a year of several failures in my OSS activity - I haven't managed to create healthy community around the Ionide - it's been basically one man show. Some my other OSS projects were not really successful. Forge, which was started in January 2016, has not become a go-to tool for the community. While in case of Forge I can still say about relative success of the project since it's used to this day in Ionide, the other project I really cared about back then - FsToml - was total failure, and resulted in burnt out, crushed dreams, and broken heart. And well, I was called troll by some members of community for suggesting something like FsToml in one of the blog post. 

# Stabilization 

My opinions about 2017 are really split - on the one hand it was clearly good year for Ionide - it has become one of the best way to develop F#, and best xplat way. It's also probably one of the best editor tooling for FP languages in general, and one of the best VSCode extensions in the marketplace (which is decent achievement given that many important VSCode extensions are maintained by MSFT). It got more and more features, including innovating features like CodeLenses and LineLenses, the decently working project explorer, F# Code Outline and many more. And the user base has been constantly growing hitting couple of thousands users according to my estimate (which seems like really decent number given size of F# userbase). It's also been used by nearly all F# speakers during their talks on various F# conferences and events. And what's probably most important - thanks to amazing work by Enrico we've continuously had best support for .Net Core from any F# IDE - including support for .Net Core 2.0 on the release day. 

For me it was also decent year - I've spoken at some great conferences - F# eXchange (again), nCrafts, FableConf, Remmidemi, Get.Net Conf, CodeMotion Milan. I've worked on some cool stuff, doing Azure Functions with F# for essentially whole year. I've started to move slowly into training market, and I've done couple of internal trainings what I've really enjoyed and is something I want to focus on in the future. 

But I think it was also bad year in many areas. First of all - Fornax, the F# static site generator I've created, didn't get any attention. Secondly, I didn't manage to create any good way to sustain Ionide. General atmosphere in F# Twitter community was getting worse and worse due to some vocal minority that's able only to complain about lack of MSFT investments and lack of quality in tools they get for free. There happened some dramas around F# web stack which was super sad to see. I was not invited to speak at .Net Fringe and Open F# which was really disappointing for me. 

# Current state

I really believe into what I've written couple of months ago on Twitter - F# ecosystem is in it's best state in last couple of years (and probably ever). The usages numbers for all main editors are growing, we have some great xplat editor experience with Ionide, F# web stack (SAFE) is getting more and more mature, providing amazing development experience for end-to-end programming. MSFT actions clearly show that they are committed to F# - no one is rewriting language plugin to latest technologies that brings it up-to-date with C# integration, or includes support for Azure Functions, adds F# to `dotnet` CLI out of the box, and hire new people to the Team just to stop supporting the language. And I think it's not the statement I could do 2 years ago.  

At the same time we build castle on the sand - looking at such important parts of F# ecosystem as Ionide, Paket, FAKE, FSAC, Fable, F#.Formatting - I can't understand why any of those projects don't have commercial sponsoring. There are tens of thousands of F# users, hundreds of companies using F# for their commercial products. EVERYONE is using those libraries and tools provided by F# community. And no one wants to support those projects. Even if only 1% of companies using F# provided financial support it would make huge difference for those projects. Even if only 1% of F# developers started regularly contribute to OSS libs it would create thriving ecosystem. But I guess doing nothing, using the tools and libraries you get for free, and complaining on social media about quality of ecosystem is what Real Developers creating Real Software do... what do I know, I'm just simple hipster doing OSS :) 

Ionide is in the unsustainable state - over last 3 years I've spent thousands of hours working on it. Feel free to calculate how much it would costed if that was tool that your company developed internally. Feel free to calculate how much money you get if you think that Ionide gives you 5% productivity boost... and well, I guess that productivity boost was even higher when you wanted to do .Net Core 2.0 and no other editor supported it :)

And Ionide is way smaller project than Paket, or FAKE, or Fable... How many hours your developer saved thanks to having actually working dependency management system, reasonable build processes or being able to write front end code in sane, type safe, modern language? 

I guess we all just need to hope that maintainers of those projects will never quit, get bored or decide that they have better things to do in their spare time...