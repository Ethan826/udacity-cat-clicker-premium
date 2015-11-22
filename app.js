var Cat = (function () {
    function Cat(name, imgSrc) {
        var _this = this;
        this.getName = function () { return _this.name; };
        this.setName = function (name) { _this.name = name; };
        this.getImgSrc = function () { return _this.imgSrc; };
        this.setImgSrc = function (imgSrc) { _this.imgSrc = imgSrc; };
        this.getNumClicks = function () { return _this.numClicks; };
        this.setNumClicks = function (numClicks) { _this.numClicks = numClicks; };
        this.handleClick = function () { _this.numClicks += 1; };
        this.name = name;
        this.imgSrc = imgSrc;
        this.numClicks = 0;
    }
    return Cat;
})();
var Model = (function () {
    function Model(catList) {
        var _this = this;
        this.getActiveCat = function () { return _this.activeCat; };
        this.setActiveCat = function (activeCat) { _this.activeCat = activeCat; };
        this.getActiveNumClicks = function () { return _this.activeCat.getNumClicks(); };
        this.getCatList = function () { return _this.catList; };
        this.handleClick = function () { return _this.activeCat.handleClick(); };
        this.catList = catList;
    }
    return Model;
})();
var Octopus = (function () {
    function Octopus(model, listView, displayView) {
        var _this = this;
        this.model = model;
        this.listView = listView;
        this.displayView = displayView;
        this.model.setActiveCat(this.model.getCatList()[0]);
        this.listHandle = this.listView.render(this.model.getCatList());
        this.listHandle.change(function () {
            _this.handleCatSelection(this.value);
        });
        this.clickHandle = this.displayView.render(this.model.getActiveCat());
        this.clickHandle.click(function () {
            _this.handleClick();
        });
    }
    Octopus.prototype.handleCatSelection = function (name) {
        var cat = this.getCatByName(name);
        this.model.setActiveCat(cat);
        this.listHandle = this.displayView.render(cat);
    };
    Octopus.prototype.handleClick = function () {
        console.log(this.model.getActiveNumClicks());
        this.model.handleClick();
        this.displayView.handleClick(this.model.getActiveNumClicks());
    };
    Octopus.prototype.getCatByName = function (name) {
        var counter = 0;
        var answer = null;
        while (counter < this.model.getCatList().length && !answer) {
            var cat = this.model.getCatList()[counter];
            if (cat["name"] == name) {
                answer = cat;
            }
            counter += 1;
        }
        if (answer) {
            return answer;
        }
        else {
            throw "getCatByName() could not find the cat";
        }
    };
    return Octopus;
})();
var ListView = (function () {
    function ListView() {
    }
    ListView.prototype.render = function (catList) {
        $("#cat-list").html('<select id="list"></select>');
        var handle = $("#list");
        catList.forEach(function (cat) {
            var name = cat.getName();
            var html = "<option id=\"" + name + "\">" + name + "</option>";
            handle.append(html);
        });
        return handle;
    };
    return ListView;
})();
var DisplayView = (function () {
    function DisplayView() {
    }
    DisplayView.prototype.render = function (cat) {
        var html = ("<h2 class=\"name\">" + cat.getName() + "</h2>") +
            ("<img width=400 src=" + cat.getImgSrc() + ">") +
            ("<h3 class=\"clicks\">" + cat.getNumClicks() + "</h3>");
        var handle = $("#cat-display");
        handle.html(html);
        return handle;
    };
    DisplayView.prototype.handleClick = function (numClicks) {
        $(".clicks").html(numClicks);
    };
    return DisplayView;
})();
var cat1 = new Cat("Grumpy", "http://i.dailymail.co.uk/i/pix/2014/08/05/1407225932091_wps_6_SANTA_MONICA_CA_AUGUST_04.jpg");
var cat2 = new Cat("Happy", "http://dc541.4shared.com/img/CNrXLjwN/s7/13cd1fd1a38/happy-cat.jpg");
var cat3 = new Cat("Dopey", "http://s-ak.buzzfed.com/static/enhanced/terminal01/2010/5/28/13/enhanced-buzz-7552-1275066424-6.jpg");
var cat4 = new Cat("Scary", "http://i233.photobucket.com/albums/ee173/charbo187/cute-funny-animals-30.jpg");
var cat5 = new Cat("Stuck", "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg");
var model = new Model([cat1, cat2, cat3, cat4, cat5]);
var listView = new ListView();
var displayView = new DisplayView();
var octopus = new Octopus(model, listView, displayView);
