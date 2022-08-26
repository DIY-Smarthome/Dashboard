var tmp1 = 1;
var tmp2 = 1;
var dataset = [];
var chart_label = [];

var data = {
    labels: chart_label,
    datasets: [{
        label: "Data",
        data: dataset,
        borderColor: "#af2d2d",
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2
    }]
};

var chart;

var options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    stacked: false,
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            ticks: {
              callback: function(val, index) {
                return index % 5 === 0 ? this.getLabelForValue(val) : '';
              }
            },
            title: {
                display: true,
                text: 'Time'
            },
            color: '#777777'
        },
        y: {
            display: true,
            title: {
                display: true,
                text: "W"
            },
            color: '#777777'
        }
    }
};

function fillDatasetWithZeros() {
    for (var i = 0; i < 60; i++) {
        dataset.push(0);
    }
}

function fillLabelWithSeconds() {
    for (var i = 60; i >= 0; i--) {
        chart_label.push(i);
    }
}

function addData() {
    chart.data.datasets[0].data = dataset;
    chart.update();
}

function changeOutletImg(id, status) {
	const button_img = document.getElementById(id);
    let = current_img = button_img.getAttribute("src");

    if (current_img == "/resource/pic/outlet_red.png" && status == "on") {
        button_img.setAttribute("src", "/resource/pic/outlet_green.png");
    } else if (current_img == "/resource/pic/outlet_green.png" && status == "off") {
        button_img.setAttribute("src", "/resource/pic/outlet_red.png");
    }
}

async function changeOutletStatus(device_id, outlet_id) {
    let request = {
        device_id: device_id,
        outlet_id: outlet_id,
        get_status: true
    };

    let change = {
        device_id: device_id,
        outlet_id: outlet_id,
        set_status: ""
    };

    let outlet_status = await sendHTTPRequest(dest1, request);
    let json_status = JSON.parse(outlet_status);
    if (json_status['status'] == "on") {
        change['set_status'] = "off";
        let outlet_change = await sendHTTPRequest(dest1, change);
        let json_change = JSON.parse(outlet_change);
        if (json_change['change_status']) {
            changeOutletImg("outlet_"+outlet_id, "off");
        }
    } else {
        change['set_status'] = "on";
        let outlet_change = await sendHTTPRequest(dest1, change);
        let json_change = JSON.parse(outlet_change);
        if (json_change['change_status']) {
            changeOutletImg("outlet_"+outlet_id, "on");
        }
    }
}

async function watchOutletStatus(device_id, outlet_id) {
    let request = {
        device_id: device_id,
        outlet_id: outlet_id,
        get_status: true
    };
    let outlet_status = await sendHTTPRequest(dest1, request);
    let json_usage = JSON.parse(outlet_status);
    if (json_usage['status'] == "on") {
        changeOutletImg("outlet_"+outlet_id, "on");
    } else {
        changeOutletImg("outlet_"+outlet_id, "off");
    }
}

async function setCurrentUsage(monitor_id) {
    const usage_canvas = document.getElementById(monitor_id).getContext("2d");
    let request = {
        device_id: 2,
        outlet_id: 1,
        get_usage: true
    };
    let outlet_usage = await sendHTTPRequest(dest1, request);
    let json_usage = JSON.parse(outlet_usage);
    fillDatasetWithZeros();
    fillLabelWithSeconds();
    dataset.push(json_usage['usage']);
    chart = new Chart(usage_canvas, {
        type: "line",
        data: data,
        options: options
    });
}

async function watchCurrentUsage() {
    let request = {
        device_id: 2,
        outlet_id: 1,
        get_usage: true
    };
    let outlet_usage = await sendHTTPRequest(dest1, request);
    let json_usage = JSON.parse(outlet_usage);
    dataset.shift();
    dataset.push(json_usage['usage']);
    addData();
}