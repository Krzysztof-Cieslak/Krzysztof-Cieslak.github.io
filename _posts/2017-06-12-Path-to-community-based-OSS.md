---
layout: post
title: "Path to Community based Open Source Software"
description: "Path to Community based Open Source Software"
modified: 2017-06-12
tags: [Open Source, Community]
banner_image: landscape_8.jpg
---

# Introduction

Open Source movement has changed the software development world as much as only few things before. Nowadays, it's almost impossible to develop any project without using OSS - we can be sure that some parts of our stack are developed in the open - from the libraries we download from the package managers, through runtime, to compilers that we are using. Even most conservative, and not-so-long-time-ago actively hostile to OSS companies are now trying to embrace Open Source development.

But putting code in open by uploading to GitHub, using one of the licenses formally accepted by the [Open Source Initiative](https://opensource.org/) is just first step. In my opinion, the real value of the Open Source is not just license, and publicly available code (although, those things are also valuable on their own) but rather possible change in governance model, collaboration with Community and embracing "OSS Culture".

In this post I'll describe different "stages of enlightenment" that company can go through in its path to the Open Source development model that will bring most value to both company and community.

<!--more-->

# Open Source License

Even though, as I've mentioned I believe that embracing OSS goes much beyond just having OSS license we can't really forgot about importance and impact of it. Having OSS license is necessary condition for any project that wants to be called OSS projects. There exist formal definition created by Open Source Initiative called [Open Source Definition](https://opensource.org/docs/osd) that sets strict rules that license must follow to be called OSS license.

# Stage 1 - Code dump

At this level, company publishes online projects that its no longer going to invest into or maintain. Probably project failed, was deprecated, or is not profitable. Usually it means that company is no longer interested in the code base - there will be no maintainers, no merged PRs, no responses to issues, and no updates. Rarely, it's desperation step and company is trying to save project... more often company is trying to save itself from outrage of existing community and userbase after cancelling product. The only way it can end well is when there already exist active project community that will fork project, and continue to maintain project. And usually that's not a case - since product was developed as a closed sourced project it usually don't have huge community of developers that are engaged enough to pick up dropped ball.

# Stage 2 - Open facade

In this model company still actively develops the application. Publicly available code is updated regularly, some people from the company are responding to the issues (it's often used only as a public bug tracker). But all decisions, discussions about new features, bug fixes are done internally in company using private communications channels - community has no impact on the direction of the product, communication is often only one-way - community tries to give it feedback, and suggest way forward but usually there is no respond from the company (even if some of those suggestions are taken into account by some members of the development team), PRs are ignored or actively discouraged. In terms of building community this level is often even worse than previous stage - at least fact that no one cares about project forces the community to step up (if there is need for the project), in this stage community is discouraged to do anything - it has no impact, and someone else is developing the project. In longer term it's really bad - it creates community that is 100% reliant on the company building the product, and that is unable to step up when needed (for example to extend ecosystem of the project).

# Stage 3 - Development in the open

That's the level when company can see first real advantages of the Open Source methodologies, it's also level where most companies trying to embrace OSS are at. In this stage company develops product in the open - code development is done directly on GitHub (or other provider), discussions about product future (or at least some of them) are done using public channels such as issues. Bug reports are treated seriously, feature requests are discussed in with the community in the public, PRs are getting accepted as long as they follow the direction of the project set by company. This level creates decently engaged community - even though community and external developers can't dictate future of the project, and direction it's going to be developed in they still can at least quickly fix the bugs and problems they encounter. They also feels that company is taking their feedback seriously - as long as the communication works decently, most external developers can understand why some features are not going to be implemented, or they are not priority. Company can expect decent feedback focused on the technical level - the implementation details, as that's something that's focus point of the community. However, communication is still mostly "initialized" by the community - they report bugs, or suggest feature requests and then development team from the company responds to that. Also the company goals are still focal point of the development - they dictate development plans and what feature requests are accepted.

# Stage 4 - Enlightened despot

At this level company starts to understand that short term business goals are less important for the success than long term growth of the community. In terms of development practices it's really similar to previous level - development is done in the open, things are discussed in public channels, PRs are getting accepted. The difference is really subtle but important - the company is actively trying to look for the feedback about product future (and not only particular features), communication is often initialized by development team, the short term road maps (for example monthly iteration plans) are published so the community knows what the development team is going to focus on. The project is still in the formal control of the company (only members of the company have write access to the repository) but the product is developed with community being focal point of the process. This model creates really engaged community as it puts lot of weight on communication with community. It also makes community feel that it has real impact on the project and that company cares not only about business goals but also abut growth of ecosystem. In this model company can expect lot of really good feedback (both positive and negative), which increases chances of making right decisions about everything... from general decisions about project future to implementation details.

# Stage 5 - Community based Open Source

At this stage company not only focuses on the community, it becomes part of the community equals to all other contributors. Decisions are made by consensus between all parts of the community. The write access to repository is given to the external developers that are not hired by the company, developers that are hired by the company are not getting automatically write access just because they are hired - they need to follow same path as any other member of the community, proof to be a good actor in the community. Community starts to self govern itself - there no longer exist one entity that's formally more important than other parts of the community. There are no private commination channels as every member of the community has access to information. Really often general project roadmaps stops existing - there is no way of forcing everyone in the community to work on some particular set of features, people tend to work on features they want to have implemented (of course, as long as they are in the scope of the projects and community generally agrees that it's needed feature). This model brings to the project not only great discussions, great developers (that you wouldn't necessarily be able to hire) but also great leaders, maintainers and evangelists - people that really care about your project, that will be willing to spend lot of time and effort to develop product and its ecosystem.

# Problems with embracing Community based OSS

Companies are often really afraid of the governance model in which they give up parts of their privileges connected with absolute power over the project. They often state that they need to maintain control to make sure that the product will be developed in right direction (even if they are OK with putting community in the center of this direction, or at least consult it with community). I believe that there are two points that are often missed when this argument is raised. First of all - development team hired by the company still can focus on those features, and those parts of the project that are most important for your business - company still can have its roadmaps and plans that are important for hired development team. Secondly, if we assume that whole community will agree on given direction, community itself will be the best entity that will ensure that product is developed in direction that was agreed on by all parts. As long as the company understands that growth of the community and ecosystem is good for the business in long term, everything should be fine.

# Summary

In this blog post I've described several different models for embracing Open Source development methodologies. I belive that it's clear that even though putting code in public with OSS license is good move, the real power of the OSS is collaboration with the community - and more effort is put into this collaboration, more control is given over to communing, the better results will be - from creating really engaged user base that cares enough to report bugs and suggest new features on its own, through getting some technical feedback and small bug fixes, to creating real self governing community that will create its own leaders, and evangelists, that will include some people that you couldn't bring to project otherwise.


