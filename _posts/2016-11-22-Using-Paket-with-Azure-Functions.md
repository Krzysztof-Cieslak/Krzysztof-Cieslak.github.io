---
layout: post
title: "Using Paket with Azure Functions"
description: "Using Paket to manage dependencies in Azure Functions"
modified: 2016-05-16
tags: [F#, Paket, Azure Functions]
banner_image: landscape_7.jpg
---

# Introduction

[Azure Functions](https://azure.microsoft.com/en-us/services/functions/) is Microsoft's implementation of serverless architecture hosted on Azure. It is a solution for easily running small pieces of code, or "functions," in the cloud. You can write just the code you need for the problem at hand, without worrying about a whole application or the infrastructure to run it. Functions can be written in many different languages, including F#.

<!--more-->

# Workflow problem

Azure Functions can be developed using online editor avaliable on Azure Portal - unfortunetlly it doesn't provides any rich editing features (autocomplete, tooltips etc) we all like in our normal editors. Luckily, Azure Functions can be also created (and tested) locally, and configured to use GitHub repository (or coulpe other sources) as source of code, creating very nice Continues Deployment process (coding on local machine -> pushing code to GitHub -> deployment to Azure is automatically triggered). This way we should be able to use our rich editor tooling to develop Functions.

However, there is small problem. For sake of simplicity, dependency menagment in Azure Functions is using quite a lot of *magic*. Essensially, all you need to do is create `project.json`, put there your dependency... and then you can just put `#r dependency_name` in your deployed `.fsx` file to reference it. But as we now, that's not exactly how things work in normal F# scripting - usually we need to add relative path to `.dll`, not just a name of reference. What's more I haven't found a way to restore dependencies using Azure Functions CLI tool (which follows Microsoft's tradition of calling `beta` totally unusable software).

# Paket Strikes Back

Instead of fighting with bad workflow suggested by Microsoft, I've decided to do what F# developers usually do - use created by Community tool. And our solution to dependency management problem is [Paket](https://fsprojects.github.io/Paket/)
We normally initialize Paket, put `paket.bootstraper.exe` in `.paket` folder, create `paket.dependencies` file, install dependency. Thanks to that we can use `#r` reference with relative path to our dependency (which is downloaded to packages folder). For example: `#r "../packages/Tesseract/lib/net45/Tesseract.dll"`. This let us to use full power of our editors to develop Azure Functions locally.

# Deployment to Azure

Now we need to force Azure to run Paket after deploying code from our repository to cloud. Doing it is fairly simple, but not documented too well.

First of all, in root of our repository we create `build.cmd` file running Paket.

```bash
@echo off
cls

.paket\paket.bootstrapper.exe
if errorlevel 1 (
  exit /b %errorlevel%
)

.paket\paket.exe restore --force
if errorlevel 1 (
  exit /b %errorlevel%
)
```

Second step is using deployment configuration file to run our `build.cmd`. We create `.deployment` file and add there following entry:

```toml
[config]
SCM_POST_DEPLOYMENT_ACTIONS_PATH = ../wwwroot
```

It configures where deployment utility will look for any post deployment scripts (and `.cmd` file) after cloning and coping our repository. `wwwroot` is root folder which will contain our Function after deployment.

Having those 2 files, we can push code to GitHub, go to Azure Portal, check deployments of our Function App. If everything is OK we should see Paket output in post deployment actions log.

# Summary

In this post, I've presented how to use Paket together with Azure Functions to create nice workflow for developing applications using this modern platform.