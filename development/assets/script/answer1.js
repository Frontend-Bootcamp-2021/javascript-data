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

	let assistant = data.filter(person => person.assistant);
	let notAssistant = data.filter(person => !person.assistant);

	notAssistant.reduce((a, person, index) => {
		if (a.includes(person.name)) notAssistant[index].duplicate = true
		a[index] = person.name
		return a
	}, []);

	let groups = groupBy(notAssistant, 'group');

	let result = assistant.map(item => {
		return {
			...item,
			members: groups[item.group]
		}
	})

	return result;

}

let result = generateGroups();
console.log('answer 1️⃣', result);
