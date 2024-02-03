import getData from './actions/getData.mjs'
import patchData from './actions/patchData.mjs'
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
			email: data.get('email'),
			likes: '0'
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
			<li id=${user.id}>
				<p class="name">${user.name}</p>
				<p class="email">${user.email}</p>
				<p class="likes">${user.likes}</p>
			</li>
			`
		)
	})
	const likes = document.querySelectorAll('.likes')
	likes.forEach(like => {
		like.addEventListener('click', () => {
			const id = like.parentElement.id
			let likesCount = +like.textContent
			likesCount++
			like.textContent = likesCount
			patchData(URL, id, { likes: likesCount })
		})
	})
})
