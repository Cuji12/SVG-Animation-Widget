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
    'google-link': googleLink,'microsoft365-link': microsoft365Link,'inner-circle-text-link':innerCircleTextLink,'joiners-link1': joinersLink1,'joiners-link2': joinersLink2,
    'joiners-link3': joinersLink3,'movers-link1': moversLink1,'automate-link1': automateLink1,'migrate-circle-link': migrateCircleLink,'migrate-link1': migrateLink1,
    'migrate-link2': migrateLink2,'migrate-link-3': migrateLink3,'starters-circle-link': startersCircleLink,'starters-link1': startersLink1,'starters-link2': startersLink2,
    'starters-link3': startersLink3,'leavers-circle-link': leaversCircleLink,'leavers-link1': leaversLink1,'leavers-link2': leaversLink2,'archive-circle-link': archiveCircleLink,
    'archive-link1': archiveLink1,'archive-link2': archiveLink2
}

// Implement object that consists of key-val pairs for different zoom origins.

window.onload = (event) => {
    // Load in the links once all resources on page have loaded.
    // for (var key in linkIds) {
    //     document.getElementById(key).setAttribute('href', linkIds[key])
    //     document.getElementById(key).setAttribute('target', targetBehaviour)
    // }
    
    var zoomElements = document.getElementsByClassName('zoom-anchor')
    
    for (var i = 0; i < zoomElements.length; i++) {
        zoomElements[i].addEventListener('click', function (e) {
            e.preventDefault()
            var svgContainer = document.getElementById('animation-widget')
            var zoomOrigin = this.getAttribute('data-zoom-origin')

            svgContainer.classList.add(zoomOrigin)
            svgContainer.classList.add('zoom')
        })
    }
}