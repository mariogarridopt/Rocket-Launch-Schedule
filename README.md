<p align="center"><a href="https://github.com/mariogarridopt/Rocket-Launch-Schedule/"><img alt="ROCKET LAUNCH SCHEDULE" src="https://github.com/mariogarridopt/Rocket-Launch-Schedule/blob/master/img/icon_128.png?raw=true"></a></p>
<p align="center">A schedule of <strong>upcoming rocket launches</strong>  while browsing the web.</p>
<br/>
<p align="center"><a rel="noreferrer noopener" href="https://chrome.google.com/webstore/detail/ijabdkefnohiaibcmbfihcjkjamffoph/"><img alt="Chrome Web Store" src="https://img.shields.io/badge/Chrome-141e24.svg?&style=for-the-badge&logo=google-chrome&logoColor=white"></a>  <a rel="noreferrer noopener" href="https://addons.mozilla.org/en-US/firefox/addon/rocket-launch-schedule/"><img alt="Firefox Add-ons" src="https://img.shields.io/badge/Firefox-141e24.svg?&style=for-the-badge&logo=firefox-browser&logoColor=white"></a>  <a rel="noreferrer noopener" href="https://microsoftedge.microsoft.com/addons/detail/rocket-launch-schedule/pnlghondemkkdlpkepabhjkkfmkjhgli"><img alt="Microsoft Edge Add-ons" src="https://img.shields.io/badge/MS Edge-141e24.svg?&style=for-the-badge&logo=Microsoft+Edge&logoColor=white"></a></p>

# Rocket LaunchSchedule

This is a [Chrome Plugin](https://chrome.google.com/webstore/detail/ijabdkefnohiaibcmbfihcjkjamffoph/) & [Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/rocket-launch-schedule/) that allows you to display the schedule of the upcoming rocket launches.

![screenshot](img/screenshot.png)

## How to install

The fast way to get the app is to install it from the proper markets:

+ Firefox: [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/rocket-launch-schedule/)
+ Chrome: [chrome.google.com](https://chrome.google.com/webstore/detail/ijabdkefnohiaibcmbfihcjkjamffoph/)
+ Edge: [microsoftedge.microsoft.com](https://microsoftedge.microsoft.com/addons/detail/rocket-launch-schedule/pnlghondemkkdlpkepabhjkkfmkjhgli)

## Building for use

The main javsacript files and under the `/js` directory. But the app uses the compiled `/app.js`. To build this file you can do `gulp js`.

1. Install NPM deps:
```bash
npm install
```
2. Compule `js` files:
```bash
gulp watch
```
3. Make your changes;
4. Open `/popup.html` to view your changes.

## Contributing

This project is only possible because of your help.
If you find any bug please report it at [issues](https://github.com/mariogarridopt/Rocket-Launch-Schedule/issues).

[How to make a contribution](CONTRIBUTING.md)

### License

This project is available under the [GPL-3.0 license](LICENSE).
