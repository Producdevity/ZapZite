(() => {
	'use strict';

	angular
			.module('app.components', [
				'auth.module',
				'shared.module',
				'dashboard.module',
				'category.module',
				'settings.module',
				'site.module',
				'user.module'
			]);
})();
