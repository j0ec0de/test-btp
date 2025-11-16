sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"insurance/test/integration/pages/PolicyList",
	"insurance/test/integration/pages/PolicyObjectPage"
], function (JourneyRunner, PolicyList, PolicyObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('insurance') + '/test/flp.html#app-preview',
        pages: {
			onThePolicyList: PolicyList,
			onThePolicyObjectPage: PolicyObjectPage
        },
        async: true
    });

    return runner;
});

