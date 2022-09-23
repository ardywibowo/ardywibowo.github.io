+++
date = "2017-08-20T12:00:00"
draft = false
tags = ["freelance", "awesome"]
title = "Frank Stanford's New Editable Website with Meteor"
math = true
summary = """
I have recently developed a Content Management System (CMS) from scratch specifically made for Frank's artwork, travel pictures, and writing. I designed his website from scratch using barebones frontend/backend libraries as a challenge. [[Website](http://frankstanford.com)] [[Source Code](https://github.com/ardywibowo/FrankCMS)].
"""

[header]
image = "frank-stanford.png"
caption = "Front page of Frank's website"

+++

I have recently developed a Content Management System (CMS) from scratch specifically made for Frank's artwork, travel pictures, and writing. I designed his website from scratch using barebones frontend/backend libraries as a challenge. [[Website](http://frankstanford.com)] [[Source Code](https://github.com/ardywibowo/FrankCMS)].

Frank was a professor in sociology in College Station who has a lot of artwork, writing, and travel photos. His home was practically a museum! He was looking to update his previous website, as it had become outdated. It didn't support different viewports (tablets and phones) and it was a total pain to edit/add items to his website (he had to hire a person to do it for him). 

The requirements for his website were particularly demanding. In addition to being responsive and working with different screen sizes, it also had to be editable. Moreover, the website was a sort of niche thing for Frank, so he didn't want to spent a lot of money maintaining it. Finally, Frank wanted the ability to edit the website by himself, so the editing interface needed to be beautiful and fool-proof.

Not finding a simple solution for the above requirements, this led me to develop a website and a CMS from scratch. Here are the requirements I laid out in building this website:

1. Editable
2. Dynamic/Responsive
3. Supports different screen sizes
4. Modern/minimalistic style
5. Easy editing user interface

In hindsight, the requirements were very demanding to pull off compared to the commission he gave me :P. However, I enjoyed the entire process and I have become very comfortable with the entire process of making web apps fullstack.

### Methodology

#### Main Framework

The main framework I used for this project is Meteor. This is an all-in-one framework that supports frontend and backend development. I used the Meteor Angular version of this framework and wrote it primarily in TypeScript. 

It is very useful if you want to quickly develop a web app that supports common features such as user accounts, reactive updates, database storage, etc.

#### Front End

- Angular 2

I used Angular due to its support for modular components. Arguably, I read that React has the same features. However, I am more familiar with Angular's syntax from previous experience. Moreover, Angular officially supports Material Design templates. 

- Material 2

In this project, I wanted to go for a minimalistic design with primarily black and white colors to contrast the colorful pictures Frank has. In my opinion, Material design achieves this effect quite naturally.

- Bourbon Neat

Bourbon Neat is a great tool for general purpose CSS commands such as creating columns, assigning animations, and adjusting element proportions. It is style agnostic unlike Bootstrap which makes it less redundant when used with Material Design.

#### Back End

- MongoDB

I used MongoDB for the database. It is very nice to get a new app up and running quickly. Adding new fields is as simple as just changing the model code in one file. Deployment wasn't too difficult either, due to Meteor's support of this database.

- RxJS

RxJS is used to support reactive updates between backend and frontend. It is very cool to see the web app update by itself on one window when you change something in another. All without any browser refresh! Meteor's support for this framework was also good, although it takes some getting used to.

Especially strange concepts to grasp are observables, which are like promises but you need to code them just right to make it work.

- NginX

NginX is used to run the web app during deployment. To be honest, the entire DevOps process was a complete pain. Thankfully, a lot of tutorials help you on this issue.

#### Hosting Service

I used **Digital Ocean** to host the web app on Ubuntu Linux 14.04. It is very cheap for the quality. In fact, I think it may be the cheapest. No fluff and nothing you don't need. In fact, due to many great free software, anything you need to track your website can be installed from the Terminal.

### Screenshots

An example of the main view of the dashboard is shown below

![Frank Stanford Dashboard](/img/frank-stanford/frank-edit-menu.png)

When an artwork is clicked on the dashboard, a modal is presented and we can edit it on the spot:

![Frank Stanford Edit Artwork](/img/frank-stanford/frank-artwork-edit.png)

Adding and removing artwork to an album is done through a list images in that category/album:

![Frank Stanford Add To Album](/img/frank-stanford/frank-add-artwork.png)

The dropdown menu that displays album contents also contain album edit features:

![Frank Stanford Album Edit](/img/frank-stanford/frank-edit-album.png)
