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
// const linkIds = ['google-link', 'microsoft365-link', 'inner-circle-text-link', 'joiners-link-1', 'joiners-link-2','joiners-link-3','movers-link-1','automate-link-1','migrate-circle-link',
// 'migrate-link-1','migrate-link-2','migrate-link-3','starters-circle-link','starters-link-1','starters-link-2','starters-link-3','leavers-circle-link','leavers-link-1','leavers-link-2',
// 'archive-circle-link','archive-link-1','archive-link-2']

const linkIds = {
    'google-link': googleLink,'microsoft365-link': microsoft365Link,'inner-circle-text-link':innerCircleTextLink,'joiners-text-link1': joinersLink1,'joiners-text-link2': joinersLink2,
    'joiners-text-link3': joinersLink3,'movers-text-link1': moversLink1,'automate-text-link1': automateLink1,'migrate-circle-link': migrateCircleLink,'migrate-text-link1': migrateLink1,
    'migrate-text-link2': migrateLink2,'migrate-text-link3': migrateLink3,'starters-circle-link': startersCircleLink,'starters-text-link1': startersLink1,'starters-text-link2': startersLink2,
    'starters-text-link3': startersLink3,'leavers-circle-link': leaversCircleLink,'leavers-text-link1': leaversLink1,'leavers-text-link2': leaversLink2,'archive-circle-link': archiveCircleLink,
    'archive-text-link1': archiveLink1,'archive-text-link2': archiveLink2
}

// Implement object that consists of key-val pairs for different zoom origins.

window.onload = (event) => {
    var zoomElements = document.getElementsByClassName('zoom-anchor')
    var backButtonElements = document.getElementsByClassName('back-button')
    var svgContainer = document.getElementById('animation-widget')
    
    // Load in the links once all resources on page have loaded.
    for (var key in linkIds) {
        document.getElementById(key).setAttribute('href', linkIds[key])
        document.getElementById(key).setAttribute('target', targetBehaviour)
    }
 
    // Add event listeners to the images for each zoom section.
    for (var i = 0; i < zoomElements.length; i++) {
        zoomElements[i].addEventListener('click', function (e) {
            e.preventDefault()
            var zoomOrigin = this.getAttribute('data-zoom-origin')
            var zoomSection = this.getAttribute('data-section')
            var sections = document.getElementsByClassName('section')

            svgContainer.classList.add(zoomOrigin)
            svgContainer.setAttribute('data-zoom-origin', zoomOrigin)
            svgContainer.classList.add('zoom')
            // Blur and grayscale all other than the zoomed in area.
            // this.parentElement.parentElement
            // document.getElementById('starters-circle').style.filter = "blur(5px) grayscale(100%)"

            for (var i = 0; i < sections.length; i++) {
                if(sections[i].getAttribute('data-section') !== zoomSection) {
                    sections[i].style.filter = "blur(5px) grayscale(100%)"
                }
            }
        })
    }

    // Add event listeners to back buttons.
    for (var i = 0; i < backButtonElements.length; i++) {
        backButtonElements[i].addEventListener('click', function () {
            // Data attribute has same name as the class for setting transform-origin, use this to target and remove the class on our SVG.
            var zoomOrigin = svgContainer.getAttribute('data-zoom-origin')
            svgContainer.classList.remove(zoomOrigin)
            svgContainer.classList.remove('zoom')
        })
    }




}