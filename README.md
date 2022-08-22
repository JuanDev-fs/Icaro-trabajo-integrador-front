# MyAppMemo

Stay connected with your coworkers, send messages to multiple recipients, and stay organized by reviewing your sent and received messages.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Getting started

1. Clone this project
2. Go to the project folder `cd MyAppMemo`
3. Install the dependencies `npm install`
4. Run the application with `npm start`
5. Navigate to `http://localhost:4200/`. 

The application will automatically reload if you change any of the source files.

## Running the application on mobile devices

To run the application on mobile devices you have to modify the `package.json` file, add in the script line, start, `"--host 0.0.0.0.0"`. For example

`"start: "ng serve --host 0.0.0.0.0 --proxy-config proxy.conf.json"`.

In the web browser of the mobile device you have to enter the ipv4 address of the computer where you are running the application and the port. For example

`192.168.xxx.xxx:4200`

To obtain the ipv4 address, run `ipconfig` from the windows terminal.

## CORS Notes
To avoid the __CORS__ error due to __MyAppMemo__ running on `port: 4200` and __apiMemoV2__ on `port: 3000`, we have to enable CORS through the proxy configuration by creating a `src/proxy.conf.json` file inside the Angular root folder and also place the following code inside it.

```
{
    "/api/*": {
        "target": "http://localhost:3000",
        "secure": false,
        "logLevel": "debug"
    }
}
```

And add this line `--proxy-config proxy.conf.json` in the `package.json` file.


