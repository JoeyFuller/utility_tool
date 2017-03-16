#Logging Tool 
##Joey Fuller

##How to install
You can install this tool by simply placing the following line in your terminal:
```
npm install logging_fuller
```
##How to use
In order to use the tool you will need to add:
```
require('logging_fuller');
```
to any file you wish to use it on.
##Debugging
To engable logging/debugging you will have to set debugging to equal true:
```
DEBUG=true
```
and to stop it just set debugging to false:
```
DEBUG=false
```
##Unit Testing
To start the unit tests simply navigate to the directory you have install the tool and type:
```
npm test
```
in your terminal which will start all tests in the test folder via mocha.