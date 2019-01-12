# TODO

* The test coverage is highly not sufficient. I tried to test the service and the store manager, but the components are not tested. This is mainly for a time reason and having to decide what was more important to test, given also the very basic nature of these components, I decided to skip the components test.
* e2e test are not present, again for a time availability reason.
* I did not add the chance to specify new timings or new cities, I stick to the bare minimum requirements of the task. The addition of a form would not be too complex.
* Improve the results retrieval logic. At the moment the user needs to wait for all the results to be retrieved, leading to a bad user experience. This can be done in several ways. Two that I can mention are:
    * move the logic to check the `complete` value in the `fetchDepartures` action, so that we can add every new set of departures to the state, while we retieve a new set. A `complete` entry can be added to the state, so that we can display and hide a loading image while we complete the retrieval, in order to inform the user.
    * another way of doing it (probably the one I'd prefer), would be to dispatch an event every time the service retrieves a new set of departures. The action would be simply listenning for the event. In this way the action can ignore the polling system it will only know that every time it receives a new list it has to `commit` it to the `state`.
* Accessbility. The app is quite basic, but still there are things that can be done to improve the accessibility, `aria` attributes first of all.
* Design. As you might have noticed the design was not super thought. I simply wanted to obtain the barely minimum required by the task.
* Better use of types. I started this app in TypeScript with which I have limited experience. I am aware most of the times I completely skiped the typing, creating a not very pleasant mish mash of JS into TS.