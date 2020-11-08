import os

node = 'node app.js biz'

node_output = os.popen(node).read()

assert (len(node_output) > 0)
