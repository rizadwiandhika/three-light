import * as THREE from 'three'

export async function light() {
	const renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	const camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		500
	)
	camera.position.set(0, 0, 100)
	camera.lookAt(0, 0, 0)

	const scene = new THREE.Scene()

	const light = new THREE.AmbientLight(0x404040) // soft white light

	scene.add(light)
	renderer.render(scene, camera)
}
