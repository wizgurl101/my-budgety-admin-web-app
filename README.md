# My Budgety Admin Web Application

![Demo](./my-budgety-web-app.gif)

My Budgety Web Admin Application is for helping me manage my budget each month.
With future updates to gamified the experience to make it more enjoyable. In addition,
I use this project to learn the Nextjs framework.

## Features

Application tracked spending in gacha games I played (Love and Deepspace, Wuthering Wave)
and display it on the banner cost estimator.

![Demo](./wuwa_banner_tool_1.png)

### Backend Repo that serve the application

[My Budgety API](https://github.com/wizgurl101/my-budgety-backend)
Developed useing Nestjs and BigQuery as the database.

### CLI Tool

CLI Tool developed in Go using the Cobra package. Tool is to remove duplicate entries
from previous credit card statement csv file from the latest csv. Solved the problem
I was having up a download my credit card statement that contains previous expanse(s)
already uploaded from the last csv file. Good opportunity to learn Go.

[My Budgety CLI Tool](https://github.com/wizgurl101/my-budgety-cli)

## Dev Setup

### Setup pre-commit hooks

1.  Copy the file pre-commit.sample to .git/hooks/pre-commit
2.  Removed the .sample extension and deleted the pre-commit file in the .git/hooks folder

### Run application in dev mode

```bash
  npm run dev
```

### Build Docker Image

```bash
  docker build -t my-budgety-admin-web-app .
```

### Run Docker Container

```bash
  docker run -d -p 3000:3000 my-budgety-admin-web-app
```
