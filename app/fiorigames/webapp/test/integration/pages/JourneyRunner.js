sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"fiorigames/test/integration/pages/GamesList",
	"fiorigames/test/integration/pages/GamesObjectPage"
], function (JourneyRunner, GamesList, GamesObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('fiorigames') + '/test/flp.html#app-preview',
        pages: {
			onTheGamesList: GamesList,
			onTheGamesObjectPage: GamesObjectPage
        },
        async: true
    });

    return runner;
});

