(function() {
    var base = 'grapefruit/';

    function getLcov(filename, data) {
        var name = filename.substr(filename.lastIndexOf(base) + base.length);

        //generate lcov info
        var str = 'SF:' + name + '\n';

        data.source.forEach(function(line, num) {
            // increase the line number, as JS arrays are zero-based
            num++;

            if (data[num] !== undefined) {
                str += 'DA:' + num + ',' + data[num] + '\n';
            }
       });

       str += 'end_of_record\n';

       return str;
    }

    function sendMessage() {
        if(!window.PHANTOMJS) return;
        var args = [].slice.call(arguments);
        alert(JSON.stringify(args));
    }

    blanket.customReporter = function(coverageData) {
        for(var filename in coverageData.files) {
            var data = coverageData.files[filename];
            sendMessage('blanket.fileDone', getLcov(filename, data));
        }

        sendMessage('blanket.done');
    };
})();
