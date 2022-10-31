import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

export function helloCube() {
	const canvas = document.getElementById('c')
	const renderer = new THREE.WebGLRenderer({ canvas })
	renderer.shadowMap.enabled = true

	const fov = 45 // field of view. 75 degrees in the vertical dimension
	const aspect = 2 // the canvas default
	const near = 0.1
	const far = 20
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

	camera.position.set(0, 0, 4)

	const controls = new OrbitControls(camera, renderer.domElement)

	const scene = new THREE.Scene()

	const boxWidth = 1
	const boxHeight = 1
	const boxDepth = 1
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhysicalMaterial({ color })

		const cube = new THREE.Mesh(geometry, material)
		cube.castShadow = true
		cube.receiveShadow = false
		scene.add(cube)

		cube.position.x = x

		return cube
	}

	const cubes = [
		makeInstance(geometry, 0x44aa88, 0),
		makeInstance(geometry, 0x8844aa, -2),
		makeInstance(geometry, 0xaa8844, 2),
		makeInstance(geometry, 0xaa8844, 4),
		makeInstance(geometry, 0xaa8844, 6),
		makeInstance(geometry, 0xaa8844, 8)
	]

	// * Directional Light
	// {
	// 	const color = 0xffffff
	// 	const intensity = 1
	// 	const light = new THREE.DirectionalLight(color, intensity)
	// 	light.position.set(0, 5, 0)
	// 	scene.add(light)
	// }

	// * Ambient Light
	// {
	// 	const color = 0xffffff
	// 	const intensity = 1
	// 	const light = new THREE.AmbientLight(color, intensity)
	// 	scene.add(light)
	// }

	// * Hemisphere Light
	// {
	// 	const skyColor = 0x87ceeb // light blue
	// 	const groundColor = 0xb97a20 // brownish orange
	// 	const intensity = 1
	// 	const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
	// 	scene.add(light)
	// }

	// * Point Light
	// {
	// 	const color = 0xffffff
	// 	const intensity = 1
	// 	const light = new THREE.PointLight(color, intensity)
	// 	light.position.set(0, 5, 0)
	// 	light.castShadow = true
	// 	scene.add(light)
	// }

	// * RectAreaLight
	// {
	// 	const width = 10
	// 	const height = 10
	// 	const intensity = 3
	// 	const rectLight = new THREE.RectAreaLight(
	// 		0xffffff,
	// 		intensity,
	// 		width,
	// 		height
	// 	)
	// 	rectLight.position.set(5, 5, 0)
	// 	rectLight.lookAt(0, 0, 0)
	// 	scene.add(rectLight)

	// 	const rectLightHelper = new RectAreaLightHelper(rectLight)
	// 	rectLight.add(rectLightHelper)
	// }

	// * Spotlight
	{
		const spotLight = new THREE.SpotLight(0xffffff)
		spotLight.castShadow = true
		spotLight.position.set(0, 0, 2)
		spotLight.target.position.set(1, 0, 0)
		scene.add(spotLight)
		scene.add(spotLight.target)

		const planeGeometry = new THREE.PlaneGeometry(50, 50)
		const planeMaterial = new THREE.MeshPhysicalMaterial({
			color: 0xaaaaaa,
			side: THREE.DoubleSide
		})

		const plane = new THREE.Mesh(planeGeometry, planeMaterial)
		plane.receiveShadow = true
		plane.position.set(0, -2, 0)
		plane.rotation.x = Math.PI * -0.5

		scene.add(plane)
	}

	renderer.render(scene, camera)

	function render(time) {
		time *= 0.001 // convert time to seconds

		cubes.forEach((cube, ndx) => {
			const speed = 1 + ndx * 0.1
			const rot = time * speed
			// cube.rotation.x = rot
			// cube.rotation.y = rot
		})

		controls.update()

		renderer.render(scene, camera)
		requestAnimationFrame(render)
	}

	requestAnimationFrame(render)
}

// {
// 	const canvas = document.getElementById('c')
// 	const renderer = new THREE.WebGLRenderer({ canvas })

// 	// Enable shadow
// 	renderer.shadowMap.enabled = true
// 	renderer.shadowMap.type = THREE.PCFShadowMap

// 	// Plane
// 	const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32)
// 	const planeMaterial = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 })
// 	const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// 	plane.receiveShadow = true
// 	scene.add(plane)

// 	// Point light
// 	const color = 0xffffff
// 	const intensity = 1
// 	const light = new THREE.PointLight(color, intensity)
// 	light.position.set(0, 4, 2)
// 	light.castShadow = true
// 	scene.add(light)
// }
