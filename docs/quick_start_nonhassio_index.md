---
title: "Quick Start to Home Assistant Data Science for non-hass.io users"
sidebar_label: "Introduction"
---

In this quick start guide, we're going to show you how to set up and use [JupyterLab](https://jupyterlab.readthedocs.io/en/stable/), a data science environment. JupyterLab is the tool of choice for data scientists around the globe. Using JupyterLab we will run some reports on your own data. All reports are editable so you can quickly start experimenting and exploring more!

This guide explains the installation and setup of JupyterLab and expects a fresh Ubuntu 18.10 installation. But it should be easy to adapt it for most other platforms.

## Preparing the system

Updating the system and installing required dependencies.

```bash
sudo apt update
sudo apt upgrade
sudo apt install python3-pip
sudo pip3 install jupyterlab
sudo pip3 install HASS-data-detective
sudo pip3 install homeassistant
sudo pip3 install sqlalchemy
```

*If* using _postgreSQL_:
```bash
pip3 install psycopg2-binary
```

## Preparing the user environment

Create a notebook directory and checkout the Home Assistant data science notebooks.

```bash
mkdir ~/Notebook
cd ~/Notebook
git clone https://github.com/home-assistant/home-assistant-notebooks.git
```

## Launch Jupyter Lab as systemd service

Replace `User=ubuntu` by your own user in `jupyterlab.service`.

```bash
sudo curl -o /etc/systemd/system/jupyterlab.service https://gist.githubusercontent.com/cgtobi/11439422a65610680127dcb2d507482a/raw/0ba0574bafc160c1cc9edf0d1361c7ae62af7453/jupyterlab.service
sudo systemctl daemon-reload
sudo systemctl enable jupyterlab.service
sudo systemctl start jupyterlab.service
```

## Create read-only database user

You need a user to access your database. This guide assumes a PostgreSQL database but any other will do just as well.

### PostgreSQL

Run where your HASS DB lives:
```bash
sudo -u postgres psql
postgres=# CREATE USER datascience WITH encrypted password 'my_secret_password';
```

The user needs sufficient rights to the hass database.

```bash
sudo -u postgres psql -dhass
hass=# GRANT CONNECT ON DATABASE hass to datascience;
hass=# ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO datascience;
hass=# GRANT USAGE ON SCHEMA public to datascience; 
hass=# GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO datascience;
hass=# GRANT SELECT ON ALL TABLES IN SCHEMA public TO datascience;
```

## Running your first report

JupyterLab works with Jupyter Notebooks. Think of a notebook like a Word document that can also contain code to explore your data.

We have prepared a few notebooks for you that will help you get started. Let's start with the notebook `GETTING STARTED.ipynb` that was installed as part of the add-on. You can find it in the left sidebar. This notebook has been prepared by us to automatically read your Home Assistant data and generate a few interesting statistics about your data!

Open the _GETTING STARTED_ notebook and modify the database connection accordingly. (Again, this assumes PostgreSQL!)

`db = HassDatabase("postgresql://datascience:my_secret_password@hostname.to.your.hass.instance/hass")`

To run the report, click on "Run" in the top menubar and click on "Run All Cells". The notebook will now generate the full report. Depending on the size of your database, this might take some time. The little square brackets with an asterisk (`[*]`) to the left of Python code (a cell) will indicate what is currently being executed or about to be executed. Once executed, it will change to `[<number>]` (number represents the order cells are executed).

The cool thing about these reports is that you can edit the Python code and execute it again to get the latest results, you don't even need to execute the whole report again to see most changes. After each change, just run the cell (by clicking the "play" button in the toolbar). Executing a cell will run the Python code and show the latest results!

## What's next

You now have all tools available to you to do data science. If you want to see some more cool notebooks that people have created for Home Assistant, the add-on has installed the Home Assistant Notebook collection. You can also check out [the HASS Data Detective usage examples](https://github.com/robmarkcole/HASS-data-detective#simple-query). If you want to see how it can be used for now-Home Assistant related data, the add-on has also installed a couple of other interesting notebook examples.

If you want to learn more about what data Home Assistant tracks, check out the [data primer](data_index.md).
