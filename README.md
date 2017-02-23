# CJW Admin for eZ Publish/eZ Platform

**Please note: CJW Admin for eZ Publish/eZ Platform is a technology study only.**

**DO NOT USE FOR PRODUCTION !!!**

## Preliminaries

Like most eZ developers, we at CJW Network have used eZ Publish for years in a very traditional way with server side rendering only, somethings augmented with progressive enhancement for some few features. Seeing the challenge of making web apps more responsive and snappier, we begun to dive deeper in Javascript development using AngularJS.

In first steps AngularJS proved to be very versatile for realising complex interactive forms. Once we were confident with the technology, we realized that AngularJS provides a high level of modularity.
 
This lead to the next question: can we build a highly modular application, like a content editing backend with it? How easily can we add functionality, new datatypes and the like? How easily can we use it with the eZ Publish REST API V2? The result is a light-weight, blasting fast prototype for a backend for eZ Publish/eZ Platform.

### Current status

This project began as, and still is, a side project, developed in spare time. It is currently on hold due to limited resources. For the time being it is based on eZ Publish 5.4/2014.11 and AngularJS V1.6. Tests with eZ Platform 1.8 were very limited, but promising.

### Why make it public?

We decided to make it public as eZ Systems has raised and discussed the question of revamping the eZ Platform UI in different blog posts.

* https://ezplatform.com/Blog/2.x-refactoring-work-round-one-Deciding-on-UI-Technology
* https://ezplatform.com/Blog/The-case-for-picking-React-as-the-next-framework-for-eZ-Platform-UI
* https://ezplatform.com/Blog/2.x-Revamp-Round-Two-Overall-Technology-Direction-and-Next-Steps

We feel that this project can add some practical insights to this discussion. The principles elaborated in this project could be applied to similar frameworks like ReactJS.

## Demo

He have setup a demo where you can see the app in action. It is no beauty, but offers basic backend functions at a stunning speed.

* Frontend: http://www.cjwpublish.com/en http://www.cjwpublish.com/de
* CJW Admin: http://www.cjwpublish.com/adminapp

The demo is reset every hour. Don't be afraid to play around.

## What you can expect from CJW Admin

* Basic content editing functions (create, edit, delete and move content objects, add locations)
* Basic content class editing functions
* Honouring a subset of roles, e.g. for creating new objects.
* Stubs for other admin functions
* Note: limited functionality with eZXML datatype due to REST API restrictions

## Installation

see [INSTALL.md](INSTALL.md) for instructions.

## Using CJW Admin

Invoke CJW Admin by using `http://<yoursite>/adminapp`

_Note: you may get a Symfony Login prompt before the CJW Admin Login page is presented._

Use your normal credentials.

## Extending CJW Admin

We know about the need of extending the admin interface to fit your needs. Documentation and examples will follow.

## Bugs and Enhancements

Please file issues in this repository.

## Want to contribute?

If backed by the community and/or eZ Systems, we consider resuming the development. Please contact us if you would like to contribute.
