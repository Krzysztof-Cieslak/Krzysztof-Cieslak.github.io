---
layout: post
title: "Magic of Saturn controllers"
description: "Magic of Saturn controllers"
modified: 2018-07-20
tags: [F#, Saturn, Web]
banner_image: landscape_10.jpg
---

# Introduction

[Saturn](https://saturnframework.org) is new F# web framework that implements well know design pattern - MVC - in more functional way. Despite Saturn being fairly young project it's getting more and more popular among F# community and industrial users. One of the main Saturn's goals is to create high level abstractions that will enable developers to focus on writing domain, business code instead of focusing on creating correct routing for your application or setting right response headers. One of such abstractions, that I want to talk about today, is `controller`.

> This article was created for Saturn version 0.7.x

<!--more-->

# Basic usage

`controller` is simple computation expression (CE) that enables you to easily implement application endpoint following REST-ish conventions. It can be used for implementing endpoints that renders views if you're building application using server side rendering, or just return serialized data if you're building API or your application is using client side rendering. Just like all other CEs used in Saturn, `controller` provides set of custom operations that you can use. And, what's important, all operations in `controller` CE are optional, which means you can easily choose which subset of functionality you need. Example, basic implementation looks like this:

```
let resource = controller {
    index indexAction
    show showAction
    add addAction
    edit editAction
    create createAction
    update updateAction
    patch patchAction
    delete deleteAction
    deleteAll deleteAllAction
}
```

Let's now go one by one, and describe each operation:

* `index` - mapped into `GET` request at `/` endpoint. Usually used to render a view displaying list of items, or return whole list of items.
* `show` - mapped into `GET` request at `/:id` endpoint. Usually used to render a view displaying details of particular item, or return single item with given id.
* `add` - mapped into `GET` request at `/add` endpoint. Used to render a form for adding new item. Usually not used in API controllers.
* `edit` - mapped into `GET` request at `/:id/edit`. Used to render a form for editing existing item. Usually not used in API controllers.
* `create` - mapped into `POST` request at `/` endpoint. Used to create and save new item.
* `update` - mapped into `POST` and `PUT` requests at `/:id` endpoint. Used to update existing item. Usually replaces original item (keeping id), and requires are fields to be filled in the incoming item.
* `patch` - mapped into `PATCH` request at `/:id` endpoint. Used to update existing item. Usually only changes some fields of original item, request body contains only changed fields or JSON Patch object.
* `delete` - mapped into `DELETE` request at `/:id` endpoint. Used to delete or deactivate existing item.
* `deleteAll` - mapped into `DELETE` request at `/` endpoint. Used to delete or deactivate all items.

> Please remember that Saturn is not enforcing behaviour or inputs of actions any way, so above descriptions are suggestions and best practices, not something that's encoded in framework. The only thing that controller provides is set in stone routing structure.

# Actions implementation

All actions `indexAction`, `showAction` ... are simple F# functions. All of them as first parameter accepts `HttpContext` object - it's an ASP.NET class that contains all information about incoming request, response, server, environment and other data that was injected into it by framework. Actions that are using ID of the item, such as `showAction` or `editAction` are functions that get `id` as a second parameter. The `id` may be generic but we currently supports limited set of the possible types to which we can decode ID from URL.

Supported types:

* `string`
* `char`
* `int`
* `int64`
* `float`
* `bool`
* `System.Guid`

> In case you'd need some custom ID type, I'd recommend using `string` and deserializing it manually. Another important limitation of current controllers is fact that all actions needs to use same ID type in one controller instance. Again, if you'd need different ID types - use `string` and deserialize it manually.

Example action implementation may look like this:

```
let myIndex (ctx: HttpContext) = Controller.text ctx "Hello world"

let myShow (ctx: HttpContext) (id: string) =
    id
    |> sprintf "Hello world, %s"
    |> Controller.text ctx

let myController = controller {
    index myIndex
    show myShow
}
```

# Action output type

If you'll hover over `myIndex` or `myShow` you'll notice that return type of those functions is `Task<HttpContext option>`. First thing - all actions in Saturn's controllers are asynchronous by design, and they are using standard .Net Task to model it. However, they're generic over what type is actually returned by the task. If you return `HttpContext option` you're following standard path of integration with Giraffe (web library on top of which Saturn is built). This gives you not only full control over what's going on and how your response is modified, but also provides ability to integrate with existing Giraffe ecosystem. Additionally Saturn itself provides rich set of helpers that return `Task<HttpContext option>` in `Controller` module (example of this is `Controller.text` function used in example, that sets content of the response to given string, and also sets appropriate response header).

But returning `Task<HttpContext option>` is not only option. You can also return `Task<'a>` (where `'a` is any type) and Saturn will perform automatic output content negotiation. In such case Saturn will check output type of your action, check what's the client preference based on the `Accept` header (if `Accept` header is not present, `Content-Type` header will be used instead) and decide what's the best way to handle response object:

* If you return `string` Saturn will return string with `text/plain` or `text/html``Content-Type` depending on `Accept` header
* If you return `GiraffeViewEngine.XmlNode` (Giraffe's view object) and client accepts `text/html` responses Saturn will render the view and return to client
* If you return any other type it will be deserialized to JSON (with `application/json` `Content-Type`) unless client doesn't accept JSON response - in such case XML will be tried.

Same output content negotiation algorithm is provided by `Controller.response` helper.

Example action implementation using output content negotiation:

```
let myIndex (ctx: HttpContext) =
   task { return "Hello world" }

let myShow (ctx: HttpContext) (id: string) =
    task {
        return sprintf "Hello world, %s" id
    }

let myAdd (ctx: HttpContext) =
    task { return DateTime.Now }

let myController = controller {
    index myIndex
    show myShow
    add myAdd
}
```

>

# Versioning

Versioning of the endpoints is one of the most important cross cutting concernes in web applications... and most of the web frameworks don't provide any built-in ways to handle it easily. Saturn provides opinionated way to easily version your controllers. Saturn is using [1 of 3 wrong ways](https://www.troyhunt.com/your-api-versioning-is-wrong-which-is/) - custom header `x-controller-version` to decide which version of the control should be called. Of course, if you don't like this strategy, Saturn makes it easy to fallback to bit lower level of abstraction, so you can create differently wrong versioning strategy.

The implementation of versioning in your controllers is trivial - it's just adding one additional operation to your controllers - `version`. Here's an example:

```

let myController = controller {
    index myIndex
    show myShow
    add myAdd
}

let myControllerV1 = controller {
    version "1"

    index myIndex
    show myShow
    add myAdd
}

let appRouter = router {
    forward "/endpoint" myControllerV1
    forward "/endpoint" myController
}

```

> Since controller without version is not performing any checks it's important to plug controllers in correct order in your router - the controller without any version should go lowest.

# Plugs

Another important feature of any web framework is ability of (declaratively) plugging some additional actions/modifications for particular actions in controllers. For example, in ASP .NET MVC this is done with attributes and enables features like authorization and authentication for particular actions in controller (and many, many more other features and cross cutting concerns). Saturn provides flexible mechanism to provide such functionalities using controller plugs, using one simple CE operation - `plug` - that accepts list of the actions to which it should apply and the plug function. Plug implementation is any `HttpHandler` which means that it integrates well if existing ecosystem and helpers, and plug implementation is decoupled from the controller itself, which means you can easily create plugs for cross cutting concerns such as logging or authorization and reuse them across many controllers in your application.

Example implementation:

```

let myControllerV1 = controller {
    plug [All] (setHttpHeader "user-controller-all" "123")
    plug [Index; Show] (setHttpHeader "user-controller-some" "456")
    plug (except Index) (setHttpHeader "user-controller-except" "789")

    index myIndex
    show myShow
    add myAdd
}
```

# Subcontrollers

Last important feature of the `controller` is ability to embed controllers. This, again, is fairly opinionated feature that follows REST-ish conventions. Subcontroller should be used in case when one particular item (represented in controller by `/:id`) has some child items - for example `blog` item contains list of `post` items. Or `post` item contains list of `comment` items. Subcontroller is subrouted into `/:id/:subcontrollerPath` route of original controller (so for example `/:id/:subcontrollerPath/:id2` shows the particular comment, or `/:id/:subcontrollerPath/add` will show form for adding new child item to the parent item with given ID). Adding subcontroller to your controller is done by using yet another custom operation in CE - `subController` that takes path of the subcontroller and child controller as inputs (passing ID to this subcontroller).

Example implementation:
```
let commentController userId = controller {
    index (fun ctx -> (sprintf "Comment Index handler for user %i" userId ) |> Controller.text ctx)
    add (fun ctx -> (sprintf "Comment Add handler for user %i" userId ) |> Controller.text ctx)
    show (fun ctx id -> (sprintf "Show comment %s handler for user %i" id userId ) |> Controller.text ctx)
    edit (fun ctx id -> (sprintf "Edit comment %s handler for user %i" id userId )  |> Controller.text ctx)
}

let userControllerVersion1 = controller {
    subController "/comments" commentController

    index (fun ctx -> "Index handler" |> Controller.text ctx)
    add (fun ctx -> "Add handler" |> Controller.text ctx)
    show (fun ctx id -> (sprintf "Show handler - %i" id) |> Controller.text ctx)
    edit (fun ctx id -> (sprintf "Edit handler - %i" id) |> Controller.text ctx)
}
```

> `subController` operation actually accepts any `HttpHandler` not only controllers, which means you anything in there. Also, you can add multiple subcontrollers to one controller which may be useful... for example in combination with controller versioning feature.

# Summary

In this post I've tried to present all features and power of Saturn's high level abstraction - `controller`, and flexible design they allow.