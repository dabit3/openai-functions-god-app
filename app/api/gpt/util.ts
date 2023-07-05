type Model = {
	id: string
	object: string
	created: number
	owned_by: string
	permission: Array<object>
	root: string
	parent: null
}

const KEY = process.env.OPENAI_API_KEY

const base_uri = 'https://api.openai.com/v1/models'

const headers = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${KEY}`,
}

const fetchModels = async () => {
	const response = await fetch(base_uri, {
		method: 'GET',
		headers,
	})

	const json = await response.json()
	return json.data
}

const findModel = (name: string, models: Array<Model>) => {
	return models.find((model: Model) => model.id === name)
}

const setModel = async (name: string) => {
	if (!name) {
		return { error: new Error('No model name provided') }
	}
	try {
		const models = await fetchModels()
		const found = findModel(name, models)
		if (found) return { name }
		return { error: new Error('Model not found') }
	} catch (err) {
		return { error: err }
	}
}

export default setModel
