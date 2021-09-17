var topHeadlinesUrl = "https://gnews.io/api/v4/top-headlines?token=3c23b6c4b0f3d0b6f54105a70afeeee7";
var testDate = new RegExp("^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$");
// Hàm lấy dữ liệu tin tức về
function loadFetch(url) {
    document.getElementById("box").innerHTML = '<div class="loading"><i class="fa fa-spinner fa-pulse fa-3x fa-fw "></i></div>'; // Biểu tượng chờ tải dữ liệu
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var result = "";
            if (data.totalArticles != 0) {
                data.articles.forEach(element => {
                    result += "<div class = 'box-items'><div class = 'picture-box'><img src='" + element.image + "'></div><div class = 'content-box'><a href='" + element.url + "' target='_blank'>" + element.title + "</a><p><i>" + element.publishedAt + "</i></p><p>" + element.description + "</p></div></div>";
                });
                document.getElementById("box").innerHTML = result;
            }
            else document.getElementById("box").innerHTML = "<div class='no-result'><p>No search result. Try another search-keywords!</p></div>"; 
        })
        .catch(function() {
            alert("ERROR, PLEASE TRY AGAIN LATTER!");
        });
}
// Mở hộp tìm kiếm
function showSearchBox() {
    document.getElementById("modal").style.display = "flex";
}
// Đóng hộp tìm kiếm
function closeSearchBox() {
    document.getElementById("modal").style.display = "none";
}

loadFetch(topHeadlinesUrl); // Lấy dữ liệu tin tức ban đầu
document.getElementById("search-icon").onclick = showSearchBox;
document.getElementById("x-icon").onclick = closeSearchBox;
document.getElementById("modal").onclick = closeSearchBox;

// Kiểm tra ngày tháng khi tìm kiếm
document.getElementById("search-from").onblur = function () {
    if (!testDate.test(this.value) && this.value != "") {
        document.getElementById("error1").innerHTML = "(Date is not valid)";
    }
    else document.getElementById("error1").innerHTML = "";
}
document.getElementById("search-to").onblur = function () {
    if (!testDate.test(this.value) && this.value != "") {
        document.getElementById("error2").innerHTML = "(Date is not valid)";
    }
    else document.getElementById("error2").innerHTML = "";
}

// Hàm tìm kiếm và hiển thị nội dung tìm được
document.getElementById("btn-search").onclick = function () {
    var keywords = document.getElementById("keywords-search").value;
    var searchFrom = "";
    var searchTo = "";

    if (testDate.test(document.getElementById("search-from").value) == true) {
        searchFrom = document.getElementById("search-from").value;
        var dateFrom = new Date(searchFrom);
        var month;
        var date;
        if (dateFrom.getMonth() > 10) month = dateFrom.getMonth();
        else month = "0" + (dateFrom.getMonth() + 1);
        if (dateFrom.getDate() > 10) date = dateFrom.getDate();
        else date = "0" + dateFrom.getDate();
        searchFrom = "&from=" + dateFrom.getFullYear() + "-" + month + "-" + date + "T00:00:00Z";
        document.getElementById("search-from").value = "";
    }

    if (testDate.test(document.getElementById("search-to").value) == true) {
        searchTo = document.getElementById("search-to").value;
        var dateTo = new Date(searchTo);
        var month;
        var date;
        if (dateTo.getMonth() > 10) month = dateTo.getMonth();
        else month = "0" + (dateTo.getMonth() + 1);
        if (dateTo.getDate() > 10) date = dateTo.getDate();
        else date = "0" + dateTo.getDate();
        searchTo = "&to=" + dateTo.getFullYear() + "-" + month + "-" + date + "T00:00:00Z";
        document.getElementById("search-to").value = "";
    }

    if (keywords != "") {
        document.getElementById("keywords-search").value = "";
        closeSearchBox();
        let urlSearch = "https://gnews.io/api/v4/search?q=" + keywords + searchFrom + searchTo + "&token=3c23b6c4b0f3d0b6f54105a70afeeee7";
        console.log(urlSearch);
        loadFetch(urlSearch);
    }
};
// Ngăn chặn nổi bọt event
document.getElementById("search-box").onclick = function (e) {
    e.stopPropagation();
};
