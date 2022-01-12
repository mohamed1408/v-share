// import * as moment from "/assets/js/moment";
var files = []

Number.prototype.formatBytes = function () {
    var units = ['B', 'KB', 'MB', 'GB', 'TB'],
        bytes = this,
        i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
        bytes /= 1024;
    }

    return bytes.toFixed(2) + units[i];
}

axios_get(window.origin + '/files', data => {
    console.log(data.data)
    genTable(data.data)
}, error => {
    console.log(error)
})

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
        let a = document.createElement('a')

        let extension = file.name.split('.').pop()

        img.width = 20
        img.src = "/assets/icons/" + (file_icons[extension] ? file_icons[extension] : file_icons["file"])
        tdIcon.appendChild(img)

        tdDate.innerText = moment(file.lastModifiedDate).format('MMM DD YYYY hh:mm A')
        tdDate.className = 'last-modified'

        tdSize.innerText = file.size.formatBytes()
        tdSize.className = 'file-size'

        a.innerText = file.name
        a.href = window.origin + '/download?file=' + file.path
        tdName.appendChild(a)
        tdName.className = 'display-name'

        tr.appendChild(tdIcon)
        tr.appendChild(tdDate)
        tr.appendChild(tdSize)
        tr.appendChild(tdName)
        tbody.appendChild(tr)
    });
}

function axios_get(theUrl, scallback, ecallback) {
    try {
        console.log(file_icons)
        axios.get(theUrl)
            .then(function (response) {
                // console.log(response);
                scallback(response)
            })
            .catch(function (error) {
                // console.log(error);
                ecallback(error)
            });
    } catch {
        setTimeout(function () {
            axios_get(theUrl, scallback, ecallback)
        }, 500);
    }
}