import {store} from './store.js'

export default function (Vue){
    let vm = this
    let compatibleDevices = [
        {
            deviceName: 'ACR122U USB NFC Reader',
            productId: 0x2200,
            vendorId: 0x072f,
            thumbnailURL: ''
        }
    ]

    let device = null
    let tag_detected = false
    let tag_checker = null

    let VueNFC = {
        readNdefTag(callback) {
            let tag_info = null
            chrome.nfc.read(device, {}, function (type, ndef) {
                for (var i = 0; i < ndef.ndef.length; i++) {
                    tag_info = ndef.ndef[i]
                    var info = tag_info.text.split(";")
                    var points = info[0].split(":")
                    store.state.card_info = {
                        card_id: tag_info.tag_id,
                        points: points[1],
                        last_date_updated: info[1] + ' ' + info[2],
                        store_id: info[3]
                    }
                }
                tag_detected = true;
            });
            callback()
        },

        writeNdefTag(ndefType, ndefValue, callback) {
            var ndef = {};
            ndef[ndefType] = ndefValue;
            chrome.nfc.write(device, {"ndef": [ndef]}, function (rc) {
                if (!rc) {
                    console.log('NFC Tag written!');
                } else {
                    console.log('NFC Tag write operation failed', rc);
                }
            });
        },

        showDeviceInfo () {
            var deviceInfo = null;
            for (var i = 0; i < compatibleDevices.length; i++) {
                if (device.productId === compatibleDevices[i].productId &&
                    device.vendorId === compatibleDevices[i].vendorId) {
                    deviceInfo = compatibleDevices[i];
                }
            }

            if (!deviceInfo)
                return;

            store.state.device_info = {
                device_name: deviceInfo.deviceName,
                vendor_id: deviceInfo.vendorId,
                product_id: deviceInfo.productId,
            }
        },

        enumerateDevices () {
            chrome.nfc.findDevices(function (devices) {
                device = devices[0];
                VueNFC.showDeviceInfo();
            });
        },

        runTagChecker () {
            if ( !tag_detected ) {
                tag_checker = setInterval(function () {
                    VueNFC.readNdefTag(function () {
                        tag_detected = true;
                        VueNFC.checkTagDetected();
                    });
                }, 1000);
            }
        },

        checkTagDetected() {
            if ( tag_detected ) {
                clearInterval(tag_checker);
                return false;
            }
        }

    }

    Object.defineProperties(Vue.prototype, {
        $nfc: {
            get () {
                return VueNFC
            }
        }
    })
}