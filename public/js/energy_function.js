var throw_error = false;
var day_array = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function clearMarkedSelects(device_id, outlet_id) {
    for (var i = 0; i < 7; i++) {
        var firstvalue = document.getElementById(device_id+"_"+outlet_id+"_"+day_array[i]+"_from");
        var lastvalue = document.getElementById(device_id+"_"+outlet_id+"_"+day_array[i]+"_to");
        
        if (firstvalue.hasAttribute("style")) {
            firstvalue.removeAttribute("style");
            lastvalue.removeAttribute("style");
        }
    }
}

function checkLastDigitOfSchedule(firstvalue, lastvalue) {
    if (firstvalue == lastvalue) {
        return false;
    } else if (parseInt(firstvalue) < parseInt(lastvalue)) {
        return true;
    } else if (parseInt(firstvalue) > parseInt(lastvalue)) {
        return false;
    }
}

function checkSingleOutletData(device_id, outlet_id) {
    for (var i = 0; i < 7; i++) {
        let firstvalue = document.getElementById(device_id+"_"+outlet_id+"_"+day_array[i]+"_from");
        let lastvalue = document.getElementById(device_id+"_"+outlet_id+"_"+day_array[i]+"_to");
        let arr_firstvalue = firstvalue.value.split(":");
        let arr_lastvalue = lastvalue.value.split(":");

        let check_last_digit = checkLastDigitOfSchedule(arr_firstvalue[1], arr_lastvalue[1])
        if (arr_firstvalue[0] == arr_lastvalue[0]) {
            if (check_last_digit == false) {
                throw_error = true;
                firstvalue.style["background-color"] = "red";
                lastvalue.style["background-color"] = "red";
            }
        } else if (parseInt(arr_firstvalue[0]) > parseInt(arr_lastvalue[0])) {
            throw_error = true;
            firstvalue.style["background-color"] = "red";
            lastvalue.style["background-color"] = "red";
        }
    }
}

async function sendSchedule(device_id, outlet_count) {
    let data = {
        device_id: device_id,
        type: "schedule" 
    };
    for (var i = 1; i <= outlet_count; i++) {
        data[i] = {};
        for (var j = 0; j < 7; j++) {
            var firstvalue = document.getElementById(device_id+"_"+i+"_"+day_array[j]+"_from").value;
            var lastvalue = document.getElementById(device_id+"_"+i+"_"+day_array[j]+"_to").value;
            data[i][day_array[j]] = {};
            data[i][day_array[j]]['from'] = firstvalue;
            data[i][day_array[j]]['to'] = lastvalue;
        }
    }
    let schedule_change = await sendHTTPRequest(dest2, data);
    let json_change = JSON.parse(schedule_change);
    if (json_change['change']) {
        console.log("Schedule sucessfully saved");
    } else {
        console.log("Schedule not saved");
    }
}

async function saveSchedule(device_id) {
    let outlet_count = 0;
    if (device_id == 0) {
        outlet_count = 4;
    } else {
        outlet_count = 1;
    }

    for (var i = 1; i <= outlet_count; i++) {
        checkSingleOutletData(device_id, i);
    }

    if (!throw_error) {
        sendSchedule(device_id, outlet_count);
    } else {
        await sleep(5000);
        for (var i = 1; i <= outlet_count; i++) {
            clearMarkedSelects(device_id, i);
        }
    }
}

async function saveUsage(device_id) {
    let data = {
        device_id: device_id,
        type: "usage"
    };
    let usage_input = document.getElementById("usage_input").value;
    data['usage'] = usage_input;
    let usage_change = await sendHTTPRequest(dest2, data);
    let json_change = JSON.parse(usage_change);
    if (json_change['change']) {
        console.log("Usage sucessfully saved");
    } else {
        console.log("Usage not saved");
    }
}

async function getUsage(device_id) {
    let data = {
        device_id: device_id,
        get_usage: true
    };
    let usage = await sendHTTPRequest(dest2, data);
    let json_usage = JSON.parse(usage);
    if (json_usage['usage']) {
        document.getElementById("usage_input").value = json_usage['usage'];
    } else {
        document.getElementById("usage_input").value = 0;
    }
}

async function getSchedule(device_id) {
    let outlet_count = 0;
    if (device_id == 0) {
        outlet_count = 4;
    } else {
        outlet_count = 1;
    }
    
    let data = {
        device_id: device_id,
        get_schedule: true
    };

    let schedule = await sendHTTPRequest(dest2, data);
    let json_schedule = JSON.parse(schedule);
    
    if (json_schedule) {
        for (var i = 1; i <= outlet_count; i++) {
            for (var j = 0; j < 7; j++) {
                document.getElementById(device_id+"_"+i+"_"+day_array[j]+"_from").value = data[i][day_array[j]]['from'];
                document.getElementById(device_id+"_"+i+"_"+day_array[j]+"_to").value = data[i][day_array[j]]['to'];
            }
        }
    }
}