---
title: "Quick Start to Home Assistant Data Science"
id: "quick-start"
sidebar_label: "Getting Started"
---

In this quick start guide, we're going to show you how to set up and use [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/), a data science environment. JupyterLab is the tool of choice for data scientists around the globe. Using JupyterLab we will run some reports on your own data. All reports are editable so you can quickly start experimenting and exploring more!

## Installing JupyterLab

To install JupyterLab, we're going to use the JupyterLab Lite add-on by the Community Add-ons project. Install it by clicking this button:

[![Open your Home Assistant instance and show the dashboard of a Supervisor add-on.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=a0d7b954_jupyterlablite)

<details>
<summary>Step by step installation instructions</summary>

- Click on Supervisor in the panel. Choose "Add-On Store" from the menu.
- Add the Community Add-ons as a new repository with the URL `https://github.com/hassio-addons/repository` and click on "Add".
- Scroll down to the new section for Community Add-ons and click the install button on **JupyterLab Lite**. Installation can take a couple of minutes depending on your internet speed.

_In case your Home Assistant installation does not support add-ons, check out the [quick start for Home Assistant Core users](quick_start_core.md)._

</details>

<br />

Once installed, it will open the JupyterLab Lite add-on page:

1. Click on "START" to start the JupyterLab Lite add-on.
1. Now click on "OPEN WEB UI" to open JupyterLab. If you get a blank page with "502 Gateway not ready", wait a minute and hit refresh in your browser. JupyterLab can take some time to start up.
1. You will be prompted for your credentials. You can use the same username and password as that you use to log in to Home Assistant.

<img
  src='/img/getting-started/hassio-jupyterlab.png'
  alt='JupyterLab Lite Add-on after the installation'
/>

## Running your first report

JupyterLab works with Jupyter Notebooks. Think of a notebook like a Word document that can also contain code to explore your data.

We have prepared a few notebooks for you that will help you get started. Let's start with the notebook `GETTING STARTED.ipynb` inside the `home-assistant` folder. You can find it in the left sidebar. This notebook has been prepared by us to automatically read your Home Assistant data and generate a few interesting statistics about your data!

To run the report, click on "Run" in the top menubar and click on "Run All Cells". The notebook will now generate the full report. Depending on the size of your database, this might take some time. The little square brackets with an asterisk (`[*]`) to the left of Python code (a cell) will indicate what is currently being executed or about to be executed. Once executed, it will change to `[<number>]` (number represents the order cells are executed).

The cool thing about these reports is that you can edit the Python code and execute it again to get the latest results. After each change, just run the cell (by clicking the "play" button in the toolbar). Executing a cell will run the Python code and show the latest results!

## What's next

You now have all tools available to you to explore the data in your home.

If you want to see some more possibilities, check out [the HASS Data Detective usage examples](https://mybinder.org/v2/gh/robmarkcole/HASS-data-detective/master?filepath=notebooks).

If you want to see how it can be used for non-Home Assistant related data, the add-on has also installed a couple of other interesting notebook examples.

If you want to learn more about what data Home Assistant tracks, check out the [data primer](data_index.md).
