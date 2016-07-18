Hi guys,

This is my work for the front-end position. I hope you will enjoy it as much as I learned new things building it.

I had two choices when I started:

- The easy way: using tools that I already know and use like [https://github.com/mikeric/rivets](RivetsJS) or [http://riotjs.com/](RiotJS) (React-like).
- The not-so-easy-way using React.

So, this was my first time using React (yep, I choosed the not-so-easy-way) and you will see it. I tried to keep things simple, avoiding dependencies, to learn step by step. For instance, you will not find any Flux pattern. I took a quick look at it and I'm pretty sure that it can solve some issues that I found during this challenge, like states and methods needed by multiple components.

Here are a few details, more or less important, about this project:

- I used Gulp for the compilation workflow.
- Some dependencies (React, FA, Normalize) are loaded via a CDN and not bundled with the app's assets, because you probably have the files cached in your browser thanks to a previous visit on another website using the same dependencies. And what's faster that an asset already in cache? ;)
- Foundation is not loaded via CDN, because I load only the components that I need to keep it realy small.
- All the images are compressed and optimized (Almost 20% saved for the Osheaga logo for example).
- I really care about UI/UX so every element on the page is here for a reason. I did some research on your website and on others such as airline companies or CaptainTrain. For example, you can quickly see all the most important amenities with an icon. The duration is also visible, so we don't have to calculate how long the travel will last. Finally, the UI uses the same colors as the logo and since it concerns a music festival, a little fun can be added like the shadows on the prices.
- Even Phil Schiller would be jealous of my baseline (go ask him) but unfortunately the open position is not for the marketing team...
- A Docker image is included so you can quickly run the environment anywhere and not worry about installing all the tools needed depending on your OS or whatever. Build. Run. Code. This is a generique Gulp/Compass image that I made to reuse it on other projects.
- I made a really basic translation implementation. I'm pretty sure that a much better way is available somewhere but it does the job for a simple app like this. And like I said, first time with React.
- If you take a look at the currency on the prices, you will see that you only have to change an attribute to handle as many currencies as you wish. I know, not really a WOW effect but I like this trick, because it avoids some tags everytime we display a price. Just add an attribute and it's done.

I had to stop somewhere and decide what was supposed to be in the MVP for this application.
Here are a few things that could be cool to add:

- The app is responsive but some work needs to be done on the mobile version.
- Display the tickets format like e-tickets.
- Display if the travel is direct, or with transfers.
- Display a warning if there is only a few tickets left.
- Hide the non-buyable tickets or display a warning.
- Display if we can have a refund.
- Many other things :)

You can test it here : [https://osheaga-with-busbud.herokuapp.com/](https://osheaga-with-busbud.herokuapp.com/)

To run the dev environment, you'll need to install docker and run the following commands:

`docker build -t osheaga .`

Then

`docker run -v /path/to/the/project:/project -ti --name osheaga osheaga`

And that's it!

Fell free to contact me anytime,  
Thanks for your time,  
Emmanuel