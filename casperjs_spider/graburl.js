/**
 * Created by sunbx on 16-3-22.
 */
var links = [];
var randomLinks = [];
var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    pageSettings: {
        loadImages: false,
        loadPlugins: true,
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0'
    }
});
var system = require('system');
url = system.args[4];


Array.prototype.unique = function () {
    this.sort();
    var re = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== re[re.length - 1]) {
            re.push(this[i]);
        }
    }
    return re;
};

Array.prototype.verifyUrl = function () {
    var re = [];
    for (var i = 1; i < this.length; i++) {
        if (this[i].indexOf(url) != -1) {
            re.push(this[i]);
        }
    }
    return re;
};

function getLinks() {
    var result = '';
    var a = document.getElementsByTagName("a");
    for (var i in a) {
        result = result + a[i].href + '\n';
    }
    return result;
}

function getRandomLinks(links) {

    //去重，去非当前url域名
    var tmpUrl = links.split("\n").unique().verifyUrl();

    //随机获取 url个数
    var sj = Math.floor(Math.random() * tmpUrl.length);

    for (var i = 0; i < sj; i++) {

        //随机获取 url数组 元素下标
        var n = Math.floor(Math.random() * tmpUrl.length + 1) - 1;
        randomLinks.push(tmpUrl[n])
    }
}

casper.start(url, function () {
    links = this.evaluate(getLinks);
    getRandomLinks(links);
});
//casper.then();
//casper.thenOpen('http:www.baidu.com', function () {
//    console.log(randomLinks[0]);
//});

casper.run(function () {
    console.log(randomLinks);
    this.exit();
});