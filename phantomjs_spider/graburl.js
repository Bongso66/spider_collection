/**
 * Created by sunbx on 16-3-22.
 */
var page = require('webpage').create(),
    system = require('system'),
    t, address;

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


if (system.args.length === 1) {
    phantom.exit();
}


address = system.args[1];
page.open(address, function (status) {

    var links = page.evaluate(function () {
        var result = '';
        var a = document.getElementsByTagName("a");
        for (var i in a) {
            result = result + a[i].href + '\n';
        }
        return result;
    });
    console.log(links.split("\n").unique());
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        console.log("success");
    }
    phantom.exit();
});