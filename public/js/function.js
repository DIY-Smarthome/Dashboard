const dest1 = "/api/device";
const dest2 = "/api/energy";

function sendHTTPRequest(dest, data) {
	return new Promise(function (resolve, reject) {
		let data_string= JSON.stringify(data);
        let request = new XMLHttpRequest();
        request.open("POST", dest, true);
		request.setRequestHeader('Content-type', "application/json;charset=UTF-8");
        request.addEventListener('load', function(event) {
		    if (request.status >= 200 && request.status < 300) {
                resolve(request.responseText);
		    } else {
                reject({Status: request.status, StatusText: request.responseText});
		    }
	    });
        request.send(data_string);
    });
}

function showPopup() {		//show/hide settingsmenu
	if (document.getElementById("profile-popup").style.display == "block") {
		document.getElementById("profile-popup").style.display = "none";
	} else {
		document.getElementById("profile-popup").style.display = "block";
	}	
}

function createUrlWithMinimizedNavbar(destURL, getParam, getValue) {
	const link_home_href = document.getElementById("link_home").getAttribute("href");
	if (link_home_href == "/?nav=minimize") {
		return destURL+"?"+getParam+"="+getValue+"&nav=minimize";
	} else {
		return destURL+"?"+getParam+"="+getValue;
	}
}

function checkElementHasId(element) {
    return typeof element.id != 'undefined';
}

function changeMode() {			//change colormode of the site (dark or white mode)
	const switchtoggle = document.getElementById('switch_toggle');
	switchtoggle.classList.toggle('active');
	if (switchtoggle.className == "active") {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('mode', 'dark');		//store decision as cookie
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('mode', 'light');		//store decision as cookie
	}
}

function collapsableNavbar() {			//minimize or maximize navbar
	const menu_elements = document.getElementsByClassName("burger_control");
	const header_elements = document.getElementsByClassName("header-container");
	const footer_elements = document.getElementsByClassName("footer-container");
	const link_home = document.getElementById("link_home");
	const link_device = document.getElementById("link_device");
	const link_energy = document.getElementById("link_energy");
	const navbar_element = menu_elements[0].parentElement.parentElement;
	const module_links = document.getElementsByClassName("link_to_device");
	if (checkElementHasId(menu_elements[0]) && menu_elements[0].id == "hide_element") {
		for (var i = 0; i < menu_elements.length; i++) {
			menu_elements[i].removeAttribute("id");
		}
		for (var i = 0; i < module_links.length; i++) {
			temp_attr = module_links[i].getAttribute("href").split('&');
			module_links[i].setAttribute('href', temp_attr[0]);
		}
		navbar_element.removeAttribute("id");
		header_elements[0].removeAttribute("id");
		footer_elements[0].removeAttribute("id");
		link_home.setAttribute('href', '/');
		link_device.setAttribute('href', '/device');
		link_energy.setAttribute('href', '/energy');
	} else if (checkElementHasId(menu_elements[0])) {
		for (var i = 0; i < menu_elements.length; i++) {
			menu_elements[i].id = "hide_element";
		}
		for (var i = 0; i < module_links.length; i++) {
			temp_attr = module_links[i].getAttribute("href");
			module_links[i].setAttribute('href', temp_attr+"&nav=minimize");
		}
		navbar_element.id = "minimize";
		header_elements[0].id = "minimize_header";
		footer_elements[0].id = "minimize_footer";
		link_home.setAttribute('href', '/?nav=minimize');
		link_device.setAttribute('href', '/device?nav=minimize');
		link_energy.setAttribute('href', '/energy?nav=minimize');
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}