@app
eventdown-game

@ws
# no further config required
# client code is in /public
# serverless code is in /src/ws/*

@http
get /

@static
fingerprint true

@aws
runtime nodejs12.x

@tables
connections
  connectionId *String
  insert Lambda
  update Lambda
  delete Lambda
