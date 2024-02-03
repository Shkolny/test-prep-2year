import getData from './actions/getData.mjs'
import postData from './actions/postData.mjs'

const form = document.querySelector('form')
const buttonGet = document.querySelector('.get')
const buttonPost = document.querySelector('.post')
const list = document.querySelector('.profiles')

const URL = 'http://localhost:3000/USERS'

buttonPost.addEventListener('click', e => {
	try {
		e.preventDefault()
		const data = new FormData(form)
		const user = {
			name: data.get('name'),
			password: data.get('password'),
			email: data.get('email')
		}

		postData(URL, user)
		form.reset()
	} catch (error) {
		console.error(error)
	}
})

buttonGet.addEventListener('click', async e => {
	e.preventDefault()
	const users = await getData(URL)
	users.forEach(user => {
		list.insertAdjacentHTML(
			`beforeend`,
			`
			<li>
				<p class="name">${user.name}</p>
				<p class="email">${user.email}</p>
			</li>
			`
		)
	})
})
