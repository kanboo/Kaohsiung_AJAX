$(document).ready(function () {
    let selectarea = document.querySelector('#selectarea');
    let area_title = document.querySelector('#area_title');
    let hotzonelist = document.querySelector('#hotzonelist');

    //取得行政區清單
    getZoneList();

    //監聽 行政區 是否變更
    selectarea.addEventListener("change", function (e) {
        // console.log(e.target.value);
        area_title.textContent = e.target.value;
        getZoneData(e.target.value);
    })

    //監聽 熱門行政區
    hotzonelist.addEventListener("click", function (e) {
        if (e.target.nodeName !== 'INPUT') return;
        // console.log(e.target.nodeName);
        // console.log(e.target.value);
        area_title.textContent = e.target.value;
        getZoneData(e.target.value);
    })
});


function getZoneList() {
    $.ajax({
        url: 'https://data.kcg.gov.tw/api/action/datastore_search',
        data: {
            resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97'
        },
        dataType: 'json',
        success: function (data) {

            let zoneArr = [];
            data.result.records.forEach(function (element) {
                zoneArr.push(element.Zone);
            })

            let zoneArrUnique = [...new Set(zoneArr)];
            // console.log(zoneArrUnique);

            let str = `<option value="null">-- 請選擇行政區 --</option>`;

            zoneArrUnique.forEach(function (element) {
                str = str + `<option value="${element}">-- ${element} --</option>`;
            })

            selectarea.innerHTML = str;

        }
    });
}


function getZoneData(queryZone) {
    $.ajax({
        url: 'https://data.kcg.gov.tw/api/action/datastore_search',
        data: {
            resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97', // the resource id
            q: queryZone // query for 'jones'
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);

            let area_list = document.querySelector('.area_list');
            let str = "";
            data.result.records.forEach(function (element) {
                // console.log(element.Picture1);
                // console.log(element.Name);
                // console.log(element.Zone);
                // console.log(element.Opentime);
                // console.log(element.Add);
                // console.log(element.Tel);
                // console.log(element.Ticketinfo);
                // console.log(element.Website);

                str = str + `
                <li class="area_item">
                    <div class="card">
                        <div class="card_header" style="background-image: url(${element.Picture1});">
                            <h3>${element.Name}</h3>
                            <p>${element.Zone}</p>
                        </div>
                        <div class="card_body">
                            <ul class="contentlist">
                                <li class="opentime">
                                    <img src="./img/icons_clock.png" alt="">
                                    <p>${element.Opentime}</p>
                                </li>
                                <li class="add">
                                    <img src="./img/icons_pin.png" alt="">
                                    <p>${element.Add}</p>
                                </li>
                                <li class="tel">
                                    <img src="./img/icons_phone.png" alt="">
                                    <p>${element.Tel}</p>
                                </li>
                                <li class="ticketinfo">
                                    <img src="./img/icons_tag.png" alt="">
                                    <p>${element.Ticketinfo}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                `
            });

            area_list.innerHTML = str;

            // console.log('Total results found: ' + data.result.total)
        }
    });
}