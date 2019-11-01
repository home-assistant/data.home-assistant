---
title: "Quick Start to Home Assistant Data Science"
sidebar_label: "Introduction"
---

In this quick start guide, we're going to show you how to set up and use [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/), a data science environment. JupyterLab is the tool of choice for data scientists around the globe. Using JupyterLab we will run some reports on your own data. All reports are editable so you can quickly start experimenting and exploring more!

This guide is assuming that you have [a Hass.io installation](https://www.home-assistant.io/getting-started/) up and running. Hass.io is our all-in-one platform that runs Home Assistant and can easily be extended with other software, like JupyterLab. In case you are not using [Hass.io](https://www.home-assistant.io/getting-started/), please check out the [quick start to Home Assistant Data Science for non-hass.io users](https://data.home-assistant.io/docs/quick_start_nonhassio_index.html).

If you don't use Hass.io to run Home Assistant, skip the next step and manually install [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/), [HASS Data Detective](https://pypi.org/project/HASS-data-detective/) and download the [Home Assistant notebooks](https://github.com/home-assistant/home-assistant-notebooks).

## Installing JupyterLab

To install JupyterLab, we're going to use the JupyterLab Lite add-on by the Community Add-ons project. To get started:

- Click on Hass.io in the panel. Choose "Add-On Store" from the menu.
- Add the Community Add-ons as a new repository with the URL `https://github.com/hassio-addons/repository` and click on "Add".
- Scroll down to the new section for Community Add-ons and click the install button on **JupyterLab Lite**. Installation can take a couple of minutes depending on your internet speed.
- Once installed, it will open the JupyterLab Lite add-on page.
- Click on "START" to start the JupyterLab Lite add-on.
- Now click on "OPEN WEB UI" to open JupyterLab.
- You will be prompted for your credentials. You can use the same username and password as that you use to log in to Home Assistant.
- If you get a blank page with "502 Gateway not ready", wait a minute and hit refresh in your browser. JupyterLab can take some time to start up.

<img
  src='/img/getting-started/hassio-jupyterlab.png'
  alt='JupyterLab Lite Add-on after the installation'
/>

## Running your first report

JupyterLab works with Jupyter Notebooks. Think of a notebook like a Word document that can also contain code to explore your data.

We have prepared a few notebooks for you that will help you get started. Let's start with the notebook `GETTING STARTED.ipynb` that was installed as part of the add-on. You can find it in the left sidebar. This notebook has been prepared by us to automatically read your Home Assistant data and generate a few interesting statistics about your data!

To run the report, click on "Run" in the top menubar and click on "Run All Cells". The notebook will now generate the full report. Depending on the size of your database, this might take some time. The little square brackets with an asterisk (`[*]`) to the left of Python code (a cell) will indicate what is currently being executed or about to be executed. Once executed, it will change to `[<number>]` (number represents the order cells are executed).

The cool thing about these reports is that you can edit the Python code and execute it again to get the latest results, you don't even need to execute the whole report again to see most changes. After each change, just run the cell (by clicking the "play" button in the toolbar). Executing a cell will run the Python code and show the latest results!

## What's next

You now have all tools available to you to do data science. If you want to see some more cool notebooks that people have created for Home Assistant, the add-on has installed the Home Assistant Notebook collection. You can also check out [the HASS Data Detective usage examples](https://github.com/robmarkcole/HASS-data-detective#simple-query). If you want to see how it can be used for now-Home Assistant related data, the add-on has also installed a couple of other interesting notebook examples.

If you want to learn more about what data Home Assistant tracks, check out the [data primer](data_index.md).
