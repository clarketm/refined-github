import select from 'select-dom';
import delegate from 'delegate-it';
import features from '../libs/features';
import observeEl from '../libs/simplified-element-observer';

function init(): void {
	const [subscription] = delegate('#discussion_bucket', '.js-merge-commit-button', 'click', async () => {
		subscription.destroy();

		observeEl('.discussion-timeline-actions', (_, observer) => {
			const deleteButton = select('[action$="/cleanup"] [type="submit"]');
			if (deleteButton) {
				deleteButton.click();
				observer.disconnect();
			}
		});
	});
}

features.add({
	id: __featureName__,
	description: 'Automatically deletes the branch right after merging a PR, if possible',
	include: [
		features.isPRConversation
	],
	load: features.onAjaxedPages,
	init
});
