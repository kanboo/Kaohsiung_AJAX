'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(document).ready(function () {
    var selectarea = document.querySelector('#selectarea');
    var area_title = document.querySelector('#area_title');
    var hotzonelist = document.querySelector('#hotzonelist');

    //取得行政區清單
    getZoneList();

    //監聽 行政區 是否變更
    selectarea.addEventListener("change", function (e) {
        // console.log(e.target.value);
        area_title.textContent = e.target.value;
        getZoneData(e.target.value);
    });

    //監聽 熱門行政區
    hotzonelist.addEventListener("click", function (e) {
        if (e.target.nodeName !== 'INPUT') return;
        // console.log(e.target.nodeName);
        // console.log(e.target.value);
        area_title.textContent = e.target.value;
        getZoneData(e.target.value);
    });
});

function getZoneList() {
    $.ajax({
        url: 'https://data.kcg.gov.tw/api/action/datastore_search',
        data: {
            resource_id: '92290ee5-6e61-456f-80c0-249eae2fcc97'
        },
        dataType: 'json',
        success: function success(data) {

            var zoneArr = [];
            data.result.records.forEach(function (element) {
                zoneArr.push(element.Zone);
            });

            var zoneArrUnique = [].concat(_toConsumableArray(new Set(zoneArr)));
            // console.log(zoneArrUnique);

            var str = '<option value="null">-- \u8ACB\u9078\u64C7\u884C\u653F\u5340 --</option>';

            zoneArrUnique.forEach(function (element) {
                str = str + ('<option value="' + element + '">-- ' + element + ' --</option>');
            });

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
        success: function success(data) {
            // console.log(data);

            var area_list = document.querySelector('.area_list');
            var str = "";
            data.result.records.forEach(function (element) {
                // console.log(element.Picture1);
                // console.log(element.Name);
                // console.log(element.Zone);
                // console.log(element.Opentime);
                // console.log(element.Add);
                // console.log(element.Tel);
                // console.log(element.Ticketinfo);
                // console.log(element.Website);

                str = str + ('\n                <li class="area_item">\n                    <div class="card">\n                        <div class="card_header" style="background-image: url(' + element.Picture1 + ');">\n                            <h3>' + element.Name + '</h3>\n                            <p>' + element.Zone + '</p>\n                        </div>\n                        <div class="card_body">\n                            <ul class="contentlist">\n                                <li class="opentime">\n                                    <img src="./img/icons_clock.png" alt="">\n                                    <p>' + element.Opentime + '</p>\n                                </li>\n                                <li class="add">\n                                    <img src="./img/icons_pin.png" alt="">\n                                    <p>' + element.Add + '</p>\n                                </li>\n                                <li class="tel">\n                                    <img src="./img/icons_phone.png" alt="">\n                                    <p>' + element.Tel + '</p>\n                                </li>\n                                <li class="ticketinfo">\n                                    <img src="./img/icons_tag.png" alt="">\n                                    <p>' + element.Ticketinfo + '</p>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </li>\n                ');
            });

            area_list.innerHTML = str;

            // console.log('Total results found: ' + data.result.total)
        }
    });
}
//# sourceMappingURL=all.js.map
