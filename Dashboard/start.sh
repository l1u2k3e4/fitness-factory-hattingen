#!/bin/bash
cd "$(dirname "$0")/.."
open http://localhost:3001/dashboard
node Dashboard/server.js
