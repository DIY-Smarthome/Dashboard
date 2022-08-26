const express = require("express");
//const https = require("https");
//const crypto = require("crypto");
//const fs = require('fs');
const cors = require('cors');

const app = express();
//some lines are commented out
//login/register, API and secure connection are only partly prepared

/*var config;
fs.readFile('./config/config.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading config: ${err}`);
    }else{
        config = JSON.parse(data);
        if (config.jwt.secret_key === 'none') {
            config.jwt.secret_key = crypto.randomBytes(64).toString('hey');
            fs.writeFile('./config/config.json', JSON.stringify(config, null, 4), (err) => {
                if (err) {
                    console.log(`Error writing config: ${err}`);
                }
            });
        }
    }
});*/

//set up Port
//const port_https = process.env.PORT || 443;
const port_http = process.env.PORT || 80;

//set up certs for https
/*var key = fs.readFileSync(__dirname + '/certs/server.key');
var cert = fs.readFileSync(__dirname + '/certs/server.crt');
var options = {
  key: key,
  cert: cert
};*/
//TODO at install generate valid certs

//setting view engine to ejs
app.set("view engine", "ejs");
app.set("case sensitive routing", false);

//add required modules
app.use(express.json());
app.use(cors());

/*app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url);
    }else{
        return next();
    }    
});*/

//static route for resources like pictures and css
app.use('/resource', express.static('public'));

//Router
const api_router = require('./router/api_router');
app.use('/api', api_router);

const site_router = require('./router/site_router');
app.get('*', site_router);

//var server_https = https.createServer (options, app);

//server_https.listen(port_https, 'localhost', () => console.log(`Server running on port ${port_https}`));
app.listen(port_http, 'localhost', () => console.log(`Server running on port ${port_http}`));