'use strict'

// The following is a calculation for the vertical offset of the 'top' property
// of a <div> that wraps around both the <header> and <nav> elements.  This <div>
// exists to give a box shadow on only the bottom border of the <nav> bar.  If
// I apply a box shadow directly to the <nav> bar, the shadow will be visible 
// on the top border as well as the bottom, breaking the illusion of a seamless
// transition from the <header> to the <nav> bar.  Surprisingly, there isn't any
// non-hacky way to apply a box shadow to only the bottom portion of an element,
// so I am wrapping both elements in a <div> and using its shadow instead. This
// however, presents another issue: the <nav> bars positioning of 'sticky' is 
// overridden by the 'shadow' <div>.  The desired result I want is for the <nav>
// bar to stick to the top of the window after scrolling through the <header>. 
// Since the <div> is overriding the <nav> positioning, the 'sticky' positioning
// must be applied to the <div> instead, and the 'top' property must be calculated
// to offset the height of the <header> that I want to scroll through.  The only
// other alternative to provide a shadow while keeping the <header>/<nav> 
// transition seamless is to set the y-offset of the shadow so high that it is
// hidden underneath the background of the <nav> itself.  This solution is not
// good enough for me because it just offsets the shadow, making the bottom
// shadow bigger.

const header = document.querySelector('header');
const headerStyle = window.getComputedStyle(header);
const shadowDiv = document.getElementById('shadow');
shadowDiv.style.top = ('-' + headerStyle.height);

// Render the about page at landing
fetch('/about')
    .then(response => response.text())
    .then(data => renderHTML(data))


// This renders the text content of an HTML file that was
// fetched from the server.  It adds the HTML to the innerHTML
// of the <main> element.  The timeout and opacity settings
// trigger an ease-in-out transition defined in CSS which 
// makes the change a little more smooth and pleasant.

const renderHTML = (data) => {
    const mainElem = document.querySelector('main');
    const opacity = getComputedStyle(mainElem).opacity;
    if(opacity === '1'){
        mainElem.style.opacity = 0;
        setTimeout(() => {
            mainElem.innerHTML = data;
            mainElem.style.opacity = 1;
        }, 1000)
    } else {
        mainElem.innerHTML = data;
        mainElem.style.opacity = 1;
    }
}

// Event delegation for the sticky navbar.  This sends a very
// basic fetch GET request to the server.  The format of the 
// URL is simply the id of the target that was clicked, which
// correlates to an html file of the same name.  That file is 
// is handled by renderHTML(), which is defined above.  If the
// file does not exist, we are sent the custom 404 html.

document.querySelector('nav').addEventListener('click', (event) => {
    console.log(event.target.id);
    fetch('/'+event.target.id)
        .then(response => response.text())
        .then(data => renderHTML(data))
})
