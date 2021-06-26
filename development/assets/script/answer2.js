import data from '../json/data.json';

function generateGroups() {

	let assistant = data
		.filter(person => person.assistant)
		.map(item => {
			return {
				...item,
				members: []
			}
		});

	let notAssistant = data.filter(person => !person.assistant)

	notAssistant.forEach((person, index) => {
		let isDuplicate = data.filter(data => data.name == person.name);
		if (isDuplicate.length > 1) notAssistant[index].duplicate = true;

		let findGroupIndex = assistant.findIndex(item => item.group == person.group);
		if (findGroupIndex >= 0) assistant[findGroupIndex].members.push(person);
	})

	return assistant;

}

let result = generateGroups();
console.log('answer 2️⃣', result);
