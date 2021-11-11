/* Links */
// Inner Circle
const googleLink = 'https://www.google.com'
const microsoft365Link = ''
const innerCircleTextLink = ''

// Outer Circle
const joinersLink1 = '' // refers to link at the top.
const joinersLink2 = ''
const joinersLink3 = ''
const moversLink1 = ''
const automateLink1 = ''

// Joiners Branch
const migrateCircleLink = ''
const migrateLink1 = '' // refers to link at the top.
const migrateLink2 = ''
const migrateLink3 = ''

const startersCircleLink = ''
const startersLink1 = '' // refers to link at the top.
const startersLink2 = ''
const startersLink3 = ''

// Movers Branch
const leaversCircleLink = ''
const leaversLink1 = '' // refers to link at the top.
const leaversLink2 = ''

const archiveCircleLink = ''
const archiveLink1 = '' // refers to link at the top.
const archiveLink2 = 'www.facebook.com'

// Change this to either "_blank" or "_self" to open links in a new tab or the current one respectively.
const targetBehaviour = '_blank'

// Create array of link ID's
const linkIds = {
	'google-link': googleLink,
	'microsoft365-link': microsoft365Link,
	'inner-circle-text-link': innerCircleTextLink,
	'joiners-text-link1': joinersLink1,
	'joiners-text-link2': joinersLink2,
	'joiners-text-link3': joinersLink3,
	'movers-text-link1': moversLink1,
	'automate-text-link1': automateLink1,
	'migrate-circle-link': migrateCircleLink,
	'migrate-text-link1': migrateLink1,
	'migrate-text-link2': migrateLink2,
	'migrate-text-link3': migrateLink3,
	'starters-circle-link': startersCircleLink,
	'starters-text-link1': startersLink1,
	'starters-text-link2': startersLink2,
	'starters-text-link3': startersLink3,
	'leavers-circle-link': leaversCircleLink,
	'leavers-text-link1': leaversLink1,
	'leavers-text-link2': leaversLink2,
	'archive-circle-link': archiveCircleLink,
	'archive-text-link1': archiveLink1,
	'archive-text-link2': archiveLink2
}

window.onload = () => {
	var zoomElements = Array.from(document.getElementsByClassName('zoom-anchor'))
	var backButtonElements = Array.from(document.getElementsByClassName('back-button'))
	var svgContainer = document.getElementById('animation-widget')
	var sections = Array.from(document.getElementsByClassName('section'))
	var pulseElements = Array.from(document.getElementsByClassName('pulse'))
	var endAnimationElements = Array.from(document.getElementsByClassName('end-animation'))
	var firstTextLinksAnimations = Array.from(document.getElementsByClassName('start-animation'))

	createObserver()

	// Load in the links once all resources on page have loaded.
	for (var key in linkIds) {
		document.getElementById(key).setAttribute('href', linkIds[key])
		document.getElementById(key).setAttribute('target', targetBehaviour)
	}


	/* Event functions */
	function zoomIn() {
		event.preventDefault()
		let zoomOrigin = this.getAttribute('data-zoom-origin')
		let zoomSection = this.getAttribute('data-section')
		let parentGroup = document.getElementById(`${zoomSection}-group`)
		let elementsToUnhide = Array.from(parentGroup.querySelectorAll('[data-display="hidden"]'))
		let zoomedInAreaLinks = Array.from(parentGroup.querySelectorAll('a'))
		let separatorChar = this.id.indexOf('-')


		for (let i = 0; i < elementsToUnhide.length; i++) {
			elementsToUnhide[i].setAttribute('data-display', 'unhide')
		}

		svgContainer.classList.add(zoomOrigin)
		svgContainer.setAttribute('data-zoom-origin', zoomOrigin)
		svgContainer.classList.add('zoom')

		// Add blur and grayscale filters to all other than the zoomed in area, also disable other sections from being clickable.
		for (let i = 0; i < sections.length; i++) {
			if (sections[i].getAttribute('data-section') !== zoomSection) {
				sections[i].style.filter = 'blur(5px) grayscale(100%)'
				sections[i].setAttribute('data-disabled', true)
			}
		}

		// Pause pulse animations.
		for (let i = 0; i < pulseElements.length; i++) {
			pulseElements[i].setAttribute('end', 0)
		}

		// Disable links until after the first link has finished it's animation.
		for (let i = 0; i < zoomedInAreaLinks.length; i++) {
			zoomedInAreaLinks[i].setAttribute('data-disabled', true)
		}

		// Remove event listener to allow circle / titles to be clickable links. 
		this.removeEventListener('click', zoomIn)

		// Either setup element to the circle or title depending on which the user clicked.
		if (this.id.includes('circle') === true) {
			let elementToRemoveEvent = document.getElementById(`${this.id.substr(0, separatorChar)}-title`)
			elementToRemoveEvent.removeEventListener('click', zoomIn)
		} else {
			let elementToRemoveEvent = document.getElementById(`${this.id.substr(0, separatorChar)}-circle`)
			elementToRemoveEvent.removeEventListener('click', zoomIn)
		}
	}

	function zoomOut() {
		// Data attribute has same name as the class for setting transform-origin, use this to target and remove the class on our SVG.
		var zoomOrigin = svgContainer.getAttribute('data-zoom-origin')

		// Resume pulse animations.
		for (var i = 0; i < pulseElements.length; i++) {
			pulseElements[i].setAttribute('end', 'indefinite')
		}

		// Remove blur and grayscale filters, also disable sections.
		for (var i = 0; i < sections.length; i++) {
			sections[i].style.filter = ""
			sections[i].setAttribute('data-disabled', true)
		}

		// Re-add our zoomIn event listener
		let zoomCircle = this.id
		let separatorChar = zoomCircle.indexOf('-')
		let zoomTitle = document.getElementById(`${zoomCircle.substr(0, separatorChar)}-title`)

		zoomCircle = document.getElementById(`${zoomCircle.substr(0, separatorChar)}-circle`)
		zoomCircle.addEventListener('click', zoomIn)
		zoomTitle.addEventListener('click', zoomIn)

		// Remove current zoomOrigin data-attr and remove zoom class to take us back out.
		svgContainer.classList.remove(zoomOrigin)
		svgContainer.classList.remove('zoom')
	}

	function hideElementsAfterZoomOut() {
		let elementsToHide = Array.from(document.querySelectorAll('[data-display="unhide"]'))
		for (let i = 0; i < elementsToHide.length; i++) {
			elementsToHide[i].setAttribute('data-display', 'hidden')
		}

		// Re-enable elements after last animation has ended on zoomOut.
		for (var i = 0; i < sections.length; i++) {
			sections[i].setAttribute('data-disabled', false)
		}
	}

	function createObserver() {
		let observer

		let options = {
			root: null,
			rootMargin: "0px",
			threshold: [0.3]
		  };
		
		  observer = new IntersectionObserver(beginDrawAnimation, options);
		  observer.observe(svgContainer);
	}

	function beginDrawAnimation(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				document.getElementById('topBranchStartAnim').beginElement()
				document.getElementById('bottomBranchStartAnim').beginElement()
				observer.unobserve(entry.target)
			}
		})
	}

	/* Adding event listeners */
	// Add events for the ending animations to add display: none to links only after the animations have ended. 
	for (let i = 0; i < endAnimationElements.length; i++) {
		endAnimationElements[i].addEventListener('endEvent', hideElementsAfterZoomOut)
	}

	// Add event listeners to the images for each zoom section.
	for (let i = 0; i < zoomElements.length; i++) {
		zoomElements[i].addEventListener('click', zoomIn)
	}

	// Add event listeners to back buttons.
	for (let i = 0; i < backButtonElements.length; i++) {
		backButtonElements[i].addEventListener('click', zoomOut)
	}

	// Add event listeners to first text link animation of each section for re-enabling the pointer-events styling.
	for (let i = 0; i < firstTextLinksAnimations.length; i++) {
		// You need to target the animate elements themselves and then use that to target the data-disabled attributes of the corresponding element it's animating
		firstTextLinksAnimations[i].addEventListener('endEvent', function() {
			// Use the current zoom origin data attr on our SVG element to determine the current section.
			let zoomSection = document.getElementById('animation-widget').getAttribute('data-zoom-origin')
			let separatorChar = zoomSection.indexOf('-')
			zoomSection = document.getElementById(`${zoomSection.substr(0, separatorChar)}-group`)
			let zoomedInAreaLinks = Array.from(zoomSection.querySelectorAll('a'))

			// Re-enable all links within the section after first text animates in.
			for (let i = 0; i < zoomedInAreaLinks.length; i++) {
				zoomedInAreaLinks[i].setAttribute('data-disabled', false)
			}
		})
	}
}