const EventEmitter = require('events');
const SpeedTestNet = require('@lh2020/speedtest-net');
const ConfigDB = require('./Config');
const Config = require('./Config');

const SPEEDTEST_TIMER = 60 * 60 * 1000; // 1 hour

class SpeedTest extends EventEmitter {

  start() {
    this.last = {
      ping: { latency: 0 },
      download: { bandwidth: 0 },
      upload: { bandwidth: 0 }
    };
    ConfigDB.on('update', evt => {
      if (evt.key === 'monitor.wan.speedtest') {
        this.enable(evt.value);
      }
    });
    this.enable(ConfigDB.read('monitor.wan.speedtest'));
  }

  enable(yes) {
    if (yes) {
      if (!this._speedtest) {
        this._speedtest = setInterval(() => this._run(), SPEEDTEST_TIMER);
        this._run();
      }
    }
    else {
      if (this._speedtest) {
        clearInterval(this._speedtest);
        this._speedtest = null;
      }
    }
  }

  getWanSpeed() {
    return {
      latency: this.last.ping.latency,
      upload: this.last.upload.bandwidth,
      download: this.last.download.bandwidth
    };
  }

  _run() {
    SpeedTestNet({
      acceptLicense: true,
      acceptGdpr: true
    }).then(result => {
      this.last = result;
      this.emit('update');
    });
  }

}

module.exports = new SpeedTest();