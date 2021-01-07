
// for star rating
let added = false
document.querySelector('#rating').addEventListener('click', function (e) {
    let action = 'add';
    let rating = 0;
    let ratingForm = document.getElementById('rating-form')
    if (added == true) {
        ratingForm.action = ratingForm.action.slice(0, -1)
        added = false
    }
    console.log('detect rating')
    console.log(this.children.length)
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].classList[action]('active');
        if (this.children[i] === e.target) action = 'remove';
        console.log(this.children[i].className)
        if (this.children[i].className == 'active') {
            rating++
        }
        if (i == this.children.length - 1) {
            added = true
            console.log('add number', rating)
            ratingForm.action += rating
        }
    }
});