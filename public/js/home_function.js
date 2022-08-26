async function checkOutletStatus(device_id, space_id) {
    const space_switch = document.getElementById(device_id+"_"+space_id);
    let data = {
        device_id: device_id,
        outlet_id: space_id,
        get_status: true
    };
    let outlet_status = await sendHTTPRequest(dest1, data);
    let json_status = JSON.parse(outlet_status);
    if (json_status['status'] == "on") {
        space_switch.checked = true;
    } else {
        space_switch.checked = false;
    }
}

async function getCurrentUsage(device_id, space_id) {
    const space_usage = document.getElementById(device_id+"_"+space_id);
    let data = {
        device_id: device_id,
        outlet_id: space_id,
        get_usage: true
    };
    let outlet_usage = await sendHTTPRequest(dest1, data);
    let json_usage = JSON.parse(outlet_usage);
    space_usage.innerHTML = json_usage['usage'];
}