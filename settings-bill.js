module.exports = function SettingsBill() {

    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel; 

    let actionList = [];

    function setSettings (settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings() {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {
        if(!stopingTheColor()){  
            let cost = 0;
            if (action === 'sms'){
                cost = smsCost;
            }
            else if (action === 'call'){
                cost = callCost;
            }
    
            actionList.push({
                type: action,
                cost,
                timestamp: new Date()
            });
        }
    }
      
    function actions(){
        return actionList;
    }
    function actionsFor(type){
        const filteredActions = [];

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === type) {
                filteredActions.push(action);
            }
        }
        return filteredActions;
    }

    function getTotal(type) {
        let total = 0;
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === type) {
                total += action.cost;
            }
        }
        return total;

    }

    function grandTotal() {
        return getTotal('sms') + getTotal('call');
    }

    function totals() {
        let smsTotal = getTotal('sms');
        let callTotal = getTotal('call');
        return {
            smsTotal: smsTotal.toFixed(2),
            callTotal: callTotal.toFixed(2),
            grandTotal: grandTotal().toFixed(2)
    }
 }

function changingTheColor(){
    if( grandTotal() >= warningLevel && grandTotal() < criticalLevel){
      return "warning"
    }else if( grandTotal() >= criticalLevel){
      return "danger"
    }
  }
      function stopingTheColor() {
        
        return grandTotal() >= criticalLevel;
      }

    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        // hasReachedWarningLevel,
        // hasReachedCriticalLevel,
        changingTheColor,
        stopingTheColor
    }
}
