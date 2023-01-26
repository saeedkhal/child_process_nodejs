'use strict';
let pythonBridge = require('python-bridge');

var python = pythonBridge({
    // path of python installed in your app
    python: '/usr/bin/python3',
    // path of the env var
    env: {PYTHONPATH: '/foo/bar'}
});

python.lock(python => {
    python.ex`
    from rembg import remove
    input_path = 'dress3.jpg'
    output_path = 'output.png'
    
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input = i.read()
            output = remove(input)
            o.write(output)`;
    return python`'bg removed'`;
}).then(results => console.log(results));
python.end();