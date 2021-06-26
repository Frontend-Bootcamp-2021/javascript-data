import data from '../json/data.json';

function generateGroups() {

	const groupBy = (arr, prop) => {
		return arr.reduce((acc, item) => {
			const key = item[prop]
			if (!acc[key]) acc[key] = [];
			acc[key].push(item)
			return acc
		}, [])
	}

	let assistant = data.filter(person => person.assistant)
	let notAssistant = data.filter(person => !person.assistant)

	notAssistant.reduce((a, person, index) => {
		if (a.includes(person.name)) notAssistant[index].duplicate = true
		a[index] = person.name
		return a
	}, []);

	let groups = groupBy(notAssistant, 'group')
	let result = assistant.map(item => {
		return {
			...item,
			members: groups[item.group]
		}
	})

	let sortResult = result
		.sort((a, b) => (a.name.toLowerCase().split(' ')[0] > b.name.toLowerCase().split(' ')[0]) ? 1 : -1)
		.reverse();
	return sortResult;
}

function generateGroupElements(data) {
	const templateGroups = document.querySelector('[template="groups"]');

	let groupElement = templateGroups.cloneNode(true);
	groupElement.removeAttribute('template');
	groupElement.classList.add(`-${data.group.toLowerCase()}`);

	let templateItems = groupElement.firstElementChild;
	templateItems.innerText = data.name;

	data.members.forEach(member => {
		let itemElement = templateItems.cloneNode(true);
		itemElement.innerText = member.name;
		if (member.duplicate) itemElement.classList.add('-duplicate');
		templateItems.insertAdjacentElement('afterend', itemElement)
	});

	templateGroups.insertAdjacentElement('afterend', groupElement);
}

window.onload = () => {
	let result = generateGroups();
	result.forEach(group => generateGroupElements(group));
};
