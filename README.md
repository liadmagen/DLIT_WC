
# Deep Learning / Information Theory visualization (using Web Components)

## Objectives
- To find out how much data is 'enough' for a Machine Learning Model (For example, Deep Learning) in order to achieve good generalized resulsts - good percision/F1-Statistic score?
- Which characteristics are relevant for the input data (i.e. Variance) in order to achieve better scores?
- Does running a model through multiple epochs really compress the model and overcome the bias/variance problem (prevents overfitting)?

### Related work
This work is heavily based on the work and theories of [Prof. Geoff I Webb (Monash University)](http://i.giwebb.com/research/bias-and-variance/) and [Prof. Naftali Tishby (Hebrew University)](http://naftali-tishby.strikingly.com/).

We focus on Deep Learning models, and testing different network architectures, in order to achieve the following:
- To provide an interactive visualization of Deep learning network's hidden layers training phase using mutual information
- To store and analyze the results of different training executions
- To measure and analyze the impact of variance/Std Deviation differences of the trainng data, on the achieved measure-scores


### Background
Since 'Deep Learning' is practically a learnable mapping function between input and ouput, this project visualizes the training process, where the model slowly finds the correct mapping parameters, until reaching the maximal bound.
Unlike other visualizations, where the layers where visualized directly or using dimension reduction techniques (http://colah.github.io/posts/2014-10-Visualizing-MNIST/), here we're interested on the general information that the nodes contain, regarding both the inputs and the outputs.

According to the information bottleneck theory (Tishbey, Schwartz-Ziv.), during the training process the mutual information about the input and the output is divided between the layer in a way that resemles a form of an encoder and a decoder, until the data compress at a specific point.

Lastly, it is important to let the model run long time, on many epochs, in order to test the hypothesis that the model can and will reach the upper information bottleneck theory bound.

Related research:
* [On the Inter-relationships among Drift rate,
Forgetting rate, Bias/variance profile and Error](https://arxiv.org/pdf/1801.09354.pdf)
* [On the Information Bottleneck
Theory of Deep Learning](https://openreview.net/pdf?id=ry_WPG-A-)
* [New Theory Cracks Open the Black Box of Deep Learning](https://www.quantamagazine.org/new-theory-cracks-open-the-black-box-of-deep-learning-20170921/)





# Polymer App Toolbox

[![Build Status](https://travis-ci.org/PolymerElements/polymer-starter-kit.svg?branch=master)](https://travis-ci.org/PolymerElements/polymer-starter-kit)

This template is a starting point for building apps using a drawer-based
layout. The layout is provided by `app-layout` elements.

This template, along with the `polymer-cli` toolchain, also demonstrates use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

### Migrating from Polymer Starter Kit v1?

[Check out our blog post that covers what's changed in PSK2 and how to migrate!](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html)

### Quickstart

We've recorded a Polycast to get you up and running with PSK2 fast!

<p align="center">
  <a href="https://www.youtube.com/watch?v=HgJ0XCyBwzY&list=PLNYkxOF6rcIDdS7HWIC_BYRunV6MHs5xo&index=10">
    <img src="https://img.youtube.com/vi/HgJ0XCyBwzY/0.jpg" alt="Polymer Starter Kit 2 video">
  </a>
</p>

### Setup

##### Prerequisites

First, install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli

Second, install [Bower](https://bower.io/) using [npm](https://www.npmjs.com)

    npm install -g bower

##### Initialize project from template

    mkdir my-app
    cd my-app
    polymer init polymer-2-starter-kit

### Start the development server

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    polymer serve

### Build

The `polymer build` command builds your Polymer application for production, using build configuration options provided by the command line or in your project's `polymer.json` file.  

You can configure your `polymer.json` file to create multiple builds. This is necessary if you will be serving different builds optimized for different browsers. You can define your own named builds, or use presets. See the documentation on [building your project for production](https://www.polymer-project.org/2.0/toolbox/build-for-production) for more information.

The Polymer Starter Kit is configured to create three builds using [the three supported presets](https://www.polymer-project.org/2.0/toolbox/build-for-production#build-presets):

```
"builds": [
  {
    "preset": "es5-bundled"
  },
  {
    "preset": "es6-bundled"
  },
  {
    "preset": "es6-unbundled"
  }
]
```

Builds will be output to a subdirectory under the `build/` directory as follows:

```
build/
  es5-bundled/
  es6-bundled/
  es6-unbundled/
```

* `es5-bundled` is a bundled, minified build with a service worker. ES6 code is compiled to ES5 for compatibility with older browsers.
* `es6-bundled` is a bundled, minified build with a service worker. ES6 code is served as-is. This build is for browsers that can handle ES6 code - see [building your project for production](https://www.polymer-project.org/2.0/toolbox/build-for-production#compiling) for a list.
* `es6-unbundled` is an unbundled, minified build with a service worker. ES6 code is served as-is. This build is for browsers that support HTTP/2 push.

Run `polymer help build` for the full list of available options and optimizations. Also, see the documentation on the [polymer.json specification](https://www.polymer-project.org/2.0/docs/tools/polymer-json) and [building your Polymer application for production](https://www.polymer-project.org/2.0/toolbox/build-for-production).

### Preview the build

This command serves your app. Replace `build-folder-name` with the folder name of the build you want to serve.

    polymer serve build/build-folder-name/

### Run tests

This command will run [Web Component Tester](https://github.com/Polymer/web-component-tester)
against the browsers currently installed on your machine:

    polymer test

If running Windows you will need to set the following environment variables:

- LAUNCHPAD_BROWSERS
- LAUNCHPAD_CHROME

Read More here [daffl/launchpad](https://github.com/daffl/launchpad#environment-variables-impacting-local-browsers-detection)

### Adding a new view

You can extend the app by adding more views that will be demand-loaded
e.g. based on the route, or to progressively render non-critical sections of the
application. Each new demand-loaded fragment should be added to the list of
`fragments` in the included `polymer.json` file. This will ensure those
components and their dependencies are added to the list of pre-cached components
and will be included in the build.
