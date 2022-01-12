Number.prototype.formatBytes = function () {
    var units = ['B', 'KB', 'MB', 'GB', 'TB'],
        bytes = this,
        i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
        bytes /= 1024;
    }

    return bytes.toFixed(2) + units[i];
}

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = []
    for (const f of event.dataTransfer.files) {
        const file_obj = {
            lastModified: f.lastModified,
            lastModifiedDate: f.lastModifiedDate,
            name: f.name,
            path: f.path,
            size: f.size,
            type: f.type,
            webkitRelativePath: f.webkitRelativePath
        }
        files.push(file_obj)
    }
    console.log(files)
    axios_post('http://localhost:8060' + '/add', files, respText => {
        console.log(respText.data)
        genTable(respText.data)
    }, error => {
        console.log(error)
    })
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
    // console.log('File is in the Drop Space', event);
});

document.addEventListener('dragleave', (event) => {
    // console.log('File has left the Drop Space');
});

set_server_url()
getFiles()

function axios_post(theUrl, data, success, rejected) {
    try {
        axios.post(theUrl, data)
            .then(function (response) {
                success(response)
            })
            .catch(function (error) {
                rejected(error)
            });
    } catch {
        setTimeout(function () {
            axios_post(theUrl, data, success, rejected)
        }, 500);
    }
}

function axios_get(theUrl, success, rejected) {
    try {
        axios.get(theUrl)
            .then(function (response) {
                success(response)
            })
            .catch(function (error) {
                rejected(error)
            });
    } catch {
        setTimeout(function () {
            axios_get(theUrl, success, rejected)
        }, 500);
    }
}
function genTable(array) {
    let tbody = document.getElementById("fileListTableBody")
    tbody.innerHTML = null
    array.forEach(file => {
        let tr = document.createElement('tr')
        let tdIcon = document.createElement('td')
        let tdDate = document.createElement('td')
        let tdSize = document.createElement('td')
        let tdName = document.createElement('td')
        let img = document.createElement('img')

        let extension = file.name.split('.').pop()

        img.width = 20
        img.src = "./assets/icons/" + (file_icons[extension] ? file_icons[extension] : file_icons["file"])
        tdIcon.appendChild(img)

        tdDate.innerText = moment(file.lastModifiedDate).format('MMM DD YYYY hh:mm A')
        tdDate.className = 'last-modified'

        tdSize.innerText = file.size.formatBytes()
        tdSize.className = 'file-size'

        tdName.innerText = file.name
        tdName.className = 'display-name'

        tr.appendChild(tdIcon)
        tr.appendChild(tdDate)
        tr.appendChild(tdSize)
        tr.appendChild(tdName)
        tbody.appendChild(tr)
    });
}

function generateList(array) {
    var listDiv = document.getElementById("fileList")
    listDiv.innerHTML = ""
    listDiv.innerText = ""
    let ul = document.createElement('ul')
    array.forEach(file => {
        let li = document.createElement('li')
        let span = document.createElement('span')
        span.innerText = file.name
        li.appendChild(span)
        ul.appendChild(li)
    });
    listDiv.appendChild(ul)
}

function set_server_url() {
    axios_get('http://localhost:8060/config', config => {
        try {
            console.log(config.data, config.data.server_url)
            new URL(config.data.server_url)
            document.getElementById("server_url").innerText = config.data.server_url
            document.getElementById("server_url").href = "javascript:openInBrowser('" + config.data.server_url + "');"
            // document.getElementById("server_url").setAttribute("onclick", "require('shell').openExternal('" + config.data.server_url + "')")
        } catch (err) {
            console.log(err)
            setTimeout(function () {
                set_server_url()
            }, 500);
        }
    })
}

function getFiles() {
    axios_get('http://localhost:8060/files', files => {
        genTable(files.data)
    }, error => {
        console.log(error)
    })
}

function openInBrowser(url) {
    require("electron").shell.openExternal(url)
}