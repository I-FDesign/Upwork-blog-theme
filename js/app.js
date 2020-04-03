let currentPage = 1;
let lastPage = null;

$(document).ready(()=>{
    $([document.documentElement, document.body]).animate({
        scrollTop: 0
    }, 10);
})

function navigate(scrollTo, nextPage){
    lastPage = currentPage;
    currentPage = nextPage;

    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top
    }, 500);

    const optionToSetActive = '#option_' + currentPage.toString();
    const optionToRemoveActive = '#option_' + lastPage.toString();

    $(optionToRemoveActive).removeClass('active');
    $(optionToSetActive).addClass('active');
}

function leftNavigate(scrollTo, page){
    lastPage = currentPage;
    currentPage = page;

    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top
    }, 500);

    const optionToSetActive = '#option_' + currentPage.toString();
    const optionToRemoveActive = '#option_' + lastPage.toString();

    $(optionToRemoveActive).removeClass('active');
    $(optionToSetActive).addClass('active');
}

let position = {};
let marginLeft = {};
const windowsWidth = window.innerWidth;
const marginBetweenPosts = windowsWidth * 0.02;

function postsNavigate(category_id, action) {
    const postsContainer = $('#' + category_id + ' .posts-container');
    const posts = $('#' + category_id + ' .post');

    if(!position[category_id]) {
        position[category_id] = 0;
    }

    const thisPosition = position[category_id];

    if(action === 'next' && thisPosition >= 0 && thisPosition < posts.length - 1) {
        const postWidth = posts[thisPosition].offsetWidth;

        if(!marginLeft[category_id]){
            marginLeft[category_id] = 0;
        }
        marginLeft[category_id] += (postWidth + marginBetweenPosts) * - 1;
        
        $(postsContainer).css({
            'margin-left':  marginLeft[category_id].toString() + 'px'
        })

        removeActiveClass(thisPosition, action, posts);

        position[category_id] += 1;
    }

    if(action === 'prev' && thisPosition > 0) {
        const postWidth = posts[thisPosition - 1].offsetWidth;

        if(!marginLeft[category_id]){
            marginLeft[category_id] = 0;
        }
        marginLeft[category_id] -= (postWidth + marginBetweenPosts) * - 1;
        
        $(postsContainer).css({
            'margin-left':  marginLeft[category_id].toString() + 'px'
        })

        removeActiveClass(thisPosition, action, posts);

        position[category_id] -= 1;
    }
}

function removeActiveClass(position, action, posts) {
    if(action === 'prev') {
        const lastElement = $(posts[position])[0];
        const nextElement = $(posts[position - 1])[0];
        
        $(lastElement).removeClass('active');
        $(nextElement).addClass('active');
    } else {
        const lastElement = $(posts[position])[0];
        const nextElement = $(posts[position + 1])[0];
        
        $(lastElement).removeClass('active');
        $(nextElement).addClass('active');
    }
}