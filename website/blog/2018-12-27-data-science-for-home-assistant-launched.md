---
title: Data Science portal for Home Assistant launched
author: Robin Cole
authorURL: http://twitter.com/robmarkcole
authorImageURL: https://twitter.com/robmarkcole/profile_image?size=normal
---

_TL;DR: Today we launch a new data portal to get users up and running with their own data science environment running their first reports in 15 minutes. [Get started](/docs/quick_start_index.html)._

“Data is the new oil” is a popular expression on the internet, and whether or not you agree with that statement, it does summarise several points about data. Firstly, data, and in particular personal data, holds tremendous value. Large corporations realise this, and will go to extreme lengths to gain access to personal data since it contains insights into your behaviour. Insights generated from that data allows them to better target their marketing, giving them an edge over the competition. Secondly, data, like oil, requires processing before it is useful. Whilst oil is processed in refineries, data is processed by data scientists, who use various statistical techniques to separate signal from noise. The signals they generate are fed into models which aim to predict future behaviour based on historical data.

So what has this got to do with Home Assistant, or home automation in general? Well on the first point, a core principle of Home Assistant is that a user has complete ownership of their personal data. A users data lives locally, typically on the SD card in their Raspberry Pi. In particular, Home Assistant stores data in a SQL database, meaning that standard data science tools can be used to read that data. On the second point, the parallel with data scientists generating signals to act on, is a Home Assistant user configuring an automation to do some action in their home. If you break it down, the process of creating an automation consists of a couple of  steps:

1. We first *identify a need* for an automation
2. We go through a *process of optimisation* to decide the conditions when the automation should be triggered, and how the automation should behave

With experience and experimentation it is possible to create some really powerful and expressive automations, and this is one of the areas where Home Assistant excels. If you browse the Home Assistant forums, you will see that some users have put significant effort into crafting and optimising their automations. Sophisticated automations might have to meet multiple criteria before being triggered, or change their behaviour in response to input values such as set points. Clearly these automations add significant value for their users or they wouldn't have bothered to create them. But wouldn't it be great if we could reduce the time, effort and experience required to create and optimise automations? What new automations would we create if data showed there was a use or need for them? Is it possible to optimise automations for end users who don't give verbal feedback e.g. pets? Can the tools of modern data science, in the hands of creative and motivated Home Assistant users, be applied to answer these questions and more? Well to find out, we are excited to launch the Home Assistant Data Science website!

The Home Assistant Data Science website is your one-stop-shop for advice on getting started doing data science with your Home Assistant data. To accompany the website, we have created a brand new Hass.io addon [Jupyterlab-lite](https://github.com/hassio-addons/addon-jupyterlab-lite), which allows you to run a data science IDE called Jupyterlab directly on your Raspberry Pi hosting Home Assistant. You do your data analysis locally, your data never leaves your local machine. When you build something cool, you can share the notebook without the results, so people can run it at their homes too.

We have also created a Python library called the [HASS-Data-Detective](https://github.com/robmarkcole/HASS-data-detective) which makes it super easy to get started investigating your Home Assistant data using modern data science tools such as [Pandas](https://pandas.pydata.org/). 

To tie it all together, we created a [Getting Started notebook](https://github.com/home-assistant/home-assistant-notebooks/blob/master/~%20GETTING%20STARTED.ipynb) which shows you how to do some elementary analysis on your Home Assistant data. In 15 minutes, you can install the Jupyerlab Lite add-on and generate a report on your own data. [Try it out](/docs/quick_start_index.html).

Going forward, we are planning on publishing more articles here showing how you can do more advanced analysis on your Home Assistant data, show how this can feedback into your automations and highlight creations of the community.

Major thanks for [@frenck](https://github.com/frenck) on building the Jupyterlab Lite add-on and to [@balloob](https://github.com/balloob) for putting the website together and helping with HASS Data Detective.
