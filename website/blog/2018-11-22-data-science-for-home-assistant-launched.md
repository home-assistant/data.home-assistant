---
title: Data Science portal for Home Assistant launched
author: Paulus Schoutsen
authorURL: http://twitter.com/balloob
authorFBID: 297400035
---

“Data is the new oil” is a popular expression on the internet, and whether or not you agree with that statement, it does summarise several points about data. Firstly, data, and in particular personal data, holds tremendous value. Large corporations realise this, and will go to extreme lengths to gain access to personal data since if contains insights into your behaviour. Insights generated from that data allows them to better target their marketing, giving them an edge over the competition. Secondly, data, like oil requires processing before it is useful. Whilst oil is processed in refineries, data is processed by 'data scientists', who use various statistical techniques to separate signal from noise. The signals they generate are fed into various models, which aim to predict future behaviour based on historical data.

So what has this got to do with Home Assistant, or home automation in general? Well on the first point, a core principle of Home Assistant is that a user has complete ownership of their personal data. A users data lives locally, typically on the SD card in their raspberry pi. In particular, Home Assistant stores data in a SQL database, meaning that standard data science tools can be used to read that data. On the second point, the parallel with data scientists generating signals to act on, is a Home Assistant user configuring an automation to do some action in their home. If you break it down, the process of creating an automation consists of a couple of  steps:

1. We first *identify a need* for an automation
2. We go through a *process of optimisation* to decide the conditions when the automation should be triggered, and how the automation should behave

With experience and experimentation its possible to create some really powerful and expressive automations, and this is one of the areas the Home Assistant excels over all of the commercial home automation systems. If you browse the Home Assistant forums, you will see that some users have put significant effort into refining and optimising their automations, and their automations might have to meet multiple criteria before being triggered, or change their behaviour in response to input values such as set points. Clearly these automations add significant value for their users or they wouldn't have bothered to create them, but wouldn't it be great we could reduce the time, effort and experience level required to create and optimise these automations? What new automations would we create if data showed their was a use for them? 
