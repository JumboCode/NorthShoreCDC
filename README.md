<img src="banner.png" alt="PUAM Logo" width="100%">

# Punto Urban Art Museum App
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
![Contributors](https://img.shields.io/github/contributors/jumbocodefall2017/NorthShoreCDC.svg)
![License](https://img.shields.io/github/license/jumbocodefall2017/NorthShoreCDC.svg)

The Punto Urban Art Museum's vision is to create a world class urban arts district in Salem’s Point Neighborhood, one that embraces its rich immigrant and architectural history and presents a dynamic opportunity for the neighborhood’s future. The PUAM App allows the user to explore over 50 murals in this neighborhood, browse them using a map view or a gallery view, and read details about each mural.


<a href="https://play.google.com/store/apps/details?id=com.jumbocode.punto"><img src="PUAMapp/play-store.png" height="65"/></a> &nbsp;&nbsp; <a href="https://itunes.apple.com/us/app/punto-urban-art-museum/id1320710363?ls=1&mt=8"><img src="PUAMapp/app-store.png" height="65"/></a>

This app is a project of the <a href="http://northshorecdc.org" alt="NSCDC">North Shore Community Development Coalition</a> and <a href="http://jumbocode.org" alt="JumboCode">JumboCode</a>.

![screenshot](screenshots/screenshot1.png)
![screenshot](screenshots/screenshot2.png)
![screenshot](screenshots/screenshot3.png)
![screenshot](screenshots/screenshot4.png)
![screenshot](screenshots/screenshot5.png)

## Test an *unreleased* version:
* Download the Expo App: <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en">Android</a> / <a href="https://itunes.apple.com/us/app/expo-client/id982107779?mt=8">iOS</a>
* Scan this QR code using the Expo app:

<img src="QR.png" alt="PUAM Logo" width="225">

## Test / Develop Locally
### Run the react-native App locally
* Create a file firebase.js in PUAMapp/ containing:

```
var config = {... firebase config info ...};
export default config;
```

* Install the dependencies and start the packager:

```
cd PUAMapp
npm install
npm start
```


### Run the Flask site locally
* Set up a virtual environment with Python 2.7.13. We use <a href="https://github.com/pyenv/pyenv-virtualenv">pyenv-virtualenv</a> on Mac.
* Set the environment variables:

```
cd flask
export FIREBASE_PATH=<firebase path>
export FIREBASE_KEY=<firebase key>
export APP_KEY=<app key>
export SECRET_KEY=<secret key>
export FLASK_APP=app.py
export FLASK_DEBUG=1
```

* Install requirements and start the server:

```
pip install -r requirements.txt
flask run
```


## Our Team
- <a href="https://github.com/chris-anderson67">Chris Anderson</a>
- Isaiah Fischer-Brown
- Zach Nassar
- <a href="https://github.com/barieom">Barry Eom</a>
- <a href="https://github.com/bsteephenson">Benjamin Steephenson</a>
- <a href="https://github.com/bmfahey">Brendan Fahey</a>
- <a href="https://github.com/epannu01">Emma Pannullo</a>
- <a href="https://github.com/ymao03">Ian Mao</a>
- <a href="https://github.com/llevonick">Lillianna Levonick</a>
- <a href="https://github.com/suruchidev">Suruchi Devanahalli</a>
- <a href="https://github.com/airwayneeee">Wayne Yirong Tang</a>

