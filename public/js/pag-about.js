document.addEventListener('DOMContentLoaded', function () {
    const languageSelector = document.getElementById('language-selector');
    const contentSpanish = document.getElementById('spanish');
    const contentEnglish = document.getElementById('english');
    const contentCatalan = document.getElementById('catalan');

   
    showContent(contentSpanish);
    hideContent(contentEnglish);
    hideContent(contentCatalan);

    languageSelector.addEventListener('change', function () {
        const selectedLanguage = languageSelector.value;

        if (selectedLanguage === 'spanish') {
            showContent(contentSpanish);
            hideContent(contentEnglish);
            hideContent(contentCatalan);
        } else if (selectedLanguage === 'english') {
            showContent(contentEnglish);
            hideContent(contentSpanish);
            hideContent(contentCatalan);
        } else if (selectedLanguage === 'catalan') {
            showContent(contentCatalan);
            hideContent(contentSpanish);
            hideContent(contentEnglish);
        }
    });

    function showContent(content) {
        content.style.display = 'block';
    }

    function hideContent(content) {
        content.style.display = 'none';
    }
});


