<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
    <img src="./public/apple-touch-icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Weathy</h3>

  <p align="center">
    An awesome Single page Weather App!
    <br />
    <br />
    <a href="#">View Demo (Soon) </a>
    ·
    <a href="https://github.com/phelied/weathy/issues">Report Bug</a>
    ·
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
<img src="https://github.com/phelied/weathy/blob/main/src/assets/images/weathy-screen.png" width="200" height="360">

In this project I created a React weather app, which uses an API from openweathermap to get weather information all over the world and an other API to propose a list of cities in the search bar.

<!-- By default it displays the local weather at Paris. -->

You can use locate button to get weather data at your location. You can also use search to find the current weather at a city, for example London or New York. The app displays local temperature, gives you a brief description and also shows an 3D Design based on the weather and the local hour.


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![React][react.js]][react-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can install and setting up your app._

1. Get an API Key at [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities/)
1. Get an other API Key at [OpenWeather](https://openweathermap.org)
1. Clone the repo
   ```sh
   git clone git@github.com:phelied/weathy.git
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
1. Enter your API in `.env`
   ```js
   REACT_APP_WEATHER_API_KEY = "ENTER YOUR WEATHER API KEY";
   REACT_APP_GEO_DB_API_KEY = "ENTER YOUR GEO DB API KEY";
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

## Roadmap

- [] Full Responsive
- [x] Implement API
- [x] Add Search Design
- [ ] Testing
- [ ] UV 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


## Contact

Ophelie Diomar - [LinkedIn][linkedin-url] - opheliediomar@outlook.fr

Project Link: [https://github.com/phelied/weathy](https://github.com/phelied/weathy)


## Acknowledgments

Here is a list resources I find helpful and would like to give credit to.

- [Choose an Open Source License](https://choosealicense.com)
- [Spline](https://spline.design)
- [Netlify](https://www.netlify.com)
- [Font Awesome](https://fontawesome.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: ./src/assets/images/weathy-screen.png
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/phelied/weathy/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ophelie-diomar-680162209/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
