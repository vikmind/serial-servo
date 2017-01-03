// Hardware part
const SerialPort = require('serialport');
const port = new SerialPort('/dev/cu.usbmodem1411', {
	baudRate: 9600
});

port.on('data', function (data) {
	console.log(`From device: ${data}`);
});

port.on('open', function(err){
	if (err) {
		return console.log('Error on open: ', err.message);
	}
	console.log('port opened');
});

// Web part
const express = require('express');
const app = express();
app.use(express.static('public'));

app.post('/servo', function (req, res) {
	if (req.headers.value){
		port.write(req.headers.value + 'T');
		res.send('ok');
	} else {
		res.send('not ok');
	}
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
