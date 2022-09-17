<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!--<a href="https://github.com/DIY-Smarthome/Dashboard">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>-->

<h3 align="center">Dashboard for DIY-Smarthome</h3>
  <p align="center">
    Originally started as an exam in university, now evolved into a fun project for selfmade Smarthome modules in a highly dynamic context. This Dashboard is a optional module with aims to give this Project a web-based UI.
    <br />
    <!--<a href="https://github.com/DIY-Smarthome/Dashboard"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/DIY-Smarthome/Dashboard">View Demo</a>
    ·
    <a href="https://github.com/DIY-Smarthome/Dashboard/issues">Report Bug</a>
    ·
    <a href="https://github.com/DIY-Smarthome/Dashboard/issues">Request Feature</a>-->
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!--[![Product Name Screen Shot][product-screenshot]](https://example.com)-->

The proof of concept was achieved with the protoype that was submitted as an university exam.
Currently this Dashboard can connect to the kernel an get some data from the meross-module. 
This function is programmed statically, a dynamic implementation and controlling of modlues and devices is not programmed.
Further developments schould add a dynamic structur for adding and removing modules/devices and controlling them.
As in this PoC-State, this software may have several bugs and problems.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* <img src="https://www.javascript.com/etc.clientlibs/pluralsight/clientlibs/clientlib-main/resources/images/js-logo.png" width="120" alt="JavaScript">
* <img src="https://ejs.co/favicon.svg" width="60" alt="EJS">

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Currently, there is no dedicated installer for any module of the DIY-Smarthome ecosystem. You can clone this repository and try the example code (not working atm!) or clone the Dev-Environment and use the module with others.

### Prerequisites

You will need NodeJs and npm to use this module.

### Installation

1. Clone the Dev-Environment from [https://github.com/DIY-Smarthome/Dev-Environment](https://github.com/DIY-Smarthome/Dev-Environment)
   ```sh
   git clone https://github.com/DIY-Smarthome/Dev-Environment.git
   ```
2. Enter the lib folder
3. Clone the module
    ```sh
   git clone https://github.com/DIY-Smarthome/MerossDeviceHandler.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Build Dev-Environment and all modules
    ```sh
   npm run build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

We will follow-up with examples for this module.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Repair Code
- [ ] Add functions to add/remove modules
- [ ] Add functions to add/remove devices
    - [ ] Add functions to control modules
- [ ] Improve current implemetation for our energy-module

See the [open issues](https://github.com/DIY-Smarthome/Dashboard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GPL v3.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

- Quisel on Twitter: [@Quisel_](https://twitter.com/@Quisel_)
- Quisel via Email: contact@quisel.eu
- Contact the community on the [Discord](https://discord.gg/dEekZny)

Project Link: [https://github.com/DIY-Smarthome/Dashboard](https://github.com/DIY-Smarthome/Dashboard)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/DIY-Smarthome/Dashboard.svg?style=for-the-badge
[contributors-url]: https://github.com/DIY-Smarthome/Dashboard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/DIY-Smarthome/Dashboard.svg?style=for-the-badge
[forks-url]: https://github.com/DIY-Smarthome/Dashboard/network/members
[stars-shield]: https://img.shields.io/github/stars/DIY-Smarthome/Dashboard.svg?style=for-the-badge
[stars-url]: https://github.com/DIY-Smarthome/Dashboard/stargazers
[issues-shield]: https://img.shields.io/github/issues/DIY-Smarthome/Dashboard.svg?style=for-the-badge
[issues-url]: https://github.com/DIY-Smarthome/Dashboard/issues
[license-shield]: https://img.shields.io/github/license/DIY-Smarthome/Dashboard.svg?style=for-the-badge
[license-url]: https://github.com/DIY-Smarthome/Dashboard/blob/master/LICENSE.md
[TypeScript.org]: https://img.shields.io/badge/TypeScript-0769AD?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://typescript.org
