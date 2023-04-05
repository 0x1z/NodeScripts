const path = require('path')
const fs = require('fs')

//passing the parent dir to this function
function travel(dir, done) {
    var results = [];
    // listing contents of the parent directory for the  further iterations 
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        // getting the lenth of the current directory and checking the stats for the directory and file
        list.forEach(function (file) {
            // path resolve add the complete path to the file name to pass it into the fs.stat to get the stats on the file type
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                // if stat and stat as directory both are true then it will go inside the loop
                if (stat && stat.isDirectory()) {
                    // recursive fuction to call itself again and again
                    travel(file, function (err, res) {
                        results = results.concat(res)
                        // if !--pending means we will check for the ! on -- of pending as length decrement the pending and then check for the file directory contents length if it becomes 0 hen ! becomes 1 which makes it true
                        if (!--pending) done(null, results);
                    });

                }
                else {
                    // if not directory directly push the file name
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

travel('/home/anurag/Downloads/NodePracticals', function (err, results) {
    if (err) throw (err);
    console.log(results);
})