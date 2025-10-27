<center><img src="./documentation/WorldClockApp.png?raw=true" alt="World Clock App screenshot" style="width:300px; height: auto;" /></center>

This is a NextJS app that implements the World Clock app allowing to track multiple user-defined clocks.\
You can see the requirements described in the [documentation/requirements.md](./documentation/requirements.md) file.\
That file, as well as the initial project setup was used as a reference point for Junie with GPT-5 model to kick-start the project, after which it was reviewed, debugged and refactored by yours truly.\
Video demo is available [in the root of the project](./World%20Clock%20App%20demo.mp4).

### Setup
- Node 22
- `npm install`
- `npm run dev` to start the dev server on http://localhost:3000
- `npm run storybook` to access the storybook on http://localhost:6006

### Architecture
The architecture of the project was based upon the requirements and fulfilling those with the least amount of effort while implementing the core features and emphasising the usage of the stack.\
Since the codebase and feature list is quite small there was no need to use a more complex architecture in order to specify the entities further and split them by module.\
And that's a part of my architecture philosophy - to not optimize prematurely and KISS.\
Simplicity is the ultimate sophistication.

### Trade-offs
- The daylight savings time will not work properly
  - it introduces quite a layer of complexity into the project which isn't necessary to demo my skills
- There is an issue if you try to add a timezone which already exists
  - made this trade-off to keep the demo simple and not introduce more complexity
- I've used AI to generate some of the components as part of the experiment on how things currently are with AI coding tools. Hence the code is of a lower quality than I usually produce but it works for the sake of demo
  - I'm generally impressed with the results of the experiment and I'm looking forward to see how it will evolve in the future
- There is an ugly function that introduces a safety hazard on page load. Just to reduce an initial flicker of the light / dark theme.
  - The AI wrote that one and since it works I'm not going to touch it. There definitely is a better way to do.
- I haven't implemented a "timezone map"
  - It would exceed the time budget for the demo
- "Design system" could have been better
  - I've worked on it as an afterthought hence there are a lot of classes thrown for each component. Most of them are not necessary and could have been set as a CSS variables system that plays nicely with both Tailwind and MUI.
- I haven't done a lot of unit tests here, please see [my other project](https://github.com/Nadoedalo/LyraCoding/tree/master/tests) for example of tests.

### Behind the scenes
Overall I've spent about 2 days of efforts on this project of actual coding with a couple more spent thinking in background about how best to do it.\
I've been a bit under the weather lately hence the delay till Monday.\
Overall that was an interesting experience, I've tried the new tools and technologies - in general I'm impressed with Junie / GPT-5 capabilities in coding.\
The stack itself is fine but I'm not convinced it's better than what Vue / Nuxt & Vuetify can provide - some parts are quirky and some parts aren't working well but in general the experience is quite close to what Vue is capable of.