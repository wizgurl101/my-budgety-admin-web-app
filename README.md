# my-budgety-admin-web-app

![Demo](./my-budgety-web-app.gif)


My Budgety Web Admin Application is for helping me track my expanses. 

## Dev Setup

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