---
layout: post
title: "Challenges of post-OSS world"
description: "Challenges of post-OSS world"
modified: 2018-08-11
tags: [Open Source, Community]
banner_image: landscape_12.jpg
---

# Challenges of post-OSS world

Open Source Software has won. After years of convincing people to use open source software, fighting with false dichotomy between OSS and industrial, commercial software, and defending against negative biases, position of OSS is no longer disputed - it's been used by vast majority of companies around the world, it has become default choice when choosing technologies, it powers the internet, our PCs, mobile phones and most devices we use every day, it's been accepted by huge, conservative companies that were against whole concept few years ago.

But have we really been ready for that? For most of its history OSS community was busy fighting for survival. And we created strategy, methodologies, and public relations attitudes that were helping us fight for this survival. But the times have changed and now we face totally different set of problems that we need to solve.

<!--more-->

### Outdated foundations

> 93% - percentage of npm packages with just one maintainer

General understanding of the mechanism ruling the OSS ecosystem is relatively outdated. As mentioned above - our knowledge about foundation of community based software was shaped when OSS was treated as something bad and undesirable by mainstream programming industry. Organisations like Free Software Foundation, licenses like GPL have their roots in 80s and 90s. The amazing essay *"The Cathedral and the Bazaar" *that has shaped how we understand the community based software was published in 1999. Those were totally different times - when the software market was dominated by companies like IBM, Oracle and Microsoft that were clearly against any ideas of free software. And back then we need different ways of speaking about OSS - the Bazaar analogy was designed to win hearts of the developers, to show that they don't need to be afraid of the open source software. And it has done that really, really well. However it shouldn't be used in 2018 as a way of describing how OSS works - we now face different set of issues.

While many of the ideas from *The Cathedral and the Bazaar" *have aged really well, and still apply to any kind of software development, OSS nowadays is not about creating huge communities, applying "given enough eyeballs, all bugs are shallow" law, or in principle following Bazaar model. On the contrary, given all the success that OSS has achieved the Bazaar model has been unsuccessful - only 3% of popular OSS projects are using such development model. Of course those 3% contains some hugely popular and impactful projects - such as Rails or Linux - but one could argue that they're using this model as a result of their success and not other way round. In the end, no project starts as a community, there is always someone in charge, and communities around the projects are created only after they are successful.

### Unlimited growth

> 28 millions of developers - number of registered users at GitHub.com

No-one in the 90s could predict the scale of the success that OSS will achieve. The number of developers doing OSS, number of projects, and number of users has raised by several orders of magnitude over last 20 years. The Bazaar model was created when huge percentage of the people using OSS were people developing OSS. But current state of the world is bit different. Let's just compare some numbers.

The number of downloads per 2 weeks:

* 1998 - 180K downloads of Netscape (most popular OSS project at the time)

* 2017 - 21M downloads of Loadash (random JS library)

The number of registered users:

* 2001 - 208K on SourceForge

* 2018 - 28M on GitHub

The number of active projects:

* 2008 - 150K on SourceForge

* 2017 - 29M on GitHub

As we can see, OSS nowadays is massive, global and popular. But there are main 2 issues here. First one is yet increasing fragmentation of the ecosystem - unlike what was presented as big advantage of the Bazaar model, modern OSS is not about creating those singular points of focus for the communities. We don't get "enough eyeballs", instead we all rely on the projects that are very often driven forward by single maintainer and one or two other contributors. Second one is that growth of the user-base doesn't resulted in proportional growth of contributors of the projects. And what's even more important the growth of the contributors hasn't resulted in the proportional growth of the maintainers - which results in more and more pressure put on the focal parts of our communities which itself is really huge issue.

### Maintainers struggle

> "The more successful you are, the more you get punished with GitHub notifications." - [What it feels like to be an open-source maintainer](https://nolanlawson.com/2017/03/05/what-it-feels-like-to-be-an-open-source-maintainer/)

Maintainers are the focal points of the community of any OSS project. Not only they're often main developers behind the project but also they have many other responsibilities - they need to keep users happy, they need to handle contributors to create good workflow that will enable new code contributions, they need to help first time contributors, they need to review PRs, handle releases, and keep general direction of the project.

> "Current status - anxious and depressed whenever I open my GitHub notifications. Programming is so much fun"

However we don't really get new maintainers too often. The number of users growth really fast, the number of developers grows - and while those 2 things are great, they create huge pressure on the maintainers. And the Bazaar analogy is part of the problem here - we expect someone to always step up, we expect contributors to become more and more involved. But the reality is bit different - 1/2 contributors contributes only once, and they account for around 2% of the commits. And every contribution is additional work for the maintainer, additional PR to review, and additional code to maintain later. Of course, every contribution is valuable, and welcomed but in general OSS community has huge "second time contribution" problem - we put lot of emphasis and work to optimise first contribution experience - but it unfortunately is not resulting in many long standing members of the community.

### Sustainability

> $143,000,000 - Estimated value of open source software in $1B Instagram acquisition

OSS movement was shaped in the times were most mainstream software was proprietary, it was not vastly used, and no business depended on it. But nowadays, OSS is everywhere - it powers internet, operating systems, software and products we use everyday. It's hard to imagine building new software without using any OSS technologies and OSS is used by the biggest, most conservative (In terms of technological choices) companies of the world - 100% of Fortune 500 companies are using npm.

And yet, even some most popular OSS projects ever struggle to get any founding, and build any notion of sustainability. But we continue to build businesses using those tools and libraries. One would hope that in the future we will start to think about open source software in terms of digital infrastructure - that, just like our normal infrastructure, requires constant funding to function properly.

### How we talk about OSS

> "Just like physical infrastructure, digital infrastructure needs regular upkeep and maintenance." - [Roads and Bridges: The Unseen Labor Behind Our Digital Infrastructure](https://www.fordfoundation.org/about/library/reports-and-studies/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/)

Probably to solve some of those problems we need to change a way we talk about OSS - instead of convincing our managers that we need to contribute because it is "good" behavior, or because it will improve "morale" of the team we should talk in business terms - risk and opportunity. Contributing to the projects decrease our risk as a business - it decrease risk that project maintainer will rage quit and we will be stuck with unmaintained project, it decrease risk of needing help of other people if we have some problems with the project. Contributing to the project is also opportunity - we can shape project, add new features that will enable us to make our business solutions better.

And the other interesting value proposition for contributing to OSS is just plain marketing value - especially if your product targets technical communities. We know live in the times of Developers Relationships movement, were any company building software projects for developers spends lot of resources for promotion. Contributing to OSS is great way of such promotion. And even if your business is not building tools for developers - it will make hiring talented developers way easier.

### Solutions? I have none

I don't know how to solve the problems of the current OSS world. But it is pretty clear that OSS needs evolve - we need new definitions, new solutions and new leaders for the movement that already changed the world. OSS nowadays struggle with totally different set of the problems than it did 20 years ago, so using the analogies that were used 20 years ago, may not be the way forward. And I do believe that we need to find those solutions pretty fast... or it will turn out that we've built our great castle on the sand.

> This blog post is adaptation of my "Challenges of post-OSS world" talk I've presented on couple of events. If you'd like to have me talk about OSS on your conference and your company feel free to reach me at krzysztof_cieslak@windowslive.com

> Both talk and this blog post has been deeply influenced by the work of [Nadia Eghbal](https://nadiaeghbal.com/).
