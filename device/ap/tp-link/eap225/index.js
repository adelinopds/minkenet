const Device = {

  name: 'EAP225',
  id: 'tplink/eap225',
  image: require('./image'),

  layout: {
    ports: [
      [ 'SS', 0 ],
    ]
  },

  properties: {
    switch: false,
    router: false,
    firewall: false,
    ap: true
  },

  identify: {
    http: {
      ipv4: [ 'dhcp', '192.168.0.254' ],
      loggedOut: {
        $: 'selector',
        arg: `#devname`,
        equals: `EAP225`
      }
    }
  },

  login: {
    path: '/',
    username: {
      $: 'set',
      arg: '#login-username'
    },
    password: {
      $: 'set',
      arg: '#login-password'
    },
    activate: '#login-btn',
    valid: '#device_name'
  },

  constants: {
    system: {
      hardware: {
        manufacturer: 'TP-Link',
        model: 'EAP225'
      },
      keychain: {
        username: 'admin',
        password: 'admin'
      },
      ipv4: {
        address: '',
        port: 80
      }
    },
    network: {
      physical: {
        ports: {
          nr: {
            total: 1,
            '1G': 1
          }
        }
      },
      wireless: {
        radios: {
          nr: {
            total: 2,
            '2_4ghz': 1,
            '5ghz': 1
          }
        },
        stations: {
          nr: {
            total: 8,
            '2_4ghz': 0,
            '5ghz': 0,
            '2_4ghz+5ghz': 8
          }
        }
      }
    }
  },

  read: {
    $1: require('./read/name+ip'),
    $2: require('./read/ip')
  },
  write: {
  },
  commit: null

};

module.exports = Device;
