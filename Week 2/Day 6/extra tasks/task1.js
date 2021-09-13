// TASK 1
const highlight = document.getElementById('highlight');

highlight.addEventListener('mouseover', () => {
    highlight.style.color = "red";
});

highlight.addEventListener('mouseout', () => {
    highlight.style.color = "black";
});