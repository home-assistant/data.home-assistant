---
title: "Quick Start to Home Assistant Data Science"
sidebar_label: "Introduction"
---

In this quick start guide, we're going to show you how to set up Jupyter Lab, a data science environment, and run some reports on your own data. All reports are editable so you can quickly start experimenting and exploring more!

This guide is assuming that you have [a Hass.io installation](https://www.home-assistant.io/getting-started/) up and running. Hass.io is our all-in-one platform that runs Home Assistant and can easily be extended with other software.

## Installing Jupyer Labs

To install Jupyer Labs, we're going to use the Juptyer Labs Lite add-on by the Communty Add-Ons project. This add-on is currently only available in the edge repository. To get started:

- Open Home Assistant
- Click on Hass.io, Add-Ons
- Add the Edge Community Add-ons as a new repository with the url `https://github.com/hassio-addons/repository-edge` and click on "Add"
- Scroll down to the new section for Edge Community Add-ons and click the install button on Jupyer Lab Lite. Installation can take a couple of minutes depending on your internet speed.
- Once installed, it will open the Jupyer Lab Lite add-on page.
- Click on "START" to start the Jupyter Labs Lite add-on.
- Now click on "OPEN WEB UI" to open Jupyer Labs

## Running your first report

Jupyer Labs is the choice for data scientists around the globe. It works with Jupyer Notebooks. Think of a notebook like a Word document that can also contain code to explore your data.

We have prepared a few notebooks for you that will help you get started. Let's start with the Getting Started notebook that was installed as part of the add-on. This notebook has been prepared by us to automatically read your Home Assistant data and generate a few interesting statistics about your data!

To run the report, click on "Cell" in the top menubar and click on "Run All". The notebook will now generate reports based on your data.

You can copy the getting started notebook to make changes or make the changes directly in the getting started notebook. After each change, just run the cell (by clicking the "play" button in the toolbar) and you will immediately see the latest results incorporating your changes.

The Getting Started notebook is powered by a Python package called [HASS Data Detective](https://github.com/robmarkcole/HASS-data-detective), that was specifically created to do data science with Home Assistant data. It is able to automatically detect your Home Assistant installation and connect to the database.

## What's next

You now have all tools available to you to do data science. If you want to see some more cool notebooks that people have created for Home Assistant, the add-on has installed the Home Assistant Notebook collection. You can also check out [the HASS Data Detective usage examples](https://github.com/robmarkcole/HASS-data-detective#simple-query). If you want to see how it can be used for now-Home Assistant related data, the add-on has also installed a couple of other interesting notebook examples.

If you want to learn more about what data is available, check out the [data primer](data_index.md).
