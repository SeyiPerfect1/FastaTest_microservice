# !/bin/bash

forever start server.js

sleep 10

artillery run load-test-config.yml

forever stopall