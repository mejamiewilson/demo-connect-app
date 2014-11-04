# Demo Hoist Application

This demo shows payments from Chargify being saved to a Hoist data store in order for a batch of payments to be sent to Xero at midnight each night. It shows how to connect to multiple services, consume synthetic events and run tasks on a schedule.

## Hoist Project Structure 

### hoist.json

hoist.json lives in the root of your project. This is the configuration file for your Hoist application and is what you are editing when using the web GUI or the CLI. 

### _hoist folder

The _hoist folder contains any scripts that are relevant to your Hoist project. Only these files (along with hoist.json) will be pushed to the Hoist servers when you push your Git repository to Hoist. This means a Hoist app can live amongst a greater project.

## Hoist Configuration Guide (hoist.json)

### Connectors

```
"connectors": {
    "chargify": {
      "token": "abkjs"
    }, ... 
```

Connectors represent a connection between your app and a third party service. You set this up using the web app and it will give you a token. Even though the connectors here are named after their respective services in this example, they can be called anything you like, the token is what will let Hoist know where to connect to.

### Modules

```
"modules": [
  {
    "name": "saveChargifyPaymentDetails",
    "src": "./_hoist/scripts/saveChargifyPaymentDetails.js",
    "defaultContext": "admin@hoi.io",
  }, ...
```

The modules section is where you set up the modules you want to be available to the Hoist event bus. Give the module a name, a src location and a default context for accessing Hoist services.

### On

```
"on": {
  "chargify.payment.success": {
    "modules": ["saveChargifyPaymentDetails"]
  }, ...
```

The 'on' section allows you to call modules when events are fired. These events may be synthetic events from your connectors (such a `chargify.payment.success` in this example), from your schedule or from within other modules (by calling `Hoist.raise("eventname", { /* event data */ });`).

### Endpoints

```
"endpoints": {
  "/payment/success":{
    "methods":["POST"],
    "event":"chargify.payment.success",
    "authenticated":true
  },
```

The endpoints section allows you to trigger events when a URL is called. The key is the URL to be called, and the value is an object containing 

- `methods` to specify which methods the endpoint will be active on, 
- `event` to specify the event, 
- `authenticated` to specify whether there needs to be an active session and
- `synchronous` to require Hoist to return a result (suitable for returning JSON etc)

### Schedules

```
"schedules": {
    "0 0 * * *": {
      "events": [
        "nightly.batch.start"
      ]
    }
```

The schedules section allows events to be fired using cronjob timing. In this sample, the `nightly.batch.start` event is fired at midnight every night.
