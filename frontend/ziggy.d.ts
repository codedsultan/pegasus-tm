/* This file is generated by Ziggy. */
declare module 'ziggy-js' {
  interface RouteList {
    "login": [],
    "register": [],
    "verification.notice": [],
    "verification.verify": [
        {
            "name": "id",
            "required": true
        },
        {
            "name": "hash",
            "required": true
        }
    ],
    "verification.send": [],
    "password.email": [],
    "password.reset": [
        {
            "name": "token",
            "required": true
        }
    ],
    "password.update": [],
    "logout": [],
    "tasks.index": [],
    "tasks.store": [],
    "tasks.update": [
        {
            "name": "task",
            "required": true,
            "binding": "id"
        }
    ],
    "storage.local": [
        {
            "name": "path",
            "required": true
        }
    ]
}
}
export {};
