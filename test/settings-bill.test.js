const assert = require('assert');
const SettingsBill = require('../settings-bill');

describe('settingsBill function', function () {

    const settingsBill = SettingsBill();

    it('should keep track of the calls made', function () {
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        assert.equal(2, settingsBill.actionsFor('call').length);
    });

    it('should keep track of the smss made', function () {
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.equal(4, settingsBill.actionsFor('sms').length);
    });

    it('should return the totals for call, sms and the grand total', function () {
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 0.75,
            callCost: 2.75,
            warningLevel: 20,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(0.75, settingsBill.totals().smsTotal);
        assert.equal(2.75, settingsBill.totals().callTotal);
        assert.equal(3.50, settingsBill.totals().grandTotal);

    });
    it('should return the total for calls made and sms sent', function () {
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 0.75,
            callCost: 2.75,
            warningLevel: 20,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.equal(2.25, settingsBill.totals().smsTotal);
        assert.equal(11, settingsBill.totals().callTotal);
        assert.equal(13.25, settingsBill.totals().grandTotal);

    });

    it('should return warning when it reaches warning level', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 3.00,
            callCost: 6.50,
            warningLevel: 10,
            criticalLevel: 20
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');


        assert.equal("warning", settingsBill.changingTheColor());
    });

    it('should return danger when it reaches critical level', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 5.50,
            callCost: 8.00,
            warningLevel: 10,
            criticalLevel: 20
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal("danger", settingsBill.changingTheColor());

    });
});
